#!/usr/bin/env node

/**
 * Local performance smoke runner for BACKLOG-003 evidence.
 *
 * Uses Node's built-in fetch so it does not require external CLIs (k6/autocannon).
 * This is not a replacement for full k6 load testing; it is a reproducible local
 * evidence check for critical public endpoints.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
const outputPath = process.env.OUTPUT_PATH || 'reports/local-performance-smoke.json';
const concurrency = Number(process.env.PERF_CONCURRENCY || 10);
const iterations = Number(process.env.PERF_ITERATIONS || 5);
const endpoints = [
  { name: 'health', path: '/api/health', maxP95Ms: 500, allowedStatuses: [200] },
  { name: 'home', path: '/', maxP95Ms: 2500, allowedStatuses: [200, 304] },
  { name: 'claim', path: '/claim', maxP95Ms: 2500, allowedStatuses: [200, 304] },
];

function percentile(values, p) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[index];
}

async function timedFetch(endpoint) {
  const started = performance.now();
  try {
    const response = await fetch(`${baseUrl}${endpoint.path}`, {
      headers: {
        'user-agent': 'dr-nrpg-local-performance-smoke/1.0',
        accept: 'text/html,application/json',
      },
    });
    await response.arrayBuffer();
    return {
      ok: endpoint.allowedStatuses.includes(response.status),
      status: response.status,
      durationMs: performance.now() - started,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      durationMs: performance.now() - started,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function runEndpoint(endpoint) {
  const results = [];
  for (let i = 0; i < iterations; i += 1) {
    const batch = Array.from({ length: concurrency }, () => timedFetch(endpoint));
    results.push(...await Promise.all(batch));
  }

  const durations = results.map((result) => result.durationMs);
  const failures = results.filter((result) => !result.ok);
  const summary = {
    name: endpoint.name,
    path: endpoint.path,
    requests: results.length,
    failures: failures.length,
    failureRate: failures.length / results.length,
    latencyMs: {
      avg: durations.reduce((sum, value) => sum + value, 0) / durations.length,
      p50: percentile(durations, 50),
      p95: percentile(durations, 95),
      p99: percentile(durations, 99),
      max: Math.max(...durations),
    },
    threshold: {
      maxP95Ms: endpoint.maxP95Ms,
      p95Ok: percentile(durations, 95) <= endpoint.maxP95Ms,
      noFailures: failures.length === 0,
    },
    statuses: results.reduce((acc, result) => {
      acc[result.status] = (acc[result.status] || 0) + 1;
      return acc;
    }, {}),
    sampleErrors: failures.slice(0, 3).map((failure) => ({ status: failure.status, error: failure.error })),
  };

  summary.passed = summary.threshold.p95Ok && summary.threshold.noFailures;
  return summary;
}

const startedAt = new Date().toISOString();
const endpointResults = [];
for (const endpoint of endpoints) {
  endpointResults.push(await runEndpoint(endpoint));
}

const report = {
  startedAt,
  finishedAt: new Date().toISOString(),
  baseUrl,
  concurrency,
  iterations,
  totalRequests: endpointResults.reduce((sum, endpoint) => sum + endpoint.requests, 0),
  passed: endpointResults.every((endpoint) => endpoint.passed),
  endpoints: endpointResults,
};

await mkdir(outputPath.split('/').slice(0, -1).join('/') || '.', { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(JSON.stringify(report, null, 2));
process.exit(report.passed ? 0 : 1);

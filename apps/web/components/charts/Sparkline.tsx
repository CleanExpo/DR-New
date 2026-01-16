'use client';

/**
 * Sparkline Component
 *
 * Minimal inline chart for displaying trends in compact spaces
 * Perfect for dashboard cards, trust signals, and metrics
 *
 * Usage:
 * ```tsx
 * <Sparkline
 *   data={[100, 120, 115, 130, 140, 125, 135]}
 *   color="#0047FF"
 * />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { SparklineProps } from '@/lib/charts/chart-types';
import { chartColors } from '@/lib/charts/chart-config';

export function Sparkline({
  data,
  width = 200,
  height = 80,
  color = chartColors.primary,
  showCurve = true,
  showDots = false,
  className = '',
}: SparklineProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const margin = { top: 8, right: 8, bottom: 8, left: 8 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([Math.min(...data), Math.max(...data)])
      .range([innerHeight, 0]);

    // Create line generator
    const line = d3.line<number>()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(showCurve ? d3.curveMonotoneX : d3.curveLinear);

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main group
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'none')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add line path
    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1.5)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('d', line);

    // Add gradient fill
    const gradient = svg.append('defs').append('linearGradient')
      .attr('id', 'sparkline-gradient')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .style('stop-color', color)
      .style('stop-opacity', 0.2);

    gradient.append('stop')
      .attr('offset', '100%')
      .style('stop-color', color)
      .style('stop-opacity', 0);

    // Add area under the line
    const area = d3.area<number>()
      .x((_, i) => xScale(i))
      .y0(innerHeight)
      .y1(d => yScale(d))
      .curve(showCurve ? d3.curveMonotoneX : d3.curveLinear);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#sparkline-gradient)')
      .attr('d', area);

    // Add dots if enabled
    if (showDots) {
      g.selectAll('.dot')
        .data(data)
        .join('circle')
        .attr('cx', (_, i) => xScale(i))
        .attr('cy', d => yScale(d))
        .attr('r', 2)
        .attr('fill', color)
        .attr('opacity', 0.6);
    }

    // Highlight last point
    const lastPoint = data[data.length - 1];
    g.append('circle')
      .attr('cx', xScale(data.length - 1))
      .attr('cy', yScale(lastPoint))
      .attr('r', 3)
      .attr('fill', color)
      .attr('opacity', 0.9);
  }, [data, width, height, color, showCurve, showDots]);

  return (
    <svg
      ref={svgRef}
      className={`inline-block ${className}`}
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}

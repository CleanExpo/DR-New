'use client';

/**
 * Network Visualization Component
 *
 * D3-based interactive force-directed graph for showing:
 * - Contractor network relationships
 * - Geographic connections
 * - Collaboration networks
 *
 * Usage:
 * ```tsx
 * <NetworkVisualization
 *   nodes={[
 *     { id: 'CONT-001', name: 'John Smith', region: 'Sydney' },
 *     { id: 'CONT-002', name: 'Jane Doe', region: 'Melbourne' },
 *   ]}
 *   links={[
 *     { source: 'CONT-001', target: 'CONT-002' },
 *   ]}
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import {
  chartColors,
  chartAnimations,
  chartFonts,
} from '@/lib/charts/chart-config';
import { formatNumber } from '@/lib/charts/chart-utils';

interface Node {
  id: string;
  name: string;
  region?: string;
  value?: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  strength?: number;
}

interface NetworkVisualizationProps {
  nodes: Node[];
  links: Link[];
  width?: number;
  height?: number;
  title?: string;
  showLegend?: boolean;
  onNodeClick?: (node: Node) => void;
  className?: string;
}

export function NetworkVisualization({
  nodes,
  links,
  width = 800,
  height = 600,
  title,
  showLegend = true,
  onNodeClick,
  className = '',
}: NetworkVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    // Create simulation
    const simulation = d3.forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force(
        'link',
        d3.forceLink(links as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[])
          .id((d: any) => d.id)
          .distance(100)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create groups
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g');

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .on('zoom', (event: any) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Draw links
    const linkSelection = g
      .selectAll('line')
      .data(links as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[])
      .join('line')
      .attr('stroke', chartColors.gray)
      .attr('stroke-opacity', 0.3)
      .attr('stroke-width', (d: any) => d.strength ? d.strength * 2 : 1);

    // Draw nodes
    const nodeSelection = g
      .selectAll('circle')
      .data(nodes as d3.SimulationNodeDatum[])
      .join('circle')
      .attr('r', (d: any) => (d.value || 20) + 5)
      .attr('fill', (d: any, i) => {
        // Color by region
        const regions = [...new Set(nodes.map(n => n.region))];
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
        return colorScale((regions.indexOf(d.region) || 0).toString());
      })
      .attr('stroke', chartColors.primary)
      .attr('stroke-width', 2)
      .attr('opacity', 0.8)
      .on('mouseover', function (event, d: any) {
        d3.select(this)
          .transition()
          .duration(chartAnimations.hover)
          .attr('r', (d.value || 20) + 10)
          .attr('opacity', 1);

        // Highlight connected nodes
        nodeSelection.attr('opacity', (node: any) => {
          const connected = links.some(
            (link: any) =>
              (typeof link.source === 'object'
                ? link.source.id
                : link.source) === d.id ||
              (typeof link.target === 'object'
                ? link.target.id
                : link.target) === d.id ||
              (typeof link.source === 'object'
                ? link.source.id
                : link.source) === node.id ||
              (typeof link.target === 'object'
                ? link.target.id
                : link.target) === node.id
          );
          return connected ? 1 : 0.2;
        });

        linkSelection.attr('stroke-opacity', (link: any) => {
          const isConnected =
            (typeof link.source === 'object'
              ? link.source.id
              : link.source) === d.id ||
            (typeof link.target === 'object'
              ? link.target.id
              : link.target) === d.id;
          return isConnected ? 0.6 : 0.1;
        });
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(chartAnimations.hover)
          .attr('r', (d: any) => (d.value || 20) + 5)
          .attr('opacity', 0.8);

        nodeSelection.attr('opacity', 0.8);
        linkSelection.attr('stroke-opacity', 0.3);
      })
      .on('click', (event, d: any) => {
        if (onNodeClick) {
          onNodeClick(d);
        }
      })
      .call(
        d3.drag<any, any>()
          .on('start', (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d: any) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Add labels
    const labels = g
      .selectAll('text')
      .data(nodes as d3.SimulationNodeDatum[])
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .style('font-size', `${chartFonts.sizes.label}px`)
      .style('fill', chartColors.text.primary)
      .style('pointer-events', 'none')
      .text((d: any) => d.name.substring(0, 5));

    // Update on simulation tick
    simulation.on('tick', () => {
      linkSelection
        .attr('x1', (d: any) => (typeof d.source === 'object' ? d.source.x : nodes.find(n => n.id === d.source)?.id || 0))
        .attr('y1', (d: any) => (typeof d.source === 'object' ? d.source.y : nodes.find(n => n.id === d.source)?.id || 0))
        .attr('x2', (d: any) => (typeof d.target === 'object' ? d.target.x : nodes.find(n => n.id === d.target)?.id || 0))
        .attr('y2', (d: any) => (typeof d.target === 'object' ? d.target.y : nodes.find(n => n.id === d.target)?.id || 0));

      nodeSelection
        .attr('cx', (d: any) => d.x || 0)
        .attr('cy', (d: any) => d.y || 0);

      labels
        .attr('x', (d: any) => d.x || 0)
        .attr('y', (d: any) => d.y || 0);
    });

    // Add title
    if (title) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 20)
        .attr('text-anchor', 'middle')
        .style('font-size', `${chartFonts.sizes.title}px`)
        .style('font-weight', chartFonts.weight.semibold)
        .style('fill', chartColors.text.primary)
        .text(title);
    }

    return () => {
      simulation.stop();
    };
  }, [nodes, links, width, height, title, showLegend, onNodeClick]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${className}`}
    >
      <svg
        ref={svgRef}
        className="border border-gray-200 rounded-lg bg-white"
        style={{ cursor: 'grab' }}
      />

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 text-xs text-gray-400 bg-blue-50 p-3 rounded-lg">
          <p>
            💡 <strong>Controls:</strong> Hover to highlight connections.
            Drag nodes to reposition. Scroll to zoom. Click nodes for details.
          </p>
        </div>
      )}
    </div>
  );
}

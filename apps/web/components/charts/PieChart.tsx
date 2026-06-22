// @ts-nocheck

'use client';

/**
 * D3 Pie/Donut Chart Component
 *
 * Renders an interactive pie chart with support for donut mode
 * Shows proportional data with percentage labels and legends
 *
 * Usage:
 * ```tsx
 * <PieChart
 *   data={[
 *     { name: 'Water Damage', value: 450 },
 *     { name: 'Fire Restoration', value: 320 },
 *   ]}
 *   title="Service Type Distribution"
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { PieChartProps, PieData, TooltipData } from '@/lib/charts/chart-types';
import {
  chartColors,
  chartAnimations,
  chartFonts,
} from '@/lib/charts/chart-config';
import { formatNumber, formatPercent, getSeriesColor } from '@/lib/charts/chart-utils';

export function PieChart({
  data,
  width = 400,
  height = 400,
  title,
  innerRadius = 0,  // 0 for pie, >0 for donut
  showPercentage = true,
  showLegend = true,
  showTooltip = true,
  animate = true,
  onSliceClick,
  className = '',
}: PieChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // Calculate total and percentages
    const total = d3.sum(data, d => d.value);
    const dataWithPercent = data.map((d, i) => ({
      ...d,
      color: d.color || getSeriesColor(i),
      percentage: (d.value / total) * 100,
    }));

    // Dimensions
    const radius = Math.min(width, height) / 2 - 20;
    const innerRadiusValue = innerRadius > 0 ? radius * 0.6 : 0;

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main group, centered
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Pie generator
    const pie = d3.pie<PieData>().value(d => d.value);
    const arc = d3.arc<d3.PieArcDatum<PieData>>()
      .innerRadius(innerRadiusValue)
      .outerRadius(radius);

    const hoverArc = d3.arc<d3.PieArcDatum<PieData>>()
      .innerRadius(innerRadiusValue)
      .outerRadius(radius + 10);

    // Add slices
    const slices = g
      .selectAll('.slice')
      .data(pie(dataWithPercent))
      .join('g')
      .attr('class', 'slice');

    // Add paths
    const paths = slices
      .append('path')
      .attr('fill', d => d.data.color)
      .attr('opacity', 0.8)
      .attr('d', arc as any)
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(chartAnimations.hover)
          .attr('opacity', 1)
          .attr('d', hoverArc as any);

        if (showTooltip) {
          setTooltip({
            x: d.data.name,
            y: d.data.value,
            percentage: d.data.percentage,
            color: d.data.color,
          });
          setTooltipPos({
            x: event.clientX - 50,
            y: event.clientY - 60,
          });
        }
      })
      .on('mouseout', function (event, d) {
        d3.select(this)
          .transition()
          .duration(chartAnimations.hover)
          .attr('opacity', 0.8)
          .attr('d', arc as any);
        setTooltip(null);
      })
      .on('click', (event, d) => {
        if (onSliceClick) {
          onSliceClick(d.data);
        }
      });

    // Animate paths
    if (animate) {
      paths
        .attr('opacity', 0)
        .transition()
        .duration(chartAnimations.chartLoad)
        .delay((_, i) => (i / dataWithPercent.length) * 200)
        .attr('opacity', 0.8);
    }

    // Add percentage labels
    if (showPercentage) {
      slices
        .append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('font-size', `${chartFonts.sizes.label}px`)
        .style('font-weight', chartFonts.weight.semibold)
        .style('fill', '#FFFFFF')
        .style('pointer-events', 'none')
        .text(d => (d.data.percentage >= 5 ? formatPercent(d.data.percentage / 100) : ''));
    }

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
  }, [
    data,
    width,
    height,
    title,
    innerRadius,
    showPercentage,
    showLegend,
    showTooltip,
    animate,
    onSliceClick,
  ]);

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <svg ref={svgRef} style={{ maxWidth: '100%', height: 'auto' }} />

      {/* Legend */}
      {showLegend && (
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
          {data.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color || getSeriesColor(i) }}
              />
              <span className="text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tooltip */}
      {tooltip && showTooltip && (
        <div
          className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg pointer-events-none z-50"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
          }}
        >
          <div className="font-semibold">{tooltip.x}</div>
          <div className="text-gray-200">
            Count: {formatNumber(tooltip.y)}
          </div>
          {tooltip.percentage && (
            <div className="text-gray-300 text-xs">
              {formatPercent(tooltip.percentage / 100)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

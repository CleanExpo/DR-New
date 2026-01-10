'use client';

/**
 * D3 Area Chart Component
 *
 * Renders an interactive area chart for cumulative/stacked data
 * Shows trends with filled area under the line
 *
 * Usage:
 * ```tsx
 * <AreaChart
 *   data={[
 *     { date: '2024-01-01', value: 1000 },
 *     { date: '2024-01-02', value: 1500 },
 *   ]}
 *   title="Cumulative Revenue"
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { AreaChartProps, TimeSeriesPoint, TooltipData } from '@/lib/charts/chart-types';
import {
  chartColors,
  chartMargins,
  chartAnimations,
  chartFonts,
} from '@/lib/charts/chart-config';
import {
  formatDate,
  formatNumber,
  getResponsiveWidth,
  getResponsiveHeight,
} from '@/lib/charts/chart-utils';

export function AreaChart({
  data,
  width: defaultWidth = 800,
  height: defaultHeight = 300,
  margin = chartMargins.medium,
  title,
  color = chartColors.primary,
  stacked = false,
  opacity = 0.6,
  showLine = true,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  animate = true,
  xAxisLabel,
  yAxisLabel,
  className = '',
}: AreaChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [containerWidth, setContainerWidth] = useState(defaultWidth);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        setContainerWidth(newWidth);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const width = getResponsiveWidth(containerWidth, 'dashboard');
  const height = Math.max(getResponsiveHeight(width, 'dashboard'), defaultHeight);
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // Parse dates
    const parsedData = data.map(d => ({
      ...d,
      date: typeof d.date === 'string' ? new Date(d.date) : d.date as Date,
    }));

    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(parsedData, d => d.date) as [Date, Date])
      .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, Math.max(...parsedData.map(d => d.value)) * 1.1])
      .range([innerHeight, 0]);

    // Area generator
    const area = d3.area<typeof parsedData[0]>()
      .x(d => xScale(d.date))
      .y0(innerHeight)
      .y1(d => yScale(d.value))
      .curve(d3.curveMonotoneX);

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main group
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add gradient
    const gradient = svg.append('defs').append('linearGradient')
      .attr('id', 'area-gradient')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .style('stop-color', color)
      .style('stop-opacity', opacity);

    gradient.append('stop')
      .attr('offset', '100%')
      .style('stop-color', color)
      .style('stop-opacity', 0.1);

    // Add grid if enabled
    if (showGrid) {
      // Horizontal grid lines
      g.append('g')
        .attr('class', 'grid')
        .attr('stroke', chartColors.gray)
        .attr('stroke-opacity', 0.1)
        .call(
          d3.axisLeft(yScale)
            .tickSize(-innerWidth)
            .tickFormat(() => '')
        );

      // Vertical grid lines
      g.append('g')
        .attr('class', 'grid')
        .attr('stroke', chartColors.gray)
        .attr('stroke-opacity', 0.1)
        .attr('transform', `translate(0,${innerHeight})`)
        .call(
          d3.axisBottom(xScale)
            .tickSize(-innerHeight)
            .tickFormat(() => '')
        );
    }

    // Add area path
    const areaPath = g.append('path')
      .datum(parsedData)
      .attr('fill', 'url(#area-gradient)')
      .attr('d', area);

    // Animate area
    if (animate) {
      const areaLength = areaPath.node()?.getTotalLength() || 0;
      areaPath
        .attr('stroke-dasharray', areaLength)
        .attr('stroke-dashoffset', areaLength)
        .transition()
        .duration(chartAnimations.chartLoad)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }

    // Add line if enabled
    if (showLine) {
      const line = d3.line<typeof parsedData[0]>()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(parsedData)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('d', line);
    }

    // Add X axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .style('font-family', chartFonts.family)
      .style('font-size', `${chartFonts.sizes.axis}px`)
      .style('color', chartColors.text.secondary);

    // Add X axis label
    if (xAxisLabel) {
      g.append('text')
        .attr('x', innerWidth / 2)
        .attr('y', innerHeight + 40)
        .attr('text-anchor', 'middle')
        .style('font-size', `${chartFonts.sizes.label}px`)
        .style('fill', chartColors.text.secondary)
        .text(xAxisLabel);
    }

    // Add Y axis
    g.append('g')
      .call(d3.axisLeft(yScale))
      .style('font-family', chartFonts.family)
      .style('font-size', `${chartFonts.sizes.axis}px`)
      .style('color', chartColors.text.secondary);

    // Add Y axis label
    if (yAxisLabel) {
      g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -innerHeight / 2)
        .attr('y', -40)
        .attr('text-anchor', 'middle')
        .style('font-size', `${chartFonts.sizes.label}px`)
        .style('fill', chartColors.text.secondary)
        .text(yAxisLabel);
    }

    // Add hover tooltip area
    const hoverArea = g.append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mousemove', function (event) {
        if (!showTooltip) return;

        const x = xScale.invert(d3.pointer(event, this)[0]);
        const bisect = d3.bisector((d: typeof parsedData[0]) => d.date).left;
        const index = bisect(parsedData, x, 1);
        const d = parsedData[index];

        if (d) {
          setTooltip({
            x: formatDate(d.date),
            y: d.value,
            label: d.label,
          });
          setTooltipPos({
            x: event.clientX - 50,
            y: event.clientY - 60,
          });
        }
      })
      .on('mouseout', () => {
        setTooltip(null);
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
  }, [
    data,
    width,
    height,
    margin,
    color,
    stacked,
    opacity,
    showLine,
    showLegend,
    showTooltip,
    showGrid,
    animate,
    title,
    xAxisLabel,
    yAxisLabel,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex justify-center ${className}`}
      style={{ minHeight: height }}
    >
      <svg ref={svgRef} style={{ overflow: 'visible' }} />

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
            {tooltip.label || 'Value'}: {formatNumber(tooltip.y)}
          </div>
        </div>
      )}
    </div>
  );
}

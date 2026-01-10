'use client';

/**
 * D3 Line Chart Component
 *
 * Renders an interactive time-series line chart with tooltips
 * Supports smooth curves, animated transitions, and responsive sizing
 *
 * Usage:
 * ```tsx
 * <LineChart
 *   data={[
 *     { date: '2024-01-01', value: 100 },
 *     { date: '2024-01-02', value: 120 },
 *   ]}
 *   title="Response Times"
 *   color="#0047FF"
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { LineChartProps, TimeSeriesPoint, TooltipData } from '@/lib/charts/chart-types';
import {
  chartColors,
  chartMargins,
  chartAnimations,
  chartFonts,
} from '@/lib/charts/chart-config';
import {
  formatDate,
  formatDateTime,
  formatNumber,
  getResponsiveWidth,
  getResponsiveHeight,
} from '@/lib/charts/chart-utils';

export function LineChart({
  data,
  width: defaultWidth = 800,
  height: defaultHeight = 300,
  margin = chartMargins.medium,
  title,
  color = chartColors.primary,
  curve = 'monotone',
  showDots = true,
  dotSize = 4,
  strokeWidth = 2,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  animate = true,
  xAxisLabel,
  yAxisLabel,
  onDataPointClick,
  className = '',
}: LineChartProps) {
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

    // Line generator
    const getCurveFunction = () => {
      switch (curve) {
        case 'linear':
          return d3.curveLinear;
        case 'natural':
          return d3.curveNatural;
        case 'step':
          return d3.curveStep;
        default:
          return d3.curveMonotoneX;
      }
    };

    const line = d3.line<typeof parsedData[0]>()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(getCurveFunction());

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main group
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

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

    // Add line path
    const path = g.append('path')
      .datum(parsedData)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', strokeWidth)
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('d', line);

    // Animate line drawing
    if (animate) {
      const pathLength = path.node()?.getTotalLength() || 0;
      path
        .attr('stroke-dasharray', pathLength)
        .attr('stroke-dashoffset', pathLength)
        .transition()
        .duration(chartAnimations.chartLoad)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }

    // Add dots
    if (showDots) {
      g.selectAll('.dot')
        .data(parsedData)
        .join('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.date))
        .attr('cy', d => yScale(d.value))
        .attr('r', 0)
        .attr('fill', color)
        .attr('opacity', 0.8)
        .on('mouseover', function (event, d) {
          if (showTooltip) {
            d3.select(this)
              .transition()
              .duration(chartAnimations.hover)
              .attr('r', dotSize * 2);

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
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(chartAnimations.hover)
            .attr('r', dotSize);
          setTooltip(null);
        })
        .on('click', (event, d) => {
          if (onDataPointClick) {
            onDataPointClick(d);
          }
        })
        .transition()
        .duration(animate ? chartAnimations.chartLoad : 0)
        .delay((_, i) => (animate ? (i / parsedData.length) * 200 : 0))
        .attr('r', dotSize);
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
    margin,
    color,
    curve,
    showDots,
    dotSize,
    strokeWidth,
    showLegend,
    showTooltip,
    showGrid,
    animate,
    title,
    xAxisLabel,
    yAxisLabel,
    onDataPointClick,
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

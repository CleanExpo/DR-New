'use client';

/**
 * D3 Bar Chart Component
 *
 * Renders an interactive bar chart for categorical data
 * Supports horizontal/vertical orientation, stacked bars, and custom colors
 *
 * Usage:
 * ```tsx
 * <BarChart
 *   data={[
 *     { category: 'Sydney', value: 250 },
 *     { category: 'Melbourne', value: 180 },
 *   ]}
 *   title="Jobs by Region"
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { BarChartProps, CategoryPoint, TooltipData } from '@/lib/charts/chart-types';
import {
  chartColors,
  chartMargins,
  chartAnimations,
  chartFonts,
} from '@/lib/charts/chart-config';
import {
  formatNumber,
  getResponsiveWidth,
  getResponsiveHeight,
} from '@/lib/charts/chart-utils';

export function BarChart({
  data,
  width: defaultWidth = 800,
  height: defaultHeight = 300,
  margin = chartMargins.medium,
  title,
  color = chartColors.primary,
  orientation = 'vertical',
  showValue = true,
  showLegend = false,
  showTooltip = true,
  showGrid = true,
  animate = true,
  xAxisLabel,
  yAxisLabel,
  onBarClick,
  className = '',
}: BarChartProps) {
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

    // Create scales
    const categories = data.map(d => d.category);
    const maxValue = Math.max(...data.map(d => d.value));

    const isHorizontal = orientation === 'horizontal';

    const xScale = isHorizontal
      ? d3.scaleLinear().domain([0, maxValue * 1.1]).range([0, innerWidth])
      : d3.scaleBand()
          .domain(categories)
          .range([0, innerWidth])
          .padding(0.2);

    const yScale = isHorizontal
      ? d3.scaleBand()
          .domain(categories)
          .range([0, innerHeight])
          .padding(0.2)
      : d3.scaleLinear().domain([0, maxValue * 1.1]).range([innerHeight, 0]);

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
      if (isHorizontal) {
        // Vertical grid for horizontal bars
        g.append('g')
          .attr('class', 'grid')
          .attr('stroke', chartColors.gray)
          .attr('stroke-opacity', 0.1)
          .call(
            d3.axisBottom(xScale as d3.ScaleLinear<number, number>)
              .tickSize(innerHeight)
              .tickFormat(() => '')
          );
      } else {
        // Horizontal grid for vertical bars
        g.append('g')
          .attr('class', 'grid')
          .attr('stroke', chartColors.gray)
          .attr('stroke-opacity', 0.1)
          .call(
            d3.axisLeft(yScale as d3.ScaleLinear<number, number>)
              .tickSize(-innerWidth)
              .tickFormat(() => '')
          );
      }
    }

    // Add bars
    const barColor = Array.isArray(color) ? color[0] : color;
    let barSelection;

    if (isHorizontal) {
      barSelection = g
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('y', d => (yScale as d3.ScaleBand<string>)(d.category))
        .attr('x', 0)
        .attr('height', (yScale as d3.ScaleBand<string>).bandwidth())
        .attr('width', 0)
        .attr('fill', barColor)
        .attr('opacity', 0.8);
    } else {
      barSelection = g
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', d => (xScale as d3.ScaleBand<string>)(d.category))
        .attr('y', innerHeight)
        .attr('width', (xScale as d3.ScaleBand<string>).bandwidth())
        .attr('height', 0)
        .attr('fill', barColor)
        .attr('opacity', 0.8);
    }

    // Add hover effects
    barSelection
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(chartAnimations.hover)
          .attr('opacity', 1);

        if (showTooltip) {
          setTooltip({
            x: d.category,
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
          .attr('opacity', 0.8);
        setTooltip(null);
      })
      .on('click', (event, d) => {
        if (onBarClick) {
          onBarClick(d);
        }
      });

    // Animate bars
    if (isHorizontal) {
      barSelection
        .transition()
        .duration(animate ? chartAnimations.chartLoad : 0)
        .delay((_, i) => (animate ? (i / data.length) * 200 : 0))
        .attr('width', d => (xScale as d3.ScaleLinear<number, number>)(d.value));
    } else {
      barSelection
        .transition()
        .duration(animate ? chartAnimations.chartLoad : 0)
        .delay((_, i) => (animate ? (i / data.length) * 200 : 0))
        .attr('y', d => (yScale as d3.ScaleLinear<number, number>)(d.value))
        .attr('height', d => innerHeight - (yScale as d3.ScaleLinear<number, number>)(d.value));
    }

    // Add value labels
    if (showValue) {
      if (isHorizontal) {
        g.selectAll('.bar-label')
          .data(data)
          .join('text')
          .attr('class', 'bar-label')
          .attr('x', d => (xScale as d3.ScaleLinear<number, number>)(d.value) + 5)
          .attr('y', d => ((yScale as d3.ScaleBand<string>)(d.category) || 0) + (yScale as d3.ScaleBand<string>).bandwidth() / 2)
          .attr('text-anchor', 'start')
          .attr('dominant-baseline', 'middle')
          .style('font-size', `${chartFonts.sizes.label}px`)
          .style('fill', chartColors.text.primary)
          .text(d => formatNumber(d.value));
      } else {
        g.selectAll('.bar-label')
          .data(data)
          .join('text')
          .attr('class', 'bar-label')
          .attr('x', d => ((xScale as d3.ScaleBand<string>)(d.category) || 0) + (xScale as d3.ScaleBand<string>).bandwidth() / 2)
          .attr('y', d => (yScale as d3.ScaleLinear<number, number>)(d.value) - 5)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'bottom')
          .style('font-size', `${chartFonts.sizes.label}px`)
          .style('fill', chartColors.text.primary)
          .style('font-weight', chartFonts.weight.semibold)
          .text(d => formatNumber(d.value));
      }
    }

    // Add axes
    if (isHorizontal) {
      g.append('g')
        .call(d3.axisLeft(yScale as d3.ScaleBand<string>))
        .style('font-family', chartFonts.family)
        .style('font-size', `${chartFonts.sizes.axis}px`);

      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale as d3.ScaleLinear<number, number>))
        .style('font-family', chartFonts.family)
        .style('font-size', `${chartFonts.sizes.axis}px`);
    } else {
      g.append('g')
        .call(d3.axisLeft(yScale as d3.ScaleLinear<number, number>))
        .style('font-family', chartFonts.family)
        .style('font-size', `${chartFonts.sizes.axis}px`);

      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale as d3.ScaleBand<string>))
        .style('font-family', chartFonts.family)
        .style('font-size', `${chartFonts.sizes.axis}px`);
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
    orientation,
    showValue,
    showLegend,
    showTooltip,
    showGrid,
    animate,
    title,
    xAxisLabel,
    yAxisLabel,
    onBarClick,
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

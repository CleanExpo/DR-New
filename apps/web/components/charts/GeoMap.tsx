'use client';

/**
 * D3 Geographic Map Component
 *
 * Renders an interactive geographic visualization with D3
 * Shows Australia map with contractor locations or heatmap
 *
 * Usage:
 * ```tsx
 * <GeoMap
 *   data={[
 *     { coordinates: [-33.8688, 151.2093], value: 150, label: 'Sydney' },
 *     { coordinates: [-37.8136, 144.9631], value: 120, label: 'Melbourne' },
 *   ]}
 *   title="Contractor Coverage Map"
 * />
 * ```
 */

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { GeoMapProps, TooltipData } from '@/lib/charts/chart-types';
import {
  chartColors,
  chartAnimations,
  chartFonts,
} from '@/lib/charts/chart-config';
import { formatNumber } from '@/lib/charts/chart-utils';

export function GeoMap({
  data,
  width = 800,
  height = 500,
  title,
  mapType = 'australia',
  showLegend = true,
  showTooltip = true,
  animate = true,
  onPointClick,
  className = '',
}: GeoMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [australiaGeoData, setAustraliaGeoData] = useState<any>(null);

  // Load Australia GeoJSON data
  useEffect(() => {
    // Simple Australia GeoJSON boundary (simplified for performance)
    const geoData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [113.3, -43.6],
              [154, -43.6],
              [154, -9.2],
              [113.3, -9.2],
              [113.3, -43.6],
            ]],
          },
          properties: { name: 'Australia' },
        },
      ],
    };
    setAustraliaGeoData(geoData);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !australiaGeoData) return;

    // Create projection
    const projection = d3.geoMercator()
      .fitExtent(
        [[20, 20], [width - 20, height - 20]],
        australiaGeoData
      );

    const pathGenerator = d3.geoPath().projection(projection);

    // Color scale for values
    const colorScale = d3.scaleLinear<string>()
      .domain([
        Math.min(...data.map(d => d.value)),
        Math.max(...data.map(d => d.value)),
      ])
      .range([chartColors.contractor, chartColors.emergency])
      .clamp(true);

    // Clear previous content
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Create main group
    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g');

    // Draw map background
    g.selectAll('path')
      .data(australiaGeoData.features)
      .join('path')
      .attr('d', pathGenerator as any)
      .attr('fill', chartColors.background.light)
      .attr('stroke', chartColors.gray)
      .attr('stroke-width', 1)
      .attr('opacity', 0.5);

    // Draw graticule (grid lines)
    const graticule = d3.geoGraticule();
    g.append('path')
      .datum(graticule)
      .attr('d', pathGenerator as any)
      .attr('fill', 'none')
      .attr('stroke', chartColors.gray)
      .attr('stroke-opacity', 0.1)
      .attr('stroke-width', 0.5);

    // Add data points
    const circles = g
      .selectAll('.point')
      .data(data)
      .join('circle')
      .attr('class', 'point')
      .attr('cx', d => {
        const coords = projection(d.coordinates.reverse());
        return coords ? coords[0] : 0;
      })
      .attr('cy', d => {
        const coords = projection(d.coordinates);
        return coords ? coords[1] : 0;
      })
      .attr('r', d => Math.sqrt(d.value) / 5)
      .attr('fill', d => colorScale(d.value))
      .attr('opacity', 0);

    // Add hover effects
    circles
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(chartAnimations.hover)
          .attr('opacity', 1)
          .attr('r', d => Math.sqrt(d.value) / 5 + 3);

        if (showTooltip) {
          setTooltip({
            x: d.label || 'Location',
            y: d.value,
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
          .attr('opacity', 0.7)
          .attr('r', d => Math.sqrt(d.value) / 5);
        setTooltip(null);
      })
      .on('click', (event, d) => {
        if (onPointClick) {
          onPointClick(d);
        }
      });

    // Animate circles
    if (animate) {
      circles
        .transition()
        .duration(chartAnimations.chartLoad)
        .delay((_, i) => (i / data.length) * 300)
        .attr('opacity', 0.7);
    } else {
      circles.attr('opacity', 0.7);
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

    // Add legend
    if (showLegend) {
      const legendData = [
        { value: Math.min(...data.map(d => d.value)), label: 'Low' },
        { value: Math.max(...data.map(d => d.value)), label: 'High' },
      ];

      const legend = svg.append('g')
        .attr('transform', `translate(${width - 150}, 50)`);

      legend.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .style('font-size', `${chartFonts.sizes.label}px`)
        .style('font-weight', chartFonts.weight.semibold)
        .style('fill', chartColors.text.primary)
        .text('Value Range');

      legendData.forEach((item, i) => {
        const y = 25 + i * 25;
        legend.append('circle')
          .attr('cx', 10)
          .attr('cy', y)
          .attr('r', 5)
          .attr('fill', colorScale(item.value));

        legend.append('text')
          .attr('x', 25)
          .attr('y', y + 4)
          .style('font-size', `${chartFonts.sizes.label}px`)
          .style('fill', chartColors.text.secondary)
          .text(`${item.label}: ${formatNumber(item.value)}`);
      });
    }
  }, [
    data,
    width,
    height,
    title,
    mapType,
    showLegend,
    showTooltip,
    animate,
    australiaGeoData,
    onPointClick,
  ]);

  return (
    <div className={`relative flex justify-center ${className}`}>
      <svg ref={svgRef} style={{ maxWidth: '100%', height: 'auto' }} />

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
        </div>
      )}
    </div>
  );
}

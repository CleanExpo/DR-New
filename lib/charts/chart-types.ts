/**
 * Chart TypeScript Interfaces
 *
 * Centralized types for all D3 chart components
 */

/**
 * Basic data point with x and y values
 */
export interface ChartDataPoint {
  x: number | string | Date;
  y: number;
}

/**
 * Time-series data point
 */
export interface TimeSeriesPoint {
  date: Date | string;
  value: number;
  label?: string;
}

/**
 * Category-based data point
 */
export interface CategoryPoint {
  category: string;
  value: number;
  label?: string;
}

/**
 * Multi-series data for comparing multiple lines/bars
 */
export interface MultiSeriesPoint {
  label: string;
  [key: string]: number | string;  // Multiple numeric values
}

/**
 * Pie/Donut chart data
 */
export interface PieData {
  name: string;
  value: number;
  color?: string;
  percentage?: number;
}

/**
 * Generic chart props
 */
export interface BaseChartProps {
  data: any[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  title?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  animate?: boolean;
  className?: string;
}

/**
 * Line chart props
 */
export interface LineChartProps extends BaseChartProps {
  data: TimeSeriesPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  color?: string;
  curve?: 'linear' | 'monotone' | 'natural' | 'step';
  showDots?: boolean;
  dotSize?: number;
  strokeWidth?: number;
  onDataPointClick?: (point: TimeSeriesPoint) => void;
}

/**
 * Bar chart props
 */
export interface BarChartProps extends BaseChartProps {
  data: CategoryPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  color?: string | string[];
  orientation?: 'vertical' | 'horizontal';
  showValue?: boolean;
  onBarClick?: (point: CategoryPoint) => void;
}

/**
 * Pie chart props
 */
export interface PieChartProps extends BaseChartProps {
  data: PieData[];
  innerRadius?: number;  // For donut charts
  showPercentage?: boolean;
  onSliceClick?: (slice: PieData) => void;
}

/**
 * Area chart props
 */
export interface AreaChartProps extends BaseChartProps {
  data: TimeSeriesPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  color?: string;
  stacked?: boolean;
  opacity?: number;
  showLine?: boolean;
}

/**
 * Geographic map props
 */
export interface GeoMapProps extends BaseChartProps {
  data: Array<{
    coordinates: [number, number];  // [lat, lng]
    value: number;
    label?: string;
    color?: string;
  }>;
  mapType?: 'australia' | 'world';
  onPointClick?: (point: any) => void;
}

/**
 * Chart legend item
 */
export interface LegendItem {
  label: string;
  color: string;
  active?: boolean;
}

/**
 * Chart tooltip content
 */
export interface TooltipData {
  x: string | number;
  y: number;
  label?: string;
  percentage?: number;
  color?: string;
}

/**
 * Chart axis configuration
 */
export interface AxisConfig {
  label?: string;
  format?: 'currency' | 'number' | 'percent' | 'date';
  showGrid?: boolean;
  showTicks?: boolean;
  tickCount?: number;
}

/**
 * Chart theme
 */
export interface ChartTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    grid: string;
    text: string;
    textSecondary: string;
    background: string;
  };
  fonts: {
    family: string;
    size: number;
    color: string;
  };
  animations: {
    duration: number;
    easing: string;
  };
}

/**
 * Sparkline props (mini chart)
 */
export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  showCurve?: boolean;
  showDots?: boolean;
  className?: string;
}

/**
 * Trend indicator (up/down/neutral)
 */
export interface TrendData {
  current: number;
  previous: number;
  label: string;
  unit?: string;
  format?: 'number' | 'currency' | 'percent';
}

/**
 * Animated number props
 */
export interface AnimatedNumberProps {
  value: number;
  format?: 'number' | 'currency' | 'percent';
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Chart event handlers
 */
export interface ChartEventHandlers {
  onHover?: (data: any) => void;
  onClick?: (data: any) => void;
  onZoom?: (scale: number) => void;
  onPan?: (offset: { x: number; y: number }) => void;
}

/**
 * Responsive chart container props
 */
export interface ResponsiveChartProps {
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area' | 'geo';
  title?: string;
  containerWidth?: number;
  [key: string]: any;  // Pass through other props
}

/**
 * Chart export options
 */
export interface ChartExportOptions {
  format: 'png' | 'svg' | 'csv';
  filename?: string;
  width?: number;
  height?: number;
  quality?: number;  // For PNG
}

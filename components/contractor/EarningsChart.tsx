"use client"

import { useMemo } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

interface EarningsChartProps {
  type?: "line" | "bar"
  months?: number
}

export function EarningsChart({ type = "bar", months = 6 }: EarningsChartProps) {
  const data = useMemo(() => {
    // Mock data - replace with actual API data
    return [
      { month: "Jun", earnings: 14200, jobs: 18 },
      { month: "Jul", earnings: 16800, jobs: 21 },
      { month: "Aug", earnings: 15500, jobs: 19 },
      { month: "Sep", earnings: 17200, jobs: 23 },
      { month: "Oct", earnings: 16100, jobs: 20 },
      { month: "Nov", earnings: 18500, jobs: 24 },
    ]
  }, [])

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border rounded-lg shadow-lg p-3">
          <p className="font-semibold">{payload[0].payload.month}</p>
          <p className="text-sm text-muted-foreground">
            Earnings: ${payload[0].value.toLocaleString("en-AU")}
          </p>
          <p className="text-sm text-muted-foreground">
            Jobs: {payload[0].payload.jobs}
          </p>
        </div>
      )
    }
    return null
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="month"
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            className="text-xs"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="earnings" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

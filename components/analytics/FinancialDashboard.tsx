'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from '@/components/charts/DynamicCharts'
import {
  DollarSign, TrendingUp, TrendingDown, CreditCard,
  Receipt, PiggyBank, Calculator, FileText
} from 'lucide-react'

export default function FinancialDashboard() {
  // Mock financial data
  const revenueData = [
    { month: 'Jan', revenue: 425000, expenses: 285000, profit: 140000, target: 450000 },
    { month: 'Feb', revenue: 480000, expenses: 310000, profit: 170000, target: 450000 },
    { month: 'Mar', revenue: 520000, expenses: 325000, profit: 195000, target: 475000 },
    { month: 'Apr', revenue: 495000, expenses: 305000, profit: 190000, target: 500000 },
    { month: 'May', revenue: 550000, expenses: 340000, profit: 210000, target: 525000 },
    { month: 'Jun', revenue: 580000, expenses: 355000, profit: 225000, target: 550000 },
  ]

  const cashFlow = [
    { week: 'Week 1', inflow: 125000, outflow: 85000, net: 40000 },
    { week: 'Week 2', inflow: 145000, outflow: 92000, net: 53000 },
    { week: 'Week 3', inflow: 138000, outflow: 88000, net: 50000 },
    { week: 'Week 4', inflow: 152000, outflow: 95000, net: 57000 },
  ]

  const revenueByService = [
    { service: 'Water Damage', revenue: 185000, percentage: 35, margin: 42 },
    { service: 'Fire Restoration', revenue: 132000, percentage: 25, margin: 38 },
    { service: 'Mould Remediation', revenue: 105000, percentage: 20, margin: 45 },
    { service: 'Storm Damage', revenue: 63000, percentage: 12, margin: 35 },
    { service: 'Biohazard', revenue: 42000, percentage: 8, margin: 48 },
  ]

  const outstandingInvoices = [
    { client: 'Insurance Co A', amount: 45000, daysOverdue: 15, status: 'pending' },
    { client: 'Property Group B', amount: 28000, daysOverdue: 7, status: 'pending' },
    { client: 'Commercial Client C', amount: 62000, daysOverdue: 0, status: 'current' },
    { client: 'Insurance Co D', amount: 38000, daysOverdue: 22, status: 'overdue' },
    { client: 'Residential Client E', amount: 8500, daysOverdue: 0, status: 'current' },
  ]

  const expenseBreakdown = [
    { category: 'Labor', amount: 125000, percentage: 35 },
    { category: 'Equipment', amount: 85000, percentage: 24 },
    { category: 'Materials', amount: 68000, percentage: 19 },
    { category: 'Marketing', amount: 42000, percentage: 12 },
    { category: 'Operations', amount: 35000, percentage: 10 },
  ]

  const financialKPIs = [
    { metric: 'Gross Margin', value: 42, target: 40, format: '%' },
    { metric: 'Net Margin', value: 18, target: 15, format: '%' },
    { metric: 'Current Ratio', value: 2.4, target: 2.0, format: 'x' },
    { metric: 'Debt-to-Equity', value: 0.3, target: 0.5, format: 'x' },
    { metric: 'ROI', value: 24, target: 20, format: '%' },
    { metric: 'CAC Payback', value: 3.2, target: 4, format: 'mo' },
  ]

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold">Financial Dashboard</h2>
        <p className="text-green-100 mt-2">
          Revenue tracking, profitability analysis, and financial health
        </p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(580000)}</p>
              <p className="text-sm text-green-600 mt-1">↑ 5.5% vs target</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold">{formatCurrency(225000)}</p>
              <p className="text-sm text-green-600 mt-1">38.8% margin</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Outstanding AR</p>
              <p className="text-2xl font-bold">{formatCurrency(181500)}</p>
              <p className="text-sm text-yellow-600 mt-1">2 overdue</p>
            </div>
            <Receipt className="h-8 w-8 text-orange-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cash Balance</p>
              <p className="text-2xl font-bold">{formatCurrency(485000)}</p>
              <p className="text-sm text-green-600 mt-1">Healthy</p>
            </div>
            <PiggyBank className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Revenue & Profit Trend */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Revenue & Profit Trend (6 Months)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" fontSize={12} />
            <YAxis fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip formatter={(value: any) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={3} name="Profit" />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#F59E0B"
              strokeDasharray="5 5"
              name="Target"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      {/* Cash Flow & Service Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Cash Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cashFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
              <Legend />
              <Area
                type="monotone"
                dataKey="inflow"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stackId="2"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue by Service</h3>
          <div className="space-y-3">
            {revenueByService.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{service.service}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{formatCurrency(service.revenue)}</span>
                    <span className="text-xs text-gray-500">({service.margin}% margin)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Outstanding Invoices */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Outstanding Invoices</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Client</th>
                <th className="text-right py-2">Amount</th>
                <th className="text-center py-2">Days Overdue</th>
                <th className="text-center py-2">Status</th>
                <th className="text-center py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {outstandingInvoices.map((invoice, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3">{invoice.client}</td>
                  <td className="text-right font-medium">{formatCurrency(invoice.amount)}</td>
                  <td className="text-center">
                    {invoice.daysOverdue > 0 ? (
                      <span className="text-red-600 font-medium">{invoice.daysOverdue} days</span>
                    ) : (
                      <span className="text-green-600">Current</span>
                    )}
                  </td>
                  <td className="text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      invoice.status === 'overdue'
                        ? 'bg-red-100 text-red-700'
                        : invoice.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Send Reminder
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Expense Breakdown & KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {expenseBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Financial KPIs</h3>
          <div className="grid grid-cols-2 gap-4">
            {financialKPIs.map((kpi, index) => (
              <div key={index} className="border rounded-lg p-3">
                <p className="text-sm text-gray-600">{kpi.metric}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <p className="text-2xl font-bold">
                    {kpi.value}{kpi.format === '%' ? '%' : kpi.format === 'x' ? 'x' : ''}
                  </p>
                  {kpi.format === 'mo' && <span className="text-sm text-gray-600">months</span>}
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-gray-500">Target: {kpi.target}{kpi.format === '%' ? '%' : kpi.format === 'x' ? 'x' : ''}</span>
                  {kpi.value >= kpi.target ? (
                    <TrendingUp className="h-4 w-4 text-green-500 ml-auto" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 ml-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
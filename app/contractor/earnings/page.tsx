"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Download,
  Calendar,
  Filter,
} from "lucide-react"
import { EarningsChart } from "@/components/contractor/EarningsChart"
import Link from "next/link"

interface Invoice {
  id: string
  invoiceNumber: string
  jobReference: string
  jobTitle: string
  amount: number
  status: "PAID" | "PENDING" | "OVERDUE"
  issueDate: string
  dueDate: string
  paidDate?: string
}

interface EarningsSummary {
  totalYTD: number
  thisMonth: number
  lastMonth: number
  outstanding: number
  ytdChange: number
  monthChange: number
}

export default function EarningsPage() {
  const [summary, setSummary] = useState<EarningsSummary>({
    totalYTD: 0,
    thisMonth: 0,
    lastMonth: 0,
    outstanding: 0,
    ytdChange: 0,
    monthChange: 0,
  })
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [periodFilter, setPeriodFilter] = useState<string>("all")

  useEffect(() => {
    fetchEarningsData()
  }, [])

  useEffect(() => {
    let filtered = invoices

    if (statusFilter !== "all") {
      filtered = filtered.filter((inv) => inv.status === statusFilter)
    }

    if (periodFilter !== "all") {
      const now = new Date()
      filtered = filtered.filter((inv) => {
        const issueDate = new Date(inv.issueDate)
        if (periodFilter === "this_month") {
          return (
            issueDate.getMonth() === now.getMonth() &&
            issueDate.getFullYear() === now.getFullYear()
          )
        } else if (periodFilter === "last_month") {
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
          return (
            issueDate.getMonth() === lastMonth.getMonth() &&
            issueDate.getFullYear() === lastMonth.getFullYear()
          )
        } else if (periodFilter === "this_year") {
          return issueDate.getFullYear() === now.getFullYear()
        }
        return true
      })
    }

    setFilteredInvoices(filtered)
  }, [invoices, statusFilter, periodFilter])

  const fetchEarningsData = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API calls
      // const summaryResponse = await fetch('/api/financial/summary?contractorId=contractor-1')
      // const invoicesResponse = await fetch('/api/invoices?technicianId=contractor-1')

      // Mock data
      setSummary({
        totalYTD: 186500,
        thisMonth: 18500,
        lastMonth: 16100,
        outstanding: 4200,
        ytdChange: 15.2,
        monthChange: 14.9,
      })

      const mockInvoices: Invoice[] = [
        {
          id: "1",
          invoiceNumber: "INV-2025-0124",
          jobReference: "JOB-0521",
          jobTitle: "Water Damage - Kitchen Flood",
          amount: 1200,
          status: "PENDING",
          issueDate: "2025-11-04",
          dueDate: "2025-11-18",
        },
        {
          id: "2",
          invoiceNumber: "INV-2025-0123",
          jobReference: "JOB-0520",
          jobTitle: "Fire Restoration",
          amount: 3500,
          status: "PAID",
          issueDate: "2025-11-03",
          dueDate: "2025-11-17",
          paidDate: "2025-11-05",
        },
        {
          id: "3",
          invoiceNumber: "INV-2025-0122",
          jobReference: "JOB-0519",
          jobTitle: "Mould Remediation",
          amount: 850,
          status: "PAID",
          issueDate: "2025-11-02",
          dueDate: "2025-11-16",
          paidDate: "2025-11-04",
        },
        {
          id: "4",
          invoiceNumber: "INV-2025-0121",
          jobReference: "JOB-0518",
          jobTitle: "Storm Damage Assessment",
          amount: 650,
          status: "OVERDUE",
          issueDate: "2025-10-15",
          dueDate: "2025-10-29",
        },
        {
          id: "5",
          invoiceNumber: "INV-2025-0120",
          jobReference: "JOB-0517",
          jobTitle: "Water Extraction",
          amount: 1800,
          status: "PAID",
          issueDate: "2025-10-31",
          dueDate: "2025-11-14",
          paidDate: "2025-11-03",
        },
      ]

      setInvoices(mockInvoices)
      setFilteredInvoices(mockInvoices)
    } catch (error) {
      console.error("Failed to fetch earnings data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; label: string }> = {
      PAID: { color: "bg-green-100 text-green-800", label: "Paid" },
      PENDING: { color: "bg-amber-100 text-amber-800", label: "Pending" },
      OVERDUE: { color: "bg-red-100 text-red-800", label: "Overdue" },
    }
    const variant = variants[status] || variants.PENDING
    return <Badge className={variant.color}>{variant.label}</Badge>
  }

  const handleExport = (format: "csv" | "pdf") => {
    // TODO: Implement export functionality
    console.log(`Export as ${format}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <DollarSign className="h-8 w-8" />
            My Earnings
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your income and invoice payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total YTD</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${summary.totalYTD.toLocaleString("en-AU")}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{summary.ytdChange}%</span> from last year
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${summary.thisMonth.toLocaleString("en-AU")}
            </div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+{summary.monthChange}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${summary.lastMonth.toLocaleString("en-AU")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">October 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${summary.outstanding.toLocaleString("en-AU")}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {invoices.filter((i) => i.status !== "PAID").length} unpaid invoices
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Earnings Trend
          </CardTitle>
          <CardDescription>Monthly earnings for the last 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <EarningsChart type="bar" months={12} />
        </CardContent>
      </Card>

      {/* Invoices Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and manage your invoices</CardDescription>
            </div>
            <Button asChild>
              <Link href="/contractor/earnings/invoices">View All Invoices</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="OVERDUE">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="this_year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Invoices Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{invoice.jobTitle}</p>
                      <p className="text-sm text-muted-foreground">{invoice.jobReference}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ${invoice.amount.toLocaleString("en-AU")}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.issueDate).toLocaleDateString("en-AU")}
                  </TableCell>
                  <TableCell>
                    {new Date(invoice.dueDate).toLocaleDateString("en-AU")}
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    {invoice.paidDate
                      ? new Date(invoice.paidDate).toLocaleDateString("en-AU")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/contractor/earnings/invoices/${invoice.id}`}>
                        <FileText className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tax Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Summary</CardTitle>
          <CardDescription>Annual earnings breakdown for tax purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Income (YTD)</p>
              <p className="text-2xl font-bold">${summary.totalYTD.toLocaleString("en-AU")}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Est. GST Collected</p>
              <p className="text-2xl font-bold">
                ${Math.round(summary.totalYTD * 0.1).toLocaleString("en-AU")}
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Income Before Tax</p>
              <p className="text-2xl font-bold">
                ${Math.round(summary.totalYTD * 0.9).toLocaleString("en-AU")}
              </p>
            </div>
          </div>
          <Button variant="outline" className="mt-4">
            <Download className="h-4 w-4 mr-2" />
            Download Tax Report
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

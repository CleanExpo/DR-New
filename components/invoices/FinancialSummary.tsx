"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/currency";
import { DollarSignIcon, AlertTriangleIcon, CheckCircleIcon, CalendarIcon } from "lucide-react";

interface FinancialSummaryData {
  totalRevenue: number;
  outstandingInvoices: number;
  overdueAmount: number;
  paidThisMonth: number;
}

export function FinancialSummary() {
  const [data, setData] = useState<FinancialSummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const response = await fetch("/api/financial/summary");
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Failed to fetch financial summary:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-centre justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-4 bg-gray-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-32 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(data.totalRevenue),
      description: "This month",
      icon: DollarSignIcon,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Outstanding Invoices",
      value: formatCurrency(data.outstandingInvoices),
      description: "Awaiting payment",
      icon: CalendarIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Overdue Amount",
      value: formatCurrency(data.overdueAmount),
      description: "Requires action",
      icon: AlertTriangleIcon,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Paid This Month",
      value: formatCurrency(data.paidThisMonth),
      description: "Received",
      icon: CheckCircleIcon,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-centre justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <div className={`${card.bgColor} p-2 rounded-lg`}>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

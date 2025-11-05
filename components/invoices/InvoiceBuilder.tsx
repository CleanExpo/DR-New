"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, calculateGST, calculateTotalWithGST } from "@/lib/utils/currency";
import { PlusIcon, Trash2Icon } from "lucide-react";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface InvoiceBuilderProps {
  lineItems: LineItem[];
  onLineItemsChange: (items: LineItem[]) => void;
}

export function InvoiceBuilder({ lineItems, onLineItemsChange }: InvoiceBuilderProps) {
  const addLineItem = () => {
    const newItem: LineItem = {
      id: `item-${Date.now()}`,
      description: "",
      quantity: 1,
      unitPrice: 0,
    };
    onLineItemsChange([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    onLineItemsChange(lineItems.filter((item) => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    onLineItemsChange(
      lineItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateLineTotal = (item: LineItem) => {
    return item.quantity * item.unitPrice;
  };

  const subtotal = lineItems.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  const gst = calculateGST(subtotal);
  const total = calculateTotalWithGST(subtotal);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Line Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Line Items */}
        <div className="space-y-4">
          {lineItems.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 items-end p-4 border rounded-lg bg-muted/30"
            >
              <div className="col-span-12 md:col-span-5">
                <Label htmlFor={`desc-${item.id}`} className="text-xs">
                  Description
                </Label>
                <Textarea
                  id={`desc-${item.id}`}
                  value={item.description}
                  onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                  placeholder="Service or item description"
                  rows={2}
                  className="resize-none"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Label htmlFor={`qty-${item.id}`} className="text-xs">
                  Quantity
                </Label>
                <Input
                  id={`qty-${item.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(item.id, "quantity", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <Label htmlFor={`price-${item.id}`} className="text-xs">
                  Unit Price
                </Label>
                <Input
                  id={`price-${item.id}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.unitPrice}
                  onChange={(e) =>
                    updateLineItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)
                  }
                />
              </div>
              <div className="col-span-3 md:col-span-2">
                <Label className="text-xs">Total</Label>
                <div className="h-9 flex items-centre font-semibold">
                  {formatCurrency(calculateLineTotal(item))}
                </div>
              </div>
              <div className="col-span-1 md:col-span-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLineItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  disabled={lineItems.length === 1}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Line Item Button */}
        <Button
          type="button"
          variant="outline"
          onClick={addLineItem}
          className="w-full"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Line Item
        </Button>

        {/* Totals Summary */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">GST (10%):</span>
            <span className="font-medium">{formatCurrency(gst)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total (AUD):</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

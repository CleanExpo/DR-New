'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export type DateRangePreset = 'last7days' | 'last30days' | 'last90days' | 'year' | 'custom';

interface DateRange {
  from: Date;
  to: Date;
}

interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  presets?: boolean;
  className?: string;
}

const presetOptions: { label: string; value: DateRangePreset; getDates: () => DateRange }[] = [
  {
    label: 'Last 7 days',
    value: 'last7days',
    getDates: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 7);
      return { from, to };
    },
  },
  {
    label: 'Last 30 days',
    value: 'last30days',
    getDates: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 30);
      return { from, to };
    },
  },
  {
    label: 'Last 90 days',
    value: 'last90days',
    getDates: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 90);
      return { from, to };
    },
  },
  {
    label: 'This Year',
    value: 'year',
    getDates: () => {
      const now = new Date();
      const from = new Date(now.getFullYear(), 0, 1);
      const to = new Date();
      return { from, to };
    },
  },
];

export function DateRangePicker({
  value,
  onChange,
  presets = true,
  className = '',
}: DateRangePickerProps) {
  const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>('last30days');
  const [customRange, setCustomRange] = useState<DateRange | undefined>(value);
  const [isOpen, setIsOpen] = useState(false);

  const handlePresetClick = (preset: DateRangePreset) => {
    setSelectedPreset(preset);
    const option = presetOptions.find(p => p.value === preset);
    if (option) {
      const range = option.getDates();
      setCustomRange(range);
      onChange?.(range);
    }
  };

  const handleCustomSelect = (range: any) => {
    if (range?.from && range?.to) {
      const dateRange = { from: range.from, to: range.to };
      setCustomRange(dateRange);
      setSelectedPreset('custom');
      onChange?.(dateRange);
    }
  };

  const displayValue = customRange
    ? `${format(customRange.from, 'dd/MM/yyyy')} - ${format(customRange.to, 'dd/MM/yyyy')}`
    : 'Select date range';

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {presets && (
        <div className="flex flex-wrap gap-2">
          {presetOptions.map((preset) => (
            <Button
              key={preset.value}
              variant={selectedPreset === preset.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePresetClick(preset.value)}
              className="text-xs"
            >
              {preset.label}
            </Button>
          ))}
        </div>
      )}

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={customRange?.from}
            selected={customRange}
            onSelect={handleCustomSelect}
            numberOfMonths={2}
            className="rounded-md border"
          />
          <div className="p-3 border-t">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              size="sm"
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

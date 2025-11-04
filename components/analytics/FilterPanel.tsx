'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, FilterIcon, DownloadIcon } from 'lucide-react';
import { DateRangePicker } from './DateRangePicker';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  contractors?: FilterOption[];
  serviceTypes?: FilterOption[];
  statuses?: FilterOption[];
}

interface FilterValues {
  contractors: string[];
  serviceTypes: string[];
  statuses: string[];
  dateRange?: { from: Date; to: Date };
}

interface FilterPanelProps {
  config: FilterConfig;
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onExport?: () => void;
  loading?: boolean;
}

export function FilterPanel({
  config,
  values,
  onChange,
  onExport,
  loading = false,
}: FilterPanelProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleMultiSelectToggle = (
    category: keyof FilterValues,
    value: string
  ) => {
    const currentValues = values[category] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];

    onChange({
      ...values,
      [category]: newValues,
    });
  };

  const handleRemoveFilter = (category: keyof FilterValues, value: string) => {
    const currentValues = values[category] as string[];
    onChange({
      ...values,
      [category]: currentValues.filter(v => v !== value),
    });
  };

  const handleReset = () => {
    onChange({
      contractors: [],
      serviceTypes: [],
      statuses: [],
      dateRange: undefined,
    });
  };

  const getActiveFilterCount = () => {
    return (
      values.contractors.length +
      values.serviceTypes.length +
      values.statuses.length +
      (values.dateRange ? 1 : 0)
    );
  };

  const activeCount = getActiveFilterCount();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-semibold">Filters</CardTitle>
            {activeCount > 0 && (
              <Badge variant="secondary" className="rounded-full">
                {activeCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                disabled={loading}
              >
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterIcon className="h-4 w-4 mr-2" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </div>
      </CardHeader>

      {showFilters && (
        <CardContent className="space-y-4">
          {/* Date Range */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Date Range
            </label>
            <DateRangePicker
              value={values.dateRange}
              onChange={(range) => onChange({ ...values, dateRange: range })}
            />
          </div>

          {/* Contractor Filter */}
          {config.contractors && config.contractors.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Contractors
              </label>
              <Select
                onValueChange={(value) => handleMultiSelectToggle('contractors', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contractors" />
                </SelectTrigger>
                <SelectContent>
                  {config.contractors.map((contractor) => (
                    <SelectItem
                      key={contractor.value}
                      value={contractor.value}
                    >
                      {contractor.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {values.contractors.map((contractorId) => {
                  const contractor = config.contractors?.find(
                    c => c.value === contractorId
                  );
                  return (
                    <Badge
                      key={contractorId}
                      variant="secondary"
                      className="gap-1"
                    >
                      {contractor?.label}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveFilter('contractors', contractorId)}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Service Type Filter */}
          {config.serviceTypes && config.serviceTypes.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Service Types
              </label>
              <Select
                onValueChange={(value) => handleMultiSelectToggle('serviceTypes', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service types" />
                </SelectTrigger>
                <SelectContent>
                  {config.serviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {values.serviceTypes.map((typeId) => {
                  const type = config.serviceTypes?.find(
                    t => t.value === typeId
                  );
                  return (
                    <Badge
                      key={typeId}
                      variant="secondary"
                      className="gap-1"
                    >
                      {type?.label}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveFilter('serviceTypes', typeId)}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Status Filter */}
          {config.statuses && config.statuses.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Status
              </label>
              <Select
                onValueChange={(value) => handleMultiSelectToggle('statuses', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select statuses" />
                </SelectTrigger>
                <SelectContent>
                  {config.statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {values.statuses.map((statusId) => {
                  const status = config.statuses?.find(
                    s => s.value === statusId
                  );
                  return (
                    <Badge
                      key={statusId}
                      variant="secondary"
                      className="gap-1"
                    >
                      {status?.label}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveFilter('statuses', statusId)}
                      />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={activeCount === 0 || loading}
              className="flex-1"
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

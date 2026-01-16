/**
 * Comparison Table Component
 * Optimises content for featured snippet tables
 * Uses Table schema for structured data
 */

import { Table } from 'schema-dts';

interface TableColumn {
  header: string;
  key: string;
  sortable?: boolean;
}

interface TableRow {
  [key: string]: string | number;
}

interface ComparisonTableProps {
  title?: string;
  description?: string;
  columns: TableColumn[];
  rows: TableRow[];
  caption?: string;
  compareItems?: string[]; // For comparison tables (e.g., "Certified vs Uncertified")
}

/**
 * Comparison Table Component
 */
export function ComparisonTable({
  title,
  description,
  columns,
  rows,
  caption,
  compareItems
}: ComparisonTableProps) {
  return (
    <>
      <section className="comparison-table my-12">
        {title && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            {description && (
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto border border-gray-300 rounded-lg">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                {columns.map((column, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-semibold border-b border-indigo-600"
                  >
                    <div className="flex items-center gap-2">
                      <span>{column.header}</span>
                      {column.sortable && (
                        <span className="text-xs opacity-75">↕</span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className="px-4 py-3 border-b border-gray-300 text-gray-800"
                    >
                      {/* Format values */}
                      {formatTableValue(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Caption */}
        {caption && (
          <p className="text-sm text-gray-600 italic mt-3">
            {caption}
          </p>
        )}

        {/* Comparison Legend (for comparison tables) */}
        {compareItems && compareItems.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {compareItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                <span className="w-3 h-3 rounded-full" style={{
                  backgroundColor: i === 0 ? '#10b981' : '#ef4444'
                }} />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

/**
 * Pricing Comparison Table (specialised)
 */
interface PricingRow {
  service: string;
  minPrice: number;
  maxPrice: number;
  description?: string;
  included?: string[];
}

interface PricingTableProps {
  title?: string;
  currency?: string;
  rows: PricingRow[];
}

export function PricingComparisonTable({
  title = 'Service Pricing',
  currency = '$',
  rows
}: PricingTableProps) {
  return (
    <section className="pricing-table my-12">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
      )}

      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-4 py-3 text-left font-semibold">Service</th>
              <th className="px-4 py-3 text-center font-semibold">Price Range</th>
              <th className="px-4 py-3 text-left font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 border-b border-gray-300 font-semibold text-gray-900">
                  {row.service}
                </td>
                <td className="px-4 py-3 border-b border-gray-300 text-center text-lg font-bold text-indigo-600">
                  {currency}{row.minPrice.toLocaleString()} – {currency}{row.maxPrice.toLocaleString()}
                </td>
                <td className="px-4 py-3 border-b border-gray-300 text-gray-700">
                  {row.description && <p className="mb-2">{row.description}</p>}
                  {row.included && row.included.length > 0 && (
                    <ul className="text-sm space-y-1">
                      {row.included.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p className="text-sm text-gray-600 mt-4">
        💡 Prices shown are estimates. Final costs depend on specific damage assessment. Contact us for detailed quote.
      </p>
    </section>
  );
}

/**
 * Format table cell values
 */
function formatTableValue(value: string | number): React.ReactNode {
  if (typeof value === 'number') {
    return value.toLocaleString();
  }

  if (value === 'Yes' || value === 'yes' || value === '✓') {
    return <span className="text-green-600 font-semibold">✓ Yes</span>;
  }

  if (value === 'No' || value === 'no' || value === '✗') {
    return <span className="text-red-600 font-semibold">✗ No</span>;
  }

  return value;
}

import React from 'react';

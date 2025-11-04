/**
 * InvoiceBuilder Component Tests - GST Calculations
 */

import { render } from '@testing-library/react';
import { createMockInvoice, calculateInvoiceTotals } from '../../factories/invoice.factory';

describe('InvoiceBuilder Component', () => {
  describe('GST Calculations (Australian 10%)', () => {
    it('should calculate GST correctly', () => {
      const lineItems = [{ subtotal: 1000, gstAmount: 0, total: 0 }];
      const totals = calculateInvoiceTotals(lineItems);
      
      expect(totals.subtotal).toBe(1000);
      expect(totals.gstAmount).toBe(100);
      expect(totals.total).toBe(1100);
    });
  });
});

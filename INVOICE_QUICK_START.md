# Invoice Management System - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Verify Installation (30 seconds)
```bash
cd "D:\DR New"
npm install  # If not already done
```

### Step 2: Start Development Server (10 seconds)
```bash
npm run dev
```

### Step 3: Open Invoice System (5 seconds)
Navigate to: http://localhost:3000/invoices

### Step 4: Verify Components (1 minute)
✅ Financial summary cards visible
✅ Search and filter section present
✅ Table or "No invoices" message
✅ "Create Invoice" button visible

### Step 5: Test Create Invoice (2 minutes)
1. Click "Create Invoice"
2. Fill in:
   - Client Name: "Test Client"
   - Client Email: "test@example.com"
3. In Line Items:
   - Description: "Test Service"
   - Quantity: 1
   - Unit Price: 1000
4. Verify totals calculate:
   - Subtotal: $1,000.00
   - GST (10%): $100.00
   - Total: $1,100.00
5. Click "Save as Draft"

## ✅ Success Indicators

You'll know it's working when:
- No console errors
- Financial cards show "$0.00" or data
- Forms are responsive
- Calculations update automatically
- Modals open smoothly
- Toast notifications appear

## 📁 Project Structure Quick Reference

```
app/invoices/
├── page.tsx                 # Invoice list
├── new/page.tsx             # Create form
└── [id]/
    ├── page.tsx             # Details view
    └── edit/page.tsx        # Edit form

components/invoices/
├── InvoiceStatusBadge.tsx   # Status badges
├── InvoiceBuilder.tsx       # Line items
├── FinancialSummary.tsx     # Dashboard
├── PaymentModal.tsx         # Payments
├── RefundModal.tsx          # Refunds
└── SendInvoiceButton.tsx    # Email
```

## 🔌 API Endpoints Required

Ensure these are available:
```
GET    /api/invoices
POST   /api/invoices
GET    /api/invoices/[id]
PUT    /api/invoices/[id]
DELETE /api/invoices/[id]
POST   /api/invoices/[id]/payments
GET    /api/invoices/[id]/payments
POST   /api/invoices/[id]/send
POST   /api/invoices/[id]/refund
GET    /api/financial/summary
```

## 🐛 Quick Troubleshooting

### Issue: Page won't load
**Fix**: Check console, verify API endpoints exist

### Issue: Styles broken
**Fix**: Run `npm run dev` again, clear cache

### Issue: Components not showing
**Fix**: Check imports, verify file paths

### Issue: API errors
**Fix**: Verify NEXT_PUBLIC_SITE_URL in .env.local

## 📚 Next Steps

1. **Read Full Docs**: `docs/INVOICE_MANAGEMENT_SYSTEM.md`
2. **Integration Guide**: `docs/INVOICE_INTEGRATION_GUIDE.md`
3. **Architecture**: `INVOICE_SYSTEM_ARCHITECTURE.md`
4. **Checklist**: `INVOICE_IMPLEMENTATION_CHECKLIST.md`

## 🎯 Quick Test Checklist

- [ ] Invoice list loads
- [ ] Can create invoice
- [ ] Calculations work
- [ ] Modals open
- [ ] Status badges show
- [ ] Responsive on mobile
- [ ] Print preview works

## 💡 Pro Tips

1. Use Chrome DevTools (F12) to debug
2. Check Network tab for API calls
3. Use React DevTools for component inspection
4. Test on mobile with browser DevTools
5. Print preview with Ctrl+P

## 🆘 Need Help?

Check in this order:
1. Browser console errors
2. Network tab for failed requests
3. Environment variables (.env.local)
4. API endpoint responses
5. Documentation files

---

**Quick Start Time**: ~5 minutes
**Status**: ✅ Ready
**Last Updated**: November 2025

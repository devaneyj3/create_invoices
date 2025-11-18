# 🧾 Invoice & Company Management App

A full-stack application for creating and managing companies and generating downloadable PDF invoices.

---

## 🚀 Features

- Create and manage company profiles
- Generate invoices tied to companies
- Preview and download invoices as PDFs
- Uses React, Next.js App Router, and Server Actions

---

## 📦 How Companies Are Created

1. **Click "Add Company"** in the UI.
2. Fill out the company form — handled by:

   `components/CompanyForm/CompanyForm.jsx`

3. The form's submission is handled by the `addCompany()` function located in:

   `app/lib/actions.js` (line 90)

4. When you hit the `Add Company` button, the `createCompany` function is called from `context/companyContext.jsx`
5. `context/companyContext.jsx` calls `/api/companies` to save the data to the supabase database with the Prisma ORM
6. `/api/companies` returns data to `context/companyContext.jsx` to save the new company to the context for real time updates
---

## 🧾 How Invoices Are Created

1. Fill out the invoice form in the UI — handled by:

   `components/Form/Form.jsx`

2. Form values are passed to the `createInvoice()` function located in:

   `app/lib/actions.js` (line 8)

3. The invoice values are validated and merged with:

   - Selected company from: `context/companyContext.jsx`
   - Signed-in user from: `context/authContext.jsx`

   This combined data is then passed to:

   - `components/DownloadPdfButton/DownloadPdfButton.jsx`
   - `components/PDFPreview/PDFPreview.jsx`

4. **PDF Generation Flow**:
   - `makeInvoice()` in `DownloadPdfButton.jsx`:
     - Calls `createInvoice()` from `context/invoiceItemProvider.jsx` to save the new invoice to the context so that it can show up immediately in `components/PastInvoices/PastInvoices.jsx` 
     - Sends data to `/api/invoice/route.js` to create the invoice and save to the supabase database using prisma
     - Also calls `/api/generate-pdf` to generate the PDF file

5. `components/PDFPreview/PDFPreview.jsx`:
   - Takes form state from `Form.jsx`
   - Sends data to `/api/generate-pdf` as well

6. `/api/generate-pdf`:
   - Validates the data
   - Renders the invoice using:

     `components/InvoicePDF/InvoicePDF.jsx`

---
## Ar

---

## �� New Feature Ideas

### Payment & Status Management
1. **Payment Status Tracking** - Add statuses: Draft, Sent, Paid, Overdue, Cancelled
2. **Payment Dates** - Record when invoices are paid
3. **Due Date Management** - Custom due dates (currently hardcoded to 30 days)
4. **Payment Reminders** - Automated emails for overdue invoices
5. **Partial Payments** - Track multiple payments per invoice
6. **Payment Methods** - Record how payment was received (check, wire, credit card, etc.)

### Invoice Enhancement
7. **Multiple Line Items** - Break down invoices into itemized services/products
8. **Tax Calculations** - Add tax fields (sales tax, VAT) with automatic calculations
9. **Discounts** - Percentage or fixed-amount discounts
10. **Invoice Editing** - Edit existing invoices before they're paid
11. **Invoice Deletion** - Soft delete with archive functionality
12. **Invoice Templates** - Customizable PDF templates
13. **Terms & Conditions** - Customizable payment terms per invoice
14. **Notes/Private Notes** - Internal notes not shown on PDF
15. **Invoice Attachments** - Attach files (contracts, receipts, etc.)

### Search & Organization
16. **Search Functionality** - Search invoices by number, company, amount, date
17. **Filtering** - Filter by status, date range, company, amount range
18. **Sorting** - Sort by date, amount, status, company
19. **Invoice Categories/Tags** - Tag invoices for better organization
20. **Archive Old Invoices** - Archive invoices older than X years

### Analytics & Reporting
21. **Revenue Dashboard** - Charts showing revenue over time, by month/quarter/year
22. **Outstanding Invoices Report** - List of unpaid invoices with totals
23. **Company Revenue Breakdown** - See revenue per company/client
24. **Export to CSV/Excel** - Export invoice data for accounting software
25. **Financial Summaries** - Monthly/yearly summaries with totals
26. **Payment Trends** - Visualize payment patterns

### Client/Customer Management
27. **Client Contact Information** - Store email, phone, contact person per company
28. **Client Notes** - Notes about each client/company
29. **Client Payment History** - Quick view of all invoices for a company
30. **Multiple Contacts Per Company** - Store multiple contacts per company

### Automation & Workflow
31. **Recurring Invoices** - Set up monthly/weekly/yearly recurring invoices
32. **Auto-Invoice Numbering** - More flexible numbering schemes (custom formats)
33. **Invoice Scheduling** - Schedule invoices to be sent automatically
34. **Email Templates** - Customizable email templates for sending invoices
35. **Auto-Send on Creation** - Option to automatically email invoice on creation

### User Experience
36. **Invoice Preview** - Preview PDF before downloading
37. **Print Functionality** - Direct print button
38. **Invoice Sharing via Link** - Generate shareable links for clients
39. **Dark Mode** - UI theme option
40. **Mobile App** - Native mobile app for on-the-go invoice creation
41. **Bulk Operations** - Select multiple invoices for bulk actions
42. **Quick Actions** - Quick duplicate, resend, mark as paid buttons

### Advanced Features
43. **Multi-Currency Support** - Support for different currencies and exchange rates
44. **Multi-Language Support** - Generate invoices in different languages
45. **Time Tracking Integration** - Connect with time tracking tools
46. **Expense Tracking** - Track business expenses alongside invoices
47. **Project Management** - Link invoices to projects/jobs
48. **Team Collaboration** - Multi-user support with roles/permissions
49. **API Access** - REST API for third-party integrations
50. **Webhooks** - Notify external systems when invoices are created/paid

### Integration & Export
51. **Accounting Software Integration** - QuickBooks, Xero, FreshBooks sync
52. **Payment Gateway Integration** - Stripe, PayPal for online payments
53. **Bank Reconciliation** - Match payments with bank statements
54. **1099 Reporting** - Generate 1099 forms for contractors
55. **Invoice Numbering Customization** - Custom formats (INV-2025-001, etc.)

### Quick Wins (Easy to Implement)
- Invoice status badges (Paid/Unpaid) in PastInvoices
- Click-to-view invoice details modal
- Duplicate invoice button
- Invoice date picker (instead of auto-current date)
- Company selection dropdown in invoice form
- Total revenue display on dashboard
- "Mark as paid" button on invoice list
- Invoice number format customization
- Better error handling and user feedback
- Loading states and skeletons

### Priority Recommendations
1. **Payment Status Tracking** - Core functionality for business use
2. **Multiple Line Items** - More professional invoices
3. **Invoice Editing** - Fix mistakes without recreating
4. **Search & Filtering** - Essential as invoice count grows
5. **Recurring Invoices** - Saves time for regular clients
6. **Revenue Dashboard** - Business insights
7. **Due Date Management** - Better payment tracking

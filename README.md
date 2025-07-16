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

3. The form's submission is handled by the `createCompany()` function located in:

   `app/lib/actions.js` (line 90)

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
     - Calls `createInvoice()` from `context/invoiceItemProvider.jsx`
     - Sends data to `/api/invoice/route.js` to create the invoice
     - Also calls `/api/generate-pdf` to generate the PDF file

5. `components/PDFPreview/PDFPreview.jsx`:
   - Takes form state from `Form.jsx`
   - Sends data to `/api/generate-pdf` as well

6. `/api/generate-pdf`:
   - Validates the data
   - Renders the invoice using:

     `components/InvoicePDF/InvoicePDF.jsx`

---

export function getCurrentDateFormatted() {
	const now = new Date();
	const mm = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-indexed
	const dd = String(now.getDate()).padStart(2, "0");
	const yy = String(now.getFullYear()).slice(-2); // last two digits of the year
	return `${mm}/${dd}/${yy}`;
}

export function getYear() {
	return String(new Date().getFullYear()) 
}

export function createInvoiceNumForYear(invoiceNumber) {
	// Extract the last 2 digits from the invoice number (handles formats like "2024-26" or "26")
	const invoiceNumberStr = String(invoiceNumber);
	let invoiceDigits = Number(invoiceNumberStr.slice(-2));
	const currentYear = String(new Date().getFullYear());
	
	// Restart at 0 if we've reached 26 (26 invoices per year for biweekly paychecks)
	if (invoiceDigits === 26) {
		invoiceDigits = 0;
	}
	
	// Increment the invoice number
	const newInvoiceDigits = invoiceDigits + 1;
	
	// Pad with leading zero if number is less than 10
	const paddedDigits = String(newInvoiceDigits).padStart(2, "0");
	
	const newInvoice = `${currentYear}-${paddedDigits}`;
	
	return newInvoice;
}
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

export function createInvoiceNumForYear(lastInvoice) {
	let invoiceDigits = lastInvoice.invoiceNumber.slice(-2)
	const currentYear = getYear()
	//restart at 26 because there are 26 invoices are year if paycheck is biweekly

	if (invoiceDigits == 26) {
		invoiceDigits == 0
	}
	const newInvoiceDigits = Number(invoiceDigits || 0) + 1

	const newInvoice = currentYear + '-' + newInvoiceDigits
	
	return newInvoice


}
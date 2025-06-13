/**
 * Formats a number into a currency string
 * @param {number|string} amount - The amount to format
 * @param {string} [currency='USD'] - The currency code
 * @returns {string} Formatted currency string
 */
export const formatMoney = (amount, currency = "USD") => {
	// Convert to number if it's a string
	const numericAmount =
		typeof amount === "string" ? parseFloat(amount) : amount;

	// Check if the amount is a valid number
	if (isNaN(numericAmount)) {
		return "$0.00";
	}

	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(numericAmount);
};

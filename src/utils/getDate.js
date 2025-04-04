export function getCurrentDateFormatted() {
	const now = new Date();
	const mm = String(now.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-indexed
	const dd = String(now.getDate()).padStart(2, "0");
	const yy = String(now.getFullYear()).slice(-2); // last two digits of the year
	return `${mm}/${dd}/${yy}`;
}

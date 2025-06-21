import { describe, it, expect } from "vitest";
import { getCurrentDateFormatted } from "./getDate";

describe("getCurrentDateFormatted", () => {
	it("returns today in MM/DD/YY format", () => {
		const now = new Date();
		const mm = String(now.getMonth() + 1).padStart(2, "0");
		const dd = String(now.getDate()).padStart(2, "0");
		const yy = String(now.getFullYear()).slice(-2);
		const expected = `${mm}/${dd}/${yy}`;
		expect(getCurrentDateFormatted()).toBe(expected);
	});

	it("returns a string in MM/DD/YY format", () => {
		const result = getCurrentDateFormatted();
		expect(result).toMatch(/^\d{2}\/\d{2}\/\d{2}$/);
	});
});

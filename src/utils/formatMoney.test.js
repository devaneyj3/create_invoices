import { describe, it, expect } from "vitest";
import { formatMoney } from "./formatMoney";

describe("formatMoney", () => {
	it("formats a number as USD by default", () => {
		expect(formatMoney(1234.56)).toBe("$1,234.56");
	});

	it("formats a string number as USD by default", () => {
		expect(formatMoney("789.01")).toBe("$789.01");
	});

	it("returns $0.00 for invalid input", () => {
		expect(formatMoney("not-a-number")).toBe("$0.00");
		expect(formatMoney(undefined)).toBe("$0.00");
		expect(formatMoney(null)).toBe("$0.00");
	});
});

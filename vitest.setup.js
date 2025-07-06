import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		prefetch: vi.fn(),
		refresh: vi.fn(),
		back: vi.fn(),
		forward: vi.fn(),
	}),
	usePathname: () => "/",
	useSearchParams: () => new URLSearchParams(),
}));

// Mock next-auth/react
vi.mock("next-auth/react", () => ({
	useSession: () => ({
		data: {
			user: {
				id: "test-user-id",
				name: "Test User",
				email: "test@example.com",
				phone: "8888888888",
				address: "333 Chicago Blvd",
				city: "Chicago",
				state: "IL",
				zip: "48402",
				profileComplete: true,
			},
		},
		status: "authenticated",
	}),
	signIn: vi.fn(),
	signOut: vi.fn(),
	SessionProvider: ({ children }) => children,
}));

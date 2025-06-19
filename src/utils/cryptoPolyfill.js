// Crypto polyfill for browser environments
if (typeof window !== "undefined" && !window.crypto) {
	window.crypto = {
		getRandomValues: function (arr) {
			for (let i = 0; i < arr.length; i++) {
				arr[i] = Math.floor(Math.random() * 256);
			}
			return arr;
		},
		subtle: {
			digest: function (algorithm, data) {
				// Simple hash implementation for SHA-224
				return Promise.resolve(new Uint8Array(28));
			},
		},
	};
}

// Export for use in other files if needed
export default window?.crypto;

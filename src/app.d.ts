// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session: import("@auth/core/types").DefaultSession & {
				user?: {
				name?: string | null;
				email?: string | null;
				image?: string | null;
				accessToken?: string;
				}
			} | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module "@auth/core/types" {
	interface Account {
		access_token?: string;
	}
	interface Session {
		user?: {
			name?: string | null;
			email?: string | null;
			image?: string | null;
			accessToken?: string;
		};
	}
	interface JWT {
		accessToken?: string;
	}
}

export {};

import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, VERCEL_URL  } from "$env/static/private";

const AUTH_URL = VERCEL_URL ? `https://${VERCEL_URL}` : "http://localhost:5173";

export const {handle} = SvelteKitAuth({
    trustHost: true,
    providers: [
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/youtube.force-ssl"
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = (account as any).access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.accessToken) {
                session.user = {
                    ...session.user,
                    accessToken: token.accessToken as string,
                };
            }
            return session;
        }
    }
});

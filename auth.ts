import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { autorizarIngreso } from "@/lib/socios";

// Ingreso sin Google para probar el panel en la máquina de desarrollo. Nunca
// se habilita en un build de producción.
export const INGRESO_DEV =
  process.env.NODE_ENV === "development" && process.env.AUTH_DEV_LOGIN === "1";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Google,
    ...(INGRESO_DEV
      ? [
          Credentials({
            credentials: { email: {} },
            authorize: ({ email }) =>
              email ? { id: String(email), email: String(email) } : null,
          }),
        ]
      : []),
  ],
  pages: { signIn: "/panel/ingresar", error: "/panel/ingresar" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" && !profile?.email_verified)
        return false;
      return autorizarIngreso(user.email, user.name);
    },
  },
});

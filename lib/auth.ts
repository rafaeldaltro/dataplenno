import { getServerSession } from "next-auth/next"
import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "seu-client-id-do-google",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "seu-client-secret-do-google",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@dataplenno.com" && credentials?.password === "admin123") {
          return {
            id: "1",
            name: "Administrador",
            email: "admin@dataplenno.com",
            role: "admin",
            image: null,
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user"
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}

export const getServerAuthSession = () => getServerSession(authOptions)

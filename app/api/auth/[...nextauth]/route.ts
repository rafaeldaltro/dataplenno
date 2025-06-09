import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email === "admin@dataplenno.com" && credentials?.password === "admin123") {
          return {
            id: "1",
            name: "Administrador",
            email: "admin@dataplenno.com",
            role: "admin",
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

import "next-auth"
import type { DefaultSession } from "next-auth"

// Estender os tipos do NextAuth para incluir campos personalizados
declare module "next-auth" {
  interface User {
    role?: string
  }

  interface Session extends DefaultSession {
    user?: {
      id?: string
      role?: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
  }
}

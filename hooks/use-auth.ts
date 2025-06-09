"use client"

import { useState } from "react"

export function useAuth(onSuccess: () => void) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const loginWithCredentials = async (email: string, password: string) => {
    setIsLoading(true)
    setError("")

    try {
      // Simular delay de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (email === "admin@dataplenno.com" && password === "admin123") {
        localStorage.setItem("auth-token", "mock-jwt-token")
        localStorage.setItem(
          "user-data",
          JSON.stringify({
            name: "Administrador",
            email: email,
            role: "admin",
          }),
        )
        onSuccess()
      } else {
        setError("Credenciais inválidas. Use admin@dataplenno.com / admin123")
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
  }

  return {
    loginWithCredentials,
    logout,
    isLoading,
    error,
  }
}

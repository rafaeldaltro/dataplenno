"use client"

import { useState, useEffect } from "react"
import { SimpleLoginForm } from "@/components/simple-login-form"
import { MainLayout } from "@/components/main-layout"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simple check for authentication token
    const token = localStorage.getItem("auth-token")
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <SimpleLoginForm onLogin={() => setIsAuthenticated(true)} />
  }

  return <MainLayout />
}

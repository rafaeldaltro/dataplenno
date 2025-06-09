"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BarChart3, MessageSquare, History, Settings, LogOut } from "lucide-react"
import { LoginScreen } from "@/components/auth/login-screen"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeView, setActiveView] = useState("dashboard")
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  // Login form states
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth-token")
      setIsAuthenticated(!!token)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setError("")

    setTimeout(() => {
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
        setIsAuthenticated(true)
      } else {
        setError("Credenciais inválidas. Use admin@dataplenno.com / admin123")
      }
      setLoginLoading(false)
    }, 1500)
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError("")

    // Simular autenticação com Google
    setTimeout(() => {
      localStorage.setItem("auth-token", "google-auth-token")
      localStorage.setItem(
        "user-data",
        JSON.stringify({
          name: "Usuário Google",
          email: "user@google.com",
          role: "user",
        }),
      )
      setIsAuthenticated(true)
      setGoogleLoading(false)
    }, 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    setIsAuthenticated(false)
    setEmail("")
    setPassword("")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            <span className="font-semibold">Dataplenno</span>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setActiveView("dashboard")}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveView("chat")}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveView("history")}>
              <History className="h-4 w-4 mr-2" />
              Histórico
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveView("settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container py-6">
        {activeView === "dashboard" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Visão geral dos seus dados e indicadores principais</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Beneficiários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.847</div>
                  <p className="text-xs text-muted-foreground">+5.2% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Custo Médico Total</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 2.4M</div>
                  <p className="text-xs text-muted-foreground">-2.1% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sinistralidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78.5%</div>
                  <p className="text-xs text-muted-foreground">+1.3% em relação ao mês anterior</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consultas Realizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.234</div>
                  <p className="text-xs text-muted-foreground">+12.5% em relação ao mês anterior</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeView === "chat" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Chat com Dados</h1>
              <p className="text-muted-foreground">Faça perguntas sobre seus dados e receba insights inteligentes</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Interface de chat em desenvolvimento...</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === "history" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Histórico de Consultas</h1>
              <p className="text-muted-foreground">Visualize e gerencie todas as consultas realizadas</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Histórico de consultas em desenvolvimento...</p>
              </CardContent>
            </Card>
          </div>
        )}

        {activeView === "settings" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Configurações</h1>
              <p className="text-muted-foreground">Gerencie dados, usuários e configurações do sistema</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Configurações em desenvolvimento...</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </DashboardLayout>
  )
}

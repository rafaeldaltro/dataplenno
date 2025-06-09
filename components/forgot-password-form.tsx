"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react"

interface ForgotPasswordFormProps {
  onBack: () => void
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Email de recuperação enviado com sucesso! Verifique sua caixa de entrada.")
        setIsSuccess(true)
      } else {
        setError(data.error || "Erro ao enviar email de recuperação")
      }
    } catch (error) {
      setError("Erro de conexão. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Email Enviado!</CardTitle>
            <CardDescription>Verifique sua caixa de entrada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>

            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Verifique sua caixa de entrada e spam</p>
              <p>• O link expira em 1 hora</p>
              <p>• Se não receber, tente novamente</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={onBack} className="flex-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Login
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsSuccess(false)
                  setEmail("")
                  setMessage("")
                }}
                className="flex-1"
              >
                Enviar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Esqueci minha senha</CardTitle>
          <CardDescription>Digite seu email para receber as instruções de recuperação</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar Email de Recuperação
                </>
              )}
            </Button>

            <Button variant="ghost" onClick={onBack} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Login
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Emails de teste disponíveis:</strong>
              <br />
              admin@dataplenno.com
              <br />
              user@dataplenno.com
              <br />
              test@dataplenno.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

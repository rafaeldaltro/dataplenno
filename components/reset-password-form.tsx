"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, Loader2, CheckCircle, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidToken, setIsValidToken] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o token é válido
    if (!token || token.length < 10) {
      setIsValidToken(false)
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (newPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        // Redirecionar para login após 3 segundos
        setTimeout(() => {
          router.push("/")
        }, 3000)
      } else {
        setError(data.error || "Erro ao redefinir senha")
      }
    } catch (error) {
      setError("Erro de conexão. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 dark:bg-red-900 rounded-full p-3">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Link Inválido</CardTitle>
            <CardDescription>O link de recuperação é inválido ou expirou</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Este link de recuperação de senha é inválido ou já expirou. Solicite um novo link de recuperação.
              </AlertDescription>
            </Alert>
            <Button onClick={() => router.push("/")} className="w-full mt-4">
              Voltar ao Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
            <CardTitle className="text-2xl font-bold">Senha Alterada!</CardTitle>
            <CardDescription>Sua senha foi redefinida com sucesso</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Sua senha foi alterada com sucesso. Você será redirecionado para a tela de login em alguns segundos.
              </AlertDescription>
            </Alert>
            <Button onClick={() => router.push("/")} className="w-full mt-4">
              Ir para Login
            </Button>
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
              <Lock className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Nova Senha</CardTitle>
          <CardDescription>Digite sua nova senha</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="text-sm text-muted-foreground">
              <p>A senha deve ter:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Pelo menos 6 caracteres</li>
                <li>Ser diferente da senha anterior</li>
              </ul>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Alterando Senha...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Alterar Senha
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

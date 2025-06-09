import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados de usuários
const users = [
  { email: "admin@dataplenno.com", name: "Administrador", password: "admin123" },
  { email: "user@dataplenno.com", name: "Usuário", password: "user123" },
  { email: "test@dataplenno.com", name: "Teste", password: "test123" },
]

// Armazenamento temporário de tokens (mesmo do forgot-password)
const resetTokens = new Map<string, { email: string; expires: Date }>()

export async function POST(request: NextRequest) {
  try {
    const { token, password, confirmPassword } = await request.json()

    if (!token || !password || !confirmPassword) {
      return NextResponse.json({ error: "Todos os campos são obrigatórios" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "As senhas não coincidem" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 })
    }

    // Verificar token
    const tokenData = resetTokens.get(token)
    if (!tokenData) {
      return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 })
    }

    if (new Date() > tokenData.expires) {
      resetTokens.delete(token)
      return NextResponse.json({ error: "Token expirado" }, { status: 400 })
    }

    // Encontrar usuário
    const userIndex = users.findIndex((u) => u.email === tokenData.email)
    if (userIndex === -1) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    // Atualizar senha (em produção, fazer hash da senha)
    users[userIndex].password = password

    // Remover token usado
    resetTokens.delete(token)

    console.log(`Senha atualizada para ${tokenData.email}`)

    return NextResponse.json({
      success: true,
      message: "Senha redefinida com sucesso",
    })
  } catch (error) {
    console.error("Erro ao redefinir senha:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.json({ error: "Token não fornecido" }, { status: 400 })
  }

  const tokenData = resetTokens.get(token)
  if (!tokenData || new Date() > tokenData.expires) {
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 })
  }

  return NextResponse.json({ valid: true })
}

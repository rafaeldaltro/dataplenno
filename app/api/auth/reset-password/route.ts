import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token e nova senha são obrigatórios" }, { status: 400 })
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 })
    }

    // Verificar token (em produção, consultar banco de dados)
    const resetTokens = global.passwordResetTokens || new Map()
    const resetData = resetTokens.get(token)

    if (!resetData) {
      return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 })
    }

    if (Date.now() > resetData.expires) {
      resetTokens.delete(token)
      return NextResponse.json({ error: "Token expirado" }, { status: 400 })
    }

    // Simular atualização da senha no banco de dados
    console.log(`Senha atualizada para o email: ${resetData.email}`)

    // Remover token usado
    resetTokens.delete(token)

    return NextResponse.json({
      message: "Senha alterada com sucesso",
      success: true,
    })
  } catch (error) {
    console.error("Erro ao redefinir senha:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

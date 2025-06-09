import { type NextRequest, NextResponse } from "next/server"
import { generatePasswordResetToken, sendPasswordResetEmail } from "@/lib/password-reset"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 })
    }

    // Verificar se o email existe no sistema (simulação)
    const validEmails = ["admin@dataplenno.com", "user@dataplenno.com", "test@dataplenno.com"]

    if (!validEmails.includes(email)) {
      return NextResponse.json({ error: "Email não encontrado no sistema" }, { status: 404 })
    }

    // Gerar token de recuperação
    const resetToken = generatePasswordResetToken()

    // Armazenar token temporariamente (em produção, usar banco de dados)
    const resetData = {
      email,
      token: resetToken,
      expires: Date.now() + 3600000, // 1 hora
    }

    // Simular armazenamento do token (em produção, salvar no banco)
    if (typeof window === "undefined") {
      global.passwordResetTokens = global.passwordResetTokens || new Map()
      global.passwordResetTokens.set(resetToken, resetData)
    }

    // Enviar email de recuperação
    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json({
      message: "Email de recuperação enviado com sucesso",
      success: true,
    })
  } catch (error) {
    console.error("Erro ao processar recuperação de senha:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

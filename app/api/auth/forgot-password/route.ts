import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados de usuários
const users = [
  { email: "admin@dataplenno.com", name: "Administrador" },
  { email: "user@dataplenno.com", name: "Usuário" },
  { email: "test@dataplenno.com", name: "Teste" },
]

// Armazenamento temporário de tokens (em produção, usar banco de dados)
const resetTokens = new Map<string, { email: string; expires: Date }>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 })
    }

    // Verificar se o usuário existe
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: "Email não encontrado no sistema" }, { status: 404 })
    }

    // Gerar token seguro
    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    // Armazenar token
    resetTokens.set(token, { email, expires })

    // Simular envio de email (em produção, usar serviço real)
    console.log(`
    ========================================
    EMAIL DE RECUPERAÇÃO DE SENHA
    ========================================
    Para: ${email}
    Assunto: Recuperação de senha - Dataplenno
    
    Olá ${user.name},
    
    Você solicitou a recuperação de sua senha.
    Clique no link abaixo para redefinir sua senha:
    
    ${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}
    
    Este link expira em 1 hora.
    
    Se você não solicitou esta recuperação, ignore este email.
    
    Atenciosamente,
    Equipe Dataplenno
    ========================================
    `)

    return NextResponse.json({
      success: true,
      message: "Email de recuperação enviado com sucesso",
    })
  } catch (error) {
    console.error("Erro ao processar recuperação de senha:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

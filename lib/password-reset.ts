import crypto from "crypto"

export function generatePasswordResetToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  // Em produção, usar um serviço real como SendGrid, Resend, ou Nodemailer
  const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${token}`

  // Simulação do envio de email
  console.log(`
    ===== EMAIL DE RECUPERAÇÃO DE SENHA =====
    Para: ${email}
    Assunto: Recuperação de Senha - Dataplenno
    
    Olá,
    
    Você solicitou a recuperação de sua senha no Dataplenno.
    
    Clique no link abaixo para redefinir sua senha:
    ${resetUrl}
    
    Este link expira em 1 hora.
    
    Se você não solicitou esta recuperação, ignore este email.
    
    Atenciosamente,
    Equipe Dataplenno
    ==========================================
  `)

  // Em produção, implementar envio real:
  /*
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    service: 'gmail', // ou outro provedor
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Recuperação de Senha - Dataplenno',
    html: `
      <h2>Recuperação de Senha</h2>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetUrl}">Redefinir Senha</a>
      <p>Este link expira em 1 hora.</p>
    `
  });
  */
}

"use client"

import { useSearchParams } from "next/navigation"
import { ResetPasswordForm } from "@/components/reset-password-form"
import { Suspense } from "react"

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""

  return <ResetPasswordForm token={token} />
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  )
}

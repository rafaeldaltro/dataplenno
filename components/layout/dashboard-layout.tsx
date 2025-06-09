"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/layout/dashboard-header"
import { DashboardContent } from "@/components/layout/dashboard-content"

export type ViewType = "dashboard" | "chat" | "history" | "settings"

export function DashboardLayout() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard")

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader activeView={activeView} onViewChange={setActiveView} />
      <DashboardContent activeView={activeView} />
    </div>
  )
}

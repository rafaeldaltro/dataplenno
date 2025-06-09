"use client"

import { Button } from "@/components/ui/button"
import { Activity, BarChart3, MessageSquare, History, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import type { ViewType } from "@/components/layout/dashboard-layout"

interface DashboardHeaderProps {
  activeView: ViewType
  onViewChange: (view: ViewType) => void
}

export function DashboardHeader({ activeView, onViewChange }: DashboardHeaderProps) {
  const { logout } = useAuth(() => {})

  const handleLogout = () => {
    logout()
    window.location.reload()
  }

  const navigationItems = [
    { id: "dashboard" as ViewType, label: "Dashboard", icon: BarChart3 },
    { id: "chat" as ViewType, label: "Chat", icon: MessageSquare },
    { id: "history" as ViewType, label: "Histórico", icon: History },
    { id: "settings" as ViewType, label: "Configurações", icon: Settings },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6" />
          <span className="font-semibold">Dataplenno</span>
        </div>

        <nav className="ml-auto flex items-center gap-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange(item.id)}
            >
              <item.icon className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          ))}

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </nav>
      </div>
    </header>
  )
}

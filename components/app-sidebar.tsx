"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Activity, BarChart3, MessageSquare, History, Settings, LogOut, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

interface AppSidebarProps {
  activeView: string
  onViewChange: (view: string) => void
}

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  const { theme, setTheme } = useTheme()
  const [userData, setUserData] = useState({ name: "", email: "", role: "" })

  useEffect(() => {
    const data = localStorage.getItem("user-data")
    if (data) {
      setUserData(JSON.parse(data))
    }
  }, [])

  const menuItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      id: "dashboard",
    },
    {
      title: "Chat com Dados",
      icon: MessageSquare,
      id: "chat",
    },
    {
      title: "Histórico",
      icon: History,
      id: "history",
    },
    {
      title: "Configurações",
      icon: Settings,
      id: "settings",
    },
  ]

  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    window.location.reload()
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="bg-primary rounded-lg p-2">
            <Activity className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Question Data</h2>
            <p className="text-xs text-muted-foreground">Análise Inteligente</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton onClick={() => onViewChange(item.id)} isActive={activeView === item.id}>
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="p-2 space-y-2">
          <div className="flex items-center gap-2 p-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{userData.name}</p>
              <p className="text-xs text-muted-foreground truncate">{userData.role}</p>
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex-1"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="flex-1">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

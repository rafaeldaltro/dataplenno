"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ViewType } from "@/components/layout/dashboard-layout"

interface DashboardContentProps {
  activeView: ViewType
}

const kpiData = [
  {
    title: "Total de Beneficiários",
    value: "12.847",
    change: "+5.2% em relação ao mês anterior",
  },
  {
    title: "Custo Médico Total",
    value: "R$ 2.4M",
    change: "-2.1% em relação ao mês anterior",
  },
  {
    title: "Sinistralidade",
    value: "78.5%",
    change: "+1.3% em relação ao mês anterior",
  },
  {
    title: "Consultas Realizadas",
    value: "1.234",
    change: "+12.5% em relação ao mês anterior",
  },
]

export function DashboardContent({ activeView }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Visão geral dos seus dados e indicadores principais</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {kpiData.map((kpi, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground">{kpi.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "chat":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Chat com Dados</h1>
              <p className="text-muted-foreground">Faça perguntas sobre seus dados e receba insights inteligentes</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Interface de chat em desenvolvimento...</p>
              </CardContent>
            </Card>
          </div>
        )

      case "history":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Histórico de Consultas</h1>
              <p className="text-muted-foreground">Visualize e gerencie todas as consultas realizadas</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Histórico de consultas em desenvolvimento...</p>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Configurações</h1>
              <p className="text-muted-foreground">Gerencie dados, usuários e configurações do sistema</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">Configurações em desenvolvimento...</p>
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  return <main className="container py-6">{renderContent()}</main>
}

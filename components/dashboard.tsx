"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  MessageSquare,
  Clock,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronRight,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function Dashboard() {
  const kpis = [
    {
      title: "Total de Beneficiários",
      value: "12.847",
      change: "+5.2%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Custo Médico Total",
      value: "R$ 2.4M",
      change: "-2.1%",
      icon: DollarSign,
      trend: "down",
    },
    {
      title: "Sinistralidade",
      value: "78.5%",
      change: "+1.3%",
      icon: TrendingUp,
      trend: "up",
    },
    {
      title: "Consultas Realizadas",
      value: "1.234",
      change: "+12.5%",
      icon: Activity,
      trend: "up",
    },
  ]

  const topQuestions = [
    "Qual hospital teve maior custo por internação em 2024?",
    "Como está a evolução da sinistralidade nos últimos 6 meses?",
    "Quais são os procedimentos mais custosos por faixa etária?",
    "Qual a distribuição de beneficiários por região?",
    "Como está o índice de satisfação dos beneficiários?",
  ]

  const recentQueries = [
    {
      question: "Análise de custos por especialidade médica",
      time: "2 minutos atrás",
      user: "Ana Silva",
    },
    {
      question: "Comparativo de sinistralidade 2023 vs 2024",
      time: "15 minutos atrás",
      user: "Carlos Santos",
    },
    {
      question: "Top 10 hospitais por volume de atendimento",
      time: "1 hora atrás",
      user: "Maria Oliveira",
    },
  ]

  // Dados para os gráficos
  const sinistralidadeData = [
    { month: "Jan", sinistralidade: 72 },
    { month: "Fev", sinistralidade: 68 },
    { month: "Mar", sinistralidade: 70 },
    { month: "Abr", sinistralidade: 75 },
    { month: "Mai", sinistralidade: 74 },
    { month: "Jun", sinistralidade: 80 },
    { month: "Jul", sinistralidade: 79 },
    { month: "Ago", sinistralidade: 77 },
    { month: "Set", sinistralidade: 75 },
    { month: "Out", sinistralidade: 76 },
    { month: "Nov", sinistralidade: 78 },
    { month: "Dez", sinistralidade: 79 },
  ]

  const custosHospitalares = [
    { name: "Hospital São Lucas", value: 840000 },
    { name: "Santa Casa", value: 620000 },
    { name: "Hospital Moinhos", value: 540000 },
    { name: "Hospital Sírio", value: 480000 },
    { name: "Hospital Albert Einstein", value: 420000 },
  ]

  const distribuicaoBeneficiarios = [
    { name: "Sudeste", value: 45 },
    { name: "Sul", value: 25 },
    { name: "Nordeste", value: 15 },
    { name: "Centro-Oeste", value: 10 },
    { name: "Norte", value: 5 },
  ]

  const utilizacaoPorFaixaEtaria = [
    { name: "0-18", consultas: 120, exames: 80, internacoes: 20 },
    { name: "19-30", consultas: 150, exames: 100, internacoes: 15 },
    { name: "31-45", consultas: 200, exames: 180, internacoes: 30 },
    { name: "46-60", consultas: 180, exames: 220, internacoes: 45 },
    { name: "61+", consultas: 160, exames: 250, internacoes: 70 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Visão geral dos seus dados e indicadores principais</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Últimos 30 dias
          </Button>
          <Button size="sm">Atualizar</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center">
                <span className={`text-xs ${kpi.trend === "up" ? "text-green-600" : "text-red-600"} flex items-center`}>
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change} em relação ao mês anterior
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos principais */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Gráfico de Sinistralidade */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Evolução da Sinistralidade
            </CardTitle>
            <CardDescription>Percentual mensal nos últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={sinistralidadeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis domain={[60, 90]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sinistralidade"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Custos Hospitalares */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Custos por Hospital
            </CardTitle>
            <CardDescription>Top 5 hospitais com maior custo total</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={custosHospitalares} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                  {custosHospitalares.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Segunda linha de gráficos */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Distribuição de Beneficiários */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Distribuição Regional
            </CardTitle>
            <CardDescription>Beneficiários por região</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={distribuicaoBeneficiarios}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {distribuicaoBeneficiarios.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Utilização por Faixa Etária */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Utilização por Faixa Etária
            </CardTitle>
            <CardDescription>Consultas, exames e internações</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={utilizacaoPorFaixaEtaria} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="consultas" fill="#0088FE" />
                <Bar dataKey="exames" fill="#00C49F" />
                <Bar dataKey="internacoes" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Perguntas Populares */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Perguntas Mais Populares
            </CardTitle>
            <CardDescription>Clique em uma pergunta para fazer a consulta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {topQuestions.map((question, index) => (
              <Button key={index} variant="ghost" className="w-full justify-start text-left h-auto p-3">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    {index + 1}
                  </Badge>
                  <span className="text-sm">{question}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Consultas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Consultas Recentes
            </CardTitle>
            <CardDescription>Últimas consultas realizadas no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentQueries.map((query, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                <BarChart3 className="h-4 w-4 mt-1 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{query.question}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{query.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{query.time}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="ml-2">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

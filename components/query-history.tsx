"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Search,
  Filter,
  Calendar,
  User,
  MessageSquare,
  BarChart3,
  Download,
  Eye,
  LayoutGrid,
  LayoutList,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface QueryRecord {
  id: string
  question: string
  user: string
  timestamp: Date
  responseType: "chart" | "table" | "text"
  category: string
  executionTime: number
}

export function QueryHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [dateFilter, setDateFilter] = useState("all")

  const queryHistory: QueryRecord[] = [
    {
      id: "1",
      question: "Qual hospital teve maior custo por internação em 2024?",
      user: "Ana Silva",
      timestamp: new Date(2024, 11, 15, 14, 30),
      responseType: "chart",
      category: "Custos",
      executionTime: 2.3,
    },
    {
      id: "2",
      question: "Como está a evolução da sinistralidade nos últimos 6 meses?",
      user: "Carlos Santos",
      timestamp: new Date(2024, 11, 15, 13, 45),
      responseType: "table",
      category: "Sinistralidade",
      executionTime: 1.8,
    },
    {
      id: "3",
      question: "Quais são os procedimentos mais custosos por faixa etária?",
      user: "Maria Oliveira",
      timestamp: new Date(2024, 11, 15, 12, 20),
      responseType: "chart",
      category: "Procedimentos",
      executionTime: 3.1,
    },
    {
      id: "4",
      question: "Qual a distribuição de beneficiários por região?",
      user: "João Costa",
      timestamp: new Date(2024, 11, 15, 11, 15),
      responseType: "table",
      category: "Beneficiários",
      executionTime: 1.5,
    },
    {
      id: "5",
      question: "Como está o índice de satisfação dos beneficiários?",
      user: "Ana Silva",
      timestamp: new Date(2024, 11, 15, 10, 30),
      responseType: "text",
      category: "Satisfação",
      executionTime: 2.0,
    },
    {
      id: "6",
      question: "Quais são os principais motivos de reclamação dos beneficiários?",
      user: "Pedro Almeida",
      timestamp: new Date(2024, 11, 14, 16, 45),
      responseType: "chart",
      category: "Satisfação",
      executionTime: 2.5,
    },
    {
      id: "7",
      question: "Qual é a taxa de utilização de serviços por faixa etária?",
      user: "Mariana Costa",
      timestamp: new Date(2024, 11, 14, 14, 20),
      responseType: "chart",
      category: "Utilização",
      executionTime: 1.9,
    },
    {
      id: "8",
      question: "Quais especialidades médicas têm maior demanda?",
      user: "Roberto Souza",
      timestamp: new Date(2024, 11, 14, 11, 10),
      responseType: "table",
      category: "Especialidades",
      executionTime: 2.2,
    },
  ]

  const filteredQueries = queryHistory.filter((query) => {
    const matchesSearch =
      query.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = selectedFilter === "all" || query.responseType === selectedFilter

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && query.timestamp.toDateString() === new Date().toDateString()) ||
      (dateFilter === "yesterday" &&
        query.timestamp.toDateString() === new Date(Date.now() - 86400000).toDateString()) ||
      (dateFilter === "week" && query.timestamp > new Date(Date.now() - 7 * 86400000))

    return matchesSearch && matchesFilter && matchesDate
  })

  const getResponseTypeIcon = (type: string) => {
    switch (type) {
      case "chart":
        return <BarChart3 className="h-4 w-4" />
      case "table":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getResponseTypeBadge = (type: string) => {
    const variants = {
      chart: "default",
      table: "secondary",
      text: "outline",
    } as const

    return (
      <Badge variant={variants[type as keyof typeof variants] || "outline"}>
        {type === "chart" ? "Gráfico" : type === "table" ? "Tabela" : "Texto"}
      </Badge>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Histórico de Consultas</h1>
            <p className="text-muted-foreground">Visualize e gerencie todas as consultas realizadas</p>
          </div>
        </div>
      </div>

      {/* Filtros e busca - Versão melhorada e mais responsiva */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por pergunta, usuário ou categoria..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  title="Visualização em lista"
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  title="Visualização em grade"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-between">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={selectedFilter === "chart" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("chart")}
                >
                  Gráficos
                </Button>
                <Button
                  variant={selectedFilter === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("table")}
                >
                  Tabelas
                </Button>
                <Button
                  variant={selectedFilter === "text" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter("text")}
                >
                  Texto
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar por data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as datas</SelectItem>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="yesterday">Ontem</SelectItem>
                    <SelectItem value="week">Última semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de consultas - Versão melhorada com opções de visualização */}
      {viewMode === "list" ? (
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <Card key={query.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      {getResponseTypeIcon(query.responseType)}
                      <h3 className="font-medium truncate">{query.question}</h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {query.user}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {query.timestamp.toLocaleDateString("pt-BR")} às{" "}
                        {query.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <span>Executado em {query.executionTime}s</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {getResponseTypeBadge(query.responseType)}
                      <Badge variant="outline">{query.category}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Ver</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            <span>Exportar CSV</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            <span>Exportar PDF</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQueries.map((query) => (
            <Card key={query.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getResponseTypeIcon(query.responseType)}
                  <h3 className="font-medium text-sm truncate">{query.question}</h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <User className="h-3 w-3" />
                  <span className="truncate">{query.user}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>{query.timestamp.toLocaleDateString("pt-BR")}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {getResponseTypeBadge(query.responseType)}
                  <Badge variant="outline">{query.category}</Badge>
                </div>

                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="h-4 w-4 mr-1" />
                    Exportar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredQueries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma consulta encontrada</h3>
            <p className="text-muted-foreground">Tente ajustar os filtros ou fazer uma nova busca</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

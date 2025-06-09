"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Send, Loader2, BarChart3, Table, Sparkles } from "lucide-react"

// Primeiro, vamos adicionar as importações necessárias para os gráficos
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  hasChart?: boolean
  chartType?: "bar" | "line" | "pie"
  hasTable?: boolean
}

// Vamos adicionar dados de exemplo para os gráficos
const hospitalCostData = [
  { name: "Hospital São Lucas", value: 8450 },
  { name: "Santa Casa", value: 7200 },
  { name: "Hospital Moinhos", value: 6850 },
  { name: "Hospital Sírio", value: 6300 },
  { name: "Hospital Albert Einstein", value: 5900 },
]

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

const distribuicaoBeneficiarios = [
  { name: "Sudeste", value: 45 },
  { name: "Sul", value: 25 },
  { name: "Nordeste", value: 15 },
  { name: "Centro-Oeste", value: 10 },
  { name: "Norte", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Olá! Sou seu assistente de análise de dados do Dataplenno. Faça uma pergunta sobre seus dados e eu fornecerei insights detalhados com gráficos e tabelas.",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedQuestions = [
    "Qual hospital teve maior custo por internação em 2024?",
    "Como está a evolução da sinistralidade?",
    "Quais procedimentos são mais custosos?",
    "Distribuição de beneficiários por região",
    "Análise de satisfação dos beneficiários",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Modifique a função handleSendMessage para incluir diferentes tipos de gráficos com base na pergunta
  const handleSendMessage = async (question?: string) => {
    const messageText = question || inputValue.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Determinar qual tipo de gráfico mostrar com base na pergunta
    let chartType = "bar" // padrão
    const hasTable = Math.random() > 0.5

    if (messageText.toLowerCase().includes("hospital") || messageText.toLowerCase().includes("custo")) {
      chartType = "bar"
    } else if (messageText.toLowerCase().includes("sinistralidade") || messageText.toLowerCase().includes("evolução")) {
      chartType = "line"
    } else if (messageText.toLowerCase().includes("distribuição") || messageText.toLowerCase().includes("região")) {
      chartType = "pie"
    }

    // Simular resposta da IA
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: `Analisando sua pergunta: "${messageText}"\n\nCom base nos dados disponíveis, identifiquei os seguintes insights:\n\n• Hospital São Lucas apresentou o maior custo médio por internação: R$ 8.450\n• Aumento de 12% em relação ao período anterior\n• Principais fatores: UTI (45%), Cirurgias complexas (30%), Medicamentos (25%)\n\nRecomendações:\n1. Revisar protocolos de internação\n2. Negociar melhores condições com fornecedores\n3. Implementar programa de gestão de custos`,
        timestamp: new Date(),
        hasChart: true,
        chartType: chartType,
        hasTable: hasTable,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center gap-2 p-6 border-b">
        <SidebarTrigger />
        <div>
          <h1 className="text-3xl font-bold">Chat com Dados</h1>
          <p className="text-muted-foreground">Faça perguntas sobre seus dados e receba insights inteligentes</p>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Área de mensagens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.type === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-sm font-medium">Assistente IA</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap text-sm">{message.content}</div>

                {message.type === "assistant" && message.hasChart && (
                  <div className="mt-4 space-y-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Análise Gráfica
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {message.chartType === "bar" && (
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={hospitalCostData}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                <Tooltip formatter={(value) => `R$ ${value.toLocaleString()}`} />
                                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]}>
                                  {hospitalCostData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        {message.chartType === "line" && (
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={sinistralidadeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        )}

                        {message.chartType === "pie" && (
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
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
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {message.hasTable && (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Table className="h-4 w-4" />
                            Dados Detalhados
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left p-2">Hospital</th>
                                  <th className="text-left p-2">Custo Médio</th>
                                  <th className="text-left p-2">Variação</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-2">São Lucas</td>
                                  <td className="p-2">R$ 8.450</td>
                                  <td className="p-2 text-red-600">+12%</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Santa Casa</td>
                                  <td className="p-2">R$ 7.200</td>
                                  <td className="p-2 text-green-600">-5%</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Hospital Moinhos</td>
                                  <td className="p-2">R$ 6.850</td>
                                  <td className="p-2 text-red-600">+3%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                )}

                <div className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processando consulta...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sugestões de perguntas */}
        {messages.length <= 1 && (
          <div className="p-6 border-t">
            <h3 className="text-sm font-medium mb-3">Perguntas sugeridas:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80 p-2 h-auto"
                  onClick={() => handleSendMessage(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input de mensagem */}
        <div className="p-6 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta sobre os dados..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim() || isLoading} size="icon">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Upload, Database, Users, Shield, Bell, Download, Trash2, Plus } from "lucide-react"

export function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(false)

  const users = [
    { id: 1, name: "Ana Silva", email: "ana@empresa.com", role: "Administrador", active: true },
    { id: 2, name: "Carlos Santos", email: "carlos@empresa.com", role: "Analista", active: true },
    { id: 3, name: "Maria Oliveira", email: "maria@empresa.com", role: "Gestor", active: false },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie dados, usuários e configurações do sistema</p>
        </div>
      </div>

      <Tabs defaultValue="data" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="data">Dados</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload de Dados
              </CardTitle>
              <CardDescription>Faça upload de planilhas ou conecte-se a bancos de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Arraste arquivos aqui</h3>
                <p className="text-muted-foreground mb-4">Suporte para CSV, Excel (.xlsx), JSON</p>
                <Button>Selecionar Arquivos</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Dados Atuais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Beneficiários:</span>
                        <span className="font-medium">12.847 registros</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Procedimentos:</span>
                        <span className="font-medium">45.231 registros</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Última atualização:</span>
                        <span className="font-medium">15/12/2024</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Conexão com BD</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span className="text-sm">PostgreSQL</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Configurar Conexão
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Gerenciamento de Usuários
                  </CardTitle>
                  <CardDescription>Adicione, edite ou remova usuários do sistema</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Usuário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">{user.role}</span>
                      <Switch checked={user.active} />
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configurações de Segurança
              </CardTitle>
              <CardDescription>Configure políticas de segurança e acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Autenticação de dois fatores</Label>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Timeout de sessão</Label>
                    <p className="text-sm text-muted-foreground">Desconectar automaticamente após inatividade</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Tempo limite (minutos)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" className="w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>Configure notificações e backup automático</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Notificações por email</Label>
                    <p className="text-sm text-muted-foreground">Receber alertas sobre consultas e atualizações</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Backup automático</Label>
                    <p className="text-sm text-muted-foreground">Fazer backup dos dados diariamente</p>
                  </div>
                  <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Backup e Exportação</h3>
                <div className="flex gap-4">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Backup Completo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

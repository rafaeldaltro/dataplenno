"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Code } from "@/components/ui/code"
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react"
import { Steps, Step } from "@/components/ui/steps"

export function DeployInstructions() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Deploy do Dataplenno na Vercel</CardTitle>
          <CardDescription>Siga estas instruções para fazer um novo deploy do seu projeto na Vercel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Importante</AlertTitle>
            <AlertDescription>
              Certifique-se de que todas as alterações estão salvas e testadas localmente antes de fazer o deploy.
            </AlertDescription>
          </Alert>

          <Steps>
            <Step title="Prepare seu código">
              <div className="space-y-4">
                <p>
                  Certifique-se de que todas as alterações estão salvas e que o código está funcionando corretamente em
                  ambiente de desenvolvimento.
                </p>
                <Code># Teste localmente npm run dev</Code>
              </div>
            </Step>

            <Step title="Faça commit das alterações">
              <div className="space-y-4">
                <p>Adicione e faça commit das alterações no seu repositório Git:</p>
                <Code>git add . git commit -m "Implementado gráficos na resposta do chat"</Code>
              </div>
            </Step>

            <Step title="Envie para o GitHub">
              <div className="space-y-4">
                <p>Envie as alterações para o seu repositório GitHub:</p>
                <Code>git push origin main</Code>
                <p>
                  Se você configurou a integração contínua com a Vercel, o deploy será iniciado automaticamente após o
                  push.
                </p>
              </div>
            </Step>

            <Step title="Deploy manual na Vercel">
              <div className="space-y-4">
                <p>Se você não configurou a integração contínua, siga estas etapas para fazer o deploy manual:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Acesse o{" "}
                    <a href="https://vercel.com/dashboard" className="text-primary underline">
                      Dashboard da Vercel
                    </a>
                  </li>
                  <li>Selecione seu projeto "Dataplenno"</li>
                  <li>Clique no botão "Deploy" no canto superior direito</li>
                  <li>Selecione "Deploy" novamente para confirmar</li>
                </ol>
              </div>
            </Step>

            <Step title="Verifique o deploy">
              <div className="space-y-4">
                <p>Após o deploy ser concluído:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Verifique se não há erros no log de build</li>
                  <li>Acesse a URL do seu projeto para confirmar que as alterações estão funcionando</li>
                  <li>Teste a funcionalidade do chat com os novos gráficos</li>
                </ol>
                <Alert variant="success" className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Deploy concluído</AlertTitle>
                  <AlertDescription>Seu projeto Dataplenno está atualizado e disponível online!</AlertDescription>
                </Alert>
              </div>
            </Step>
          </Steps>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-4">Configurações adicionais</h3>
            <div className="space-y-4">
              <p>Para otimizar seu deploy na Vercel, considere configurar as seguintes opções:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Domínio personalizado para seu projeto</li>
                <li>Variáveis de ambiente para configurações sensíveis</li>
                <li>Integrações com serviços de análise como Vercel Analytics</li>
                <li>Configuração de previews para pull requests</li>
              </ul>
              <Button className="mt-4">
                Configurações avançadas <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Info, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { useState } from 'react'

interface SetupInstructionsProps {
  onSaveCredentials: (apiKey: string, clientId: string) => void
  onConnect: () => void
  isConnected: boolean
  hasCredentials: boolean
}

export function SetupInstructions({ 
  onSaveCredentials, 
  onConnect,
  isConnected,
  hasCredentials 
}: SetupInstructionsProps) {
  const [apiKey, setApiKey] = useState('')
  const [clientId, setClientId] = useState('')

  const handleSave = () => {
    if (apiKey.trim() && clientId.trim()) {
      onSaveCredentials(apiKey.trim(), clientId.trim())
      setApiKey('')
      setClientId('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Настройка подключения</h1>
        <p className="text-muted-foreground">
          Следуйте этим шагам для подключения ваших Google Календарей
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Для использования этого сервиса необходимо создать проект в Google Cloud Console 
          и получить API ключ и Client ID для доступа к вашим календарям.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Шаг 1: Создайте проект в Google Cloud Console</CardTitle>
          <CardDescription>
            Настройте доступ к Google Calendar API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">1</div>
              <div>
                Перейдите в{' '}
                <a 
                  href="https://console.cloud.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline font-medium"
                >
                  Google Cloud Console
                </a>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">2</div>
              <div>
                Создайте новый проект или выберите существующий (кнопка "Select a project" в верхней панели)
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">3</div>
              <div>
                В боковом меню выберите <strong>"APIs & Services"</strong> → <strong>"Library"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">4</div>
              <div>
                Найдите <strong>"Google Calendar API"</strong> и нажмите <strong>"Enable"</strong>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Шаг 2: Создайте API ключ</CardTitle>
          <CardDescription>
            Для чтения данных календаря
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">1</div>
              <div>
                Перейдите в <strong>"APIs & Services"</strong> → <strong>"Credentials"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">2</div>
              <div>
                Нажмите <strong>"Create Credentials"</strong> → <strong>"API key"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">3</div>
              <div>
                Скопируйте созданный API ключ (рекомендуется ограничить его использование только для Calendar API)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Шаг 3: Создайте OAuth 2.0 Client ID</CardTitle>
          <CardDescription>
            Для авторизации доступа к вашему аккаунту
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">1</div>
              <div>
                На той же странице Credentials нажмите <strong>"Create Credentials"</strong> → <strong>"OAuth client ID"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">2</div>
              <div>
                Если требуется, настройте OAuth consent screen (достаточно заполнить обязательные поля)
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">3</div>
              <div>
                Выберите тип приложения: <strong>"Web application"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">4</div>
              <div>
                В поле <strong>"Authorized JavaScript origins"</strong> добавьте:
                <div className="mt-2 p-2 bg-muted rounded font-mono text-xs">
                  {window.location.origin}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">5</div>
              <div>
                Скопируйте созданный <strong>Client ID</strong>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Шаг 4: Введите ваши учетные данные</CardTitle>
          <CardDescription>
            Сохраните API ключ и Client ID для подключения
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isConnected ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Подключение установлено! Вы можете перейти на вкладку "Календари" для просмотра.
              </AlertDescription>
            </Alert>
          ) : hasCredentials ? (
            <Alert>
              <WarningCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription>
                Учетные данные сохранены. Нажмите кнопку "Подключиться к Google" для авторизации.
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="text"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                type="text"
                placeholder="123456789-abc.apps.googleusercontent.com"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                disabled={!apiKey.trim() || !clientId.trim()}
                className="flex-1"
              >
                Сохранить учетные данные
              </Button>
              
              {hasCredentials && !isConnected && (
                <Button 
                  onClick={onConnect}
                  variant="default"
                  className="flex-1"
                >
                  Подключиться к Google
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Важно:</strong> Ваши учетные данные сохраняются только в вашем браузере 
          и не передаются на внешние серверы. Доступ к календарям осуществляется напрямую 
          через Google API.
        </AlertDescription>
      </Alert>
    </div>
  )
}

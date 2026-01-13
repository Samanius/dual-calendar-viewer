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

      <Alert className="bg-amber-50 border-amber-200">
        <WarningCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-900">
          <strong>Самые частые причины ошибки подключения:</strong>
          <ul className="mt-2 ml-4 space-y-1 text-sm list-disc">
            <li><strong>В Authorized redirect URIs добавлен только один URL</strong> - нужно добавить ОБА (ваш домен И https://accounts.google.com/o/oauth2/token)</li>
            <li>Не добавлен текущий домен в <strong>Authorized JavaScript origins</strong></li>
            <li>Ваш email не добавлен в список <strong>Test users</strong> в OAuth consent screen</li>
            <li>После создания OAuth client нужно подождать 2-3 минуты для активации</li>
          </ul>
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
          <Alert className="bg-red-50 border-red-200">
            <WarningCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-900">
              <strong>Это самый важный шаг!</strong> Ошибка "ERR_BLOCKED_BY_RESPONSE" возникает именно здесь. 
              Внимательно следуйте всем пунктам.
            </AlertDescription>
          </Alert>

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
                <strong>Если требуется</strong>, настройте OAuth consent screen:
                <ul className="mt-2 ml-4 space-y-1 text-xs list-disc">
                  <li>User Type: выберите <strong>"External"</strong></li>
                  <li>App name: укажите любое название (например, "My Calendar Viewer")</li>
                  <li>User support email: ваш email</li>
                  <li>Developer contact information: ваш email</li>
                  <li>Scopes: можно пропустить (или добавить calendar.readonly)</li>
                  <li>Test users: добавьте свой Google аккаунт в список тестовых пользователей</li>
                </ul>
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
                <strong>ВАЖНО!</strong> В поле <strong>"Authorized JavaScript origins"</strong> добавьте:
                <div className="mt-2 p-2 bg-muted rounded font-mono text-xs break-all">
                  {window.location.origin}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">5</div>
              <div>
                <strong>ВАЖНО!</strong> В поле <strong>"Authorized redirect URIs"</strong> добавьте <strong>ОБА</strong> значения:
                <div className="mt-2 space-y-2">
                  <div className="p-2 bg-muted rounded font-mono text-xs break-all">
                    {window.location.origin}
                  </div>
                  <div className="p-2 bg-muted rounded font-mono text-xs break-all">
                    https://accounts.google.com/o/oauth2/token
                  </div>
                </div>
                <div className="mt-1 text-xs text-red-600 font-semibold">
                  ⚠️ Это самая частая причина ошибки! Нужно добавить ОБА URI, а не только первый!
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">6</div>
              <div>
                Нажмите <strong>"Create"</strong> и скопируйте созданный <strong>Client ID</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">7</div>
              <div>
                <strong>Важно:</strong> После создания OAuth client может потребоваться несколько минут для активации. 
                Если сразу не работает - подождите 2-3 минуты и попробуйте снова.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-2 border-accent/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            Контрольный список перед подключением
          </CardTitle>
          <CardDescription>
            Убедитесь, что выполнили все эти шаги
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded border-2 border-accent shrink-0 mt-0.5"></div>
              <div>
                <strong>Google Calendar API включен</strong> в вашем проекте
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded border-2 border-accent shrink-0 mt-0.5"></div>
              <div>
                <strong>API Key создан</strong> и скопирован
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded border-2 border-accent shrink-0 mt-0.5"></div>
              <div>
                <strong>OAuth Consent Screen настроен</strong> с типом "External"
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded border-2 border-accent shrink-0 mt-0.5"></div>
              <div>
                <strong>Ваш email добавлен в Test users</strong> (в OAuth consent screen)
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded border-2 border-accent shrink-0 mt-0.5"></div>
              <div>
                <strong>OAuth Client ID создан</strong> с типом "Web application"
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded border-2 border-accent shrink-0 mt-0.5"></div>
              <div>
                <strong>Authorized JavaScript origins содержит:</strong>
                <div className="mt-1 p-2 bg-muted rounded font-mono text-xs break-all">
                  {window.location.origin}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded border-2 border-accent shrink-0 mt-0.5"></div>
              <div>
                <strong>Authorized redirect URIs содержит ОБА значения:</strong>
                <div className="mt-1 space-y-1">
                  <div className="p-2 bg-muted rounded font-mono text-xs break-all">
                    {window.location.origin}
                  </div>
                  <div className="p-2 bg-muted rounded font-mono text-xs break-all">
                    https://accounts.google.com/o/oauth2/token
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded border-2 border-accent shrink-0 mt-0.5"></div>
              <div>
                <strong>Подождали 2-3 минуты</strong> после создания OAuth client
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

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Решение проблем</CardTitle>
          <CardDescription>
            Если при нажатии "Подключиться к Google" возникают ошибки
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4 text-sm">
            <div>
              <div className="font-semibold text-destructive mb-2">
                ❌ Ошибка: "ERR_BLOCKED_BY_RESPONSE" или "Сайт accounts.google.com заблокирован"
              </div>
              <div className="ml-4 space-y-2">
                <div><strong>Причина:</strong> Не настроены Authorized redirect URIs или добавлен только один URI</div>
                <div><strong>Решение:</strong></div>
                <ol className="list-decimal ml-6 space-y-1">
                  <li>Вернитесь в Google Cloud Console → Credentials</li>
                  <li>Нажмите на ваш OAuth 2.0 Client ID</li>
                  <li>В "Authorized redirect URIs" нажмите "+ ADD URI" и добавьте <strong>ОБА</strong> значения:</li>
                  <li className="ml-4">
                    <div className="font-mono bg-background px-1 rounded text-xs break-all">{window.location.origin}</div>
                  </li>
                  <li className="ml-4">
                    <div className="font-mono bg-background px-1 rounded text-xs">https://accounts.google.com/o/oauth2/token</div>
                  </li>
                  <li>Нажмите "Save"</li>
                  <li>Подождите 2-3 минуты и попробуйте снова</li>
                </ol>
              </div>
            </div>

            <Separator />

            <div>
              <div className="font-semibold text-destructive mb-2">
                ❌ Ошибка: "Access blocked: This app's request is invalid"
              </div>
              <div className="ml-4 space-y-2">
                <div><strong>Причина:</strong> Не добавлен ваш email в Test users</div>
                <div><strong>Решение:</strong></div>
                <ol className="list-decimal ml-6 space-y-1">
                  <li>Откройте Google Cloud Console → OAuth consent screen</li>
                  <li>Прокрутите до секции "Test users"</li>
                  <li>Нажмите "+ ADD USERS"</li>
                  <li>Добавьте email адрес вашего Google аккаунта</li>
                  <li>Нажмите "Save"</li>
                </ol>
              </div>
            </div>

            <Separator />

            <div>
              <div className="font-semibold text-destructive mb-2">
                ❌ Ошибка: "invalid_client"
              </div>
              <div className="ml-4 space-y-2">
                <div><strong>Причина:</strong> Неправильный Client ID или не настроены JavaScript origins</div>
                <div><strong>Решение:</strong></div>
                <ol className="list-decimal ml-6 space-y-1">
                  <li>Проверьте что скопировали правильный Client ID (не Client Secret!)</li>
                  <li>Убедитесь что "Authorized JavaScript origins" содержит: <span className="font-mono bg-background px-1 rounded">{window.location.origin}</span></li>
                </ol>
              </div>
            </div>

            <Separator />

            <div>
              <div className="font-semibold text-amber-700 mb-2">
                ⚠️ Ошибка: "Ошибка инициализации API"
              </div>
              <div className="ml-4 space-y-2">
                <div><strong>Причина:</strong> Неправильный API Key или не включен Calendar API</div>
                <div><strong>Решение:</strong></div>
                <ol className="list-decimal ml-6 space-y-1">
                  <li>Проверьте что скопировали правильный API Key</li>
                  <li>Убедитесь что Google Calendar API включен (Enable) в вашем проекте</li>
                  <li>Попробуйте пересоздать API Key</li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

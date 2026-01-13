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

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-900">
          <div className="font-bold text-base mb-2">ℹ️ Важная информация о работе приложения</div>
          <div className="space-y-2 text-sm">
            <p><strong>Это приложение работает полностью в браузере без серверной части.</strong></p>
            <p>Используется OAuth2 Implicit Flow - безопасный метод авторизации для браузерных приложений.</p>
            <p>После авторизации Google перенаправит вас обратно в приложение с токеном доступа.</p>
            <p>Вам нужно настроить OAuth client с типом "Web application" и добавить URL этого приложения в настройки.</p>
          </div>
        </AlertDescription>
      </Alert>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Для работы необходимо создать проект в Google Cloud Console 
          и получить <strong>API Key</strong> и <strong>Client ID</strong> (Client Secret НЕ нужен для браузерных приложений).
        </AlertDescription>
      </Alert>

      <Alert className="bg-amber-50 border-amber-200">
        <WarningCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-900">
          <strong>⚠️ Самые частые причины ошибки подключения:</strong>
          <ul className="mt-2 ml-4 space-y-1 text-sm list-disc">
            <li>Не добавлен URL приложения в <strong>Authorized JavaScript origins</strong></li>
            <li>Не добавлен URL со слэшем в конце в <strong>Authorized redirect URIs</strong></li>
            <li>Ваш email не добавлен в список <strong>Test users</strong> в OAuth consent screen</li>
            <li>После создания OAuth client нужно подождать 5-10 минут для активации</li>
            <li>Вы случайно скопировали Client Secret вместо Client ID (Client Secret не нужен!)</li>
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
          <CardTitle>Шаг 3: Настройте OAuth Consent Screen</CardTitle>
          <CardDescription>
            Это нужно сделать перед созданием OAuth Client ID
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">1</div>
              <div>
                Перейдите в <strong>"APIs & Services"</strong> → <strong>"OAuth consent screen"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">2</div>
              <div>
                User Type: выберите <strong>"External"</strong> и нажмите "Create"
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">3</div>
              <div>
                Заполните обязательные поля:
                <ul className="mt-2 ml-4 space-y-1 text-xs list-disc">
                  <li><strong>App name:</strong> Любое название (например, "Calendar Viewer")</li>
                  <li><strong>User support email:</strong> Ваш email</li>
                  <li><strong>Developer contact information:</strong> Ваш email</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">4</div>
              <div>
                На странице "Scopes": нажмите "Save and Continue" (можно пропустить, scope будет запрошен приложением)
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">5</div>
              <div>
                <strong>КРИТИЧЕСКИ ВАЖНО!</strong> На странице "Test users":
                <ul className="mt-2 ml-4 space-y-1 text-xs list-disc">
                  <li>Нажмите <strong>"+ ADD USERS"</strong></li>
                  <li>Добавьте email адрес вашего Google аккаунта</li>
                  <li>Нажмите "Save"</li>
                </ul>
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-900">
                  ⚠️ Без этого шага вы получите ошибку "Access blocked" при авторизации!
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">6</div>
              <div>
                Нажмите "Save and Continue", затем "Back to Dashboard"
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Шаг 4: Создайте OAuth 2.0 Client ID</CardTitle>
          <CardDescription>
            Для авторизации в браузере (Implicit Flow)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <div className="font-bold mb-1">💡 Браузерная авторизация</div>
              <p className="text-sm">
                Приложение использует OAuth2 Implicit Flow - безопасный метод для браузерных приложений БЕЗ серверной части. 
                Client Secret НЕ нужен и НЕ должен использоваться в браузерных приложениях!
              </p>
            </AlertDescription>
          </Alert>

          <div className="space-y-3 text-sm">
            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">1</div>
              <div>
                Вернитесь в <strong>"APIs & Services"</strong> → <strong>"Credentials"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">2</div>
              <div>
                Нажмите <strong>"+ Create Credentials"</strong> → <strong>"OAuth client ID"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">3</div>
              <div>
                Application type: выберите <strong>"Web application"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">4</div>
              <div>
                Name: укажите любое название (например, "Calendar Web Client")
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">5</div>
              <div>
                <strong>КРИТИЧЕСКИ ВАЖНО!</strong> В секции <strong>"Authorized JavaScript origins"</strong>:
                <ul className="mt-2 ml-4 space-y-1 text-xs list-disc">
                  <li>Нажмите "+ ADD URI"</li>
                  <li>Добавьте точный URL этого приложения:</li>
                </ul>
                <div className="mt-2 p-3 bg-primary text-primary-foreground rounded font-mono text-xs break-all font-bold">
                  {window.location.origin}
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Скопируйте этот URL точно как показано (без / в конце)
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">6</div>
              <div>
                <strong>ОБЯЗАТЕЛЬНО!</strong> В секции <strong>"Authorized redirect URIs"</strong>:
                <ul className="mt-2 ml-4 space-y-1 text-xs list-disc">
                  <li>Нажмите "+ ADD URI"</li>
                  <li>Добавьте тот же URL, но СО СЛЭШЕМ в конце:</li>
                </ul>
                <div className="mt-2 p-3 bg-secondary text-secondary-foreground rounded font-mono text-xs break-all font-bold">
                  {window.location.origin}/
                </div>
                <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-900 text-xs">
                  ⚠️ Обратите внимание на слэш "/" в конце - это разные URL! Нужны ОБА!
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">7</div>
              <div>
                Нажмите <strong>"Create"</strong>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">8</div>
              <div>
                В появившемся окне скопируйте <strong>Client ID</strong>
                <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-blue-900 text-xs">
                  💡 НЕ копируйте Client Secret - он не нужен для браузерных приложений и НЕ должен быть доступен в браузере!
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="font-mono bg-muted px-2 py-1 rounded text-xs shrink-0">9</div>
              <div>
                <strong>Подождите 5-10 минут</strong> после создания - изменения в Google Cloud Console применяются не мгновенно
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
            ✅ Контрольный список перед подключением
          </CardTitle>
          <CardDescription>
            Убедитесь, что выполнили ВСЕ эти шаги точно
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong>Google Calendar API включен</strong> в вашем проекте (APIs & Services → Library)
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong>API Key создан</strong> (Credentials → Create Credentials → API key)
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong>OAuth Consent Screen настроен</strong> с User Type "External"
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong className="text-amber-700">⚠️ Ваш email добавлен в Test users</strong> (это КРИТИЧЕСКИ важно!)
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong>OAuth Client ID создан</strong> с Application type "Web application"
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong>Authorized JavaScript origins содержит (БЕЗ / в конце):</strong>
                <div className="mt-1 p-2 bg-primary/10 border border-primary/30 rounded font-mono text-xs break-all">
                  {window.location.origin}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong>Authorized redirect URIs содержит (СО СЛЭШЕМ / в конце):</strong>
                <div className="mt-1 p-2 bg-secondary/10 border border-secondary/30 rounded font-mono text-xs break-all">
                  {window.location.origin}/
                </div>
                <div className="mt-1 text-xs text-muted-foreground italic">
                  Важно: это два РАЗНЫХ URL! Origin без /, Redirect URI со слэшем!
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong>Скопирован Client ID</strong> (длинная строка заканчивающаяся на .apps.googleusercontent.com)
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="text-lg shrink-0">☑️</div>
              <div>
                <strong>Подождали 5-10 минут</strong> после создания/изменения OAuth client
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Шаг 5: Введите ваши учетные данные</CardTitle>
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

      <Alert className="bg-green-50 border-green-200">
        <Info className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-900">
          <div className="font-bold mb-1">🔒 Безопасность и конфиденциальность</div>
          <ul className="text-sm space-y-1">
            <li>• Приложение работает <strong>полностью в вашем браузере</strong> - нет серверной части</li>
            <li>• API Key и Client ID сохраняются <strong>только в вашем браузере</strong> (localStorage)</li>
            <li>• Токены доступа НЕ передаются на внешние серверы</li>
            <li>• Доступ к календарям осуществляется <strong>напрямую через Google API</strong></li>
            <li>• Client Secret НЕ используется - это правильная практика для браузерных приложений</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Card className="bg-muted/50 border-2 border-amber-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <WarningCircle className="h-5 w-5 text-amber-600" />
            🔧 Решение проблем
          </CardTitle>
          <CardDescription>
            Если при нажатии "Подключиться к Google" возникают ошибки
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-5 text-sm">
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="font-semibold text-red-700 mb-2 text-base">
                ❌ Ошибка: "invalid_client" или "401"
              </div>
              <div className="ml-2 space-y-2 text-red-900">
                <div><strong>Причина:</strong> Неправильный Client ID или некорректные настройки URIs</div>
                <div><strong>Решение:</strong></div>
                <ol className="list-decimal ml-6 space-y-1 text-xs">
                  <li>Проверьте, что скопировали именно <strong>Client ID</strong>, а НЕ Client Secret</li>
                  <li>Client ID должен заканчиваться на <code className="bg-red-100 px-1 rounded">.apps.googleusercontent.com</code></li>
                  <li>Убедитесь, что в "Authorized JavaScript origins" добавлен URL БЕЗ слэша: <code className="bg-red-100 px-1 rounded">{window.location.origin}</code></li>
                  <li>Убедитесь, что в "Authorized redirect URIs" добавлен URL СО слэшем: <code className="bg-red-100 px-1 rounded">{window.location.origin}/</code></li>
                  <li><strong>Подождите 5-10 минут</strong> после создания/изменения OAuth client</li>
                  <li>Очистите кэш браузера или попробуйте в режиме инкогнито</li>
                </ol>
              </div>
            </div>

            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="font-semibold text-red-700 mb-2 text-base">
                ❌ Ошибка: "Access blocked: This app's request is invalid"
              </div>
              <div className="ml-2 space-y-2 text-red-900">
                <div><strong>Причина:</strong> Ваш email НЕ добавлен в Test users</div>
                <div><strong>Решение (это КРИТИЧЕСКИ важно!):</strong></div>
                <ol className="list-decimal ml-6 space-y-1 text-xs">
                  <li>Откройте <strong>Google Cloud Console</strong> → <strong>OAuth consent screen</strong></li>
                  <li>Прокрутите вниз до секции <strong>"Test users"</strong></li>
                  <li>Нажмите <strong>"+ ADD USERS"</strong></li>
                  <li>Введите email вашего Google аккаунта (тот, с которого пытаетесь войти)</li>
                  <li>Нажмите <strong>"Save"</strong></li>
                  <li>Подождите 2-3 минуты и попробуйте снова</li>
                </ol>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <div className="font-semibold text-amber-800 mb-2 text-base">
                ⚠️ Ошибка: "redirect_uri_mismatch"
              </div>
              <div className="ml-2 space-y-2 text-amber-900">
                <div><strong>Причина:</strong> Redirect URI не совпадает с настройками</div>
                <div><strong>Решение:</strong></div>
                <ol className="list-decimal ml-6 space-y-1 text-xs">
                  <li>Откройте Google Cloud Console → Credentials</li>
                  <li>Нажмите на ваш OAuth client ID</li>
                  <li>В "Authorized redirect URIs" должен быть ТОЧНЫЙ URL со слэшем в конце:</li>
                  <li className="ml-4"><code className="bg-amber-100 px-1 rounded break-all">{window.location.origin}/</code></li>
                  <li>Слэш "/" в конце обязателен - это важно!</li>
                  <li>Нажмите "Save" и подождите 2-3 минуты</li>
                </ol>
              </div>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded">
              <div className="font-semibold text-amber-800 mb-2 text-base">
                ⚠️ Ошибка: "Ошибка инициализации API"
              </div>
              <div className="ml-2 space-y-2 text-amber-900">
                <div><strong>Причина:</strong> Проблема с API Key или Calendar API не включен</div>
                <div><strong>Решение:</strong></div>
                <ol className="list-decimal ml-6 space-y-1 text-xs">
                  <li>Проверьте, что скопировали правильный API Key (начинается с AIza...)</li>
                  <li>Откройте Google Cloud Console → APIs & Services → Library</li>
                  <li>Найдите "Google Calendar API"</li>
                  <li>Убедитесь, что он <strong>Enabled</strong> (если нет - нажмите Enable)</li>
                  <li>Если API Key старый, попробуйте создать новый</li>
                </ol>
              </div>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <div className="font-semibold text-blue-800 mb-2 text-base">
                💡 Общие рекомендации
              </div>
              <div className="ml-2 space-y-1 text-xs text-blue-900">
                <ul className="list-disc ml-6 space-y-1">
                  <li><strong>Всегда ждите 5-10 минут</strong> после создания или изменения OAuth credentials</li>
                  <li>Убедитесь, что используете правильный Google аккаунт (тот, который добавлен в Test users)</li>
                  <li>Попробуйте очистить кэш браузера или использовать режим инкогнито</li>
                  <li>Проверьте, что ваш проект в Google Cloud Console активен</li>
                  <li>В браузерной консоли (F12) могут быть более детальные сообщения об ошибках</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

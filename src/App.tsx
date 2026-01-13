import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toaster, toast } from 'sonner'
import { CalendarView } from '@/components/CalendarView'
import { SetupInstructions } from '@/components/SetupInstructions'
import { Calendar, GoogleCalendarConfig } from '@/lib/types'
import {
  initializeGoogleAPI,
  requestAccessToken,
  listCalendars,
  isApiInitialized,
  hasValidToken,
} from '@/lib/google-calendar-api'
import { Gear, CalendarBlank } from '@phosphor-icons/react'

function App() {
  const [config, setConfig] = useKV<GoogleCalendarConfig | null>('google-calendar-config', null)
  const [calendars, setCalendars] = useState<Calendar[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isInitializing, setIsInitializing] = useState(false)
  const [activeTab, setActiveTab] = useState('setup')

  useEffect(() => {
    if (config?.apiKey && config?.clientId) {
      initializeAPI()
    }
  }, [config])

  const initializeAPI = async () => {
    if (!config?.apiKey || !config?.clientId || isInitializing) return

    setIsInitializing(true)
    try {
      const initialized = await initializeGoogleAPI({
        apiKey: config.apiKey,
        clientId: config.clientId,
      })

      if (initialized && hasValidToken()) {
        await loadCalendars()
        setIsConnected(true)
        setActiveTab('calendars')
      }
    } catch (error) {
      console.error('Error initializing API:', error)
      toast.error('Ошибка инициализации API')
    } finally {
      setIsInitializing(false)
    }
  }

  const handleSaveCredentials = (apiKey: string, clientId: string) => {
    setConfig({ apiKey, clientId })
    toast.success('Учетные данные сохранены')
  }

  const handleConnect = async () => {
    if (!config?.apiKey || !config?.clientId) {
      toast.error('Сначала сохраните учетные данные')
      return
    }

    try {
      if (!isApiInitialized()) {
        await initializeAPI()
      }

      const token = await requestAccessToken()
      
      if (token) {
        await loadCalendars()
        setIsConnected(true)
        toast.success('Успешное подключение к Google Calendar')
        setActiveTab('calendars')
      }
    } catch (error) {
      console.error('Error connecting:', error)
      toast.error('Ошибка подключения. Проверьте учетные данные.')
    }
  }

  const loadCalendars = async () => {
    try {
      const calendarList = await listCalendars()
      setCalendars(calendarList)
    } catch (error) {
      console.error('Error loading calendars:', error)
      toast.error('Ошибка загрузки списка календарей')
    }
  }

  const hasCredentials = !!(config?.apiKey && config?.clientId)

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-screen flex flex-col">
        <TabsList className="w-full rounded-none border-b h-auto p-0">
          <TabsTrigger 
            value="calendars" 
            className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-accent py-3"
          >
            <CalendarBlank className="w-5 h-5 mr-2" />
            Календари
          </TabsTrigger>
          <TabsTrigger 
            value="setup"
            className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-accent py-3"
          >
            <Gear className="w-5 h-5 mr-2" />
            Настройка
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendars" className="flex-1 m-0 overflow-auto">
          <CalendarView
            calendars={calendars}
            isConnected={isConnected}
            onNavigateToSetup={() => setActiveTab('setup')}
          />
        </TabsContent>

        <TabsContent value="setup" className="flex-1 m-0 overflow-auto">
          <SetupInstructions
            onSaveCredentials={handleSaveCredentials}
            onConnect={handleConnect}
            isConnected={isConnected}
            hasCredentials={hasCredentials}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App
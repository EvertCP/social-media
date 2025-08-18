"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Switch } from "../../components/ui/switch"
import { Navigation } from "../../components/navigation/navigation"
import { SearchInput } from "../../components/ui/search-input"
import { ProfileMenu } from "../../components/profile-menu"
import { Home, Users, BarChart3, Calendar as CalendarIcon, MessageSquare, Settings, FileText } from "../../lib/mock-icons"

// Tipo para la configuración de usuario
type UserSettings = {
  profile: {
    name: string
    email: string
    avatar?: string
    company: string
    role: string
  }
  notifications: {
    email: boolean
    push: boolean
    messages: boolean
    mentions: boolean
    analytics: boolean
    teamActivity: boolean
  }
  security: {
    twoFactorEnabled: boolean
    lastPasswordChange: Date
    sessions: {
      id: string
      device: string
      location: string
      lastActive: Date
      current: boolean
    }[]
  }
  preferences: {
    theme: "light" | "dark" | "system"
    language: string
    timezone: string
    dateFormat: string
    autoPublish: boolean
  }
  integrations: {
    id: string
    name: string
    connected: boolean
    lastSync?: Date
  }[]
}

// Datos de ejemplo para la configuración
const mockSettings: UserSettings = {
  profile: {
    name: "Carlos Martínez",
    email: "carlos@empresa.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    company: "Mi Empresa, S.L.",
    role: "Administrador"
  },
  notifications: {
    email: true,
    push: true,
    messages: true,
    mentions: false,
    analytics: true,
    teamActivity: false
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: new Date(2025, 5, 15),
    sessions: [
      {
        id: "1",
        device: "Chrome en Windows",
        location: "Madrid, España",
        lastActive: new Date(2025, 7, 17, 15, 30),
        current: true
      },
      {
        id: "2",
        device: "Safari en iPhone",
        location: "Madrid, España",
        lastActive: new Date(2025, 7, 16, 10, 15),
        current: false
      },
      {
        id: "3",
        device: "Firefox en MacOS",
        location: "Barcelona, España",
        lastActive: new Date(2025, 7, 14, 9, 45),
        current: false
      }
    ]
  },
  preferences: {
    theme: "system",
    language: "es",
    timezone: "Europe/Madrid",
    dateFormat: "DD/MM/YYYY",
    autoPublish: false
  },
  integrations: [
    {
      id: "google-analytics",
      name: "Google Analytics",
      connected: true,
      lastSync: new Date(2025, 7, 16, 23, 0)
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      connected: true,
      lastSync: new Date(2025, 7, 15, 23, 0)
    },
    {
      id: "google-drive",
      name: "Google Drive",
      connected: false
    },
    {
      id: "slack",
      name: "Slack",
      connected: false
    }
  ]
}

// Función para formatear la fecha
function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

// Función para formatear la fecha y hora
function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Componente para la sección de perfil
function ProfileSection({ profile }: { profile: UserSettings['profile'] }) {
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState(profile)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    setEditing(false)
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Gestiona tu información personal</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          {profile.avatar ? (
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-2xl font-medium">
                {profile.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-xl font-medium">{profile.name}</h3>
            <p className="text-gray-500">{profile.role} en {profile.company}</p>
          </div>
        </div>
        
        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rol</Label>
                <Input 
                  id="role" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange} 
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Nombre</h4>
                <p>{profile.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p>{profile.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Empresa</h4>
                <p>{profile.company}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Rol</h4>
                <p>{profile.role}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {editing ? (
          <div className="flex space-x-2">
            <Button onClick={handleSave}>Guardar cambios</Button>
            <Button variant="outline" onClick={() => setEditing(false)}>Cancelar</Button>
          </div>
        ) : (
          <Button onClick={() => setEditing(true)}>Editar perfil</Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Componente para la sección de notificaciones
function NotificationsSection({ notifications }: { notifications: UserSettings['notifications'] }) {
  const [settings, setSettings] = useState(notifications)
  
  const handleToggle = (key: keyof typeof settings) => {
    setSettings({
      ...settings,
      [key]: !settings[key]
    })
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificaciones</CardTitle>
        <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notificaciones por email</h4>
              <p className="text-sm text-gray-500">Recibe actualizaciones por email</p>
            </div>
            <Switch 
              checked={settings.email} 
              onCheckedChange={() => handleToggle('email')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Notificaciones push</h4>
              <p className="text-sm text-gray-500">Recibe notificaciones en el navegador</p>
            </div>
            <Switch 
              checked={settings.push} 
              onCheckedChange={() => handleToggle('push')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Mensajes</h4>
              <p className="text-sm text-gray-500">Notificaciones cuando recibas mensajes</p>
            </div>
            <Switch 
              checked={settings.messages} 
              onCheckedChange={() => handleToggle('messages')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Menciones</h4>
              <p className="text-sm text-gray-500">Notificaciones cuando te mencionen</p>
            </div>
            <Switch 
              checked={settings.mentions} 
              onCheckedChange={() => handleToggle('mentions')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Analíticas</h4>
              <p className="text-sm text-gray-500">Informes periódicos de analíticas</p>
            </div>
            <Switch 
              checked={settings.analytics} 
              onCheckedChange={() => handleToggle('analytics')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Actividad del equipo</h4>
              <p className="text-sm text-gray-500">Notificaciones sobre la actividad de tu equipo</p>
            </div>
            <Switch 
              checked={settings.teamActivity} 
              onCheckedChange={() => handleToggle('teamActivity')} 
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Guardar preferencias</Button>
      </CardFooter>
    </Card>
  )
}

// Componente para la sección de seguridad
function SecuritySection({ security }: { security: UserSettings['security'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguridad</CardTitle>
        <CardDescription>Gestiona la seguridad de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium">Autenticación de dos factores</h4>
                <p className="text-sm text-gray-500">Añade una capa extra de seguridad a tu cuenta</p>
              </div>
              <Switch checked={security.twoFactorEnabled} />
            </div>
            {!security.twoFactorEnabled && (
              <Button variant="outline" size="sm">
                Activar 2FA
              </Button>
            )}
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Contraseña</h4>
            <p className="text-sm text-gray-500 mb-2">
              Última actualización: {formatDate(security.lastPasswordChange)}
            </p>
            <Button variant="outline" size="sm">
              Cambiar contraseña
            </Button>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Sesiones activas</h4>
            <div className="space-y-3">
              {security.sessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`p-3 border rounded-lg ${session.current ? "border-blue-500 bg-blue-50" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-medium">{session.device}</h5>
                      <p className="text-sm text-gray-500">{session.location}</p>
                      <p className="text-xs text-gray-500">
                        Última actividad: {formatDateTime(session.lastActive)}
                      </p>
                    </div>
                    {session.current ? (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Sesión actual
                      </span>
                    ) : (
                      <Button variant="ghost" size="sm" className="text-red-600">
                        Cerrar sesión
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="text-red-600">
          Cerrar todas las sesiones
        </Button>
      </CardFooter>
    </Card>
  )
}

// Componente para la sección de preferencias
function PreferencesSection({ preferences }: { preferences: UserSettings['preferences'] }) {
  const [settings, setSettings] = useState(preferences)
  
  const handleThemeChange = (theme: "light" | "dark" | "system") => {
    setSettings({
      ...settings,
      theme
    })
  }
  
  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings({
        ...settings,
        [key]: !settings[key]
      })
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias</CardTitle>
        <CardDescription>Personaliza tu experiencia</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Tema</h4>
            <div className="flex space-x-2">
              <Button 
                variant={settings.theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("light")}
              >
                Claro
              </Button>
              <Button 
                variant={settings.theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("dark")}
              >
                Oscuro
              </Button>
              <Button 
                variant={settings.theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("system")}
              >
                Sistema
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <select 
                id="language" 
                className="w-full border rounded-md p-2"
                value={settings.language}
                onChange={(e) => setSettings({...settings, language: e.target.value})}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Zona horaria</Label>
              <select 
                id="timezone" 
                className="w-full border rounded-md p-2"
                value={settings.timezone}
                onChange={(e) => setSettings({...settings, timezone: e.target.value})}
              >
                <option value="Europe/Madrid">Europe/Madrid</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateFormat">Formato de fecha</Label>
            <select 
              id="dateFormat" 
              className="w-full border rounded-md p-2"
              value={settings.dateFormat}
              onChange={(e) => setSettings({...settings, dateFormat: e.target.value})}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Publicación automática</h4>
              <p className="text-sm text-gray-500">Publicar automáticamente el contenido programado</p>
            </div>
            <Switch 
              checked={settings.autoPublish} 
              onCheckedChange={() => handleToggle('autoPublish')} 
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Guardar preferencias</Button>
      </CardFooter>
    </Card>
  )
}

// Componente para la sección de integraciones
function IntegrationsSection({ integrations }: { integrations: UserSettings['integrations'] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integraciones</CardTitle>
        <CardDescription>Conecta con otras plataformas y servicios</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div 
              key={integration.id} 
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 className="font-medium">{integration.name}</h4>
                {integration.connected && integration.lastSync && (
                  <p className="text-xs text-gray-500">
                    Última sincronización: {formatDateTime(integration.lastSync)}
                  </p>
                )}
              </div>
              {integration.connected ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Conectado
                  </span>
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    Desconectar
                  </Button>
                </div>
              ) : (
                <Button size="sm">
                  Conectar
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline">
          Explorar más integraciones
        </Button>
      </CardFooter>
    </Card>
  )
}

// Configuración de los items de la barra lateral
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
  { id: "cuentas", label: "Cuentas", icon: Users, href: "/cuentas" },
  { id: "programacion", label: "Programación", icon: CalendarIcon, href: "/programacion" },
  { id: "contenido", label: "Contenido", icon: FileText, href: "/contenido" },
  { id: "analiticas", label: "Analíticas", icon: BarChart3, href: "/analiticas" },
  { id: "mensajes", label: "Mensajes", icon: MessageSquare, href: "/mensajes" },
  { id: "configuracion", label: "Configuración", icon: Settings, href: "/configuracion", active: true },
]

// Contenido de la barra superior
const leftTopContent = <SearchInput className="w-[300px]" />
const rightTopContent = (
  <div className="flex items-center gap-4">
    <Button>
      Nueva publicación
    </Button>
    <ProfileMenu />
  </div>
)

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(mockSettings)

  return (
    <Navigation
      sidebarItems={sidebarItems}
      leftTopContent={leftTopContent}
      rightTopContent={rightTopContent}
    >
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Configuración</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-0">
          <ProfileSection profile={settings.profile} />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0">
          <NotificationsSection notifications={settings.notifications} />
        </TabsContent>
        
        <TabsContent value="security" className="mt-0">
          <SecuritySection security={settings.security} />
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-0">
          <PreferencesSection preferences={settings.preferences} />
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-0">
          <IntegrationsSection integrations={settings.integrations} />
        </TabsContent>
      </Tabs>
    </div>
    </Navigation>
  )
}

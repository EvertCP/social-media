"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Check, X, ExternalLink, Instagram, Twitter, Facebook, Linkedin, Youtube, TikTok, Home, BarChart3, MessageSquare, Calendar, Settings, Users, FileText } from "../../lib/mock-icons"
import { AddAccountDialog } from "../../components/add-account-dialog"
import { AccountPermissionsDialog } from "../../components/account-permissions-dialog"
import { Navigation } from "../../components/navigation/navigation"
import { SearchInput } from "../../components/ui/search-input"
import { ProfileMenu } from "../../components/profile-menu"

// Tipo para las cuentas de redes sociales
type SocialAccount = {
  id: string
  platform: "instagram" | "twitter" | "facebook" | "linkedin" | "youtube" | "tiktok"
  username: string
  profileUrl: string
  connected: boolean
  avatar?: string
  followers?: number
  posts?: number
}

// Tipo para la plataforma de redes sociales
type SocialPlatform = SocialAccount["platform"]

// Datos de ejemplo para las cuentas
const mockAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "instagram",
    username: "@tuempresa",
    profileUrl: "https://instagram.com/tuempresa",
    connected: true,
    avatar: "/avatars/instagram.png",
    followers: 12500,
    posts: 342
  },
  {
    id: "2",
    platform: "twitter",
    username: "@tuempresa",
    profileUrl: "https://twitter.com/tuempresa",
    connected: true,
    avatar: "/avatars/twitter.png",
    followers: 8200,
    posts: 1240
  },
  {
    id: "3",
    platform: "facebook",
    username: "Tu Empresa",
    profileUrl: "https://facebook.com/tuempresa",
    connected: false,
    avatar: "/avatars/facebook.png"
  },
  {
    id: "4",
    platform: "linkedin",
    username: "Tu Empresa SL",
    profileUrl: "https://linkedin.com/company/tuempresa",
    connected: false,
    avatar: "/avatars/linkedin.png"
  },
  {
    id: "5",
    platform: "youtube",
    username: "Tu Empresa",
    profileUrl: "https://youtube.com/c/tuempresa",
    connected: false,
    avatar: "/avatars/youtube.png"
  },
  {
    id: "6",
    platform: "tiktok",
    username: "@tuempresa",
    profileUrl: "https://tiktok.com/@tuempresa",
    connected: false,
    avatar: "/avatars/tiktok.png"
  }
]

// Función para obtener el icono según la plataforma
const getPlatformIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="h-5 w-5" />
    case "twitter":
      return <Twitter className="h-5 w-5" />
    case "facebook":
      return <Facebook className="h-5 w-5" />
    case "linkedin":
      return <Linkedin className="h-5 w-5" />
    case "youtube":
      return <Youtube className="h-5 w-5" />
    case "tiktok":
      return <TikTok className="h-5 w-5" />
    default:
      return null
  }
}

// Función para obtener el color según la plataforma
const getPlatformColor = (platform: string) => {
  switch (platform) {
    case "instagram":
      return "bg-gradient-to-r from-purple-500 to-pink-500"
    case "twitter":
      return "bg-blue-400"
    case "facebook":
      return "bg-blue-600"
    case "linkedin":
      return "bg-blue-700"
    case "youtube":
      return "bg-red-600"
    case "tiktok":
      return "bg-black"
    default:
      return "bg-gray-500"
  }
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<SocialAccount[]>(mockAccounts)
  
  // Estado para el filtro de plataforma
  const [platformFilter, setPlatformFilter] = useState<SocialPlatform | "all">("all")
  
  // Función para conectar o desconectar una cuenta
  const toggleConnection = (id: string) => {
    setAccounts(accounts.map(account => 
      account.id === id ? { ...account, connected: !account.connected } : account
    ))
  }
  
  // Función para actualizar los permisos de una cuenta
  const updatePermissions = (accountId: string, permissions: any[]) => {
    console.log(`Actualizando permisos para la cuenta ${accountId}:`, permissions)
    // Aquí se implementaría la lógica para guardar los permisos en el backend
    // Por ahora solo mostramos un mensaje en la consola
  }
  
  // Filtrar cuentas por plataforma y por estado de conexión
  const getFilteredAccounts = (accounts: SocialAccount[], connectionFilter: "all" | "connected" | "disconnected") => {
    let filtered = accounts;
    
    // Primero filtrar por plataforma si es necesario
    if (platformFilter !== "all") {
      filtered = filtered.filter(account => account.platform === platformFilter);
    }
    
    // Luego filtrar por estado de conexión
    if (connectionFilter === "connected") {
      filtered = filtered.filter(account => account.connected);
    } else if (connectionFilter === "disconnected") {
      filtered = filtered.filter(account => !account.connected);
    }
    
    return filtered;
  }

  // Configuración de los items de la barra lateral
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
    { id: "cuentas", label: "Cuentas", icon: Users, href: "/cuentas" },
    { id: "programacion", label: "Programación", icon: Calendar, href: "/programacion" },
    { id: "contenido", label: "Contenido", icon: FileText, href: "/contenido" },
    { id: "analiticas", label: "Analíticas", icon: BarChart3, href: "/analiticas" },
    { id: "mensajes", label: "Mensajes", icon: MessageSquare, href: "/mensajes" },
    { id: "configuracion", label: "Configuración", icon: Settings, href: "/configuracion" },
  ]

  // Contenido de la barra superior
  const leftTopContent = <SearchInput className="w-[300px]" />
  const rightTopContent = (
    <div className="flex items-center gap-4">
      <Button variant="outline">
        Añadir cuenta
      </Button>
      <ProfileMenu />
    </div>
  )

  return (
    <Navigation
      sidebarItems={sidebarItems}
      leftTopContent={leftTopContent}
      rightTopContent={rightTopContent}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Cuentas de Redes Sociales</h1>
            <p className="text-muted-foreground mt-1">
              Conecta y gestiona tus cuentas de redes sociales
            </p>
          </div>
          <AddAccountDialog onAddAccount={(platform, username, profileUrl) => {
            // Crear una nueva cuenta y añadirla al estado
            const newAccount: SocialAccount = {
              id: `${accounts.length + 1}`,
              platform,
              username,
              profileUrl,
              connected: true,
              followers: 0,
              posts: 0
            };
            setAccounts([...accounts, newAccount]);
          }} />
        </div>

        {/* Selector de plataforma */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium">Filtrar por plataforma:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={platformFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setPlatformFilter("all")}
            >
              Todas
            </Button>
            <Button 
              variant={platformFilter === "instagram" ? "default" : "outline"}
              size="sm"
              className={platformFilter === "instagram" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              onClick={() => setPlatformFilter("instagram")}
            >
              <Instagram className="h-4 w-4 mr-2" /> Instagram
            </Button>
            <Button 
              variant={platformFilter === "twitter" ? "default" : "outline"}
              size="sm"
              className={platformFilter === "twitter" ? "bg-blue-400" : ""}
              onClick={() => setPlatformFilter("twitter")}
            >
              <Twitter className="h-4 w-4 mr-2" /> Twitter
            </Button>
            <Button 
              variant={platformFilter === "facebook" ? "default" : "outline"}
              size="sm"
              className={platformFilter === "facebook" ? "bg-blue-600" : ""}
              onClick={() => setPlatformFilter("facebook")}
            >
              <Facebook className="h-4 w-4 mr-2" /> Facebook
            </Button>
            <Button 
              variant={platformFilter === "linkedin" ? "default" : "outline"}
              size="sm"
              className={platformFilter === "linkedin" ? "bg-blue-700" : ""}
              onClick={() => setPlatformFilter("linkedin")}
            >
              <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
            </Button>
            <Button 
              variant={platformFilter === "youtube" ? "default" : "outline"}
              size="sm"
              className={platformFilter === "youtube" ? "bg-red-600" : ""}
              onClick={() => setPlatformFilter("youtube")}
            >
              <Youtube className="h-4 w-4 mr-2" /> YouTube
            </Button>
            <Button 
              variant={platformFilter === "tiktok" ? "default" : "outline"}
              size="sm"
              className={platformFilter === "tiktok" ? "bg-black" : ""}
              onClick={() => setPlatformFilter("tiktok")}
            >
              <TikTok className="h-4 w-4 mr-2" /> TikTok
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="connected">Conectadas</TabsTrigger>
            <TabsTrigger value="disconnected">No conectadas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredAccounts(accounts, "all").map((account) => (
                <AccountCard 
                  key={account.id} 
                  account={account} 
                  onToggleConnection={toggleConnection} 
                />
              ))}
            </div>
            {getFilteredAccounts(accounts, "all").length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No hay cuentas que coincidan con los filtros seleccionados</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="connected" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredAccounts(accounts, "connected").map((account) => (
                <AccountCard 
                  key={account.id} 
                  account={account} 
                  onToggleConnection={toggleConnection} 
                />
              ))}
            </div>
            {getFilteredAccounts(accounts, "connected").length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No hay cuentas conectadas que coincidan con los filtros seleccionados</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="disconnected" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getFilteredAccounts(accounts, "disconnected").map((account) => (
                <AccountCard 
                  key={account.id} 
                  account={account} 
                  onToggleConnection={toggleConnection} 
                />
              ))}
            </div>
            {getFilteredAccounts(accounts, "disconnected").length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No hay cuentas desconectadas que coincidan con los filtros seleccionados</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Navigation>
  )
}

// Componente para mostrar una cuenta individual
function AccountCard({ 
  account, 
  onToggleConnection 
}: { 
  account: SocialAccount
  onToggleConnection: (id: string) => void 
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white mr-3 ${getPlatformColor(account.platform)}`}>
              {getPlatformIcon(account.platform)}
            </div>
            <div>
              <CardTitle className="text-lg">{account.username}</CardTitle>
              <CardDescription className="capitalize">
                {account.platform}
              </CardDescription>
            </div>
          </div>
          <Badge variant={account.connected ? "default" : "outline"}>
            {account.connected ? "Conectada" : "No conectada"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {account.connected && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{account.followers?.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Seguidores</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{account.posts?.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Publicaciones</p>
            </div>
          </div>
        )}
        
        {!account.connected && (
          <div className="py-4 text-center">
            <p className="text-muted-foreground">
              Conecta esta cuenta para gestionar tu contenido
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 justify-between">
        <div className="flex gap-2">
          <Button 
            variant={account.connected ? "destructive" : "default"}
            onClick={() => onToggleConnection(account.id)}
          >
            {account.connected ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Desconectar
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Conectar
              </>
            )}
          </Button>
          
          {/* Mostrar el diálogo de permisos solo si la cuenta está conectada */}
          {account.connected && (
            <AccountPermissionsDialog
              accountId={account.id}
              accountName={account.username}
              platform={account.platform}
              onUpdatePermissions={(accountId, permissions) => {
                console.log(`Permisos actualizados para ${accountId}:`, permissions);
                // Aquí se implementaría la lógica para guardar los permisos
              }}
            />
          )}
        </div>
        
        <Button variant="outline" asChild>
          <a href={account.profileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver perfil
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

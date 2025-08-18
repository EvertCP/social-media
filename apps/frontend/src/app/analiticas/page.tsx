"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Instagram, Twitter, Facebook, Linkedin, Youtube, TikTok } from "../../lib/mock-icons"
import { Navigation } from "../../components/navigation/navigation"
import { SearchInput } from "../../components/ui/search-input"
import { ProfileMenu } from "../../components/profile-menu"
import { Home, Users, BarChart3, Calendar as CalendarIcon, MessageSquare, Settings, FileText } from "../../lib/mock-icons"


// Tipo para datos de analíticas
type AnalyticsData = {
  platform: string
  followers: number
  followersChange: number
  engagement: number
  engagementChange: number
  impressions: number
  impressionsChange: number
  clicks: number
  clicksChange: number
  topPosts: {
    id: string
    title: string
    engagement: number
    impressions: number
  }[]
}

// Datos de ejemplo para analíticas
const mockAnalytics: AnalyticsData[] = [
  {
    platform: "instagram",
    followers: 12500,
    followersChange: 320,
    engagement: 4.2,
    engagementChange: 0.3,
    impressions: 45000,
    impressionsChange: 1200,
    clicks: 1800,
    clicksChange: 150,
    topPosts: [
      { id: "1", title: "Lanzamiento de producto", engagement: 8.5, impressions: 12000 },
      { id: "2", title: "Detrás de escenas", engagement: 7.2, impressions: 9500 },
      { id: "3", title: "Testimonios de clientes", engagement: 6.8, impressions: 8200 }
    ]
  },
  {
    platform: "twitter",
    followers: 8700,
    followersChange: 150,
    engagement: 2.8,
    engagementChange: -0.2,
    impressions: 32000,
    impressionsChange: 800,
    clicks: 950,
    clicksChange: -50,
    topPosts: [
      { id: "1", title: "Anuncio de evento", engagement: 5.2, impressions: 7800 },
      { id: "2", title: "Encuesta de usuarios", engagement: 4.7, impressions: 6500 },
      { id: "3", title: "Noticias del sector", engagement: 3.9, impressions: 5200 }
    ]
  },
  {
    platform: "facebook",
    followers: 15800,
    followersChange: 220,
    engagement: 3.5,
    engagementChange: 0.1,
    impressions: 52000,
    impressionsChange: 1500,
    clicks: 2200,
    clicksChange: 180,
    topPosts: [
      { id: "1", title: "Oferta especial", engagement: 7.1, impressions: 14000 },
      { id: "2", title: "Historia de la empresa", engagement: 6.3, impressions: 11500 },
      { id: "3", title: "Guía de producto", engagement: 5.8, impressions: 10200 }
    ]
  },
  {
    platform: "linkedin",
    followers: 5200,
    followersChange: 180,
    engagement: 4.8,
    engagementChange: 0.5,
    impressions: 18000,
    impressionsChange: 900,
    clicks: 1200,
    clicksChange: 120,
    topPosts: [
      { id: "1", title: "Caso de estudio", engagement: 9.2, impressions: 6800 },
      { id: "2", title: "Oferta de empleo", engagement: 8.5, impressions: 5500 },
      { id: "3", title: "Artículo del sector", engagement: 7.8, impressions: 4900 }
    ]
  },
  {
    platform: "youtube",
    followers: 3800,
    followersChange: 90,
    engagement: 5.2,
    engagementChange: 0.4,
    impressions: 25000,
    impressionsChange: 700,
    clicks: 1500,
    clicksChange: 100,
    topPosts: [
      { id: "1", title: "Tutorial de producto", engagement: 8.7, impressions: 8500 },
      { id: "2", title: "Entrevista con experto", engagement: 7.9, impressions: 7200 },
      { id: "3", title: "Demostración de funciones", engagement: 7.2, impressions: 6500 }
    ]
  },
  {
    platform: "tiktok",
    followers: 9500,
    followersChange: 450,
    engagement: 6.8,
    engagementChange: 0.7,
    impressions: 85000,
    impressionsChange: 5000,
    clicks: 3200,
    clicksChange: 350,
    topPosts: [
      { id: "1", title: "Reto viral", engagement: 12.5, impressions: 28000 },
      { id: "2", title: "Truco rápido", engagement: 11.2, impressions: 24500 },
      { id: "3", title: "Tendencia del momento", engagement: 10.8, impressions: 22000 }
    ]
  }
]

// Función para obtener el icono de la plataforma
function getPlatformIcon(platform: string) {
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

// Función para obtener el color de la plataforma
function getPlatformColor(platform: string) {
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

// Componente para mostrar una métrica con cambio
function MetricCard({ title, value, change, format = "number" }: { 
  title: string
  value: number
  change: number
  format?: "number" | "percent"
}) {
  const isPositive = change > 0
  const isNeutral = change === 0
  
  const formattedValue = format === "percent" 
    ? `${value.toFixed(1)}%` 
    : value.toLocaleString()
  
  const formattedChange = format === "percent"
    ? `${Math.abs(change).toFixed(1)}%`
    : Math.abs(change).toLocaleString()
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-1 flex items-baseline justify-between">
        <p className="text-2xl font-semibold">{formattedValue}</p>
        <div className={`flex items-center text-sm ${
          isPositive ? "text-green-600" : 
          isNeutral ? "text-gray-500" : 
          "text-red-600"
        }`}>
          {isPositive && "↑"}
          {!isPositive && !isNeutral && "↓"}
          {isNeutral && "="}
          <span className="ml-1">{formattedChange}</span>
        </div>
      </div>
    </div>
  )
}

// Componente para mostrar analíticas de una plataforma
function PlatformAnalytics({ data }: { data: AnalyticsData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${getPlatformColor(data.platform)}`}>
          {getPlatformIcon(data.platform)}
        </div>
        <h2 className="text-xl font-bold capitalize">{data.platform}</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard 
          title="Seguidores" 
          value={data.followers} 
          change={data.followersChange} 
        />
        <MetricCard 
          title="Engagement" 
          value={data.engagement} 
          change={data.engagementChange}
          format="percent" 
        />
        <MetricCard 
          title="Impresiones" 
          value={data.impressions} 
          change={data.impressionsChange} 
        />
        <MetricCard 
          title="Clicks" 
          value={data.clicks} 
          change={data.clicksChange} 
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Publicaciones con mejor rendimiento</h3>
        <div className="space-y-2">
          {data.topPosts.map((post, index) => (
            <div key={post.id} className="p-3 border rounded-lg flex justify-between items-center">
              <div>
                <span className="font-medium text-sm text-gray-500">#{index + 1}</span>
                <h4 className="font-medium">{post.title}</h4>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Engagement: <span className="font-medium">{post.engagement.toFixed(1)}%</span></div>
                <div className="text-sm text-gray-500">Impresiones: <span className="font-medium">{post.impressions.toLocaleString()}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
  { id: "cuentas", label: "Cuentas", icon: Users, href: "/cuentas" },
  { id: "programacion", label: "Programación", icon: CalendarIcon, href: "/programacion" },
  { id: "contenido", label: "Contenido", icon: FileText, href: "/contenido" },
  { id: "analiticas", label: "Analíticas", icon: BarChart3, href: "/analiticas", active: true },
  { id: "mensajes", label: "Mensajes", icon: MessageSquare, href: "/mensajes" },
  { id: "configuracion", label: "Configuración", icon: Settings, href: "/configuracion" },
]

const leftTopContent = <SearchInput className="w-[300px]" />
const rightTopContent = (
  <div className="flex items-center gap-4">
    <Button>
      Nueva publicación
    </Button>
    <ProfileMenu />
  </div>
)
export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData[]>(mockAnalytics)
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all")

  // Filtrar analíticas por plataforma seleccionada
  const filteredAnalytics = selectedPlatform === "all" 
    ? analytics 
    : analytics.filter(item => item.platform === selectedPlatform)

  return (
    <Navigation
      sidebarItems={sidebarItems}
      leftTopContent={leftTopContent}
      rightTopContent={rightTopContent}
    >
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Analíticas</h1>
          <Button variant="outline">
            Descargar informe
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium">Filtrar por plataforma:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedPlatform === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPlatform("all")}
            >
              Todas
            </Button>
            <Button 
              variant={selectedPlatform === "instagram" ? "default" : "outline"}
              size="sm"
              className={selectedPlatform === "instagram" ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""}
              onClick={() => setSelectedPlatform("instagram")}
            >
              <Instagram className="h-4 w-4 mr-2" /> Instagram
            </Button>
            <Button 
              variant={selectedPlatform === "twitter" ? "default" : "outline"}
              size="sm"
              className={selectedPlatform === "twitter" ? "bg-blue-400" : ""}
              onClick={() => setSelectedPlatform("twitter")}
            >
              <Twitter className="h-4 w-4 mr-2" /> Twitter
            </Button>
            <Button 
              variant={selectedPlatform === "facebook" ? "default" : "outline"}
              size="sm"
              className={selectedPlatform === "facebook" ? "bg-blue-600" : ""}
              onClick={() => setSelectedPlatform("facebook")}
            >
              <Facebook className="h-4 w-4 mr-2" /> Facebook
            </Button>
            <Button 
              variant={selectedPlatform === "linkedin" ? "default" : "outline"}
              size="sm"
              className={selectedPlatform === "linkedin" ? "bg-blue-700" : ""}
              onClick={() => setSelectedPlatform("linkedin")}
            >
              <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
            </Button>
            <Button 
              variant={selectedPlatform === "youtube" ? "default" : "outline"}
              size="sm"
              className={selectedPlatform === "youtube" ? "bg-red-600" : ""}
              onClick={() => setSelectedPlatform("youtube")}
            >
              <Youtube className="h-4 w-4 mr-2" /> YouTube
            </Button>
            <Button 
              variant={selectedPlatform === "tiktok" ? "default" : "outline"}
              size="sm"
              className={selectedPlatform === "tiktok" ? "bg-black" : ""}
              onClick={() => setSelectedPlatform("tiktok")}
            >
              <TikTok className="h-4 w-4 mr-2" /> TikTok
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {filteredAnalytics.map((data) => (
            <Card key={data.platform}>
              <CardContent className="pt-6">
                <PlatformAnalytics data={data} />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Navigation>
  )
}

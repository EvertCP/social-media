"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Instagram, Twitter, Facebook, Linkedin, Youtube, TikTok } from "../../lib/mock-icons"
import { Home, Users, BarChart3, Calendar as CalendarIcon, MessageSquare, Settings, FileText } from "../../lib/mock-icons"
import { Navigation } from "../../components/navigation/navigation"
import { SearchInput } from "../../components/ui/search-input"
import { ProfileMenu } from "../../components/profile-menu"


// Tipo para contenido
type ContentItem = {
  id: string
  title: string
  content: string
  createdAt: Date
  platform: string
  status: "draft" | "published" | "archived"
  imageUrl?: string
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

// Datos de ejemplo para contenido
const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Lanzamiento de producto",
    content: "¡Estamos emocionados de anunciar nuestro nuevo producto! #lanzamiento #nuevo",
    createdAt: new Date(2025, 7, 15),
    platform: "instagram",
    status: "published",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    engagement: {
      likes: 245,
      comments: 32,
      shares: 15
    }
  },
  {
    id: "2",
    title: "Webinar de marketing",
    content: "No te pierdas nuestro webinar sobre estrategias de marketing digital este jueves. ¡Inscríbete ahora!",
    createdAt: new Date(2025, 7, 16),
    platform: "linkedin",
    status: "published",
    engagement: {
      likes: 78,
      comments: 12,
      shares: 8
    }
  },
  {
    id: "3",
    title: "Oferta especial",
    content: "¡Oferta por tiempo limitado! 20% de descuento en todos nuestros servicios. #oferta #descuento",
    createdAt: new Date(2025, 7, 17),
    platform: "facebook",
    status: "published",
    imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
    engagement: {
      likes: 132,
      comments: 24,
      shares: 45
    }
  },
  {
    id: "4",
    title: "Tutorial de producto",
    content: "Aprende a utilizar todas las funciones de nuestro producto en este tutorial paso a paso.",
    createdAt: new Date(2025, 7, 18),
    platform: "youtube",
    status: "draft"
  },
  {
    id: "5",
    title: "Testimonios de clientes",
    content: "Nuestros clientes hablan por nosotros. Mira lo que dicen sobre nuestros servicios.",
    createdAt: new Date(2025, 7, 10),
    platform: "twitter",
    status: "archived",
    engagement: {
      likes: 67,
      comments: 5,
      shares: 12
    }
  }
]

// Función para obtener el icono de la plataforma
function getPlatformIcon(platform: string) {
  switch (platform) {
    case "instagram":
      return <Instagram className="h-4 w-4" />
    case "twitter":
      return <Twitter className="h-4 w-4" />
    case "facebook":
      return <Facebook className="h-4 w-4" />
    case "linkedin":
      return <Linkedin className="h-4 w-4" />
    case "youtube":
      return <Youtube className="h-4 w-4" />
    case "tiktok":
      return <TikTok className="h-4 w-4" />
    default:
      return null
  }
}

// Función para formatear la fecha
function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

// Componente para la tarjeta de contenido
function ContentCard({ item }: { item: ContentItem }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{item.title}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-full bg-gray-100">
              {getPlatformIcon(item.platform)}
            </div>
            <div className={`text-sm font-medium px-2 py-1 rounded-full ${
              item.status === "published" ? "bg-green-100 text-green-800" :
              item.status === "draft" ? "bg-blue-100 text-blue-800" :
              "bg-gray-100 text-gray-800"
            }`}>
              {item.status === "published" ? "Publicado" :
               item.status === "draft" ? "Borrador" : "Archivado"}
            </div>
          </div>
        </div>
        <CardDescription>
          {formatDate(item.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{item.content}</p>
        {item.imageUrl && (
          <div className="relative w-full h-32 mb-4 rounded-md overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="object-cover w-full h-full"
            />
          </div>
        )}
        {item.engagement && (
          <div className="flex space-x-4 text-sm text-gray-500">
            <div>❤️ {item.engagement.likes}</div>
            <div>💬 {item.engagement.comments}</div>
            <div>🔄 {item.engagement.shares}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          {item.status === "published" ? "Ver publicación" : "Editar"}
        </Button>
        {item.status === "draft" && (
          <Button size="sm">
            Publicar
          </Button>
        )}
        {item.status === "published" && (
          <Button variant="ghost" size="sm" className="text-gray-600">
            Archivar
          </Button>
        )}
        {item.status === "archived" && (
          <Button variant="ghost" size="sm" className="text-blue-600">
            Restaurar
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Configuración de los items de la barra lateral
const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
  { id: "cuentas", label: "Cuentas", icon: Users, href: "/cuentas" },
  { id: "programacion", label: "Programación", icon: CalendarIcon, href: "/programacion" },
  { id: "contenido", label: "Contenido", icon: FileText, href: "/contenido", active: true },
  { id: "analiticas", label: "Analíticas", icon: BarChart3, href: "/analiticas" },
  { id: "mensajes", label: "Mensajes", icon: MessageSquare, href: "/mensajes" },
  { id: "configuracion", label: "Configuración", icon: Settings, href: "/configuracion" },
]

// Contenido de la barra superior
const leftTopContent = <SearchInput className="w-[300px]" />
const rightTopContent = (
  <div className="flex items-center gap-4">
    <ProfileMenu />
  </div>
)

export default function ContentPage() {
  const [content, setContent] = useState<ContentItem[]>(mockContent)

  return (
    <Navigation
      sidebarItems={sidebarItems}
      leftTopContent={leftTopContent}
      rightTopContent={rightTopContent}
    >
      <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Biblioteca de Contenido</h1>
        <Button>
          Crear contenido
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todo</TabsTrigger>
          <TabsTrigger value="published">Publicado</TabsTrigger>
          <TabsTrigger value="draft">Borradores</TabsTrigger>
          <TabsTrigger value="archived">Archivado</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="published" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content
              .filter(item => item.status === "published")
              .map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="draft" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content
              .filter(item => item.status === "draft")
              .map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="archived" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content
              .filter(item => item.status === "archived")
              .map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </Navigation>
  )
}

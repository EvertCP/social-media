"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { CustomCalendar, CalendarEvent } from "../../components/ui/custom-calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Instagram, Twitter, Facebook, Linkedin, Youtube, TikTok, Home, BarChart3, MessageSquare, Calendar as CalendarIcon, Settings, Users, FileText } from "../../lib/mock-icons"
import { Navigation } from "../../components/navigation/navigation"
import { SearchInput } from "../../components/ui/search-input"
import { ProfileMenu } from "../../components/profile-menu"

// Tipo para publicaciones programadas
type ScheduledPost = {
  id: string
  title: string
  content: string
  scheduledDate: Date
  platforms: string[]
  status: "scheduled" | "published" | "failed"
  imageUrl?: string
}

// Datos de ejemplo para publicaciones programadas
const mockScheduledPosts: ScheduledPost[] = [
  {
    id: "1",
    title: "Lanzamiento de producto",
    content: "¡Estamos emocionados de anunciar nuestro nuevo producto! #lanzamiento #nuevo",
    scheduledDate: new Date(2025, 7, 20, 14, 30),
    platforms: ["instagram", "twitter", "facebook"],
    status: "scheduled",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7"
  },
  {
    id: "2",
    title: "Webinar de marketing",
    content: "No te pierdas nuestro webinar sobre estrategias de marketing digital este jueves. ¡Inscríbete ahora!",
    scheduledDate: new Date(2025, 7, 22, 18, 0),
    platforms: ["linkedin", "facebook"],
    status: "scheduled"
  },
  {
    id: "3",
    title: "Oferta especial",
    content: "¡Oferta por tiempo limitado! 20% de descuento en todos nuestros servicios. #oferta #descuento",
    scheduledDate: new Date(2025, 7, 15, 9, 0),
    platforms: ["instagram", "facebook"],
    status: "published"
  },
  {
    id: "4",
    title: "Tutorial de producto",
    content: "Aprende a utilizar todas las funciones de nuestro producto en este tutorial paso a paso.",
    scheduledDate: new Date(2025, 7, 18, 12, 0),
    platforms: ["youtube", "facebook"],
    status: "failed",
    imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868"
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
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Componente para la tarjeta de publicación programada
function ScheduledPostCard({ post }: { post: ScheduledPost }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{post.title}</CardTitle>
          <div className={`text-sm font-medium px-2 py-1 rounded-full ${
            post.status === "scheduled" ? "bg-blue-100 text-blue-800" :
            post.status === "published" ? "bg-green-100 text-green-800" :
            "bg-red-100 text-red-800"
          }`}>
            {post.status === "scheduled" ? "Programado" :
             post.status === "published" ? "Publicado" : "Error"}
          </div>
        </div>
        <CardDescription>
          {formatDate(post.scheduledDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{post.content}</p>
        {post.imageUrl && (
          <div className="relative w-full h-32 mb-4 rounded-md overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex space-x-1">
          {post.platforms.map((platform) => (
            <div 
              key={platform} 
              className="p-1 rounded-full bg-gray-100"
            >
              {getPlatformIcon(platform)}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Editar
        </Button>
        <Button variant="ghost" size="sm" className="text-red-600">
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function SchedulingPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [posts, setPosts] = useState<ScheduledPost[]>(mockScheduledPosts)
  const [showAllPosts, setShowAllPosts] = useState<boolean>(true)
  
  // Convert scheduled posts to calendar events
  const calendarEvents: CalendarEvent[] = posts.map(post => ({
    id: post.id,
    date: post.scheduledDate,
    platforms: post.platforms
  }))

  // Configuración de los items de la barra lateral
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
    { id: "cuentas", label: "Cuentas", icon: Users, href: "/cuentas" },
    { id: "programacion", label: "Programación", icon: CalendarIcon, href: "/programacion", active: true },
    { id: "contenido", label: "Contenido", icon: FileText, href: "/contenido" },
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

  return (
    <Navigation
      sidebarItems={sidebarItems}
      leftTopContent={leftTopContent}
      rightTopContent={rightTopContent}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Programación de Contenido</h1>
          <p className="text-gray-500">Gestiona y programa tus publicaciones en redes sociales</p>
        </div>
        <Button>
          Nueva publicación
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent>
              <CustomCalendar
                events={calendarEvents}
                selectedDate={date}
                onDateSelect={(newDate) => setDate(newDate)}
                className="rounded-md mt-4"
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {showAllPosts 
                      ? "Todas las publicaciones" 
                      : `Publicaciones para ${date.toLocaleDateString('es', { day: 'numeric', month: 'long' })}`}
                  </CardTitle>
                  <CardDescription>
                    {showAllPosts 
                      ? `${posts.length} publicaciones en total` 
                      : `${posts.filter(post => 
                          post.scheduledDate.getDate() === date.getDate() && 
                          post.scheduledDate.getMonth() === date.getMonth() && 
                          post.scheduledDate.getFullYear() === date.getFullYear()
                        ).length} publicaciones programadas`}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant={showAllPosts ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowAllPosts(true)}
                  >
                    Ver todas
                  </Button>
                  <Button 
                    variant={!showAllPosts ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowAllPosts(false)}
                  >
                    Solo día seleccionado
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="scheduled">Programadas</TabsTrigger>
                  <TabsTrigger value="published">Publicadas</TabsTrigger>
                  <TabsTrigger value="failed">Con errores</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 gap-4">
                    {posts
                      .filter(post => 
                        showAllPosts ? true : (
                          post.scheduledDate.getDate() === date.getDate() && 
                          post.scheduledDate.getMonth() === date.getMonth() && 
                          post.scheduledDate.getFullYear() === date.getFullYear()
                        )
                      )
                      .map((post) => (
                        <ScheduledPostCard key={post.id} post={post} />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="scheduled" className="mt-0">
                  <div className="grid grid-cols-1 gap-4">
                    {posts
                      .filter(post => 
                        post.status === "scheduled" &&
                        (showAllPosts ? true : (
                          post.scheduledDate.getDate() === date.getDate() && 
                          post.scheduledDate.getMonth() === date.getMonth() && 
                          post.scheduledDate.getFullYear() === date.getFullYear()
                        ))
                      )
                      .map((post) => (
                        <ScheduledPostCard key={post.id} post={post} />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="published" className="mt-0">
                  <div className="grid grid-cols-1 gap-4">
                    {posts
                      .filter(post => 
                        post.status === "published" &&
                        (showAllPosts ? true : (
                          post.scheduledDate.getDate() === date.getDate() && 
                          post.scheduledDate.getMonth() === date.getMonth() && 
                          post.scheduledDate.getFullYear() === date.getFullYear()
                        ))
                      )
                      .map((post) => (
                        <ScheduledPostCard key={post.id} post={post} />
                      ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="failed" className="mt-0">
                  <div className="grid grid-cols-1 gap-4">
                    {posts
                      .filter(post => 
                        post.status === "failed" &&
                        (showAllPosts ? true : (
                          post.scheduledDate.getDate() === date.getDate() && 
                          post.scheduledDate.getMonth() === date.getMonth() && 
                          post.scheduledDate.getFullYear() === date.getFullYear()
                        ))
                      )
                      .map((post) => (
                        <ScheduledPostCard key={post.id} post={post} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Navigation>
  )
}

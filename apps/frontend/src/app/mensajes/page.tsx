"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Instagram, Twitter, Facebook, Linkedin, Youtube, TikTok } from "../../lib/mock-icons"
import { Navigation } from "../../components/navigation/navigation"
import { SearchInput } from "../../components/ui/search-input"
import { ProfileMenu } from "../../components/profile-menu"
import { Home, Users, BarChart3, Calendar as CalendarIcon, MessageSquare, Settings, FileText } from "../../lib/mock-icons"

// Tipo para mensajes
type Message = {
  id: string
  platform: string
  sender: {
    name: string
    username: string
    avatar?: string
    verified?: boolean
  }
  content: string
  timestamp: Date
  read: boolean
  attachments?: {
    type: "image" | "video" | "link"
    url: string
    preview?: string
  }[]
}

// Datos de ejemplo para mensajes
const mockMessages: Message[] = [
  {
    id: "1",
    platform: "instagram",
    sender: {
      name: "Laura García",
      username: "lauragarcia",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true
    },
    content: "Hola, me encantaría saber más sobre vuestros servicios. ¿Podríais enviarme información sobre precios?",
    timestamp: new Date(2025, 7, 17, 14, 30),
    read: false
  },
  {
    id: "2",
    platform: "facebook",
    sender: {
      name: "Carlos Rodríguez",
      username: "carlosrodriguez",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    content: "Tengo un problema con mi pedido #12345. No ha llegado todavía y ya han pasado 5 días.",
    timestamp: new Date(2025, 7, 17, 12, 15),
    read: false
  },
  {
    id: "3",
    platform: "twitter",
    sender: {
      name: "Marketing Digital",
      username: "marketingdigital",
      avatar: "https://i.pravatar.cc/150?img=3",
      verified: true
    },
    content: "Nos encantaría colaborar con vosotros en nuestra próxima campaña. ¿Podemos hablar?",
    timestamp: new Date(2025, 7, 16, 18, 45),
    read: true
  },
  {
    id: "4",
    platform: "instagram",
    sender: {
      name: "Ana Martínez",
      username: "anamartinez",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    content: "¡Vuestro último post es increíble! ¿Qué cámara utilizáis para hacer esas fotos?",
    timestamp: new Date(2025, 7, 16, 15, 20),
    read: true,
    attachments: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        preview: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
      }
    ]
  },
  {
    id: "5",
    platform: "linkedin",
    sender: {
      name: "Empresa Innovadora",
      username: "empresainnovadora",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: true
    },
    content: "Estamos buscando partners para nuestro próximo evento de innovación. ¿Os interesaría participar?",
    timestamp: new Date(2025, 7, 15, 10, 0),
    read: true
  },
  {
    id: "6",
    platform: "facebook",
    sender: {
      name: "María López",
      username: "marialopez",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    content: "¿Tenéis disponibilidad para una reunión la próxima semana? Me gustaría hablar sobre un proyecto.",
    timestamp: new Date(2025, 7, 14, 16, 30),
    read: true
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

// Función para formatear la fecha
function formatDate(date: Date) {
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return new Intl.DateTimeFormat('es', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  } else if (diffDays === 1) {
    return "Ayer"
  } else if (diffDays < 7) {
    return new Intl.DateTimeFormat('es', {
      weekday: 'long'
    }).format(date)
  } else {
    return new Intl.DateTimeFormat('es', {
      day: 'numeric',
      month: 'short'
    }).format(date)
  }
}

// Componente para mostrar un mensaje
function MessageItem({ message, isActive, onClick }: { 
  message: Message
  isActive: boolean
  onClick: () => void
}) {
  return (
    <div 
      className={`p-3 border-b cursor-pointer ${
        isActive ? "bg-gray-100" : message.read ? "" : "bg-blue-50"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          {message.sender.avatar ? (
            <img 
              src={message.sender.avatar} 
              alt={message.sender.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 font-medium">
                {message.sender.name.charAt(0)}
              </span>
            </div>
          )}
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getPlatformColor(message.platform)}`}>
            {getPlatformIcon(message.platform)}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <h3 className="font-medium truncate">{message.sender.name}</h3>
              {message.sender.verified && (
                <span className="ml-1 text-blue-500">✓</span>
              )}
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
              {formatDate(message.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-600 truncate">
            {message.content}
          </p>
          {message.attachments && message.attachments.length > 0 && (
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                {message.attachments.length} adjunto{message.attachments.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente para mostrar la conversación
function Conversation({ message }: { message: Message | null }) {
  if (!message) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Selecciona un mensaje para ver la conversación</p>
      </div>
    )
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {message.sender.avatar ? (
              <img 
                src={message.sender.avatar} 
                alt={message.sender.name} 
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-gray-500 font-medium">
                  {message.sender.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <div className="flex items-center">
                <h2 className="font-medium">{message.sender.name}</h2>
                {message.sender.verified && (
                  <span className="ml-1 text-blue-500">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-500">@{message.sender.username}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getPlatformColor(message.platform)}`}>
              {getPlatformIcon(message.platform)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 mr-3">
              {message.sender.avatar ? (
                <img 
                  src={message.sender.avatar} 
                  alt={message.sender.name} 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">
                    {message.sender.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <p>{message.content}</p>
              {message.attachments && message.attachments.map((attachment, index) => (
                <div key={index} className="mt-2">
                  {attachment.type === "image" && (
                    <img 
                      src={attachment.url} 
                      alt="Attachment" 
                      className="rounded-lg max-w-full h-auto"
                    />
                  )}
                  {attachment.type === "video" && (
                    <div className="relative rounded-lg overflow-hidden">
                      <img 
                        src={attachment.preview || attachment.url} 
                        alt="Video preview" 
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  {attachment.type === "link" && (
                    <a 
                      href={attachment.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block mt-2 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span className="text-blue-500 truncate">{attachment.url}</span>
                      </div>
                    </a>
                  )}
                </div>
              ))}
              <div className="mt-1 text-xs text-gray-500 text-right">
                {new Intl.DateTimeFormat('es', {
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(message.timestamp)}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
              <p>Gracias por contactarnos. Estaremos encantados de ayudarte. ¿Podrías proporcionarnos más detalles sobre lo que necesitas?</p>
              <div className="mt-1 text-xs text-blue-100 text-right">
                {new Intl.DateTimeFormat('es', {
                  hour: '2-digit',
                  minute: '2-digit'
                }).format(new Date())}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t p-3">
        <div className="flex items-center">
          <Input 
            placeholder="Escribe un mensaje..." 
            className="flex-1 mr-2"
          />
          <Button>Enviar</Button>
        </div>
      </div>
    </div>
  )
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  
  // Filtrar mensajes por plataforma
  const filteredMessages = selectedPlatform === "all" 
    ? messages 
    : messages.filter(message => message.platform === selectedPlatform)
  
  // Filtrar mensajes no leídos
  const unreadMessages = messages.filter(message => !message.read)
  
  // Marcar mensaje como leído
  const markAsRead = (id: string) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ))
  }
  
  // Seleccionar un mensaje
  const selectMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.read) {
      markAsRead(message.id)
    }
  }

  // Configuración de los items de la barra lateral
  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
    { id: "cuentas", label: "Cuentas", icon: Users, href: "/cuentas" },
    { id: "programacion", label: "Programación", icon: CalendarIcon, href: "/programacion" },
    { id: "contenido", label: "Contenido", icon: FileText, href: "/contenido" },
    { id: "analiticas", label: "Analíticas", icon: BarChart3, href: "/analiticas" },
    { id: "mensajes", label: "Mensajes", icon: MessageSquare, href: "/mensajes", active: true },
    { id: "configuracion", label: "Configuración", icon: Settings, href: "/configuracion" },
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

  return (
    <Navigation
      sidebarItems={sidebarItems}
      leftTopContent={leftTopContent}
      rightTopContent={rightTopContent}
    >
      <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mensajes</h1>
        <div className="flex items-center">
          {unreadMessages.length > 0 && (
            <div className="mr-4">
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                {unreadMessages.length} no leído{unreadMessages.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
          <Button variant="outline">
            Marcar todo como leído
          </Button>
        </div>
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        <div className="md:col-span-1 border rounded-lg overflow-hidden">
          <div className="p-3 border-b bg-gray-50">
            <Input placeholder="Buscar mensajes..." />
          </div>
          <div className="overflow-y-auto h-[calc(100%-56px)]">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <MessageItem 
                  key={message.id} 
                  message={message} 
                  isActive={selectedMessage?.id === message.id}
                  onClick={() => selectMessage(message)}
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No hay mensajes que coincidan con el filtro
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2 border rounded-lg overflow-hidden">
          <Conversation message={selectedMessage} />
        </div>
      </div>
    </div>
    </Navigation>
  )
}

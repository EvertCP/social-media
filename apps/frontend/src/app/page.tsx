"use client"

import { useState } from "react"
import TestTailwind from "./test-tailwind"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Navigation, type SidebarItem } from "../components/navigation"
import { SearchInput } from "../components/search-input"
import { ProfileMenu } from "../components/profile-menu"
import {
  BarChart3,
  Calendar,
  Home,
  MessageSquare,
  Settings,
  Users,
  Bell,
  Search,
  Plus,
  TrendingUp,
  Clock,
  FileText,
} from "../lib/mock-icons"

export default function SocialMediaDashboard() {
  const sidebarItems: SidebarItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "cuentas", label: "Cuentas", icon: Users },
    { id: "programacion", label: "Programación", icon: Calendar },
    { id: "contenido", label: "Contenido", icon: FileText },
    { id: "analiticas", label: "Analíticas", icon: BarChart3 },
    { id: "mensajes", label: "Mensajes", icon: MessageSquare },
    { id: "configuracion", label: "Configuración", icon: Settings },
  ]

  // Contenido para la barra de navegación superior
  const leftTopContent = (
    <SearchInput 
      icon={<Search className="h-4 w-4" />}
      placeholder="Buscar..."
    />
  )

  const rightTopContent = (
    <>
      <Button size="sm" className="bg-primary hover:bg-primary/90">
        <Plus className="h-4 w-4 mr-2" />
        Crear Post
      </Button>

      <Button variant="ghost" size="sm">
        <Bell className="h-5 w-5" />
      </Button>
      
      <ProfileMenu />
    </>
  )

  return (
    <Navigation 
      sidebarItems={sidebarItems}
      leftTopContent={leftTopContent}
      rightTopContent={rightTopContent}
    >
      <div className="max-w-7xl mx-auto space-y-6 p-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">¡Bienvenido de vuelta!</h2>
            <p className="text-muted-foreground mt-1">Aquí tienes un resumen de tu actividad en redes sociales</p>
          </div>
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            <TrendingUp className="h-4 w-4 mr-1" />
            +12% esta semana
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Programados</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 desde ayer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Total</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% esta semana</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuevos Seguidores</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+89</div>
              <p className="text-xs text-muted-foreground">+5% desde ayer</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mejor Horario</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18:30</div>
              <p className="text-xs text-muted-foreground">Recomendado por IA</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Horarios Óptimos
              </CardTitle>
              <CardDescription>
                Nuestra IA analiza cuando tu audiencia está más activa y recomienda los mejores momentos para
                publicar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">Instagram</span>
                  <Badge variant="outline">18:30 - 20:00</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">Twitter</span>
                  <Badge variant="outline">12:00 - 14:00</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">LinkedIn</span>
                  <Badge variant="outline">09:00 - 11:00</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Sugerencias de Contenido
              </CardTitle>
              <CardDescription>
                Recibe recomendaciones personalizadas de contenido que resuena con tu audiencia y genera engagement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">💡 Tendencia detectada</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Los posts sobre productividad están generando +40% más engagement
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">📊 Análisis de hashtags</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    #MarketingDigital y #Emprendimiento están en tendencia
                  </p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Ver más sugerencias
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Análisis Detallado
            </CardTitle>
            <CardDescription>
              Visualiza el rendimiento de tus publicaciones con métricas avanzadas y reportes personalizados.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">847</div>
                <p className="text-sm text-muted-foreground">Likes esta semana</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">156</div>
                <p className="text-sm text-muted-foreground">Comentarios</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">89</div>
                <p className="text-sm text-muted-foreground">Compartidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Navigation>
  )
}
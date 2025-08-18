'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { MetricsSummary } from '@/components/dashboard/metrics-summary';
import { LoginButton } from '@/components/auth/login-button';
import { LogoutButton } from '@/components/auth/logout-button';
import { UserProfile } from '@/components/auth/user-profile';
import { ClientImage } from '@/components/ui/client-image';
import Link from 'next/link';

// Componentes del dashboard
import { PostScheduler } from '@/components/dashboard/post-scheduler';
import { OptimalTimeChart } from '@/components/dashboard/optimal-time-chart';
import { ContentSuggestions } from '@/components/dashboard/content-suggestions';

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card shadow text-center p-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-primary/20 h-16 w-16 mb-4 flex items-center justify-center">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-2xl font-bold">Cargando dashboard...</h1>
            <p className="text-light mt-2">Estamos preparando tus datos</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card shadow max-w-md w-full text-center p-8">
          <div className="text-primary text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-4">Área Privada</h1>
          <p className="mb-6 text-light">Por favor, inicia sesión para acceder a tu dashboard personalizado.</p>
          <LoginButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-primary text-2xl">📊</div>
            <h1 className="text-xl font-bold">Social Media Manager</h1>
          </div>
          <div className="flex items-center gap-4">
            <UserProfile />
            <LogoutButton />
          </div>
        </div>
      </header>
      
      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light text-sm">Seguidores</p>
                <h3 className="text-2xl font-bold">12,543</h3>
                <p className="text-xs text-primary">+2.5% <span className="text-light">vs mes anterior</span></p>
              </div>
              <div className="text-primary text-3xl">👥</div>
            </div>
          </div>
          
          <div className="card shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light text-sm">Engagement</p>
                <h3 className="text-2xl font-bold">4.8%</h3>
                <p className="text-xs text-accent">+0.7% <span className="text-light">vs mes anterior</span></p>
              </div>
              <div className="text-accent text-3xl">❤️</div>
            </div>
          </div>
          
          <div className="card shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light text-sm">Publicaciones</p>
                <h3 className="text-2xl font-bold">87</h3>
                <p className="text-xs text-secondary">+12 <span className="text-light">este mes</span></p>
              </div>
              <div className="text-secondary text-3xl">📝</div>
            </div>
          </div>
          
          <div className="card shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-light text-sm">Alcance</p>
                <h3 className="text-2xl font-bold">45.2K</h3>
                <p className="text-xs text-primary">+18% <span className="text-light">vs mes anterior</span></p>
              </div>
              <div className="text-primary text-3xl">📈</div>
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Optimal Posting Times */}
          <div className="card shadow lg:col-span-2">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Horarios óptimos de publicación</h2>
              <p className="text-light text-sm">Basado en la actividad de tu audiencia</p>
            </div>
            <div className="p-4">
              <OptimalTimeChart />
            </div>
          </div>
          
          {/* Content Suggestions */}
          <div className="card shadow">
            <div className="card-header">
              <h2 className="text-xl font-semibold">Sugerencias de contenido</h2>
              <p className="text-light text-sm">Temas populares en tu nicho</p>
            </div>
            <div className="p-4">
              <ContentSuggestions />
            </div>
          </div>
        </div>
        
        {/* Post Scheduler */}
        <div className="card shadow mt-6">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Programación de publicaciones</h2>
                <p className="text-light text-sm">Planifica tu contenido para la semana</p>
              </div>
              <Link 
                href="/dashboard/scheduler" 
                className="btn btn-sm btn-primary flex items-center gap-1"
              >
                <span>Ver programador</span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          </div>
          <div className="p-4">
            <PostScheduler />
          </div>
        </div>
        
        {/* Metrics Summary */}
        <div className="card shadow mt-6">
          <div className="card-header">
            <h2 className="text-xl font-semibold">Resumen de métricas</h2>
            <p className="text-light text-sm">Rendimiento general de tus redes sociales</p>
          </div>
          <div className="p-4">
            <MetricsSummary />
          </div>
        </div>
      </main>
    </div>
  );
}
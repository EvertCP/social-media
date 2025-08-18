'use client';

import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PostScheduler } from '@/components/dashboard/post-scheduler';
import { LoginButton } from '@/components/auth/login-button';
import { UserProfile } from '@/components/auth/user-profile';
import { LogoutButton } from '@/components/auth/logout-button';
import Link from 'next/link';

export default function SchedulerPage() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [activeTab, setActiveTab] = useState<'calendar' | 'analytics'>('calendar');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card shadow text-center p-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-primary/20 h-16 w-16 mb-4 flex items-center justify-center">
              <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-2xl font-bold">Cargando programador...</h1>
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
          <p className="mb-6 text-light">Por favor, inicia sesión para acceder al programador de publicaciones.</p>
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
            <div className="text-primary text-2xl">📅</div>
            <h1 className="text-xl font-bold">Programador de Publicaciones</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-primary hover:text-primary-dark">
              ← Volver al Dashboard
            </Link>
            <UserProfile />
            <LogoutButton />
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="card shadow">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Gestión de Publicaciones</h2>
              <span className="bg-primary/20 text-primary text-xs py-1 px-2 rounded">Beta</span>
            </div>
            <div className="flex gap-2">
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'calendar' ? 'bg-primary text-white' : 'text-light'}`}
                onClick={() => setActiveTab('calendar')}
              >
                Calendario
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'analytics' ? 'bg-primary text-white' : 'text-light'}`}
                onClick={() => setActiveTab('analytics')}
              >
                Analítica
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {activeTab === 'calendar' ? (
              <PostScheduler />
            ) : (
              <div className="text-center py-12 bg-background rounded">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-medium mb-2">Analítica de publicaciones</h3>
                <p className="text-light mb-4">Esta función estará disponible próximamente</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('calendar')}
                >
                  Volver al calendario
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card shadow">
            <div className="card-header">
              <h3 className="text-lg font-medium">Consejos de optimización</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="text-primary text-xl">⏰</div>
                  <div>
                    <h4 className="font-medium">Programa en horarios óptimos</h4>
                    <p className="text-sm text-light">Las publicaciones entre 18:00 y 21:00 tienen un 27% más de engagement.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="text-primary text-xl">📸</div>
                  <div>
                    <h4 className="font-medium">Incluye contenido visual</h4>
                    <p className="text-sm text-light">Las publicaciones con imágenes obtienen un 150% más de interacciones.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 items-start">
                  <div className="text-primary text-xl">🔄</div>
                  <div>
                    <h4 className="font-medium">Reutiliza contenido exitoso</h4>
                    <p className="text-sm text-light">Adapta y republica tu contenido más exitoso para maximizar su alcance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card shadow">
            <div className="card-header">
              <h3 className="text-lg font-medium">Estadísticas recientes</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Tasa de engagement</span>
                    <span className="text-xs text-primary">+2.3%</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-light mt-1">
                    <span>Semana anterior: 4.2%</span>
                    <span>Actual: 6.5%</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Alcance</span>
                    <span className="text-xs text-primary">+15.8%</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-light mt-1">
                    <span>Semana anterior: 8.2K</span>
                    <span>Actual: 9.5K</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Clics en enlaces</span>
                    <span className="text-xs text-primary">+8.7%</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-light mt-1">
                    <span>Semana anterior: 345</span>
                    <span>Actual: 375</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
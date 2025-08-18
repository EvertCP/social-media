'use client';

import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface MetricsSummary {
  totals: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    posts: number;
  };
  byPlatform: {
    [key: string]: {
      likes: number;
      comments: number;
      shares: number;
      views: number;
      posts: number;
    };
  };
}

// Datos simulados para cuando no hay conexión con el backend
const mockSummary: MetricsSummary = {
  totals: {
    likes: 15742,
    comments: 2389,
    shares: 4127,
    views: 89453,
    posts: 87
  },
  byPlatform: {
    instagram: {
      likes: 8934,
      comments: 1245,
      shares: 2103,
      views: 45672,
      posts: 42
    },
    facebook: {
      likes: 4328,
      comments: 876,
      shares: 1543,
      views: 28941,
      posts: 31
    },
    twitter: {
      likes: 2480,
      comments: 268,
      shares: 481,
      views: 14840,
      posts: 14
    }
  }
};

export const MetricsSummary = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [summary, setSummary] = useState<MetricsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year'
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!user) return;
      
      try {
        // Simulamos un retraso para mostrar el estado de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Intentamos obtener datos reales del backend
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/metrics/user/${user.sub}/summary?timeRange=${timeRange}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setSummary(data);
        } else {
          // Si hay un error, usamos datos simulados
          console.log('Usando datos simulados debido a error en la API');
          setUseMockData(true);
          setSummary(mockSummary);
        }
      } catch (error) {
        console.error('Error fetching metrics summary:', error);
        // En caso de error, usamos datos simulados
        setUseMockData(true);
        setSummary(mockSummary);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, [user, getAccessTokenSilently, timeRange]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return '📸';
      case 'facebook':
        return '👍';
      case 'twitter':
        return '🐦';
      case 'linkedin':
        return '💼';
      default:
        return '📱';
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'likes':
        return 'text-primary';
      case 'comments':
        return 'text-secondary';
      case 'shares':
        return 'text-accent';
      case 'views':
        return 'text-amber-500';
      default:
        return 'text-primary';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-light">Cargando métricas...</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="text-center py-12 bg-background rounded">
        <div className="text-4xl mb-4">📊</div>
        <h3 className="text-xl font-medium mb-2">No hay métricas disponibles</h3>
        <p className="text-light">Conecta tus redes sociales para ver estadísticas</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {useMockData && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Nota:</strong>
          <span className="block sm:inline"> Mostrando datos simulados. Conecta el backend para ver datos reales.</span>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Resumen de rendimiento</h3>
        <div className="flex gap-2">
          <button 
            className={`text-xs px-3 py-1 rounded-full ${timeRange === 'week' ? 'bg-primary text-white' : 'bg-background text-light'}`}
            onClick={() => setTimeRange('week')}
          >
            Semana
          </button>
          <button 
            className={`text-xs px-3 py-1 rounded-full ${timeRange === 'month' ? 'bg-primary text-white' : 'bg-background text-light'}`}
            onClick={() => setTimeRange('month')}
          >
            Mes
          </button>
          <button 
            className={`text-xs px-3 py-1 rounded-full ${timeRange === 'year' ? 'bg-primary text-white' : 'bg-background text-light'}`}
            onClick={() => setTimeRange('year')}
          >
            Año
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light text-sm">Likes</p>
              <h3 className="text-2xl font-bold text-primary">{summary.totals.likes.toLocaleString()}</h3>
              <div className="flex items-center text-xs mt-1">
                <span className="text-primary">↑ 8.2%</span>
                <span className="text-light ml-1">vs periodo anterior</span>
              </div>
            </div>
            <div className="text-primary text-3xl">❤️</div>
          </div>
        </div>
        
        <div className="card shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light text-sm">Comentarios</p>
              <h3 className="text-2xl font-bold text-secondary">{summary.totals.comments.toLocaleString()}</h3>
              <div className="flex items-center text-xs mt-1">
                <span className="text-secondary">↑ 5.7%</span>
                <span className="text-light ml-1">vs periodo anterior</span>
              </div>
            </div>
            <div className="text-secondary text-3xl">💬</div>
          </div>
        </div>
        
        <div className="card shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light text-sm">Compartidos</p>
              <h3 className="text-2xl font-bold text-accent">{summary.totals.shares.toLocaleString()}</h3>
              <div className="flex items-center text-xs mt-1">
                <span className="text-accent">↑ 12.3%</span>
                <span className="text-light ml-1">vs periodo anterior</span>
              </div>
            </div>
            <div className="text-accent text-3xl">🔄</div>
          </div>
        </div>
        
        <div className="card shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light text-sm">Vistas</p>
              <h3 className="text-2xl font-bold text-amber-500">{summary.totals.views.toLocaleString()}</h3>
              <div className="flex items-center text-xs mt-1">
                <span className="text-amber-500">↑ 15.8%</span>
                <span className="text-light ml-1">vs periodo anterior</span>
              </div>
            </div>
            <div className="text-amber-500 text-3xl">👁️</div>
          </div>
        </div>
      </div>
      
      <div className="card shadow">
        <div className="card-header">
          <h3 className="text-xl font-semibold">Métricas por Plataforma</h3>
          <p className="text-light text-sm">Comparativa de rendimiento entre redes sociales</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-light">Plataforma</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-light">Publicaciones</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-light">Likes</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-light">Comentarios</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-light">Compartidos</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-light">Vistas</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-light">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary.byPlatform).map(([platform, metrics]) => {
                // Calcular tasa de engagement: (likes + comments + shares) / views * 100
                const engagement = ((metrics.likes + metrics.comments + metrics.shares) / metrics.views * 100).toFixed(1);
                
                return (
                  <tr key={platform} className="border-b border-border hover:bg-background">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getPlatformIcon(platform)}</span>
                        <span className="font-medium">
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{metrics.posts}</td>
                    <td className="py-4 px-4 text-primary">{metrics.likes.toLocaleString()}</td>
                    <td className="py-4 px-4 text-secondary">{metrics.comments.toLocaleString()}</td>
                    <td className="py-4 px-4 text-accent">{metrics.shares.toLocaleString()}</td>
                    <td className="py-4 px-4 text-amber-500">{metrics.views.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${Math.min(parseFloat(engagement) * 5, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{engagement}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="card-footer">
          <button className="btn btn-sm btn-outline">Exportar datos</button>
          <button className="btn btn-sm btn-primary">Ver informe completo</button>
        </div>
      </div>
    </div>
  );
};
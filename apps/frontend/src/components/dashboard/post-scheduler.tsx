'use client';

import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type ScheduledPost = {
  id: string;
  title: string;
  content: string;
  date: string;
  time: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'pinterest';
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  image?: string;
  engagement?: {
    estimated: number;
    actual?: number;
  };
  tags?: string[];
};

type FilterOption = 'all' | 'draft' | 'scheduled' | 'published' | 'failed';
type ViewMode = 'list' | 'calendar';

export function PostScheduler() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      title: 'Lanzamiento de producto',
      content: 'Estamos emocionados de anunciar nuestro nuevo producto que revolucionará la industria...',
      date: '2025-08-20',
      time: '10:00',
      platform: 'instagram',
      status: 'scheduled',
      engagement: { estimated: 78 },
      tags: ['lanzamiento', 'producto', 'innovación']
    },
    {
      id: '2',
      title: 'Consejos de productividad',
      content: '5 consejos para mejorar tu productividad diaria y alcanzar tus metas profesionales...',
      date: '2025-08-18',
      time: '14:30',
      platform: 'linkedin',
      status: 'draft',
      engagement: { estimated: 65 },
      tags: ['productividad', 'consejos', 'trabajo']
    },
    {
      id: '3',
      title: 'Oferta especial',
      content: 'Por tiempo limitado, 25% de descuento en todos nuestros servicios premium...',
      date: '2025-08-19',
      time: '09:15',
      platform: 'facebook',
      status: 'scheduled',
      engagement: { estimated: 82 },
      tags: ['oferta', 'descuento', 'servicios']
    },
    {
      id: '4',
      title: 'Caso de éxito',
      content: 'Descubre cómo ayudamos a nuestro cliente a aumentar sus ventas en un 200%...',
      date: '2025-08-17',
      time: '16:45',
      platform: 'twitter',
      status: 'published',
      engagement: { estimated: 71, actual: 75 },
      tags: ['caso de éxito', 'resultados', 'ventas']
    },
    {
      id: '5',
      title: 'Webinar gratuito',
      content: 'Únete a nuestro webinar gratuito sobre estrategias de marketing digital...',
      date: '2025-08-21',
      time: '11:30',
      platform: 'linkedin',
      status: 'scheduled',
      engagement: { estimated: 89 },
      tags: ['webinar', 'marketing digital', 'formación']
    },
    {
      id: '6',
      title: 'Error en publicación',
      content: 'Esta publicación falló debido a problemas de conexión con la API...',
      date: '2025-08-16',
      time: '08:00',
      platform: 'pinterest',
      status: 'failed',
      engagement: { estimated: 60 },
      tags: ['diseño', 'inspiración']
    },
  ]);

  const [filter, setFilter] = useState<FilterOption>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<ScheduledPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // Simular retraso de API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Aquí iría la llamada real a la API
        // const token = await getAccessTokenSilently();
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?status=${filter}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // if (response.ok) {
        //   const data = await response.json();
        //   setPosts(data);
        // }
        
        // Por ahora mantenemos los datos simulados
      } catch (error) {
        console.error('Error fetching scheduled posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [user, getAccessTokenSilently, filter]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return '📸';
      case 'facebook':
        return '👍';
      case 'twitter':
        return '🐦';
      case 'linkedin':
        return '💼';
      case 'pinterest':
        return '📌';
      default:
        return '📱';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="bg-secondary/20 text-secondary text-xs py-1 px-2 rounded">Borrador</span>;
      case 'scheduled':
        return <span className="bg-primary/20 text-primary text-xs py-1 px-2 rounded">Programado</span>;
      case 'published':
        return <span className="bg-accent/20 text-accent text-xs py-1 px-2 rounded">Publicado</span>;
      case 'failed':
        return <span className="bg-red-100 text-red-500 text-xs py-1 px-2 rounded">Error</span>;
      default:
        return null;
    }
  };

  const handleEdit = (post: ScheduledPost) => {
    setEditingPost(post);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPost(null);
  };

  const handleSavePost = (post: ScheduledPost) => {
    if (editingPost) {
      // Actualizar post existente
      setPosts(posts.map(p => p.id === post.id ? post : p));
    } else {
      // Crear nuevo post
      const newPost = {
        ...post,
        id: Date.now().toString(),
      };
      setPosts([...posts, newPost]);
    }
    setShowModal(false);
    setEditingPost(null);
  };

  const handleRetry = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id && post.status === 'failed') {
        return { ...post, status: 'scheduled' };
      }
      return post;
    }));
  };

  // Filtrar posts según criterios
  let filteredPosts = posts;
  
  if (filter !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.status === filter);
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.content.toLowerCase().includes(query) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  // Ordenar posts por fecha y hora
  filteredPosts.sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Agrupar posts por fecha para la vista de calendario
  const postsByDate: Record<string, ScheduledPost[]> = {};
  filteredPosts.forEach(post => {
    if (!postsByDate[post.date]) {
      postsByDate[post.date] = [];
    }
    postsByDate[post.date].push(post);
  });

  // Formatear fecha para mostrar
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar publicaciones..."
            className="w-full pl-9 pr-3 py-2 bg-background rounded border border-border focus:outline-none focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-light">🔍</span>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex bg-background rounded-lg p-1">
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${viewMode === 'list' ? 'bg-primary text-white' : 'text-light'}`}
              onClick={() => setViewMode('list')}
            >
              📋 Lista
            </button>
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${viewMode === 'calendar' ? 'bg-primary text-white' : 'text-light'}`}
              onClick={() => setViewMode('calendar')}
            >
              📅 Calendario
            </button>
          </div>
          <button 
            className="btn btn-primary btn-sm ml-auto sm:ml-2" 
            onClick={handleNewPost}
          >
            + Nueva
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <div className="mr-2 text-sm text-light">Filtrar:</div>
        <button
          className={`text-xs px-3 py-1 rounded-full ${filter === 'all' ? 'bg-primary text-white' : 'bg-background text-light'}`}
          onClick={() => setFilter('all')}
        >
          Todos
        </button>
        <button
          className={`text-xs px-3 py-1 rounded-full ${filter === 'draft' ? 'bg-secondary text-white' : 'bg-background text-light'}`}
          onClick={() => setFilter('draft')}
        >
          Borradores
        </button>
        <button
          className={`text-xs px-3 py-1 rounded-full ${filter === 'scheduled' ? 'bg-primary text-white' : 'bg-background text-light'}`}
          onClick={() => setFilter('scheduled')}
        >
          Programados
        </button>
        <button
          className={`text-xs px-3 py-1 rounded-full ${filter === 'published' ? 'bg-accent text-white' : 'bg-background text-light'}`}
          onClick={() => setFilter('published')}
        >
          Publicados
        </button>
        <button
          className={`text-xs px-3 py-1 rounded-full ${filter === 'failed' ? 'bg-red-500 text-white' : 'bg-background text-light'}`}
          onClick={() => setFilter('failed')}
        >
          Errores
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-background rounded">
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-medium mb-2">No hay publicaciones</h3>
          <p className="text-light mb-4">No se encontraron publicaciones con los filtros actuales</p>
          <button className="btn btn-primary" onClick={handleNewPost}>Crear nueva publicación</button>
        </div>
      ) : viewMode === 'list' ? (
        <div className="card shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-light">Plataforma</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-light">Título</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-light">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-light">Hora</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-light">Estado</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-light">Engagement</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-light">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-background">
                    <td className="py-4 px-4">
                      <div className="text-xl" title={post.platform}>
                        {getPlatformIcon(post.platform)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-light truncate max-w-[200px]">{post.content}</div>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-xs bg-background px-1.5 py-0.5 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">{formatDate(post.date)}</td>
                    <td className="py-4 px-4">{post.time}</td>
                    <td className="py-4 px-4">{getStatusBadge(post.status)}</td>
                    <td className="py-4 px-4">
                      {post.engagement && (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${post.status === 'published' ? 'bg-accent' : 'bg-primary'}`}
                              style={{ width: `${post.engagement.estimated}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-medium">
                            {post.engagement.actual || post.engagement.estimated}%
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {post.status === 'failed' ? (
                        <button 
                          className="text-primary hover:text-primary-dark mr-2"
                          onClick={() => handleRetry(post.id)}
                        >
                          Reintentar
                        </button>
                      ) : (
                        <button 
                          className="text-primary hover:text-primary-dark mr-2"
                          onClick={() => handleEdit(post)}
                        >
                          Editar
                        </button>
                      )}
                      <button 
                        className="text-light hover:text-red-500"
                        onClick={() => handleDelete(post.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(postsByDate).map(([date, dayPosts]) => (
            <div key={date} className="card shadow">
              <div className="card-header">
                <h3 className="text-lg font-medium">{formatDate(date)}</h3>
                <span className="text-sm text-light">{dayPosts.length} publicaciones</span>
              </div>
              <div className="p-4 space-y-3">
                {dayPosts.map(post => (
                  <div 
                    key={post.id} 
                    className={`flex items-center gap-3 p-3 rounded-lg border ${post.status === 'failed' ? 'border-red-200 bg-red-50' : 'border-border'}`}
                  >
                    <div className="text-2xl">{getPlatformIcon(post.platform)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{post.title}</h4>
                          <p className="text-xs text-light truncate max-w-[300px]">{post.content}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(post.status)}
                          <span className="text-sm font-medium">{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {post.status === 'failed' ? (
                        <button 
                          className="btn btn-xs btn-outline"
                          onClick={() => handleRetry(post.id)}
                        >
                          Reintentar
                        </button>
                      ) : (
                        <button 
                          className="btn btn-xs btn-outline"
                          onClick={() => handleEdit(post)}
                        >
                          Editar
                        </button>
                      )}
                      <button 
                        className="btn btn-xs btn-outline text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(post.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para crear/editar publicaciones */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {editingPost ? 'Editar publicación' : 'Nueva publicación'}
                </h2>
                <button 
                  className="text-light hover:text-gray-700 text-xl"
                  onClick={handleCloseModal}
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-light">Este es un modal simulado. En una implementación real, aquí iría un formulario para crear o editar publicaciones.</p>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    className="btn btn-outline"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      // Simulamos guardar con datos de ejemplo
                      const mockPost: ScheduledPost = editingPost || {
                        id: Date.now().toString(),
                        title: 'Nueva publicación',
                        content: 'Contenido de ejemplo para la nueva publicación...',
                        date: '2025-08-25',
                        time: '12:00',
                        platform: 'instagram',
                        status: 'draft',
                        engagement: { estimated: 70 },
                        tags: ['ejemplo', 'nuevo']
                      };
                      handleSavePost(mockPost);
                    }}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

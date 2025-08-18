'use client';

import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type ContentSuggestion = {
  id: string;
  title: string;
  description: string;
  category: string;
  popularity: number; // 0-100
  relevance: number; // 0-100
  imageUrl?: string;
  tags: string[];
  estimatedEngagement?: number;
  bestPlatforms: string[];
};

type SortOption = 'relevance' | 'popularity' | 'engagement';

const mockSuggestions: ContentSuggestion[] = [
  {
    id: '1',
    title: 'Tendencias de marketing digital para 2025',
    description: 'Análisis de las estrategias de marketing digital que dominarán el próximo año y cómo prepararse para implementarlas.',
    category: 'Marketing',
    popularity: 87,
    relevance: 92,
    tags: ['tendencias', 'marketing digital', 'estrategia'],
    estimatedEngagement: 78,
    bestPlatforms: ['linkedin', 'twitter']
  },
  {
    id: '2',
    title: 'Cómo optimizar tu perfil de LinkedIn',
    description: 'Consejos prácticos para destacar tu perfil profesional y atraer más oportunidades laborales y de networking.',
    category: 'Profesional',
    popularity: 76,
    relevance: 85,
    tags: ['linkedin', 'perfil profesional', 'networking'],
    estimatedEngagement: 65,
    bestPlatforms: ['linkedin']
  },
  {
    id: '3',
    title: '5 herramientas de IA para creadores de contenido',
    description: 'Las mejores herramientas de inteligencia artificial para potenciar tu creación de contenido y optimizar tu flujo de trabajo.',
    category: 'Tecnología',
    popularity: 94,
    relevance: 89,
    tags: ['IA', 'herramientas', 'contenido'],
    estimatedEngagement: 82,
    bestPlatforms: ['instagram', 'twitter', 'facebook']
  },
  {
    id: '4',
    title: 'Guía para crear infografías efectivas',
    description: 'Aprende a diseñar infografías que capten la atención y transmitan información de forma clara y visualmente atractiva.',
    category: 'Diseño',
    popularity: 68,
    relevance: 77,
    tags: ['infografías', 'diseño gráfico', 'contenido visual'],
    estimatedEngagement: 71,
    bestPlatforms: ['pinterest', 'instagram']
  },
  {
    id: '5',
    title: 'Estrategias de email marketing que aumentan conversiones',
    description: 'Tácticas probadas para mejorar tus campañas de email marketing y aumentar las tasas de apertura, clics y conversiones.',
    category: 'Marketing',
    popularity: 81,
    relevance: 88,
    tags: ['email marketing', 'conversiones', 'campañas'],
    estimatedEngagement: 75,
    bestPlatforms: ['linkedin', 'facebook']
  },
  {
    id: '6',
    title: 'Cómo crear un calendario editorial efectivo',
    description: 'Pasos para organizar y planificar tu contenido de manera estratégica con un calendario editorial que optimice tu presencia online.',
    category: 'Contenido',
    popularity: 79,
    relevance: 91,
    tags: ['calendario editorial', 'planificación', 'estrategia de contenido'],
    estimatedEngagement: 84,
    bestPlatforms: ['instagram', 'facebook', 'linkedin']
  },
];

export function ContentSuggestions() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>(mockSuggestions);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedSuggestions, setSavedSuggestions] = useState<string[]>([]);
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  
  const categories = ['all', ...Array.from(new Set(suggestions.map(s => s.category)))];
  
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // Simular retraso de API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Aquí iría la llamada real a la API
        // const token = await getAccessTokenSilently();
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content-suggestions?category=${selectedCategory}`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // if (response.ok) {
        //   const data = await response.json();
        //   setSuggestions(data);
        // }
        
        // Por ahora usamos los datos simulados
        setSuggestions(mockSuggestions);
      } catch (error) {
        console.error('Error fetching content suggestions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSuggestions();
  }, [user, getAccessTokenSilently]);
  
  const handleRefresh = () => {
    setLoading(true);
    // Simular refresco de datos
    setTimeout(() => {
      // Reordenar aleatoriamente las sugerencias para simular nuevos datos
      setSuggestions([...suggestions].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 1000);
  };
  
  const handleSave = (id: string) => {
    if (savedSuggestions.includes(id)) {
      setSavedSuggestions(savedSuggestions.filter(savedId => savedId !== id));
    } else {
      setSavedSuggestions([...savedSuggestions, id]);
    }
  };
  
  const handleUse = (suggestion: ContentSuggestion) => {
    // Aquí iría la lógica para usar la sugerencia (ej: abrir editor, etc)
    alert(`Usando sugerencia: ${suggestion.title}`);
  };
  
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '📸';
      case 'facebook': return '👍';
      case 'twitter': return '🐦';
      case 'linkedin': return '💼';
      case 'pinterest': return '📌';
      default: return '📱';
    }
  };
  
  // Filtrar por categoría y búsqueda
  let filteredSuggestions = suggestions;
  
  if (selectedCategory !== 'all') {
    filteredSuggestions = filteredSuggestions.filter(s => s.category === selectedCategory);
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredSuggestions = filteredSuggestions.filter(s => 
      s.title.toLowerCase().includes(query) || 
      s.description.toLowerCase().includes(query) ||
      s.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  if (showOnlySaved) {
    filteredSuggestions = filteredSuggestions.filter(s => savedSuggestions.includes(s.id));
  }
  
  // Ordenar resultados
  filteredSuggestions = [...filteredSuggestions].sort((a, b) => {
    if (sortBy === 'relevance') return b.relevance - a.relevance;
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    if (sortBy === 'engagement' && a.estimatedEngagement && b.estimatedEngagement) {
      return b.estimatedEngagement - a.estimatedEngagement;
    }
    return 0;
  });
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Buscar sugerencias..."
            className="w-full pl-9 pr-3 py-2 bg-background rounded border border-border focus:outline-none focus:border-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-light">🔍</span>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="flex items-center text-sm cursor-pointer">
            <input 
              type="checkbox" 
              className="mr-2 h-4 w-4 accent-primary" 
              checked={showOnlySaved}
              onChange={() => setShowOnlySaved(!showOnlySaved)}
            />
            Solo guardados
          </label>
          <button 
            className="btn btn-sm btn-outline ml-auto sm:ml-2" 
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
            ) : '↻ Refrescar'}
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="mr-2 text-sm text-light">Filtrar:</div>
        {categories.map(category => (
          <button
            key={category}
            className={`text-xs px-3 py-1 rounded-full ${
              selectedCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-background text-light hover:bg-primary/10'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === 'all' ? 'Todos' : category}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="text-sm text-light">Ordenar por:</div>
        <div className="flex gap-2">
          <button 
            className={`text-xs px-3 py-1 rounded-full ${sortBy === 'relevance' ? 'bg-primary text-white' : 'bg-background text-light'}`}
            onClick={() => setSortBy('relevance')}
          >
            Relevancia
          </button>
          <button 
            className={`text-xs px-3 py-1 rounded-full ${sortBy === 'popularity' ? 'bg-primary text-white' : 'bg-background text-light'}`}
            onClick={() => setSortBy('popularity')}
          >
            Popularidad
          </button>
          <button 
            className={`text-xs px-3 py-1 rounded-full ${sortBy === 'engagement' ? 'bg-primary text-white' : 'bg-background text-light'}`}
            onClick={() => setSortBy('engagement')}
          >
            Engagement
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredSuggestions.length === 0 ? (
        <div className="text-center py-12 bg-background rounded">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-medium mb-2">No hay sugerencias disponibles</h3>
          <p className="text-light">Prueba con otros filtros o refresca para obtener nuevas ideas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSuggestions.map(suggestion => (
            <div 
              key={suggestion.id} 
              className="card shadow-sm hover:shadow transition-shadow relative overflow-hidden"
            >
              {savedSuggestions.includes(suggestion.id) && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl">
                  Guardado ⭐
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-md">{suggestion.title}</h4>
                  <span className="bg-secondary/10 text-secondary text-xs px-2 py-1 rounded">
                    {suggestion.category}
                  </span>
                </div>
                
                <p className="text-sm text-light mb-4">{suggestion.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {suggestion.tags.map(tag => (
                    <span key={tag} className="text-xs bg-background px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-xs mb-4">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-light">Popularidad:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${suggestion.popularity}%` }}
                          ></div>
                        </div>
                        <span className="text-primary font-medium">{suggestion.popularity}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-light">Relevancia:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent rounded-full" 
                            style={{ width: `${suggestion.relevance}%` }}
                          ></div>
                        </div>
                        <span className="text-accent font-medium">{suggestion.relevance}%</span>
                      </div>
                    </div>
                    
                    {suggestion.estimatedEngagement && (
                      <div className="flex items-center justify-between">
                        <span className="text-light">Engagement estimado:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-background rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-secondary rounded-full" 
                              style={{ width: `${suggestion.estimatedEngagement}%` }}
                            ></div>
                          </div>
                          <span className="text-secondary font-medium">{suggestion.estimatedEngagement}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-light">Mejor en:</span>
                    <div className="flex">
                      {suggestion.bestPlatforms.map(platform => (
                        <span key={platform} className="text-lg" title={platform}>
                          {getPlatformIcon(platform)}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className={`btn btn-sm ${savedSuggestions.includes(suggestion.id) ? 'btn-secondary' : 'btn-outline'}`}
                      onClick={() => handleSave(suggestion.id)}
                    >
                      {savedSuggestions.includes(suggestion.id) ? '✓ Guardado' : 'Guardar'}
                    </button>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleUse(suggestion)}
                    >
                      Usar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

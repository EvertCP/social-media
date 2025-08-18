'use client';

import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
}

interface PostFormProps {
  onSubmit: (postData: any) => Promise<void>;
}

export const PostForm = ({ onSubmit }: PostFormProps) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [content, setContent] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [predictedEngagement, setPredictedEngagement] = useState<number | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user) return;
      
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/social/accounts/user/${user.sub}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setAccounts(data);
        }
      } catch (error) {
        console.error('Error fetching social accounts:', error);
      }
    };
    
    fetchAccounts();
  }, [user, getAccessTokenSilently]);

  const handleAddMedia = () => {
    if (mediaUrl && !mediaUrls.includes(mediaUrl)) {
      setMediaUrls([...mediaUrls, mediaUrl]);
      setMediaUrl('');
    }
  };

  const handleRemoveMedia = (urlToRemove: string) => {
    setMediaUrls(mediaUrls.filter(url => url !== urlToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content || !scheduledDate || !selectedAccount) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    setLoading(true);
    
    try {
      const postData = {
        content,
        mediaUrls,
        scheduledDate: new Date(scheduledDate).toISOString(),
        socialAccount: { id: selectedAccount },
        user: { id: user?.sub },
      };
      
      await onSubmit(postData);
      
      // Resetear el formulario
      setContent('');
      setMediaUrls([]);
      setScheduledDate('');
      setSelectedAccount('');
      setPredictedEngagement(null);
    } catch (error) {
      console.error('Error scheduling post:', error);
      alert('Error al programar la publicación');
    } finally {
      setLoading(false);
    }
  };

  const handlePredict = async () => {
    if (!content || !scheduledDate || !selectedAccount) {
      alert('Por favor completa el contenido, fecha y cuenta para predecir engagement');
      return;
    }
    
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scheduled-posts/predict-engagement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content,
          mediaUrls,
          scheduledDate: new Date(scheduledDate).toISOString(),
          socialAccount: { id: selectedAccount },
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setPredictedEngagement(data.predictedEngagement);
      }
    } catch (error) {
      console.error('Error predicting engagement:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold">Programar Nueva Publicación</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Cuenta</label>
        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Seleccionar cuenta</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.platform} - {account.username}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Contenido</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
        <input
          type="datetime-local"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Añadir Media</label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="URL de la imagen o video"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleAddMedia}
            className="mt-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Añadir
          </button>
        </div>
      </div>
      
      {mediaUrls.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Media URLs</label>
          <ul className="mt-1 space-y-2">
            {mediaUrls.map((url, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="truncate">{url}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(url)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={handlePredict}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Predecir Engagement
        </button>
        
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Programando...' : 'Programar Publicación'}
        </button>
      </div>
      
      {predictedEngagement !== null && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
          <p className="text-sm font-medium text-blue-800">
            Engagement predicho: <span className="font-bold">{predictedEngagement}%</span>
          </p>
          <p className="text-xs text-blue-600 mt-1">
            {predictedEngagement < 30 ? 'Bajo' : predictedEngagement < 70 ? 'Medio' : 'Alto'} nivel de engagement esperado
          </p>
        </div>
      )}
    </form>
  );
};
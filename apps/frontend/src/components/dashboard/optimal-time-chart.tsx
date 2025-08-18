'use client';

import { useEffect, useRef } from 'react';

type DayData = {
  day: string;
  hours: {
    hour: number;
    engagement: number;
  }[];
};

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// Datos simulados de engagement por hora y día
const mockData: DayData[] = daysOfWeek.map(day => ({
  day,
  hours: Array.from({ length: 24 }, (_, i) => {
    // Simular picos de engagement en diferentes momentos del día
    let baseEngagement = 0;
    
    // Mañana (8-10)
    if (i >= 8 && i <= 10) {
      baseEngagement = 40 + Math.random() * 30;
    }
    // Mediodía (12-14)
    else if (i >= 12 && i <= 14) {
      baseEngagement = 50 + Math.random() * 40;
    }
    // Tarde (17-19)
    else if (i >= 17 && i <= 19) {
      baseEngagement = 60 + Math.random() * 40;
    }
    // Noche (20-22)
    else if (i >= 20 && i <= 22) {
      baseEngagement = 45 + Math.random() * 35;
    }
    // Madrugada (0-6)
    else if (i >= 0 && i <= 6) {
      baseEngagement = 5 + Math.random() * 15;
    }
    // Resto del día
    else {
      baseEngagement = 15 + Math.random() * 25;
    }
    
    // Añadir variación por día de la semana
    if (day === 'Sábado' || day === 'Domingo') {
      baseEngagement *= 1.2; // Más engagement en fin de semana
    }
    
    return {
      hour: i,
      engagement: Math.round(baseEngagement)
    };
  })
}));

export function OptimalTimeChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bestTimes = findBestTimes(mockData);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configurar tamaño del canvas
    const parentWidth = canvas.parentElement?.clientWidth || 600;
    canvas.width = parentWidth;
    canvas.height = 300;
    
    drawHeatmap(ctx, canvas.width, canvas.height, mockData);
    
  }, []);
  
  function drawHeatmap(ctx: CanvasRenderingContext2D, width: number, height: number, data: DayData[]) {
    const cellWidth = width / 24; // 24 horas
    const cellHeight = height / 7; // 7 días
    
    // Encontrar el valor máximo de engagement para normalizar colores
    const maxEngagement = Math.max(...data.flatMap(d => d.hours.map(h => h.engagement)));
    
    // Dibujar las celdas del heatmap
    data.forEach((dayData, dayIndex) => {
      dayData.hours.forEach((hourData) => {
        const x = hourData.hour * cellWidth;
        const y = dayIndex * cellHeight;
        
        // Normalizar el valor de engagement (0-1)
        const normalizedValue = hourData.engagement / maxEngagement;
        
        // Generar color basado en el valor (de azul claro a morado oscuro)
        const intensity = Math.floor(normalizedValue * 255);
        ctx.fillStyle = `rgba(79, 70, 229, ${normalizedValue.toFixed(2)})`;
        
        // Dibujar celda
        ctx.fillRect(x, y, cellWidth, cellHeight);
        
        // Añadir borde
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeRect(x, y, cellWidth, cellHeight);
        
        // Añadir valor de engagement para celdas con alto engagement
        if (normalizedValue > 0.7) {
          ctx.fillStyle = 'white';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(hourData.engagement.toString(), x + cellWidth / 2, y + cellHeight / 2);
        }
      });
    });
    
    // Añadir etiquetas de horas (eje X)
    ctx.fillStyle = 'var(--color-text)';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    
    for (let hour = 0; hour < 24; hour += 3) {
      const x = hour * cellWidth + cellWidth / 2;
      ctx.fillText(`${hour}:00`, x, height + 15);
    }
    
    // Añadir etiquetas de días (eje Y)
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    
    daysOfWeek.forEach((day, index) => {
      const y = index * cellHeight + cellHeight / 2;
      ctx.fillText(day, width + 40, y);
    });
  }
  
  function findBestTimes(data: DayData[]) {
    // Encontrar los mejores momentos para publicar (top 3 por día)
    return data.map(dayData => {
      const sortedHours = [...dayData.hours].sort((a, b) => b.engagement - a.engagement);
      const topHours = sortedHours.slice(0, 2);
      
      return {
        day: dayData.day,
        bestHours: topHours.map(h => ({
          hour: h.hour,
          engagement: h.engagement,
          formattedHour: `${h.hour}:00`
        }))
      };
    });
  }

  return (
    <div>
      <div className="mb-6 overflow-x-auto">
        <canvas 
          ref={canvasRef} 
          style={{ display: 'block', maxWidth: '100%' }}
        ></canvas>
        <div className="flex justify-center mt-2 text-xs text-light">
          Horas del día (24h)
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {bestTimes.map((dayBest) => (
          <div key={dayBest.day} className="bg-background p-3 rounded">
            <div className="font-medium mb-1">{dayBest.day}</div>
            <div className="text-sm">
              Mejores horas:
              {dayBest.bestHours.map((best, i) => (
                <span key={i} className="ml-2 bg-primary/10 text-primary rounded px-2 py-1">
                  {best.formattedHour}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

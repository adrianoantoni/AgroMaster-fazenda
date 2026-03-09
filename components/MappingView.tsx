
import React, { useState } from 'react';
import { MOCK_PLOTS, MOCK_CROPS, MOCK_TASKS } from '../constants';
import { 
  Layers, MapPin, MousePointer2, Thermometer, Droplets, Info, Sprout, 
  TrendingUp, Maximize, Navigation, Grid, Eye, EyeOff, Wind, Sun,
  Ruler, ZoomIn, ZoomOut, History, ChevronRight, PlayCircle, Clock
} from 'lucide-react';

type MapLayer = 'satellite' | 'ndvi' | 'moisture' | 'topology';

const MappingView: React.FC = () => {
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>('p1');
  const [activeLayer, setActiveLayer] = useState<MapLayer>('satellite');
  const [showLabels, setShowLabels] = useState(true);
  const [showTasks, setShowTasks] = useState(true);
  const [historyYear, setHistoryYear] = useState(2024);
  const [isMeasuring, setIsMeasuring] = useState(false);
  
  const selectedPlot = MOCK_PLOTS.find(p => p.id === selectedPlotId);
  const activeCrop = MOCK_CROPS.find(c => c.plotId === selectedPlotId);

  const layers: { id: MapLayer; label: string; icon: any }[] = [
    { id: 'satellite', label: 'Satélite HD', icon: Sun },
    { id: 'ndvi', label: 'Índice NDVI', icon: Sprout },
    { id: 'moisture', label: 'Humidade Solo', icon: Droplets },
    { id: 'topology', label: 'Topografia', icon: Grid },
  ];

  return (
    <div className="space-y-8 h-full flex flex-col pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">GeoAgro <span className="text-emerald-600 font-bold">GIS 3.0</span></h1>
          <p className="text-slate-500 font-medium">Análise multiespectral, telemetria e histórico de talhões.</p>
        </div>
        <div className="flex gap-3">
           <div className="flex bg-white border p-1 rounded-2xl shadow-sm">
             {layers.map(layer => (
               <button 
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${activeLayer === layer.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <layer.icon size={14} /> {layer.label}
               </button>
             ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-[750px]">
        <div className="lg:col-span-3 bg-slate-900 rounded-[3rem] relative overflow-hidden shadow-2xl border-8 border-white group">
          <div className={`absolute inset-0 transition-all duration-1000 ${
            activeLayer === 'ndvi' ? 'sepia-[0.5] hue-rotate-[90deg] saturate-[2]' : 
            activeLayer === 'moisture' ? 'brightness-[0.8] saturate-[3] hue-rotate-[180deg]' : ''
          } ${historyYear < 2024 ? 'grayscale-[0.5] contrast-[1.2]' : ''}`}>
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=2000" 
              className="w-full h-full object-cover opacity-80" 
              alt="Base Map" 
            />
          </div>

          <div className="absolute top-8 left-8 bg-slate-900/80 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 text-white z-20 font-mono text-xs space-y-1 shadow-2xl">
             <div className="flex items-center gap-3 text-emerald-400">
                <Navigation size={14} className="animate-pulse" />
                <span>GPS ATIVO: 12°46'34.2"S 15°44'05.1"E</span>
             </div>
             <p className="text-slate-400">ALTITUDE: 1,740m • PRECISÃO: 0.2m</p>
          </div>

          <div className="absolute top-8 right-8 flex flex-col gap-3 z-20">
             <div className="flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border">
                <button className="p-4 text-slate-900 hover:bg-slate-100 border-b transition-all"><ZoomIn size={20} /></button>
                <button className="p-4 text-slate-900 hover:bg-slate-100 transition-all"><ZoomOut size={20} /></button>
             </div>
             <button onClick={() => setIsMeasuring(!isMeasuring)} className={`p-4 rounded-2xl shadow-xl transition-all ${isMeasuring ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900 hover:bg-emerald-50'}`}><Ruler size={20} /></button>
             <button onClick={() => setShowTasks(!showTasks)} className={`p-4 rounded-2xl shadow-xl transition-all ${showTasks ? 'bg-emerald-600 text-white' : 'bg-white text-slate-900 hover:bg-emerald-50'}`}><Clock size={20} /></button>
             <button onClick={() => setShowLabels(!showLabels)} className="p-4 bg-white rounded-2xl shadow-xl text-slate-900 hover:bg-emerald-50 transition-all">
                {showLabels ? <Eye size={20} /> : <EyeOff size={20} />}
             </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xl px-10 py-6 rounded-[2.5rem] border border-white/10 z-20 shadow-2xl w-full max-w-xl">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                   <History size={18} className="text-emerald-400" />
                   <span className="text-white font-black text-xs uppercase tracking-widest">Análise Histórica: {historyYear}</span>
                </div>
             </div>
             <input type="range" min="2020" max="2024" value={historyYear} onChange={(e) => setHistoryYear(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-full appearance-none cursor-pointer accent-emerald-500" />
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
             <path d="M 150 100 L 400 100 L 380 250 L 130 250 Z" className={`pointer-events-auto cursor-pointer transition-all duration-300 ${selectedPlotId === 'p1' ? 'fill-emerald-500/40 stroke-emerald-400 stroke-[4px]' : 'fill-white/10 stroke-white/40 hover:fill-white/20'}`} onClick={() => setSelectedPlotId('p1')} />
             <path d="M 420 120 L 650 150 L 600 400 L 380 380 Z" className={`pointer-events-auto cursor-pointer transition-all duration-300 ${selectedPlotId === 'p2' ? 'fill-emerald-500/40 stroke-emerald-400 stroke-[4px]' : 'fill-white/10 stroke-white/40 hover:fill-white/20'}`} onClick={() => setSelectedPlotId('p2')} />
          </svg>

          {showTasks && MOCK_TASKS.map((task, idx) => {
            const pos = JSON.parse(task.location || '{"x":0,"y":0}');
            return (
              <div 
                key={task.id} 
                className="absolute z-30 group cursor-help animate-bounce" 
                style={{ top: pos.y, left: pos.x }}
                title={task.description}
              >
                <div className={`p-2 rounded-full border-2 border-white shadow-xl ${task.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                   {task.description.includes('Irrigação') ? <Droplets size={16} className="text-white" /> : <Sprout size={16} className="text-white" />}
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-slate-900 text-white text-[10px] font-black p-3 rounded-xl whitespace-nowrap shadow-2xl">
                   {task.description} <br/> <span className="text-slate-400 uppercase">{task.assignedTo}</span>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white z-20 w-72 hidden md:block text-slate-900">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Legenda Ativa</h4>
             <div className="space-y-4">
                <div className="flex items-center gap-4"><div className="w-10 h-3 rounded-full bg-emerald-500"></div><span className="text-xs font-black">Vigor Alto</span></div>
                <div className="flex items-center gap-4"><div className="w-10 h-3 rounded-full bg-amber-400"></div><span className="text-xs font-black">Stress Hídrico</span></div>
                <div className="flex items-center gap-4"><div className="w-10 h-3 rounded-full bg-rose-500"></div><span className="text-xs font-black">Pragas/Crítico</span></div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl border border-white/10 h-full flex flex-col">
             {selectedPlot ? (
               <div className="space-y-8 h-full flex flex-col">
                  <div>
                     <h3 className="text-2xl font-black">{selectedPlot.name}</h3>
                     <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest">Safra Atual • {activeCrop?.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-center"><Thermometer className="text-orange-400 mx-auto mb-3" size={24} /><p className="text-[10px] font-black text-slate-400 uppercase">Temp. Solo</p><p className="text-lg font-black">23.8°C</p></div>
                     <div className="p-5 bg-white/5 border border-white/10 rounded-3xl text-center"><Droplets className="text-blue-400 mx-auto mb-3" size={24} /><p className="text-[10px] font-black text-slate-400 uppercase">Humidade</p><p className="text-lg font-black">62%</p></div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group mt-auto">
                    <h4 className="font-black text-lg leading-tight mb-4 relative z-10">Gemini sugere irrigação em 4h para este talhão.</h4>
                    <Wind className="absolute -right-4 -bottom-4 text-white/10" size={120} />
                  </div>
               </div>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50"><MousePointer2 size={64} className="text-slate-700 mb-6 animate-bounce" /><p className="font-black text-lg text-slate-400 uppercase tracking-widest">Selecione uma área no mapa</p></div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MappingView;

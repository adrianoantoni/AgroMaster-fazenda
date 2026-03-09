
import React, { useState } from 'react';
import { MOCK_CROPS, MOCK_PLOTS } from '../constants';
import { 
  Sprout, MapPin, Calendar, Layers, Activity, History, ChevronRight, 
  Droplets, FlaskConical, Target, X, CheckCircle2, Plus, Info, Scale, Search
} from 'lucide-react';
import { Crop } from '../types';

const CropManager: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [showNewCycleModal, setShowNewCycleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCrops = MOCK_CROPS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.variety.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCropClick = (crop: any) => {
    const enrichedCrop: Crop = {
      ...crop,
      cycleEvents: [
        { id: '1', date: '15 Nov 2023', type: 'Planting', description: 'Semeadura mecânica com profundidade de 5cm' },
        { id: '2', date: '02 Dez 2023', type: 'Fertilization', description: 'Aplicação de NPK 15-15-15 (200kg/ha)' },
      ]
    };
    setSelectedCrop(enrichedCrop);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Culturas & <span className="text-emerald-600">Safra</span></h1>
          <p className="text-slate-500 font-medium">Gestão de talhões, ciclos produtivos e biossensores.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-[2rem] border text-sm shadow-inner w-72">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar culturas..." 
              className="bg-transparent border-none outline-none font-bold w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowNewCycleModal(true)}
            className="bg-emerald-600 text-white px-8 py-4 rounded-[2rem] font-black shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-3"
          >
            <Plus size={24} /> Novo Ciclo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCrops.map((crop) => (
          <div 
            key={crop.id} 
            className="bg-white rounded-[3rem] border p-10 hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
            onClick={() => handleCropClick(crop)}
          >
            <div className="flex justify-between items-start mb-8 text-slate-900">
              <div className="bg-emerald-50 p-5 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Sprout size={32} />
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${crop.status === 'Growing' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {crop.status}
              </span>
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 leading-tight mb-1">{crop.name}</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">{crop.variety}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                <MapPin size={18} className="text-slate-400" /> 
                {MOCK_PLOTS.find(p => p.id === crop.plotId)?.name}
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                <Scale size={18} className="text-slate-400" /> 
                {crop.area} ha
              </div>
            </div>
          </div>
        ))}
      </div>

      {showNewCycleModal && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300 text-slate-900">
           <div className="bg-white w-full max-w-2xl rounded-[4rem] shadow-2xl overflow-hidden border-8 border-white animate-in zoom-in-95 duration-300">
              <div className="p-12 border-b flex justify-between items-center bg-emerald-50/50">
                 <div>
                    <h2 className="text-3xl font-black">Planejar Plantio</h2>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-2">Módulo v4.2</p>
                 </div>
                 <button onClick={() => setShowNewCycleModal(false)} className="p-4 bg-white border rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                    <X size={24} />
                 </button>
              </div>
              <div className="p-12 space-y-8">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cultura</label>
                       <select className="w-full p-5 bg-slate-50 border-none rounded-2xl font-black outline-none ring-2 ring-slate-100 focus:ring-emerald-500">
                          <option>Milho Safra</option>
                          <option>Trigo</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Variedade</label>
                       <input type="text" placeholder="Ex: H-99 Max" className="w-full p-5 bg-slate-50 border-none rounded-2xl font-black outline-none ring-2 ring-slate-100 focus:ring-emerald-500" />
                    </div>
                 </div>
                 <button 
                  onClick={() => setShowNewCycleModal(false)}
                  className="w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-emerald-700 transition-all active:scale-95"
                 >
                    Confirmar Plantio
                 </button>
              </div>
           </div>
        </div>
      )}

      {selectedCrop && (
        <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-white shadow-2xl z-[100] p-10 overflow-y-auto animate-in slide-in-from-right duration-500 border-l text-slate-900">
           <div className="flex justify-between items-start mb-10">
              <h2 className="text-4xl font-black">{selectedCrop.name} <span className="block text-xs text-slate-400 tracking-widest mt-2 font-black uppercase">{selectedCrop.variety}</span></h2>
              <button onClick={() => setSelectedCrop(null)} className="p-4 bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors">
                 <X size={24} />
              </button>
           </div>
           
           <div className="space-y-10 relative">
              <div className="absolute left-7 top-0 bottom-0 w-1 bg-slate-50"></div>
              {selectedCrop.cycleEvents?.map((event) => (
                <div key={event.id} className="relative pl-20 group">
                   <div className="absolute left-0 w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center z-10 shadow-lg">
                      <Sprout size={24} />
                   </div>
                   <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-black text-slate-900 text-lg">{event.type}</h4>
                        <span className="text-xs font-black text-slate-400 bg-white px-3 py-1 rounded-full">{event.date}</span>
                      </div>
                      <p className="text-sm text-slate-500 font-bold">{event.description}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default CropManager;

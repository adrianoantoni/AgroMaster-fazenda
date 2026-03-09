
import React, { useState } from 'react';
import { Truck, PenTool, Fuel, AlertTriangle, Plus, Gauge, Calendar, Settings, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const MachineryManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const machineryData = [
    { id: 'm1', name: 'Trator Massey Ferguson 7720', type: 'Trator', status: 'Operacional', hours: 1240, lastMaint: '10 Jan 2024', fuel: 85 },
    { id: 'm2', name: 'Colheitadeira John Deere S700', type: 'Colheitadeira', status: 'Manutenção', hours: 850, lastMaint: '05 Dez 2023', fuel: 12 },
    { id: 'm3', name: 'Pulverizador Stara Imperador', type: 'Pulverizador', status: 'Operacional', hours: 420, lastMaint: '15 Jan 2024', fuel: 45 },
    { id: 'm4', name: 'Trator Ford 6610', type: 'Trator', status: 'Operacional', hours: 5600, lastMaint: '20 Dez 2023', fuel: 90 },
  ];

  const filteredMachinery = machineryData.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMachinery.length / itemsPerPage);
  const currentMachinery = filteredMachinery.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Frota & <span className="text-emerald-600">Maquinaria</span></h1>
          <p className="text-slate-500 font-medium tracking-tight">Gestão de telemetria, manutenção e consumo de combustível.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-[2rem] border text-sm shadow-inner w-72">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Pesquisar frota..." 
                className="bg-transparent border-none outline-none font-bold w-full"
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              />
           </div>
           <button className="flex items-center gap-2 bg-emerald-600 text-white px-10 py-4 rounded-[2rem] font-black shadow-lg shadow-emerald-100">
             <Plus size={20} /> Adicionar Ativo
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentMachinery.map((item) => (
          <div key={item.id} className="bg-white rounded-[3rem] border shadow-sm overflow-hidden group hover:shadow-2xl transition-all relative">
            <div className="p-10">
               <div className="flex justify-between items-start mb-10">
                  <div className={`p-6 rounded-[2rem] transition-all ${item.status === 'Manutenção' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                     <Truck size={48} />
                  </div>
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === 'Manutenção' ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                     {item.status}
                  </span>
               </div>
               
               <h3 className="text-2xl font-black text-slate-900 mb-2 leading-tight">{item.name}</h3>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">{item.type}</p>

               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                     <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Gauge size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Horas Uso</span>
                     </div>
                     <p className="text-2xl font-black text-slate-900">{item.hours}h</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
                     <div className="flex items-center gap-2 text-slate-400 mb-2">
                        <Fuel size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Nível</span>
                     </div>
                     <p className="text-2xl font-black text-slate-900">{item.fuel}%</p>
                  </div>
               </div>

               <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest border-t pt-8">
                  <span className="flex items-center gap-2"><Calendar size={16} /> Revisão: {item.lastMaint}</span>
               </div>
            </div>
            
            <div className="bg-slate-50/50 p-6 flex gap-4 border-t">
               <button className="flex-1 py-4 bg-white border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all">Relatório</button>
               <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all">Manutenção</button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
           <button onClick={() => setCurrentPage(prev => Math.max(prev-1, 1))} disabled={currentPage === 1} className="p-4 bg-white border rounded-2xl disabled:opacity-30"><ChevronLeft size={24} /></button>
           <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Página {currentPage} de {totalPages}</span>
           <button onClick={() => setCurrentPage(prev => Math.min(prev+1, totalPages))} disabled={currentPage === totalPages} className="p-4 bg-white border rounded-2xl disabled:opacity-30"><ChevronRight size={24} /></button>
        </div>
      )}
    </div>
  );
};

export default MachineryManager;

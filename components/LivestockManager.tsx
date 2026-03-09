
import React, { useState } from 'react';
import { MOCK_ANIMALS } from '../constants';
import { 
  Beef, Activity, Heart, ShieldCheck, Plus, Search, Syringe, Calendar, 
  Thermometer, Baby, Skull, Droplets, ClipboardCheck, CheckCircle2, 
  X, ChevronRight, Stethoscope, UtensilsCrossed, Scale, AlertTriangle,
  TrendingDown, TrendingUp, DollarSign, ChevronLeft, Milk, Zap, ShoppingCart
} from 'lucide-react';
import { Animal, HealthRecord, FeedingLog } from '../types';

const LivestockManager: React.FC = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [activeFichaTab, setActiveFichaTab] = useState<'health' | 'feeding' | 'reproduction' | 'production'>('health');
  const [showSanitaryModal, setShowSanitaryModal] = useState(false);
  const [showProductionModal, setShowProductionModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventType, setEventType] = useState<'Birth' | 'Death' | 'Sale' | 'Reproduction'>('Birth');
  
  // Paginação e Filtro
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredAnimals = MOCK_ANIMALS.filter(a => 
    a.tagId.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAnimals.length / itemsPerPage);
  const currentAnimals = filteredAnimals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAnimalClick = (animal: any) => {
    setSelectedAnimal({
      ...animal,
      healthHistory: [
        { date: '05 Jan 2024', treatment: 'Vacinação Aftosa', medicine: 'Aftovax', dosage: '5ml', professional: 'Dr. Santos' },
      ],
      feedingHistory: [
        { date: '20 Jan 2024', feedType: 'Ração Crescimento A+', amount: '5.2 kg', nutritionist: 'Ing. Almeida' },
      ],
      birthDate: '15 Abr 2021'
    });
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão <span className="text-emerald-600">Pecuária</span></h1>
          <p className="text-slate-500 font-medium">Controle sanitário, reprodutivo e produção (Leite/Carne).</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => { setEventType('Reproduction'); setShowEventModal(true); }} className="flex items-center gap-3 bg-blue-50 text-blue-600 px-6 py-4 rounded-2xl font-black border border-blue-100 hover:bg-blue-100 transition-all">
            <Heart size={18} /> Ciclo Reprodutivo
          </button>
           <button onClick={() => setShowProductionModal(true)} className="flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-[2rem] font-black border-2 border-slate-100 hover:bg-slate-50 transition-all">
            <Milk size={20} /> Registrar Produção
          </button>
          <button onClick={() => { setEventType('Birth'); setShowEventModal(true); }} className="flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-[2rem] font-black shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95">
            <Plus size={20} /> Novo Animal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Beef, label: 'Efetivo Total', val: '1,240', sub: '+12 este mês' },
          { icon: Milk, label: 'Produção Diária', val: '450L', sub: 'Média/Vaca' },
          { icon: Baby, label: 'Nascimentos', val: '15', sub: 'Jan/2024' },
          { icon: Activity, label: 'Engorda Média', val: '1.2 kg', sub: 'GMD Diário' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
             <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                <stat.icon size={28} className="text-slate-900" />
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
             <h3 className="text-3xl font-black text-slate-900">{stat.val}</h3>
             <p className="text-[10px] font-bold text-emerald-600 mt-2 uppercase">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden flex flex-col min-h-[500px]">
              <div className="p-10 border-b flex justify-between items-center bg-slate-50/50">
                 <h3 className="font-black text-slate-900 text-xl">Rebanho Ativo</h3>
                 <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border text-sm shadow-inner w-72">
                    <Search size={18} className="text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Filtrar por TAG ou Raça..." 
                      className="bg-transparent border-none outline-none font-bold w-full" 
                      value={searchTerm}
                      onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                    />
                 </div>
              </div>
              <div className="flex-1">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b">
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                      <th className="px-10 py-6">TAG ID</th>
                      <th className="px-10 py-6">Raça / Espécie</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-sm">
                    {currentAnimals.map((animal) => (
                      <tr key={animal.id} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => handleAnimalClick(animal)}>
                        <td className="px-10 py-6 font-black text-slate-900 text-lg">#{animal.tagId}</td>
                        <td className="px-10 py-6 font-bold text-slate-700">{animal.breed} <span className="text-slate-400 block text-[10px]">{animal.species}</span></td>
                        <td className="px-10 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${animal.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                            {animal.status}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                           <div className="bg-slate-900 text-white w-10 h-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                              <ChevronRight size={20} />
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {totalPages > 1 && (
                <div className="p-8 border-t flex justify-between items-center bg-slate-50/30">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Página {currentPage} de {totalPages}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-3 rounded-xl border bg-white disabled:opacity-30"><ChevronLeft size={20} /></button>
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-3 rounded-xl border bg-white disabled:opacity-30"><ChevronRight size={20} /></button>
                  </div>
                </div>
              )}
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                 <AlertTriangle className="text-amber-400" /> Eventos Pendentes
              </h3>
              <div className="space-y-4">
                 <button onClick={() => { setEventType('Death'); setShowEventModal(true); }} className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between hover:bg-rose-500/20 transition-all group">
                    <div className="flex items-center gap-4 text-left">
                       <div className="p-3 bg-rose-500/20 text-rose-400 rounded-xl"><Skull size={20} /></div>
                       <div>
                          <p className="font-black text-sm">Registrar Mortalidade</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Saída Definitiva</p>
                       </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-600 group-hover:text-white" />
                 </button>
                 <button onClick={() => { setEventType('Sale'); setShowEventModal(true); }} className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between hover:bg-emerald-500/20 transition-all group">
                    <div className="flex items-center gap-4 text-left">
                       <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl"><ShoppingCart size={20} /></div>
                       <div>
                          <p className="font-black text-sm">Registrar Venda</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Transação Comercial</p>
                       </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-600 group-hover:text-white" />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Modal Eventos (Mortalidade / Venda / Nascimento) */}
      {showEventModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white animate-in zoom-in-95 duration-300 text-slate-900">
              <div className="p-10 border-b flex justify-between items-center bg-slate-50">
                 <div>
                    <h2 className="text-2xl font-black">{eventType === 'Death' ? 'Relatório de Mortalidade' : eventType === 'Sale' ? 'Registo de Venda' : 'Registo de Ciclo'}</h2>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">Atualização de Inventário Vivo</p>
                 </div>
                 <button onClick={() => setShowEventModal(false)} className="p-3 bg-white border rounded-2xl text-slate-400"><X size={24} /></button>
              </div>
              <div className="p-10 space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">TAG do Animal</label>
                       <select className="w-full p-4 rounded-2xl border-none bg-slate-50 font-bold outline-none ring-2 ring-slate-100">
                          {MOCK_ANIMALS.map(a => <option key={a.id}>{a.tagId}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data do Evento</label>
                       <input type="date" className="w-full p-4 rounded-2xl border-none bg-slate-50 font-bold outline-none ring-2 ring-slate-100" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Observações / Causa</label>
                       <textarea className="w-full p-4 rounded-2xl border-none bg-slate-50 font-bold outline-none ring-2 ring-slate-100 h-24" placeholder="Detalhes técnicos..."></textarea>
                    </div>
                 </div>
                 <button onClick={() => setShowEventModal(false)} className={`w-full py-5 rounded-[2rem] font-black text-lg text-white ${eventType === 'Death' ? 'bg-rose-600' : 'bg-emerald-600'}`}>Salvar Alteração</button>
              </div>
           </div>
        </div>
      )}

      {/* Modal Produção */}
      {showProductionModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[150] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white animate-in zoom-in-95 duration-300 text-slate-900">
              <div className="p-10 border-b flex justify-between items-center bg-slate-50">
                 <div>
                    <h2 className="text-2xl font-black">Coleta de Produção</h2>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">Peso / Litragem</p>
                 </div>
                 <button onClick={() => setShowProductionModal(false)} className="p-3 bg-white border rounded-2xl text-slate-400"><X size={24} /></button>
              </div>
              <div className="p-10 space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Animal / Lote</label>
                       <select className="w-full p-4 rounded-2xl border-none bg-slate-50 font-bold outline-none ring-2 ring-slate-100">
                          {MOCK_ANIMALS.map(a => <option key={a.id}>{a.tagId}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor Medido</label>
                       <input type="number" placeholder="0.00" className="w-full p-4 rounded-2xl border-none bg-slate-50 font-bold outline-none ring-2 ring-slate-100" />
                    </div>
                 </div>
                 <button onClick={() => setShowProductionModal(false)} className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-lg">Salvar Registo</button>
              </div>
           </div>
        </div>
      )}

      {/* Detalhe do Animal */}
      {selectedAnimal && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
           <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[4rem] shadow-2xl overflow-hidden flex animate-in zoom-in-95 duration-500 border-8 border-white">
              <div className="w-80 bg-slate-50 p-12 flex flex-col items-center border-r text-slate-900 text-center">
                 <div className="w-40 h-40 bg-emerald-600 rounded-[3rem] flex items-center justify-center text-white mb-8 shadow-2xl">
                    <Beef size={80} />
                 </div>
                 <h2 className="text-4xl font-black">#{selectedAnimal.tagId}</h2>
                 <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mt-2">{selectedAnimal.breed}</p>
                 <button onClick={() => setSelectedAnimal(null)} className="mt-auto w-full py-5 bg-slate-900 text-white rounded-3xl font-black">Fechar Ficha</button>
              </div>
              <div className="flex-1 flex flex-col p-12 text-slate-900">
                 <div className="flex bg-slate-100 p-2 rounded-2xl mb-10 w-fit">
                    {(['health', 'feeding', 'reproduction', 'production'] as const).map(tab => (
                      <button 
                        key={tab} 
                        onClick={() => setActiveFichaTab(tab)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeFichaTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                      >
                        {tab}
                      </button>
                    ))}
                 </div>
                 <div className="flex-1 overflow-y-auto pr-4">
                    {activeFichaTab === 'health' && (
                      <div className="space-y-4">
                         {selectedAnimal.healthHistory?.map((h, i) => (
                            <div key={i} className="p-6 bg-slate-50 border rounded-3xl flex justify-between items-center">
                               <div>
                                  <p className="font-black">{h.treatment}</p>
                                  <p className="text-xs text-slate-400">{h.date} • {h.medicine}</p>
                               </div>
                               <span className="text-xs font-black text-emerald-600">CONCLUÍDO</span>
                            </div>
                         ))}
                      </div>
                    )}
                    {activeFichaTab === 'reproduction' && (
                       <div className="space-y-6">
                          <div className="p-8 bg-blue-50 border border-blue-100 rounded-3xl">
                             <h4 className="font-black text-blue-900 mb-2">Status Reprodutivo: Prenha</h4>
                             <p className="text-sm text-blue-700 font-bold italic">Previsão de Parto: 15 Out 2024</p>
                          </div>
                       </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LivestockManager;


import React from 'react';
import { CloudSun, MapPin, Ruler, Users, Info, Calendar, ArrowUpRight, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const yieldTrendData = [
  { year: '2019', yield: 3.2 },
  { year: '2020', yield: 3.8 },
  { year: '2021', yield: 3.5 },
  { year: '2022', yield: 4.1 },
  { year: '2023', yield: 4.2 },
  { year: '2024 (Est.)', yield: 4.5 },
];

const FarmHome: React.FC = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <div className="relative h-72 rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="Fazenda" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex items-end p-12">
           <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-4 py-1.5 bg-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg shadow-emerald-500/20">Operação Ativa</span>
              </div>
              <h1 className="text-5xl font-black tracking-tight">Fazenda Sol Nascente</h1>
              <div className="flex items-center gap-8 mt-4 text-slate-200">
                 <span className="flex items-center gap-2 text-sm font-bold"><MapPin size={18} className="text-emerald-400" /> Huambo, Angola</span>
                 <span className="flex items-center gap-2 text-sm font-bold"><Ruler size={18} className="text-emerald-400" /> 1,200 Hectares Totais</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Gráfico de Linha - Evolução Produtiva */}
           <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
              <div className="flex items-center justify-between mb-10">
                 <div>
                    <h3 className="text-xl font-black text-slate-900">Evolução da Produtividade</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Toneladas por Hectare (2019 - 2024)</p>
                 </div>
                 <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <TrendingUp size={24} />
                 </div>
              </div>
              <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yieldTrendData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                       <XAxis dataKey="year" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                       <YAxis fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                       <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '24px', color: '#fff', padding: '16px', fontWeight: 'bold' }}
                       />
                       <Line type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={5} dot={{ r: 6, fill: '#10b981', strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 8 }} />
                    </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
              <h3 className="font-black text-slate-900 text-xl mb-8 flex items-center gap-3">
                 <Info size={24} className="text-emerald-600" /> Sobre a Propriedade
              </h3>
              <p className="text-slate-500 text-lg font-bold leading-relaxed">
                A Fazenda Sol Nascente é uma unidade produtiva de referência na região do Huambo, especializada em culturas de ciclo curto (Milho e Trigo) e cafeicultura de altitude. Com um compromisso sustentável, utilizamos técnicas de agricultura de precisão para otimizar o uso de insumos e maximizar a produtividade por hectare.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                 <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-emerald-50 transition-colors">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Funcionários</p>
                    <p className="text-2xl font-black text-slate-900">42 Ativos</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-emerald-50 transition-colors">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cultura Principal</p>
                    <p className="text-2xl font-black text-slate-900">Milho H99</p>
                 </div>
                 <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:bg-emerald-50 transition-colors">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Fundação</p>
                    <p className="text-2xl font-black text-slate-900">Maio 2012</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="space-y-8">
           {/* Weather Widget */}
           <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border border-white/5 group">
              <div className="relative z-10">
                 <p className="text-xs font-black text-emerald-400 uppercase tracking-[0.3em]">Huambo • Hoje</p>
                 <div className="flex items-center justify-between mt-8">
                    <div>
                       <h4 className="text-6xl font-black">28°C</h4>
                       <p className="text-base font-bold text-slate-400 mt-2">Céu Limpo & Sol</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl group-hover:scale-110 transition-transform">
                       <CloudSun size={56} className="text-emerald-400" />
                    </div>
                 </div>
                 <div className="mt-10 pt-10 border-t border-white/10 grid grid-cols-2 gap-8">
                    <div>
                       <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Humidade</p>
                       <p className="text-xl font-black">12%</p>
                    </div>
                    <div>
                       <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Vento</p>
                       <p className="text-xl font-black">15 km/h</p>
                    </div>
                 </div>
              </div>
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>
           </div>

           <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
              <h3 className="font-black text-slate-900 text-xl mb-8 flex items-center gap-3">
                 <Calendar size={24} className="text-emerald-600" /> Histórico Recente
              </h3>
              <div className="space-y-6">
                 {[
                   { date: '15 Jan 2024', event: 'Conclusão da Colheita de Trigo (Lote 3)' },
                   { date: '10 Jan 2024', event: 'Manutenção de Tratores Massey' },
                   { date: '05 Jan 2024', event: 'Aquisição de 500 sacos NPK' },
                 ].map((h, i) => (
                   <div key={i} className="flex items-start justify-between py-4 border-b last:border-0 group cursor-pointer">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{h.date}</p>
                        <p className="text-sm font-black text-slate-800 group-hover:text-emerald-600 transition-colors leading-tight">{h.event}</p>
                      </div>
                      <ArrowUpRight size={20} className="text-slate-300 group-hover:text-emerald-500 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-emerald-600 text-white p-10 rounded-[3rem] shadow-xl shadow-emerald-100">
              <h3 className="font-black text-xl mb-8 uppercase tracking-widest italic">Acesso Rápido</h3>
              <div className="space-y-4">
                 <button className="w-full py-5 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-black transition-all uppercase tracking-widest border border-white/10">Diário Digital</button>
                 <button className="w-full py-5 bg-white text-emerald-900 rounded-2xl text-sm font-black transition-all uppercase tracking-widest shadow-lg">Relatório Emergência</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FarmHome;

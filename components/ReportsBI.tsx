
import React, { useState } from 'react';
import { BarChart3, TrendingUp, DollarSign, Sprout, FileText, Download, Target, ChevronRight, Activity, Zap, Search, ChevronLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Milho 22', yield: 4100, cost: 2300, profit: 1800, roi: 78 },
  { name: 'Milho 23', yield: 4500, cost: 2100, profit: 2400, roi: 114 },
  { name: 'Trigo 22', yield: 3200, cost: 1900, profit: 1300, roi: 68 },
  { name: 'Trigo 23', yield: 3800, cost: 1800, profit: 2000, roi: 111 },
];

const performanceData = [
  { month: 'Jan', current: 4000, previous: 2400 },
  { month: 'Fev', current: 3000, previous: 1398 },
  { month: 'Mar', current: 2000, previous: 9800 },
  { month: 'Abr', current: 2780, previous: 3908 },
  { month: 'Mai', current: 1890, previous: 4800 },
  { month: 'Jun', current: 2390, previous: 3800 },
];

const ReportsBI: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const historicalReports = [
    { id: 'r1', title: 'Fechamento Safra Milho 2023', date: '15 Jan 2024', type: 'Produtivo', status: 'Gerado' },
    { id: 'r2', title: 'Auditoria Financeira Q4', date: '10 Jan 2024', type: 'Financeiro', status: 'Gerado' },
    { id: 'r3', title: 'Inventário Anual de Insumos', date: '05 Jan 2024', type: 'Operacional', status: 'Pendente' },
    { id: 'r4', title: 'Relatório Sanitário Pecuária', date: '02 Jan 2024', type: 'Sanitário', status: 'Gerado' },
    { id: 'r5', title: 'Análise de Solo Setor Norte', date: '28 Dez 2023', type: 'Técnico', status: 'Gerado' },
  ];

  const totalPages = Math.ceil(historicalReports.length / itemsPerPage);
  const currentReports = historicalReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inteligência & <span className="text-emerald-600">BI Analytics</span></h1>
          <p className="text-slate-500 font-medium">Análise comparativa de safras, rentabilidade e ROI estratégico.</p>
        </div>
        <button className="flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black shadow-2xl hover:bg-emerald-600 transition-all active:scale-95">
          <Download size={24} /> Gerar Relatório Executivo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ROI Médio Geral</p>
            <h3 className="text-4xl font-black text-slate-900">92.5%</h3>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mt-3">
               <TrendingUp size={16} /> +12% vs Safra Ant.
            </div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Produtividade/ha</p>
            <h3 className="text-4xl font-black text-slate-900">4.2 t</h3>
            <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold mt-3">
               <Activity size={16} /> Estável
            </div>
         </div>
         <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Custo Operacional</p>
            <h3 className="text-4xl font-black text-slate-900">$1.8k</h3>
            <div className="flex items-center gap-2 text-rose-500 text-xs font-bold mt-3">
               <TrendingUp size={16} /> +4% Inflação Insumos
            </div>
         </div>
         <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 group hover:-translate-y-2 transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
               <Zap size={28} />
               <span className="text-[10px] font-black uppercase tracking-widest">Premium Insight</span>
            </div>
            <p className="font-black text-lg leading-tight">Gemini sugere rotação em 40ha para 2025.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
           <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="font-black text-slate-900 text-xl">Comparativo de Produtividade</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Produtividade vs Lucro (Hectare)</p>
              </div>
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm"><Sprout size={28} /></div>
           </div>
           <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '24px', color: '#fff', padding: '16px', fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" />
                  <Bar dataKey="yield" fill="#10b981" radius={[10, 10, 0, 0]} name="Produtividade (kg)" />
                  <Bar dataKey="profit" fill="#3b82f6" radius={[10, 10, 0, 0]} name="Lucro Líquido ($)" />
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Lista de Relatórios Históricos com Paginação */}
        <div className="bg-white p-10 rounded-[3rem] border shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-10">
              <h3 className="font-black text-slate-900 text-xl tracking-tight">Histórico de Relatórios</h3>
              <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><FileText size={20} /></div>
           </div>
           <div className="flex-1 space-y-4">
              {currentReports.map((report) => (
                <div key={report.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors shadow-sm">
                         <FileText size={24} />
                      </div>
                      <div>
                         <p className="font-black text-slate-900">{report.title}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{report.date} • {report.type}</p>
                      </div>
                   </div>
                   <button className="p-3 bg-white border rounded-xl text-slate-400 hover:text-emerald-600 transition-colors">
                      <Download size={18} />
                   </button>
                </div>
              ))}
           </div>
           
           {totalPages > 1 && (
             <div className="mt-8 pt-8 border-t flex justify-between items-center">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pag {currentPage} de {totalPages}</span>
                <div className="flex gap-2">
                   <button onClick={() => setCurrentPage(p => Math.max(p-1, 1))} disabled={currentPage === 1} className="p-3 border rounded-xl bg-white disabled:opacity-30"><ChevronLeft size={18} /></button>
                   <button onClick={() => setCurrentPage(p => Math.min(p+1, totalPages))} disabled={currentPage === totalPages} className="p-3 border rounded-xl bg-white disabled:opacity-30"><ChevronRight size={18} /></button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ReportsBI;

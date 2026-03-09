import React, { useState } from 'react';
import { MOCK_FINANCE } from '../constants';
import { 
  DollarSign, ArrowUpRight, ArrowDownRight, Filter, Download, Plus, Wallet, 
  Receipt, TrendingUp, BarChart, PieChart, Loader2, CheckCircle2, Search, ChevronLeft, ChevronRight, LineChart as LineIcon
} from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const financeTrendData = [
  { month: 'Jul', income: 35000, expense: 28000 },
  { month: 'Ago', income: 42000, expense: 32000 },
  { month: 'Set', income: 38000, expense: 35000 },
  { month: 'Out', income: 45000, expense: 30000 },
  { month: 'Nov', income: 52000, expense: 38000 },
  { month: 'Dez', income: 48000, expense: 41000 },
  { month: 'Jan', income: 45000, expense: 35000 },
];

const FinanceTracker: React.FC = () => {
  const [activeView, setActiveView] = useState<'all' | 'payable' | 'receivable' | 'cost_analysis'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Reduzido para garantir que a paginação apareça com o volume de dados mock
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Filtragem
  const filteredRecords = MOCK_FINANCE.filter(r => {
    const matchesSearch = r.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeView === 'payable') return matchesSearch && r.type === 'Expense';
    if (activeView === 'receivable') return matchesSearch && r.type === 'Income';
    return matchesSearch;
  });

  // Paginação
  // Define indices for pagination display and slicing to fix missing variable errors
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRecords.slice(indexOfFirstItem, indexOfLastItem);

  const costData = [
    { name: 'Milho (Lote A)', value: 45000, color: '#10b981' },
    { name: 'Trigo (Rio)', value: 32000, color: '#3b82f6' },
    { name: 'Café (Encosta)', value: 18000, color: '#f59e0b' },
    { name: 'Pecuária (Geral)', value: 25000, color: '#ef4444' },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestão <span className="text-emerald-600">Financeira</span></h1>
          <p className="text-slate-500 font-medium">Controle de rentabilidade, custos por cultura e faturas.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-[2rem] font-black shadow-xl hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70"
          >
            {isExporting ? <Loader2 className="animate-spin" size={20} /> : exportSuccess ? <CheckCircle2 className="text-emerald-400" size={20} /> : <Download size={20} />}
            {isExporting ? 'Gerando...' : exportSuccess ? 'Exportado!' : 'Exportar Dados'}
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-[2rem] font-black shadow-xl hover:bg-emerald-700 transition-all active:scale-95">
            <Plus size={20} /> Novo Lançamento
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
           <div className="flex items-center gap-3 text-emerald-600 mb-6">
              <div className="p-3 bg-emerald-50 rounded-xl group-hover:scale-110 transition-transform"><TrendingUp size={24} /></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Margem de Lucro</p>
           </div>
           <h3 className="text-4xl font-black text-slate-900">32.4%</h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
           <div className="flex items-center gap-3 text-rose-600 mb-6">
              <div className="p-3 bg-rose-50 rounded-xl group-hover:scale-110 transition-transform"><Receipt size={24} /></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Custos Pendentes</p>
           </div>
           <h3 className="text-4xl font-black text-slate-900">$18,450</h3>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm group hover:shadow-xl transition-all">
           <div className="flex items-center gap-3 text-blue-600 mb-6">
              <div className="p-3 bg-blue-50 rounded-xl group-hover:scale-110 transition-transform"><Wallet size={24} /></div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Cash Flow (Mês)</p>
           </div>
           <h3 className="text-4xl font-black text-slate-900">+$12,300</h3>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
         <div className="flex items-center justify-between mb-10">
            <div>
               <h3 className="text-xl font-black text-slate-900">Histórico de Fluxo Mensal</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Receitas vs Despesas (AOA)</p>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
               <LineIcon size={24} />
            </div>
         </div>
         <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={financeTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                  <YAxis fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '24px', color: '#fff', padding: '16px', fontWeight: 'bold' }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="income" name="Receita" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: '#10b981' }} />
                  <Line type="monotone" dataKey="expense" name="Despesa" stroke="#ef4444" strokeWidth={4} dot={{ r: 4, fill: '#ef4444' }} />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[3rem] border shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <div className="p-10 border-b flex flex-col sm:flex-row justify-between items-center gap-6 bg-slate-50/50">
             <div className="flex bg-white p-1.5 rounded-2xl border shadow-inner w-full sm:w-auto">
                <button onClick={() => {setActiveView('all'); setCurrentPage(1);}} className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${activeView === 'all' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}>Todos</button>
                <button onClick={() => {setActiveView('cost_analysis'); setCurrentPage(1);}} className={`px-6 py-3 rounded-xl text-sm font-black transition-all ${activeView === 'cost_analysis' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}>Análise</button>
             </div>
             <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border text-sm shadow-inner w-full sm:w-72">
                <Search size={18} className="text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar faturas..." 
                  className="bg-transparent border-none outline-none font-bold w-full"
                  value={searchTerm}
                  onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                />
             </div>
          </div>
          
          <div className="flex-1 flex flex-col">
            {activeView === 'cost_analysis' ? (
              <div className="p-10 space-y-10 animate-in fade-in duration-500">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">Custos por Cultura</h3>
                    <p className="text-3xl font-black text-slate-900">$120,000</p>
                 </div>
                 <div className="space-y-8">
                    {costData.map((item, idx) => (
                      <div key={idx} className="group">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-black text-slate-700">{item.name}</span>
                            <span className="text-sm font-black text-slate-900">${item.value.toLocaleString()}</span>
                         </div>
                         <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full transition-all duration-1000" style={{ width: `${(item.value / 120000) * 100}%`, backgroundColor: item.color }}></div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b">
                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Data</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Descrição</th>
                        <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-sm">
                      {currentItems.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-10 py-6 text-slate-500 font-bold">{record.date}</td>
                          <td className="px-10 py-6">
                            <p className="font-black text-slate-900">{record.description}</p>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${record.status === 'Paid' ? 'text-emerald-500' : 'text-rose-500'}`}>{record.status}</span>
                          </td>
                          <td className={`px-10 py-6 text-right font-black text-xl ${record.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {record.type === 'Income' ? '+' : '-'}${record.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {currentItems.length === 0 && (
                    <div className="p-20 text-center text-slate-400 font-black uppercase tracking-widest">Nenhum registro encontrado</div>
                  )}
                </div>

                {/* Paginação Visível e Forçada */}
                <div className="p-8 border-t flex justify-between items-center bg-slate-50/50">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredRecords.length)} de {filteredRecords.length}
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-4 rounded-2xl border bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm active:scale-90"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-4 rounded-2xl border bg-white hover:bg-slate-50 disabled:opacity-30 transition-all shadow-sm active:scale-90"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col shadow-2xl relative overflow-hidden border border-white/5">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]"></div>
           <h3 className="text-xl font-black mb-10 flex items-center gap-3">
              <PieChart className="text-emerald-400" /> Alocação de Capital
           </h3>
           <div className="flex-1 h-72">
              <ResponsiveContainer width="100%" height="100%">
                 <RePieChart>
                    <Pie data={costData} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value">
                       {costData.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={entry.color} />
                       ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '24px', color: '#fff' }} />
                 </RePieChart>
              </ResponsiveContainer>
           </div>
           <div className="space-y-4 mt-8 pt-8 border-t border-white/10">
              {costData.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                   <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-slate-400">{item.name}</span>
                   </div>
                   <span>${item.value.toLocaleString()}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceTracker;
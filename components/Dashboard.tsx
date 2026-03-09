
import React, { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, Cell, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Zap, 
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Users,
  Package,
  Map as MapIcon,
  UserCheck,
  DollarSign
} from 'lucide-react';
import { MOCK_CROPS, MOCK_FINANCE, MOCK_INVENTORY, MOCK_TASKS } from '../constants';
import { getAgroInsights } from '../services/geminiService';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

const cashFlowData = [
  { month: 'Jan', income: 45000, expense: 32000 },
  { month: 'Fev', income: 52000, expense: 38000 },
  { month: 'Mar', income: 48000, expense: 41000 },
  { month: 'Abr', income: 61000, expense: 35000 },
  { month: 'Mai', income: 55000, expense: 42000 },
  { month: 'Jun', income: 68000, expense: 39000 },
];

const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<any>(null);
  const [loadingAI, setLoadingAI] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      const data = await getAgroInsights(MOCK_CROPS, MOCK_INVENTORY, MOCK_FINANCE);
      setInsights(data);
      setLoadingAI(false);
    };
    fetchInsights();
  }, []);

  const criticalStockCount = MOCK_INVENTORY.filter(i => i.quantity <= i.minThreshold).length;

  const stats = [
    { label: 'Lucro Estimado', value: '$245,000', change: '+12.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Área Produtiva', value: '250.5 ha', change: '85% Total', icon: MapIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Stock Crítico', value: criticalStockCount.toString(), change: 'Atenção', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Equipa Ativa', value: '12', change: 'Em campo', icon: UserCheck, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  const productionData = MOCK_CROPS.map(c => ({
    name: c.name,
    area: c.area,
    yield: c.status === 'Harvested' ? 100 : 72
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Visão Geral da Operação</h1>
          <p className="text-slate-500 font-medium">Análise de performance em tempo real assistida por IA.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">
            <Calendar size={18} className="text-emerald-600" />
            <span>20 Jan, 2024</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
            Exportar Snapshot
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border shadow-sm flex items-start justify-between group hover:shadow-xl transition-all">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full mt-3 inline-block ${stat.color} ${stat.bg} uppercase tracking-widest`}>
                {stat.change}
              </span>
            </div>
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon size={28} />
            </div>
          </div>
        ))}
      </div>

      {/* Gemini AI Insights */}
      <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-500/20">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black">Inteligência Agronômica Gemini</h2>
            <p className="text-emerald-400/60 text-xs font-bold uppercase tracking-widest">Análise de Padrões e Riscos</p>
          </div>
        </div>
        
        {loadingAI ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-400 border-t-transparent"></div>
            <p className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">Processando Telemetria...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
            <div className="space-y-6">
              <h3 className="text-emerald-400 font-black uppercase text-xs tracking-[0.2em] border-l-4 border-emerald-500 pl-4">Estratégia</h3>
              <p className="text-slate-300 text-lg font-medium leading-relaxed italic">"{insights.summary}"</p>
            </div>
            <div className="space-y-6">
              <h3 className="text-rose-400 font-black uppercase text-xs tracking-[0.2em] border-l-4 border-rose-500 pl-4">Alertas de Risco</h3>
              <ul className="space-y-4">
                {insights.alerts.map((alert: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <AlertCircle size={20} className="text-rose-500 flex-shrink-0" />
                    <span className="font-medium">{alert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-emerald-400 font-black uppercase text-xs tracking-[0.2em] border-l-4 border-emerald-500 pl-4">Otimizações</h3>
              <ul className="space-y-4">
                {insights.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                    <span className="font-medium">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Financial Line Chart & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900">Fluxo de Caixa Consolidado</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Comparativo de Receitas vs Despesas Operacionais</p>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
               <TrendingUp size={24} />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                <YAxis fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '24px', color: '#fff', padding: '16px', fontWeight: 'bold' }}
                />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="income" name="Receita" stroke="#10b981" strokeWidth={5} dot={{ r: 6, fill: '#10b981', strokeWidth: 4, stroke: '#fff' }} />
                <Line type="monotone" dataKey="expense" name="Despesa" stroke="#ef4444" strokeWidth={5} dot={{ r: 6, fill: '#ef4444', strokeWidth: 4, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task List */}
        <div className="bg-white p-10 rounded-[3rem] border shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl font-black text-slate-900">Agenda de Campo</h3>
            <button className="text-emerald-600 text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-2">
              Ver Tudo <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-8">
            {MOCK_TASKS.slice(0, 4).map((task) => (
              <div key={task.id} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full mt-1.5 ${task.status === 'Completed' ? 'bg-emerald-500 shadow-lg shadow-emerald-100' : 'bg-amber-500 ring-8 ring-amber-50 shadow-lg shadow-amber-100'}`}></div>
                  <div className="w-px h-full bg-slate-100 group-last:hidden mt-2"></div>
                </div>
                <div className="pb-4 flex-1">
                  <p className="font-black text-slate-900 leading-tight mb-2">{task.description}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                      <Clock size={14} /> {task.dueDate}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                      <Users size={14} /> {task.assignedTo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-5 border-2 border-dashed border-slate-100 rounded-3xl text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">
            + Nova Tarefa Operacional
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

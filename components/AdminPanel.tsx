
import React, { useState } from 'react';
import { ShieldCheck, History, UserCog, Search, Download, Trash2, Key, CheckCircle2, Lock, ChevronRight, ChevronLeft, ShieldAlert, Eye, Edit3 } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'rbac'>('audit');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const auditLogs = [
    { user: 'Eduardo Garcia', action: 'Alterou status do Lote 3', target: 'Crops', date: '20 Jan, 14:20' },
    { user: 'João Silva', action: 'Registrou saída de Diesel', target: 'Inventory', date: '20 Jan, 11:05' },
    { user: 'Maria Santos', action: 'Cadastro de novo animal (B-005)', target: 'Livestock', date: '19 Jan, 16:30' },
    { user: 'Eduardo Garcia', action: 'Exportou relatório financeiro Q4', target: 'Finance', date: '19 Jan, 10:15' },
    { user: 'Admin Sys', action: 'Atualizou regras de Firewall', target: 'Security', date: '18 Jan, 09:00' },
  ];

  const permissions = [
    { role: 'Admin Geral', modules: ['Todos'], access: 'Escrita/Leitura Total', users: 2 },
    { role: 'Gestor Fazenda', modules: ['Financeiro', 'Stock', 'RH'], access: 'Escrita/Leitura Parcial', users: 4 },
    { role: 'Supervisor', modules: ['Campo', 'Tarefas'], access: 'Escrita Operacional', users: 6 },
    { role: 'Técnico Agrícola', modules: ['Culturas', 'Sanitário'], access: 'Leitura/Escrita Técnica', users: 12 },
    { role: 'Funcionário Campo', modules: ['Tarefas Mobile'], access: 'Somente Leitura Mobile', users: 45 },
  ];

  const filteredLogs = auditLogs.filter(log => 
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Administração & <span className="text-emerald-600">Segurança</span></h1>
          <p className="text-slate-500 font-medium">Controle de acesso (RBAC), auditoria forense e logs do sistema.</p>
        </div>
        <div className="flex gap-3">
           <div className="flex bg-white p-1.5 rounded-2xl border shadow-inner">
              <button onClick={() => setActiveTab('audit')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'audit' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>Logs Auditoria</button>
              <button onClick={() => setActiveTab('rbac')} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'rbac' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>Matriz Permissões</button>
           </div>
           <button className="flex items-center gap-3 bg-white text-slate-900 border-2 border-slate-100 px-8 py-4 rounded-[2rem] font-black hover:bg-slate-50 transition-all"><Download size={20} /> Exportar Logs</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden border border-white/5">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3"><ShieldCheck className="text-emerald-400" /> Criptografia</h3>
              <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-white/10 pb-4"><span className="text-[10px] font-black text-slate-400 uppercase">AES-256</span><span className="text-xs font-black text-emerald-400">ATIVO</span></div>
                 <div className="flex justify-between items-center border-b border-white/10 pb-4"><span className="text-[10px] font-black text-slate-400 uppercase">2FA Auth</span><span className="text-xs font-black text-emerald-400">ATIVO</span></div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-3">
           {activeTab === 'audit' ? (
             <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-10 border-b flex justify-between items-center bg-slate-50/50">
                   <h3 className="font-black text-slate-900 text-xl tracking-tight">Logs Auditáveis (Imutáveis)</h3>
                   <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border text-sm shadow-inner w-72">
                      <Search size={18} className="text-slate-400" />
                      <input type="text" placeholder="Pesquisar..." className="bg-transparent border-none outline-none font-bold w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                   </div>
                </div>
                <table className="w-full text-left">
                   <thead className="bg-slate-50 border-b">
                      <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest"><th className="px-10 py-6">Operador</th><th className="px-10 py-6">Ação</th><th className="px-10 py-6">Data/Hora</th></tr>
                   </thead>
                   <tbody className="divide-y text-sm">
                      {filteredLogs.map((log, i) => (
                        <tr key={i} className="hover:bg-slate-50 text-slate-900"><td className="px-10 py-6 font-black">{log.user}</td><td className="px-10 py-6 font-bold text-slate-600">{log.action}</td><td className="px-10 py-6 text-right font-black text-slate-400">{log.date}</td></tr>
                      ))}
                   </tbody>
                </table>
             </div>
           ) : (
             <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                <div className="p-10 border-b bg-slate-50/50"><h3 className="font-black text-slate-900 text-xl tracking-tight">Matriz de Responsabilidade (RBAC)</h3></div>
                <table className="w-full text-left">
                   <thead className="bg-slate-50 border-b">
                      <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest"><th className="px-10 py-6">Perfil / Função</th><th className="px-10 py-6">Módulos</th><th className="px-10 py-6">Acesso</th><th className="px-10 py-6 text-right">Usuários</th></tr>
                   </thead>
                   <tbody className="divide-y text-sm">
                      {permissions.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50 text-slate-900">
                           <td className="px-10 py-6 font-black text-lg">{p.role}</td>
                           <td className="px-10 py-6">
                              <div className="flex flex-wrap gap-2">{p.modules.map(m => <span key={m} className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase">{m}</span>)}</div>
                           </td>
                           <td className="px-10 py-6 font-bold text-slate-500">{p.access}</td>
                           <td className="px-10 py-6 text-right font-black text-slate-400">{p.users}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

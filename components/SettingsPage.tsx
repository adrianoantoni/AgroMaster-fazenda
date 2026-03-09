
import React, { useState } from 'react';
import { Settings, Globe, Shield, CreditCard, Bell, Database, Save, RotateCcw, Cloud, DollarSign, Percent, Scale, CloudCheck, Download, Trash2 } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('general');
  const [backupAuto, setBackupAuto] = useState(true);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações do Sistema</h1>
        <p className="text-slate-500">Gerencie preferências da fazenda, unidades, impostos e segurança de dados.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-2">
           {[
             { id: 'general', label: 'Geral', icon: Settings },
             { id: 'units', label: 'Unidades & Moeda', icon: Scale },
             { id: 'finance', label: 'Impostos & Finanças', icon: DollarSign },
             { id: 'security', label: 'Segurança & Auditoria', icon: Shield },
             { id: 'backup', label: 'Backups & Dados', icon: Database },
           ].map((tab) => (
             <button 
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-sm transition-all ${activeSubTab === tab.id ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-100' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
             >
                <tab.icon size={20} /> {tab.label}
             </button>
           ))}
        </div>

        <div className="md:col-span-3 space-y-6">
           <div className="bg-white rounded-[2.5rem] border p-10 shadow-sm relative overflow-hidden text-slate-900">
              {activeSubTab === 'general' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <section>
                    <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3"><Globe className="text-emerald-500" size={24} /> Preferências Regionais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2"><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Fuso Horário</label><select className="w-full border-2 border-slate-100 bg-slate-50 p-4 rounded-2xl font-bold outline-none"><option>Luanda, Angola (UTC+1)</option></select></div>
                       <div className="space-y-2"><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Idioma</label><select className="w-full border-2 border-slate-100 bg-slate-50 p-4 rounded-2xl font-bold outline-none"><option>Português (Angola)</option></select></div>
                    </div>
                  </section>
                </div>
              )}

              {activeSubTab === 'backup' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <section>
                    <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3"><Database className="text-emerald-500" size={24} /> Gestão de Dados & Backups</h3>
                    <div className="grid grid-cols-1 gap-8">
                       <div className="p-8 bg-slate-50 rounded-[2rem] border-2 border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-5">
                             <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl"><CloudCheck size={28} /></div>
                             <div><p className="font-black text-slate-900">Backup em Nuvem Automático</p><p className="text-xs text-slate-500 font-bold uppercase mt-1">Sincronização diária (00:00 UTC)</p></div>
                          </div>
                          <button onClick={() => setBackupAuto(!backupAuto)} className={`w-16 h-8 rounded-full relative transition-all ${backupAuto ? 'bg-emerald-600' : 'bg-slate-300'}`}><div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${backupAuto ? 'left-9' : 'left-1'}`}></div></button>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <button className="flex items-center justify-center gap-3 p-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all"><Download size={20} /> Exportar SQL</button>
                          <button className="flex items-center justify-center gap-3 p-6 bg-white border-2 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"><RotateCcw size={20} /> Forçar Sync</button>
                          <button className="flex items-center justify-center gap-3 p-6 bg-rose-50 text-rose-600 border-2 border-rose-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-100 transition-all"><Trash2 size={20} /> Limpar Cache</button>
                       </div>
                    </div>
                  </section>
                </div>
              )}

              <div className="mt-16 pt-10 border-t flex justify-end gap-4">
                 <button className="px-8 py-4 text-sm font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">Descartar</button>
                 <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all active:scale-95"><Save size={20} /> Salvar Alterações</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

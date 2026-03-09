
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  Beef, 
  Package, 
  Users, 
  DollarSign, 
  BarChart3, 
  Map as MapIcon, 
  Settings,
  Menu,
  X,
  Bell,
  Search,
  Smartphone,
  Monitor,
  LogOut,
  User,
  ShieldCheck,
  ChevronDown,
  Home,
  AlertCircle,
  Truck,
  Building2,
  CloudOff,
  CloudCheck
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMode: boolean;
  setIsMobileMode: (val: boolean) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isMobileMode, setIsMobileMode, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUnitSelector, setShowUnitSelector] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState('Sol Nascente');
  const [isOnline, setIsOnline] = useState(true);

  // Simulação de oscilação de conectividade rural
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(prev => Math.random() > 0.1);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'farm_home', icon: Home, label: 'Resumo Geral' },
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard IA' },
    { id: 'crops', icon: Sprout, label: 'Culturas & Lotes' },
    { id: 'livestock', icon: Beef, label: 'Pecuária' },
    { id: 'machinery', icon: Truck, label: 'Frota & Maquinaria' },
    { id: 'inventory', icon: Package, label: 'Stock & Insumos' },
    { id: 'finance', icon: DollarSign, label: 'Financeiro' },
    { id: 'human', icon: Users, label: 'RH & Equipes' },
    { id: 'mapping', icon: MapIcon, label: 'Mapas & GIS' },
    { id: 'reports', icon: BarChart3, label: 'BI & Relatórios' },
    { id: 'admin', icon: ShieldCheck, label: 'Administração' },
    { id: 'settings', icon: Settings, label: 'Configurações' },
  ];

  const sidebarClasses = `fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50 flex flex-col ${
    isSidebarOpen ? 'w-96' : 'w-32'
  } border-r border-white/5 shadow-[25px_0_50px_-12px_rgba(0,0,0,0.5)]`;

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between p-10 border-b border-slate-800">
          {isSidebarOpen && (
            <span className="text-2xl font-black tracking-tighter text-white animate-in fade-in zoom-in duration-500">
              AgroMaster <span className="text-emerald-500 underline decoration-4 underline-offset-8">Pro</span>
            </span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className={`p-4 hover:bg-slate-800 rounded-[1.5rem] transition-all shadow-sm ${!isSidebarOpen ? 'mx-auto' : ''}`}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={32} />}
          </button>
        </div>

        <nav className="mt-12 flex flex-col gap-3 px-6 flex-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-5 p-6 rounded-[2rem] transition-all duration-300 group ${
                activeTab === item.id 
                ? 'bg-emerald-600 text-white shadow-[0_20px_40px_-10px_rgba(16,185,129,0.5)] scale-[1.02]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              } ${!isSidebarOpen ? 'justify-center' : ''}`}
            >
              <item.icon size={28} className={activeTab === item.id ? 'scale-110' : 'group-hover:scale-110 transition-transform'} />
              {isSidebarOpen && (
                <span className="font-black text-[13px] uppercase tracking-[0.15em] animate-in fade-in slide-in-from-left-4 duration-500 whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-slate-800 space-y-8 bg-slate-950/20">
          {isSidebarOpen && (
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-[2.5rem] p-8 space-y-5 shadow-inner animate-in fade-in zoom-in-95 duration-500">
              <p className="text-[11px] text-slate-500 uppercase font-black tracking-[0.25em] ml-2">Modo Visualização</p>
              <div className="flex bg-slate-900/80 rounded-2xl p-2 shadow-2xl border border-white/5">
                <button 
                  onClick={() => setIsMobileMode(false)}
                  className={`flex-1 flex justify-center items-center py-4 rounded-xl transition-all ${!isMobileMode ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Monitor size={22} />
                </button>
                <button 
                  onClick={() => setIsMobileMode(true)}
                  className={`flex-1 flex justify-center items-center py-4 rounded-xl transition-all ${isMobileMode ? 'bg-emerald-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Smartphone size={22} />
                </button>
              </div>
            </div>
          )}
          
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-5 p-6 rounded-[2rem] text-rose-400 hover:bg-rose-500/10 transition-all font-black text-sm uppercase tracking-widest group border border-transparent hover:border-rose-500/20 ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut size={28} className="group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="animate-in fade-in duration-300">Sair da Plataforma</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-96' : 'ml-32'}`}>
        <header className="h-24 bg-white/90 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-16 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-8">
            <div className="relative">
              <div 
                onClick={() => setShowUnitSelector(!showUnitSelector)}
                className="flex items-center gap-5 bg-slate-50 border-2 border-slate-100 px-8 py-3 rounded-[2rem] cursor-pointer hover:bg-white hover:border-emerald-200 transition-all group shadow-sm active:scale-95"
              >
                 <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/20"></div>
                 <div className="text-left leading-none">
                    <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mb-1">Fazenda em Operação</p>
                    <p className="text-lg font-black text-slate-900 flex items-center gap-3">
                      {selectedUnit} <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${showUnitSelector ? 'rotate-180' : ''}`} />
                    </p>
                 </div>
              </div>

              {showUnitSelector && (
                <div className="absolute top-full left-0 mt-4 w-80 bg-white border border-slate-100 rounded-[3rem] shadow-2xl overflow-hidden z-[60] animate-in fade-in zoom-in-95 duration-200 p-3">
                   {['Sol Nascente', 'Vila Verde (Huambo)', 'Pecuária Leste'].map((unit) => (
                     <button 
                      key={unit}
                      onClick={() => { setSelectedUnit(unit); setShowUnitSelector(false); }}
                      className={`w-full text-left p-5 rounded-2xl font-black text-sm transition-all flex items-center gap-4 ${selectedUnit === unit ? 'bg-emerald-50 text-emerald-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                     >
                       <Building2 size={20} /> {unit}
                     </button>
                   ))}
                </div>
              )}
            </div>

            {/* Sync Status Pill */}
            <div className={`hidden md:flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all ${isOnline ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
              {isOnline ? <CloudCheck size={18} /> : <CloudOff size={18} />}
              <span className="text-[10px] font-black uppercase tracking-widest">{isOnline ? 'Sincronizado' : 'Modo Offline'}</span>
            </div>
          </div>

          <div className="flex items-center gap-12">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-4 text-slate-400 hover:text-emerald-600 transition-all hover:scale-110 active:scale-90"
              >
                <Bell size={32} />
                <span className="absolute top-3 right-3 w-7 h-7 bg-rose-500 text-white text-[11px] font-black flex items-center justify-center rounded-full border-4 border-white ring-4 ring-rose-500/10 shadow-lg">3</span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-6 w-[500px] bg-white border border-slate-100 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300 border-8 border-white">
                   <div className="p-10 bg-slate-50/50 border-b flex justify-between items-center">
                      <h3 className="font-black text-slate-900 text-xl tracking-tight">Centro de Alertas</h3>
                      <button className="text-[11px] font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-50 px-4 py-2 rounded-2xl transition-colors">Limpar Histórico</button>
                   </div>
                   <div className="divide-y divide-slate-50">
                      {[
                        { icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50', title: 'Stock Crítico de Diesel', desc: 'Reserva abaixo de 10% no tanque T-02.', time: 'Há 15 min' },
                        { icon: Sprout, color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'Plantio Concluído', desc: 'Lote B-04 finalizado com sucesso.', time: 'Há 2h' },
                        { icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-50', title: 'Fatura Vencida', desc: 'Pagamento pendente: Fertilizantes Angola.', time: 'Ontem' },
                      ].map((n, i) => (
                        <div key={i} className="p-10 hover:bg-slate-50 transition-all flex gap-8 cursor-pointer group">
                           <div className={`w-16 h-16 ${n.bg} ${n.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                              <n.icon size={32} />
                           </div>
                           <div className="space-y-2 flex-1">
                              <div className="flex justify-between items-start">
                                <p className="text-lg font-black text-slate-900 leading-tight">{n.title}</p>
                                <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest whitespace-nowrap ml-6">{n.time}</p>
                              </div>
                              <p className="text-base text-slate-500 font-bold leading-relaxed">{n.desc}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                   <button className="w-full p-8 text-[11px] font-black text-slate-400 hover:text-emerald-600 hover:bg-slate-100 transition-all uppercase tracking-[0.4em] bg-slate-50/80 border-t">
                      Acessar Logs do Servidor
                   </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <div 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-6 border-l-2 border-slate-100 pl-12 cursor-pointer group select-none"
              >
                <div className="text-right hidden 2xl:block">
                  <p className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">Eduardo Garcia</p>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Admin Geral</p>
                </div>
                <div className="relative">
                  <img 
                    src="https://picsum.photos/80/80?random=1" 
                    alt="Profile" 
                    className="w-16 h-16 rounded-[1.5rem] border-4 border-white shadow-2xl ring-4 ring-emerald-500/10 transition-transform group-hover:rotate-6 group-hover:scale-110"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 mt-6 w-80 bg-white border border-slate-100 rounded-[3.5rem] shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300 border-8 border-white">
                   <div className="p-10 border-b bg-slate-50/50 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full bg-emerald-600 mb-6 flex items-center justify-center text-white shadow-2xl shadow-emerald-200">
                        <User size={48} />
                      </div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Sessão Segura</p>
                      <p className="text-base font-black text-slate-900 mt-2">eduardo.garcia@farm.ao</p>
                   </div>
                   <div className="p-6 space-y-3">
                     <button 
                      onClick={() => { setActiveTab('profile'); setShowProfileMenu(false); }}
                      className="w-full px-8 py-5 text-left text-sm font-black text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl flex items-center gap-5 transition-all uppercase tracking-widest"
                     >
                       <User size={22} /> Perfil Rural
                     </button>
                     <button 
                      onClick={() => { setActiveTab('admin'); setShowProfileMenu(false); }}
                      className="w-full px-8 py-5 text-left text-sm font-black text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl flex items-center gap-5 transition-all uppercase tracking-widest"
                     >
                       <ShieldCheck size={22} /> Auditoria
                     </button>
                     <div className="h-px bg-slate-100 my-6 mx-6"></div>
                     <button 
                      onClick={onLogout}
                      className="w-full px-8 py-5 text-left text-sm font-black text-rose-600 hover:bg-rose-50 rounded-2xl flex items-center gap-5 transition-all uppercase tracking-widest"
                     >
                       <LogOut size={22} /> Encerrar Conexão
                     </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="p-16 flex-1 overflow-auto bg-slate-50/30">
          {isMobileMode ? (
            <div className="max-w-md mx-auto bg-slate-900 rounded-[5rem] p-8 shadow-[0_80px_160px_-20px_rgba(0,0,0,0.6)] h-[950px] relative border-[16px] border-slate-950">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 bg-slate-950 rounded-b-[2.5rem] z-[70]"></div>
              <div className="bg-white rounded-[3.5rem] h-full overflow-hidden relative shadow-inner">
                <div className="h-full overflow-y-auto scrollbar-hide p-10 pt-16 pb-36">
                  {children}
                </div>
                {/* Mobile Tab Bar */}
                <div className="absolute bottom-0 w-full h-28 bg-white/95 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center px-10 shadow-[0_-15px_50px_rgba(0,0,0,0.08)]">
                  <button onClick={() => setActiveTab('farm_home')} className={`p-5 rounded-3xl transition-all ${activeTab === 'farm_home' ? 'bg-emerald-500 text-white shadow-xl scale-110' : 'text-slate-400'}`}><Home size={32} /></button>
                  <button onClick={() => setActiveTab('dashboard')} className={`p-5 rounded-3xl transition-all ${activeTab === 'dashboard' ? 'bg-emerald-500 text-white shadow-xl scale-110' : 'text-slate-400'}`}><LayoutDashboard size={32} /></button>
                  <button onClick={() => setActiveTab('crops')} className={`p-5 rounded-3xl transition-all ${activeTab === 'crops' ? 'bg-emerald-500 text-white shadow-xl scale-110' : 'text-slate-400'}`}><Sprout size={32} /></button>
                  <button onClick={() => setActiveTab('inventory')} className={`p-5 rounded-3xl transition-all ${activeTab === 'inventory' ? 'bg-emerald-500 text-white shadow-xl scale-110' : 'text-slate-400'}`}><Package size={32} /></button>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {children}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Layout;

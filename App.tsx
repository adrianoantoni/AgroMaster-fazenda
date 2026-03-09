
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CropManager from './components/CropManager';
import FinanceTracker from './components/FinanceTracker';
import InventoryView from './components/InventoryView';
import LivestockManager from './components/LivestockManager';
import MappingView from './components/MappingView';
import StaffManager from './components/StaffManager';
import ReportsBI from './components/ReportsBI';
import SettingsPage from './components/SettingsPage';
import FarmHome from './components/FarmHome';
import ProfilePage from './components/ProfilePage';
import AdminPanel from './components/AdminPanel';
import LandingPage from './components/LandingPage';
import MachineryManager from './components/MachineryManager'; // Added Machinery
import { UserRole } from './types';
import { LogIn, ShieldAlert, ArrowRight, ArrowLeft, Sprout } from 'lucide-react';

type AppView = 'landing' | 'login' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [activeTab, setActiveTab] = useState('farm_home');
  const [isMobileMode, setIsMobileMode] = useState(false);

  const handleLogout = () => {
    setView('landing');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setView('app');
    setActiveTab('dashboard');
  };

  const goToLogin = () => {
    setView('login');
  };

  const goBackToLanding = () => {
    setView('landing');
  };

  if (view === 'landing') {
    return <LandingPage onLoginClick={goToLogin} />;
  }

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-no-repeat bg-blend-overlay">
        <div className="max-w-2xl w-full bg-white rounded-[4rem] p-16 lg:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all border-8 border-white">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
           
           <button 
             onClick={goBackToLanding}
             className="absolute top-10 left-10 text-slate-400 hover:text-emerald-600 flex items-center gap-2 text-sm font-black transition-all group uppercase tracking-widest"
           >
             <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar
           </button>
           
           <div className="text-center mb-16 mt-8">
              <div className="w-24 h-24 bg-emerald-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-200 transform hover:rotate-6 transition-transform">
                 <Sprout size={48} />
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tight">AgroMaster <span className="text-emerald-600 font-bold">Pro</span></h1>
              <p className="text-slate-500 mt-4 font-bold text-xl">Central de Gestão Rural Inteligente</p>
           </div>
           
           <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-3">
                 <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">E-mail ou BI/NIF</label>
                 <div className="relative group">
                    <input 
                      type="text" 
                      placeholder="Identificador do usuário" 
                      className="w-full border-4 border-slate-50 bg-slate-50 p-6 rounded-3xl outline-none focus:border-emerald-500/20 focus:bg-white transition-all text-slate-900 font-bold text-lg"
                      defaultValue="eduardo.garcia@farm.ao"
                    />
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Senha de Segurança</label>
                 <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full border-4 border-slate-50 bg-slate-50 p-6 rounded-3xl outline-none focus:border-emerald-500/20 focus:bg-white transition-all text-slate-900 font-bold text-lg"
                  defaultValue="password"
                 />
              </div>
              
              <div className="flex items-center justify-between px-2 pt-2">
                 <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="checkbox" className="w-6 h-6 accent-emerald-600 rounded-lg cursor-pointer" defaultChecked />
                    </div>
                    <span className="text-base font-black text-slate-500 group-hover:text-slate-900 transition-colors">Lembrar acesso</span>
                 </label>
                 <span className="text-base font-black text-emerald-600 cursor-pointer hover:underline">Esqueceu a senha?</span>
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-2xl rounded-[2rem] shadow-2xl shadow-emerald-200 transition-all mt-6 flex items-center justify-center gap-4 active:scale-95"
              >
                Acessar Plataforma <ArrowRight size={28} />
              </button>
           </form>
           
           <div className="mt-12 text-center">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
                Protegido por Criptografia de Ponta-a-Ponta
              </p>
           </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'farm_home':
        return <FarmHome />;
      case 'dashboard':
        return <Dashboard />;
      case 'crops':
        return <CropManager />;
      case 'finance':
        return <FinanceTracker />;
      case 'inventory':
        return <InventoryView />;
      case 'livestock':
        return <LivestockManager />;
      case 'machinery': // New case
        return <MachineryManager />;
      case 'mapping':
        return <MappingView />;
      case 'human':
        return <StaffManager />;
      case 'reports':
        return <ReportsBI />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPanel />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <FarmHome />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isMobileMode={isMobileMode}
      setIsMobileMode={setIsMobileMode}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;


import React, { useState } from 'react';
import { User, Mail, Phone, Shield, FileText, Camera, Key } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="max-w-4xl space-y-8 pb-10">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Meu Perfil</h1>
        <p className="text-slate-500">Gerencie suas informações pessoais e credenciais de acesso.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
           <div className="bg-white p-8 rounded-2xl border shadow-sm text-center">
              <div className="relative inline-block mx-auto">
                 <img 
                  src="https://picsum.photos/120/120?random=1" 
                  className="w-32 h-32 rounded-full border-4 border-emerald-100" 
                  alt="Avatar" 
                 />
                 <button className="absolute bottom-1 right-1 p-2 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700">
                    <Camera size={16} />
                 </button>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">Eduardo Garcia</h3>
              <p className="text-sm text-slate-500 font-medium">Administrador Geral</p>
              <div className="mt-6 flex justify-center gap-2">
                 <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">Verified</span>
                 <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase">Active</span>
              </div>
           </div>

           <div className="bg-slate-900 text-white p-6 rounded-2xl">
              <h4 className="font-bold flex items-center gap-2 mb-4 text-sm"><Key size={16} className="text-emerald-400" /> Acesso Rápido</h4>
              <p className="text-xs text-slate-400 mb-4">Último login há 2 horas (Luanda, AO)</p>
              <button className="w-full py-2 bg-slate-800 text-xs font-bold rounded-lg border border-slate-700 hover:bg-slate-700">Redefinir Senha</button>
           </div>
        </div>

        <div className="md:col-span-2 space-y-6">
           <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                 <h3 className="font-bold text-slate-900">Informações Básicas</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nome Completo</label>
                    <div className="flex items-center gap-2 border p-2 rounded-lg bg-slate-50">
                       <User size={16} className="text-slate-400" />
                       <input type="text" defaultValue="Eduardo Manuel Garcia" className="bg-transparent text-sm w-full outline-none" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">BI / NIF</label>
                    <div className="flex items-center gap-2 border p-2 rounded-lg bg-slate-50">
                       <FileText size={16} className="text-slate-400" />
                       <input type="text" defaultValue="LA12345678" className="bg-transparent text-sm w-full outline-none" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">E-mail</label>
                    <div className="flex items-center gap-2 border p-2 rounded-lg bg-slate-50">
                       <Mail size={16} className="text-slate-400" />
                       <input type="email" defaultValue="eduardo.garcia@farm.ao" className="bg-transparent text-sm w-full outline-none" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Telefone</label>
                    <div className="flex items-center gap-2 border p-2 rounded-lg bg-slate-50">
                       <Phone size={16} className="text-slate-400" />
                       <input type="text" defaultValue="+244 923 000 001" className="bg-transparent text-sm w-full outline-none" />
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-slate-50 border-t flex justify-end">
                 <button className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm">Atualizar Dados</button>
              </div>
           </div>

           <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                 <h3 className="font-bold text-slate-900">Segurança & Privacidade</h3>
              </div>
              <div className="p-6 space-y-6">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <Shield size={20} />
                       </div>
                       <div>
                          <p className="font-bold text-sm text-slate-900">Autenticação de Dois Fatores (2FA)</p>
                          <p className="text-xs text-slate-500">Adicione uma camada extra de segurança à sua conta.</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`w-12 h-6 rounded-full relative transition-colors ${twoFactor ? 'bg-emerald-500' : 'bg-slate-300'}`}
                    >
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${twoFactor ? 'left-7' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

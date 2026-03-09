
import React, { useState, useRef } from 'react';
import { MOCK_TASKS } from '../constants';
import { 
  Users, UserPlus, Calendar, CheckSquare, Clock, MapPin, Smartphone, 
  Camera, CheckCircle2, Navigation, X, Play, Image as ImageIcon,
  Trophy, TrendingUp, Star, Award, Search, ChevronLeft, ChevronRight, LogIn, LogOut
} from 'lucide-react';

const StaffManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [attendanceStatus, setAttendanceStatus] = useState<'In' | 'Out'>('Out');

  const staff = [
    { name: 'João Silva', role: 'Supervisor', status: 'Ativo', lastCheck: '08:15', efficiency: 94 },
    { name: 'Maria Santos', role: 'Técnica Agrícola', status: 'Pausa', lastCheck: '12:30', efficiency: 88 },
    { name: 'Carlos Pedro', role: 'Operador Máquinas', status: 'Ativo', lastCheck: '07:45', efficiency: 91 },
  ];

  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const currentStaff = filteredStaff.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAttendance = () => {
    const newStatus = attendanceStatus === 'In' ? 'Out' : 'In';
    setAttendanceStatus(newStatus);
    alert(`Registo de ${newStatus === 'In' ? 'ENTRADA' : 'SAÍDA'} efetuado com sucesso (Lat -12.4, Lng 15.7)`);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recursos <span className="text-emerald-600">Humanos</span></h1>
          <p className="text-slate-500 font-medium">Gestão de equipas, ponto eletrônico e produtividade individual.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleAttendance}
            className={`flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all ${attendanceStatus === 'In' ? 'bg-rose-600 text-white shadow-rose-200 shadow-xl' : 'bg-emerald-600 text-white shadow-emerald-200 shadow-xl'}`}
          >
            {attendanceStatus === 'In' ? <LogOut size={20} /> : <LogIn size={20} />}
            {attendanceStatus === 'In' ? 'Bater Saída' : 'Bater Entrada'}
          </button>
          <button className="flex items-center gap-4 bg-slate-900 text-white px-10 py-4 rounded-[2rem] font-black hover:bg-slate-800 transition-all">
            <UserPlus size={24} /> Novo Colaborador
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <div className="lg:col-span-1 space-y-8">
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <h3 className="text-xl font-black mb-10 flex items-center gap-4"><Trophy className="text-amber-400" /> Top Eficiência</h3>
               <div className="space-y-8">
                  {staff.map((p, i) => (
                    <div key={i} className="flex items-center gap-5">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-amber-400">#{i+1}</div>
                       <div className="flex-1">
                          <p className="font-black text-sm">{p.name}</p>
                          <div className="w-full h-1 bg-white/5 rounded-full mt-2">
                             <div className="h-full bg-emerald-500" style={{ width: `${p.efficiency}%` }}></div>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden flex flex-col min-h-[600px]">
             <div className="p-10 border-b flex justify-between items-center bg-slate-50/50">
                <h3 className="font-black text-slate-900 text-xl tracking-tight">Pessoal Ativo & Atividades</h3>
                <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border text-sm shadow-inner w-72">
                    <Search size={18} className="text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Pesquisar..." 
                      className="bg-transparent border-none outline-none font-bold w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
             </div>
             <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                   <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <th className="px-10 py-8">Colaborador</th>
                      <th className="px-10 py-8">Status Presença</th>
                      <th className="px-10 py-8">Eficiência</th>
                      <th className="px-10 py-8 text-right">Último Registo</th>
                   </tr>
                </thead>
                <tbody className="divide-y">
                   {currentStaff.map((p, i) => (
                      <tr key={i} className="hover:bg-slate-50 group">
                         <td className="px-10 py-8">
                            <p className="font-black text-slate-900 text-lg">{p.name}</p>
                            <p className="text-xs text-slate-400 font-bold uppercase">{p.role}</p>
                         </td>
                         <td className="px-10 py-8">
                            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase ${p.status === 'Ativo' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                               {p.status}
                            </span>
                         </td>
                         <td className="px-10 py-8 font-black text-slate-700">{p.efficiency}%</td>
                         <td className="px-10 py-8 text-right font-bold text-slate-400">{p.lastCheck}</td>
                      </tr>
                   ))}
                </tbody>
             </table>
             <div className="mt-auto p-8 border-t flex justify-between items-center bg-slate-50/30">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Equipe Operacional v2.0</p>
                <div className="flex gap-2">
                   <button className="p-3 border rounded-xl bg-white"><ChevronLeft size={20} /></button>
                   <button className="p-3 border rounded-xl bg-white"><ChevronRight size={20} /></button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManager;

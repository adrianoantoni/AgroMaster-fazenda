
import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../constants';
import { Package, AlertTriangle, ArrowUp, ArrowDown, Plus, History, Calendar, CheckCircle2, Search, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const InventoryView: React.FC = () => {
  const [showLog, setShowLog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const stockMovements = [
    { id: 'm1', item: 'Maize Seeds H99', type: 'Saída', qty: '50kg', date: '20 Jan 2024', user: 'João Silva', expiry: '15 Mai 2025' },
    { id: 'm2', item: 'NPK 15-15-15', type: 'Entrada', qty: '1000kg', date: '18 Jan 2024', user: 'Eduardo Garcia', expiry: '10 Dez 2026' },
  ];

  const filteredItems = MOCK_INVENTORY.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventário & <span className="text-emerald-600">Stock</span></h1>
          <p className="text-slate-500 font-medium tracking-tight">Controle de insumos, combustíveis e prazos de validade.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => {setShowLog(!showLog); setCurrentPage(1);}}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all border ${showLog ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-600 border-slate-200'}`}
          >
            <History size={20} /> Histórico de Saídas
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-[2rem] font-black shadow-lg shadow-emerald-100">
            <Plus size={20} /> Registrar Entrada
          </button>
        </div>
      </div>

      {!showLog ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const isLow = item.quantity <= item.minThreshold;
            return (
              <div key={item.id} className="bg-white rounded-[3rem] border p-10 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all">
                {isLow && <div className="absolute top-0 left-0 w-3 h-full bg-rose-500"></div>}
                
                <div className="flex justify-between items-start mb-10">
                  <div className="bg-slate-50 p-6 rounded-2xl text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Package size={40} />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                     {isLow && (
                       <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                         <AlertTriangle size={14} /> Stock Crítico
                       </div>
                     )}
                     <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <Clock size={14} /> Validade: 2025
                     </div>
                  </div>
                </div>

                <h3 className="text-3xl font-black text-slate-900">{item.name}</h3>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-10">{item.category}</p>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="text-5xl font-black text-slate-900">{item.quantity.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 font-black uppercase mb-1">{item.unit}</span>
                  </div>
                  <div className="w-full h-4 bg-slate-50 rounded-full overflow-hidden shadow-inner border border-slate-100">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${isLow ? 'bg-rose-500' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'}`} 
                      style={{ width: `${Math.min((item.quantity / (item.minThreshold * 3)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-slate-50 flex gap-4">
                  <button className="flex-1 py-5 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-100">Entrada</button>
                  <button className="flex-1 py-5 bg-slate-50 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100">Saída</button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] border shadow-sm overflow-hidden flex flex-col min-h-[600px] animate-in slide-in-from-bottom-10 duration-500">
          <div className="p-10 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-black text-slate-900 text-xl tracking-tight">Logs de Movimentação Global</h3>
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
                <th className="px-10 py-8">Insumo</th>
                <th className="px-10 py-8">Lote / Validade</th>
                <th className="px-10 py-8">Movimento</th>
                <th className="px-10 py-8">Operador</th>
                <th className="px-10 py-8 text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {stockMovements.map((move) => (
                <tr key={move.id} className="hover:bg-slate-50">
                  <td className="px-10 py-8 font-black text-slate-900 text-lg">{move.item}</td>
                  <td className="px-10 py-8 font-bold text-slate-500">{move.expiry}</td>
                  <td className="px-10 py-8">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${move.type === 'Entrada' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {move.type} • {move.qty}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-slate-600 font-bold">{move.user}</td>
                  <td className="px-10 py-8 text-right text-slate-400 font-black">{move.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryView;

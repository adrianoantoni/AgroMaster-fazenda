
import React, { useState, useEffect } from 'react';
import { Sprout, Beef, BarChart3, ShieldCheck, ArrowRight, Zap, Map, Users, Globe, CheckCircle2, Menu, X, Mail, Phone, MapPin } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900 scroll-smooth">
      {/* Navbar - Restored Branding Visibility and Enhanced Resolution Support */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' : 'bg-transparent py-6 lg:py-8'}`}>
        <div className="max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-16 2xl:px-24 flex items-center justify-between">
          
          {/* Logo - Canto Esquerdo Extremo */}
          <div className="flex-1 flex justify-start">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform duration-300">
                <Sprout size={28} />
              </div>
              {/* Nome do Site - SEMPRE VISÍVEL */}
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap block">
                AgroMaster <span className="text-emerald-600 font-bold">Pro</span>
              </span>
            </div>
          </div>
          
          {/* Menu - Centro Rigoroso */}
          <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-16 2xl:gap-24 text-sm xl:text-base font-bold text-slate-600">
            <a href="#solucoes" onClick={(e) => scrollToSection(e, 'solucoes')} className="hover:text-emerald-600 transition-all hover:scale-105 py-2">Soluções</a>
            <a href="#tecnologia" onClick={(e) => scrollToSection(e, 'tecnologia')} className="hover:text-emerald-600 transition-all hover:scale-105 py-2">Tecnologia</a>
            <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="hover:text-emerald-600 transition-all hover:scale-105 py-2">Sobre Nós</a>
            <a href="#contacto" onClick={(e) => scrollToSection(e, 'contacto')} className="hover:text-emerald-600 transition-all hover:scale-105 py-2">Contacto</a>
          </div>

          {/* Botão Entrar - Canto Direito Extremo */}
          <div className="flex-1 flex justify-end items-center gap-4">
            <button 
              onClick={onLoginClick}
              className="hidden sm:block bg-slate-900 text-white px-8 xl:px-12 py-3.5 rounded-full font-black text-sm xl:text-base hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-200 transition-all active:scale-95 whitespace-nowrap shadow-md shadow-slate-200"
            >
              Entrar no Sistema
            </button>
            
            {/* Mobile Toggle */}
            <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 transition-all duration-300 shadow-2xl ${isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}`}>
          <div className="flex flex-col p-8 gap-4 font-bold text-slate-600">
            <a href="#solucoes" onClick={(e) => scrollToSection(e, 'solucoes')} className="hover:text-emerald-600 p-3 rounded-lg hover:bg-emerald-50 transition-colors">Soluções</a>
            <a href="#tecnologia" onClick={(e) => scrollToSection(e, 'tecnologia')} className="hover:text-emerald-600 p-3 rounded-lg hover:bg-emerald-50 transition-colors">Tecnologia</a>
            <a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="hover:text-emerald-600 p-3 rounded-lg hover:bg-emerald-50 transition-colors">Sobre Nós</a>
            <a href="#contacto" onClick={(e) => scrollToSection(e, 'contacto')} className="hover:text-emerald-600 p-3 rounded-lg hover:bg-emerald-50 transition-colors">Contacto</a>
            <button onClick={onLoginClick} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black mt-4 shadow-lg flex items-center justify-center gap-3">
              Acessar Plataforma <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-52 lg:pb-32 2xl:pt-64 2xl:pb-48 px-6 sm:px-12 lg:px-16 2xl:px-24">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-16 xl:gap-24 2xl:gap-32 items-center">
          <div className="space-y-8 lg:space-y-12 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-full text-xs xl:text-sm font-bold uppercase tracking-widest shadow-sm border border-emerald-100">
              <Zap size={16} className="animate-pulse" /> Inteligência Rural de Próxima Geração
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl 2xl:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight">
              A Revolução Digital <br className="hidden 2xl:block" /> na sua <span className="text-emerald-600 italic">Fazenda.</span>
            </h1>
            <p className="text-lg sm:text-xl xl:text-2xl text-slate-500 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-medium">
              Gerencie cada hectare com precisão cirúrgica. Nossa plataforma integra dados de solo, clima e produção para transformar sua fazenda em um ativo de alta performance global.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6">
              <button 
                onClick={onLoginClick}
                className="group bg-emerald-600 text-white px-10 xl:px-14 py-5 xl:py-6 rounded-[2rem] font-black text-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-200 flex items-center justify-center gap-3 active:scale-95"
              >
                Teste Grátis Agora <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border-2 border-slate-200 text-slate-900 px-10 xl:px-14 py-5 xl:py-6 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all active:scale-95">
                Ver Vídeo Demo
              </button>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2 px-4 sm:px-12 lg:px-0 max-w-2xl lg:max-w-none w-full xl:scale-105 2xl:scale-110 transition-transform duration-700">
            <div className="absolute -inset-10 sm:-inset-16 bg-emerald-500/10 rounded-[5rem] blur-[100px] animate-pulse"></div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1400" 
                className="relative rounded-[4rem] shadow-2xl border-4 sm:border-[12px] border-white object-cover aspect-[4/3] sm:aspect-square w-full transform hover:rotate-1 transition-transform duration-500" 
                alt="Tecnologia Agrícola Master"
              />
              <div className="absolute -bottom-8 -left-6 sm:-bottom-12 sm:-left-12 bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 flex items-center gap-4 sm:gap-6 animate-bounce-slow">
                <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
                  <BarChart3 size={36} className="sm:w-10 sm:h-10" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Crescimento de Safra</p>
                  <p className="text-2xl sm:text-4xl font-black text-slate-900">+32.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section id="solucoes" className="py-24 sm:py-32 2xl:py-48 bg-slate-50 px-6 sm:px-12 lg:px-16 2xl:px-24 scroll-mt-20">
        <div className="max-w-[1800px] mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-32 space-y-6">
            <h2 className="text-4xl sm:text-5xl 2xl:text-6xl font-black text-slate-900 tracking-tight leading-tight">Uma solução para cada hectare</h2>
            <p className="text-lg sm:text-xl 2xl:text-2xl text-slate-500 leading-relaxed font-medium">Módulos especializados que se integram perfeitamente para oferecer uma visão unificada do seu ecossistema rural global.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 xl:gap-14">
            {[
              { icon: Sprout, title: "Agricultura", desc: "Monitore plantio, crescimento e colheita com análise preditiva profunda de solo e microrganismos.", color: "bg-emerald-50 text-emerald-600" },
              { icon: Beef, title: "Pecuária", desc: "Controle individual de rebanho, sanidade, genealogia e rastreabilidade total de mercado.", color: "bg-amber-50 text-amber-600" },
              { icon: BarChart3, title: "Finanças & BI", desc: "Gestão de custos por talhão, análise de ROI em tempo real e relatórios automáticos auditáveis.", color: "bg-blue-50 text-blue-600" },
              { icon: Map, title: "GIS & Remote Sensing", desc: "Mapas de calor e produtividade baseados em dados multiespectrais e geoespaciais.", color: "bg-indigo-50 text-indigo-600" },
              { icon: Users, title: "Gestão de Equipes", desc: "Coordenação operacional offline-first para técnicos, supervisores e trabalhadores de campo.", color: "bg-rose-50 text-rose-600" },
              { icon: Globe, title: "Global Hub", desc: "Conecte múltiplas fazendas, armazéns e fornecedores em um único dashboard unificado.", color: "bg-slate-900 text-white shadow-2xl shadow-slate-300" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 sm:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all group duration-500 flex flex-col text-left">
                <div className={`w-20 h-20 ${item.color} rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                  <item.icon size={40} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">{item.title}</h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-8 flex-1">{item.desc}</p>
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-3 text-emerald-600 font-black text-lg cursor-pointer hover:gap-5 transition-all">
                  Explorar Funcionalidades <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section id="tecnologia" className="py-24 sm:py-32 2xl:py-48 px-6 sm:px-12 lg:px-16 2xl:px-24 overflow-hidden scroll-mt-20">
        <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="lg:w-1/2 space-y-10 text-center lg:text-left">
            <h2 className="text-4xl sm:text-6xl 2xl:text-7xl font-black text-slate-900 tracking-tight leading-none">
              Impulsionado pelo <br/><span className="text-emerald-600">Gemini AI Ultra 3.0</span>
            </h2>
            <p className="text-xl xl:text-2xl 2xl:text-3xl text-slate-500 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              Não processe apenas dados. Gere inteligência estratégica. Nossa IA de última geração analisa o clima, o solo e o mercado global para ditar a sua próxima vitória.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto lg:mx-0">
              {[
                "Otimização de 22% em Insumos",
                "Previsão Predutiva de Mercado",
                "Biosensores com Alerta Real-time",
                "Logística Autónoma de Colheita"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:border-emerald-300 transition-all text-left shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                    <CheckCircle2 size={24} />
                  </div>
                  <span className="text-slate-800 font-black text-base xl:text-lg">{text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-3xl lg:max-w-none transform xl:scale-110">
            <div className="bg-slate-900 rounded-[4rem] p-10 sm:p-16 text-white relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group">
              <div className="absolute -top-20 -right-20 bg-emerald-500 w-72 h-72 rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative space-y-10">
                <div className="p-8 sm:p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-2xl animate-float">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse"></div>
                      <p className="text-sm font-black text-emerald-400 uppercase tracking-[0.2em]">Gemini AI Core Live Data</p>
                   </div>
                   <p className="text-lg sm:text-2xl italic text-slate-100 leading-relaxed font-light">
                     "Anomalia detectada no setor norte. Estresse hídrico iminente nos talhões A1-A5. Ajustando automação de pivôs centrais para 115% de vazão. Rendimento estimado preservado em 9.2 t/ha."
                   </p>
                </div>
                <div className="h-48 sm:h-72 flex items-end gap-3 px-4">
                  {[30, 60, 40, 85, 60, 95, 50, 80, 45, 90, 70, 85].map((h, i) => (
                    <div key={i} className="flex-1 bg-emerald-500/10 rounded-t-2xl relative overflow-hidden group/bar">
                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-2xl transition-all duration-1000 ease-out shadow-lg" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="sobre" className="py-24 lg:py-48 bg-slate-900 text-white px-6 sm:px-12 lg:px-16 2xl:px-24 scroll-mt-20 overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-40 items-center">
            <div className="grid grid-cols-2 gap-6 sm:gap-12 order-2 lg:order-1">
              <div className="space-y-6 sm:space-y-12">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fee74a62?auto=format&fit=crop&q=80&w=1000" className="rounded-[4rem] h-64 sm:h-[450px] w-full object-cover shadow-2xl border-4 border-slate-800 hover:scale-105 transition-transform duration-700" alt="Vista Aérea Fazenda" />
                <div className="bg-emerald-600 p-10 sm:p-16 rounded-[4rem] text-center shadow-2xl transform hover:-translate-y-2 transition-transform">
                   <p className="text-5xl sm:text-7xl font-black">12y</p>
                   <p className="text-sm sm:text-base font-bold uppercase tracking-widest mt-4 text-emerald-100">Inovação no Campo</p>
                </div>
              </div>
              <div className="space-y-6 sm:space-y-12 pt-24 sm:pt-40">
                <div className="bg-slate-800 p-10 sm:p-16 rounded-[4rem] text-center shadow-2xl border border-slate-700 transform hover:-translate-y-2 transition-transform">
                   <p className="text-5xl sm:text-7xl font-black">500+</p>
                   <p className="text-sm sm:text-base font-bold uppercase tracking-widest mt-4 text-slate-400">Parceiros Globais</p>
                </div>
                <img src="https://images.unsplash.com/photo-1595008652550-e3460c39eb61?auto=format&fit=crop&q=80&w=1000" className="rounded-[4rem] h-64 sm:h-[450px] w-full object-cover shadow-2xl border-4 border-slate-800 hover:scale-105 transition-transform duration-700" alt="Agricultor Tech" />
              </div>
            </div>
            <div className="space-y-10 lg:space-y-16 text-center lg:text-left order-1 lg:order-2">
              <h2 className="text-4xl sm:text-6xl 2xl:text-8xl font-black tracking-tight leading-[0.95]">Liderando a <br/><span className="text-emerald-500">Transformação Digital</span> da Alimentação.</h2>
              <p className="text-xl sm:text-2xl 2xl:text-3xl text-slate-400 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light">
                O AgroMaster Pro une a sabedoria ancestral da terra com o poder computacional do futuro. Não entregamos apenas software; entregamos soberania tecnológica para o produtor rural.
              </p>
              <div className="space-y-8 flex flex-col items-center lg:items-start">
                {["Líder em infraestrutura Agro na África Austral.", "Engenharia de software com DNA Agronômico.", "Sustentabilidade baseada em eficiência de dados."].map((text, i) => (
                  <div key={i} className="flex items-center gap-6 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center group-hover:scale-125 transition-all shadow-lg shadow-emerald-500/20">
                       <CheckCircle2 size={24} />
                    </div>
                    <span className="font-black text-slate-100 text-xl sm:text-2xl">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-slate-950 text-white pt-32 pb-16 px-6 sm:px-12 lg:px-16 2xl:px-24 scroll-mt-20 border-t border-white/5">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-32">
            <div className="col-span-1 lg:col-span-2 space-y-12">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-900/40 transform hover:rotate-6 transition-transform">
                  <Sprout size={32} />
                </div>
                <span className="text-3xl font-black tracking-tighter">AgroMaster <span className="text-emerald-500">Pro</span></span>
              </div>
              <p className="text-slate-400 max-w-md text-lg sm:text-xl leading-relaxed font-medium">
                Soberania tecnológica para quem planta, cria e alimenta o amanhã. O futuro da agricultura é movido por dados e paixão.
              </p>
            </div>
            
            <div className="text-left space-y-10">
              <h4 className="font-black text-emerald-500 uppercase tracking-[0.2em] text-sm">Acesso Rápido</h4>
              <ul className="space-y-6 text-base sm:text-lg font-bold text-slate-400">
                <li><a href="#solucoes" onClick={(e) => scrollToSection(e, 'solucoes')} className="hover:text-emerald-400 transition-colors">Soluções</a></li>
                <li><a href="#tecnologia" onClick={(e) => scrollToSection(e, 'tecnologia')} className="hover:text-emerald-400 transition-colors">IA Gemini Ultra</a></li>
                <li><a href="#sobre" onClick={(e) => scrollToSection(e, 'sobre')} className="hover:text-emerald-400 transition-colors">Nossa História</a></li>
              </ul>
            </div>
            
            <div className="text-left space-y-10">
              <h4 className="font-black text-emerald-500 uppercase tracking-[0.2em] text-sm">Canais Directos</h4>
              <ul className="space-y-8 text-base sm:text-lg font-bold text-slate-400">
                <li className="flex items-start gap-5 group">
                   <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-emerald-600 transition-colors">
                      <MapPin className="text-emerald-500 group-hover:text-white" size={24} />
                   </div>
                   <span className="leading-tight">Huambo, Angola<br/><span className="text-xs font-black text-slate-600 uppercase tracking-widest mt-1 block">Hub Tecnológico Sul</span></span>
                </li>
                <li className="flex items-center gap-5 group">
                   <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-emerald-600 transition-colors">
                      <Mail className="text-emerald-500 group-hover:text-white" size={24} />
                   </div>
                   <span className="hover:text-emerald-400 transition-colors">geral@agromaster.ao</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center text-sm font-bold text-slate-500 gap-10">
            <p>© 2024 AgroMaster Pro. Powered by AgroTech Solutions Global.</p>
            <div className="flex items-center gap-4 bg-emerald-500/5 px-6 py-3 rounded-2xl border border-emerald-500/10">
               <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
               <span className="text-emerald-500 uppercase tracking-[0.3em] text-[10px]">Infrastructure Online</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 8s ease-in-out infinite; }
        
        html { scroll-behavior: smooth; }
        body { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; }
      `}</style>
    </div>
  );
};

export default LandingPage;

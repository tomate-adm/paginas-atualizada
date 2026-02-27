/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Stethoscope, 
  Sparkles, 
  Smile, 
  Calendar,
  Menu,
  X,
  Instagram,
  Facebook,
  Linkedin,
  Layers,
  Palette,
  Zap,
  Heart,
  Award,
  Briefcase,
  Utensils,
  Grid,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Users,
  TrendingUp,
  Coffee,
  Dumbbell,
  Home,
  GraduationCap,
  Search
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TYPES ---
type NicheId = 'saude' | 'negocios' | 'alimentacao' | 'outros';

interface Model {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
  tag: string;
  layout: 'standard' | 'marketplace' | 'catalog' | 'video' | 'portfolio' | 'professional';
}

interface Niche {
  id: NicheId;
  name: string;
  icon: React.ReactNode;
  description: string;
  models: Model[];
}

// --- DATA ---
const NICHES: Niche[] = [
  {
    id: 'saude',
    name: 'Saúde & Bem-estar',
    icon: <Heart className="w-5 h-5" />,
    description: 'Soluções para clínicas, consultórios e profissionais da saúde.',
    models: [
      { id: 's1', name: 'Clínica Odontológica', description: 'Foco em estética e reabilitação oral de alto padrão.', image: 'https://picsum.photos/seed/dentist-lux/600/400', color: 'bg-sky-500', tag: 'Odontologia', layout: 'standard' },
      { id: 's2', name: 'Centro Médico Multi', description: 'Portal multiespecialidade com corpo clínico completo.', image: 'https://picsum.photos/seed/medical-center/600/400', color: 'bg-emerald-500', tag: 'Medicina', layout: 'catalog' },
      { id: 's3', name: 'Yoga & Mindfulness', description: 'Interface imersiva com vídeos de meditação guiada.', image: 'https://picsum.photos/seed/yoga-zen/600/400', color: 'bg-stone-500', tag: 'Yoga', layout: 'video' },
      { id: 's4', name: 'Fisioterapia Esportiva', description: 'Recuperação de atletas e reabilitação avançada.', image: 'https://picsum.photos/seed/physio-fit/600/400', color: 'bg-indigo-500', tag: 'Fisioterapia', layout: 'standard' },
      { id: 's5', name: 'Nutrição Esportiva', description: 'Planos alimentares focados em performance e saúde.', image: 'https://picsum.photos/seed/nutrition-life/600/400', color: 'bg-lime-500', tag: 'Nutrição', layout: 'professional' },
    ]
  },
  {
    id: 'alimentacao',
    name: 'Alimentação & Varejo',
    icon: <Utensils className="w-5 h-5" />,
    description: 'Layouts para restaurantes, mercados e delivery de comida.',
    models: [
      { id: 'a1', name: 'Restaurante Gourmet', description: 'Cardápio digital e reservas para alta gastronomia.', image: 'https://picsum.photos/seed/restaurant-fine/600/400', color: 'bg-rose-600', tag: 'Restaurante', layout: 'standard' },
      { id: 'a2', name: 'Delivery Estilo iFood', description: 'Marketplace completo com busca, categorias e pratos populares.', image: 'https://picsum.photos/seed/ifood-style/600/400', color: 'bg-red-600', tag: 'Delivery', layout: 'marketplace' },
      { id: 'a3', name: 'Supermercado Digital', description: 'Catálogo de produtos com carrinho e promoções do dia.', image: 'https://picsum.photos/seed/supermarket/600/400', color: 'bg-green-600', tag: 'Mercado', layout: 'catalog' },
      { id: 'a4', name: 'Hamburgueria Experience', description: 'Vídeo de fundo com o preparo dos burgers artesanais.', image: 'https://picsum.photos/seed/burger-joint/600/400', color: 'bg-orange-600', tag: 'Hamburgueria', layout: 'video' },
      { id: 'a5', name: 'Hortifruti Fresco', description: 'Venda de produtos orgânicos direto da fazenda.', image: 'https://picsum.photos/seed/organic-farm/600/400', color: 'bg-emerald-600', tag: 'Orgânicos', layout: 'standard' },
    ]
  },
  {
    id: 'negocios',
    name: 'Imobiliário & Negócios',
    icon: <Briefcase className="w-5 h-5" />,
    description: 'Estratégias para imobiliárias, corretores e empresas corporativas.',
    models: [
      { id: 'n1', name: 'Catálogo Imobiliário', description: 'Grade de imóveis com especificações técnicas e filtros.', image: 'https://picsum.photos/seed/realestate-catalog/600/400', color: 'bg-slate-900', tag: 'Imobiliário', layout: 'catalog' },
      { id: 'n2', name: 'Imóveis de Luxo (Vídeo)', description: 'Apresentação cinematográfica de mansões e coberturas.', image: 'https://picsum.photos/seed/realestate-lux/600/400', color: 'bg-amber-700', tag: 'Luxo', layout: 'video' },
      { id: 'n3', name: 'Corretor de Elite', description: 'Página pessoal focada em autoridade e depoimentos.', image: 'https://picsum.photos/seed/realtor/600/400', color: 'bg-blue-700', tag: 'Corretor', layout: 'professional' },
      { id: 'n4', name: 'SaaS Corporativo', description: 'Apresentação de software com dashboard e planos.', image: 'https://picsum.photos/seed/tech-saas/600/400', color: 'bg-indigo-600', tag: 'Tecnologia', layout: 'standard' },
      { id: 'n5', name: 'Consultoria Financeira', description: 'Gestão de investimentos e planejamento patrimonial.', image: 'https://picsum.photos/seed/finance-consult/600/400', color: 'bg-amber-600', tag: 'Finanças', layout: 'standard' },
    ]
  },
  {
    id: 'outros',
    name: 'Profissional & Serviços',
    icon: <Users className="w-5 h-5" />,
    description: 'Foco na marca pessoal e prestação de serviços especializados.',
    models: [
      { id: 'o1', name: 'Consultor Estratégico', description: 'Layout focado na imagem do profissional e resultados.', image: 'https://picsum.photos/seed/consultant/600/400', color: 'bg-zinc-900', tag: 'Consultoria', layout: 'professional' },
      { id: 'o2', name: 'Portfólio Arquiteto', description: 'Galeria em mosaico de projetos e conceitos.', image: 'https://picsum.photos/seed/architect/600/400', color: 'bg-neutral-800', tag: 'Arquitetura', layout: 'portfolio' },
      { id: 'o3', name: 'Personal Trainer Pro', description: 'Venda de consultoria fitness e treinos.', image: 'https://picsum.photos/seed/fitness-coach/600/400', color: 'bg-red-600', tag: 'Fitness', layout: 'professional' },
      { id: 'o4', name: 'Mentor & Coach', description: 'Plataforma para cursos online e mentorias.', image: 'https://picsum.photos/seed/mentor/600/400', color: 'bg-violet-600', tag: 'Educação', layout: 'standard' },
      { id: 'o5', name: 'Freelancer Criativo', description: 'Página dinâmica para social media e designers.', image: 'https://picsum.photos/seed/creative-free/600/400', color: 'bg-fuchsia-600', tag: 'Criativo', layout: 'portfolio' },
    ]
  }
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Layers className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-serif font-bold tracking-tight text-slate-900">Hub<span className="text-brand-600">LP</span></span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#galeria" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Galeria</a>
          <a href="#nichos" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Nichos</a>
          <a href="#beneficios" className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">Benefícios</a>
          <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all active:scale-95">
            Começar Agora
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white border-t border-slate-50"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Galeria', 'Nichos', 'Benefícios'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-600 hover:text-brand-600 py-3 px-4 rounded-xl hover:bg-slate-50 transition-all"
                >
                  {item}
                </a>
              ))}
              <button className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold mt-2 shadow-lg shadow-brand-500/20">
                Começar Agora
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6 bg-slate-50 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50/50 -z-10 blur-3xl rounded-full translate-x-1/2" />
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <Sparkles className="w-3 h-3 text-brand-500" />
            A maior biblioteca de Landing Pages
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.1] mb-8">
            Landing Pages que <br />
            <span className="text-brand-600 italic">convertem visitantes</span> em clientes.
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Escolha entre 20 modelos profissionais divididos em nichos estratégicos. Design de alta performance pronto para o seu negócio.
          </p>
          <div className="flex flex-col sm:row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-brand-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-500/20 hover:bg-brand-700 transition-all flex items-center justify-center gap-2 group">
              Explorar Modelos
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Ver Demonstração
            </button>
          </div>
        </motion.div>
        
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Modelos Prontos', value: '20+' },
            { label: 'Nichos Atendidos', value: '15+' },
            { label: 'Conversão Média', value: '24%' },
            { label: 'Suporte 24/7', value: 'Sim' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface NicheSectionProps {
  niche: Niche;
  key?: string;
}

const NicheSection = ({ niche }: NicheSectionProps) => {
  return (
    <section id={niche.id} className="py-24 border-b border-slate-100 last:border-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900">
                {niche.icon}
              </div>
              <h2 className="text-4xl font-serif font-bold text-slate-900">{niche.name}</h2>
            </div>
            <p className="text-lg text-slate-600">{niche.description}</p>
          </div>
          <button className="text-brand-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Ver todos os modelos <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {niche.models.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all">
                <img 
                  src={model.image} 
                  alt={model.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                    Visualizar <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
                <div className={cn("absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider", model.color)}>
                  {model.tag}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">{model.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{model.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const benefits = [
    { title: 'Alta Conversão', desc: 'Estruturas validadas por especialistas em copywriting.', icon: <TrendingUp /> },
    { title: 'Design Moderno', desc: 'Estética premium que transmite autoridade imediata.', icon: <Palette /> },
    { title: 'Mobile First', desc: 'Experiência perfeita em smartphones e tablets.', icon: <Zap /> },
    { title: 'Fácil Edição', desc: 'Código limpo e modular para ajustes rápidos.', icon: <Layers /> },
  ];

  return (
    <section id="beneficios" className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              Por que escolher nossos <br />
              <span className="text-brand-500">Modelos de Elite?</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-8">
              {benefits.map((b, i) => (
                <div key={i}>
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-500 mb-4">
                    {b.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[40px] overflow-hidden border-8 border-white/5">
              <img 
                src="https://picsum.photos/seed/benefits/800/800" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-brand-600 p-8 rounded-3xl shadow-2xl">
              <p className="text-4xl font-bold mb-1">98%</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Satisfação</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
                <Layers className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-slate-900">Hub<span className="text-brand-600">LP</span></span>
            </div>
            <p className="text-slate-500 max-w-md leading-relaxed mb-8">
              Ajudamos empreendedores e empresas a criarem uma presença digital de alto impacto através de landing pages profissionais e otimizadas para resultados.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-6">Nichos</h4>
            <ul className="space-y-4 text-slate-500">
              {NICHES.map(n => (
                <li key={n.id}><a href={`#${n.id}`} className="hover:text-brand-600 transition-colors">{n.name}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-slate-900 mb-6">Suporte</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Documentação</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-100 flex flex-col md:row items-center justify-between gap-6 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} HubLP. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Pagamento Seguro</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-500" /> Entrega Imediata</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---
export default function App() {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [showSwitcher, setShowSwitcher] = useState(true);
  const [hoveredNiche, setHoveredNiche] = useState<NicheId | null>(null);

  // Custom slow scroll to top
  useEffect(() => {
    const start = window.scrollY;
    if (start === 0) return;

    const duration = 1200; // Slower duration in ms
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quintic (very smooth and starts fast then slows down significantly)
      const ease = 1 - Math.pow(1 - progress, 5);
      
      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [selectedModelId]);

  const selectedModel = selectedModelId 
    ? NICHES.flatMap(n => n.models).find(m => m.id === selectedModelId) 
    : null;

  const renderModelPreview = (model: Model) => {
    // Determine niche for styling
    const niche = NICHES.find(n => n.models.some(m => m.id === model.id))!;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="min-h-screen bg-white"
      >
        {/* Simple Dynamic Header */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", model.color)}>
                {niche.icon}
              </div>
              <span className="font-bold text-xl">{model.name}</span>
            </div>
            <button 
              onClick={() => setSelectedModelId(null)}
              className="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Voltar ao Hub
            </button>
          </div>
        </nav>

        {/* RENDER SPECIFIC LAYOUT */}
        {model.layout === 'marketplace' && <MarketplaceLayout model={model} niche={niche} />}
        {model.layout === 'catalog' && <CatalogLayout model={model} niche={niche} />}
        {model.layout === 'video' && <VideoHeroLayout model={model} niche={niche} />}
        {model.layout === 'portfolio' && <PortfolioLayout model={model} niche={niche} />}
        {model.layout === 'professional' && <ProfessionalLayout model={model} niche={niche} />}
        {model.layout === 'standard' && <StandardLayout model={model} niche={niche} />}

        <Footer />
      </motion.div>
    );
  };

  // --- SUB-LAYOUT COMPONENTS ---

  const StandardLayout = ({ model, niche }: { model: Model, niche: Niche }) => (
    <>
      <section className="pt-40 pb-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className={cn("inline-block px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest mb-6", model.color)}>
              {model.tag}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
              {model.name}: <br/>
              <span className="text-slate-400 italic">Excelência em cada detalhe.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              {model.description} Esta é uma demonstração do layout focado em alta conversão para o nicho de {niche.name}.
            </p>
            <button className={cn("px-10 py-5 rounded-2xl text-white font-bold text-lg shadow-xl transition-all hover:scale-105", model.color)}>
              Agendar Agora
            </button>
          </motion.div>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4 }} className="relative">
            <img src={model.image} className="rounded-[40px] shadow-2xl w-full aspect-square object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>
      </section>
      <ServicesSection model={model} />
    </>
  );

  const MarketplaceLayout = ({ model }: { model: Model, niche: Niche }) => (
    <div className="bg-slate-50 pt-24">
      <section className="bg-white px-6 py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Busque por pratos ou restaurantes..." 
                className="w-full pl-12 pr-6 py-4 bg-slate-100 rounded-2xl border-none focus:ring-2 focus:ring-red-500 transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              {['Pizza', 'Burger', 'Japonesa', 'Saudável', 'Doces'].map(cat => (
                <button key={cat} className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold whitespace-nowrap hover:border-red-500 transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Destaques em {model.tag}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition-all flex gap-4 cursor-pointer">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src={`https://picsum.photos/seed/food${i}/200/200`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">Restaurante Exemplo {i}</h3>
                  <div className="flex items-center gap-1 text-xs text-yellow-500 my-1">
                    <Star className="w-3 h-3 fill-current" /> 4.8 • <span className="text-slate-400">Lanches</span>
                  </div>
                  <p className="text-xs text-slate-400">30-45 min • R$ 5,99</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const CatalogLayout = ({ model }: { model: Model, niche: Niche }) => (
    <div className="pt-24">
      <section className="px-6 py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">{model.name}</h1>
            <p className="opacity-70">Explore nosso catálogo completo com as melhores opções do mercado.</p>
          </div>
          <div className="flex gap-4">
            <select className="bg-white/10 border-white/20 rounded-xl px-4 py-3 text-sm focus:ring-brand-500">
              <option>Filtrar por Preço</option>
            </select>
            <select className="bg-white/10 border-white/20 rounded-xl px-4 py-3 text-sm focus:ring-brand-500">
              <option>Ordenar por</option>
            </select>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all">
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={`https://picsum.photos/seed/cat${i}/600/400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                  {model.tag === 'Imobiliário' ? 'R$ 850.000' : 'R$ 45,90'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Item de Catálogo {i}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">Descrição técnica detalhada do produto ou imóvel em destaque neste catálogo.</p>
                {model.tag === 'Imobiliário' ? (
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-6">
                    <span className="flex items-center gap-1"><Home className="w-3 h-3" /> 3 Quartos</span>
                    <span className="flex items-center gap-1"><Grid className="w-3 h-3" /> 120m²</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded-md">Em estoque</span>
                  </div>
                )}
                <button className={cn("w-full py-3 rounded-xl text-white font-bold text-sm transition-all", model.color)}>
                  {model.tag === 'Imobiliário' ? 'Ver Detalhes' : 'Adicionar ao Carrinho'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const VideoHeroLayout = ({ model }: { model: Model, niche: Niche }) => (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simulated Video Background */}
      <div className="absolute inset-0 bg-black">
        <img 
          src={model.image} 
          className="w-full h-full object-cover opacity-40 scale-110 animate-pulse" 
          style={{ animationDuration: '8s' }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-8">
            <Zap className="w-4 h-4 text-yellow-400" /> Experiência Imersiva
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 leading-tight">
            Sinta a <br/> <span className={cn("italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40", model.color.replace('bg-', 'from-'))}>Diferença.</span>
          </h1>
          <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
            {model.description} Assista ao vídeo e descubra por que somos referência absoluta em {model.tag}.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className={cn("w-full sm:w-auto px-12 py-6 rounded-2xl text-white font-bold text-xl shadow-2xl hover:scale-105 transition-all", model.color)}>
              Explorar Agora
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 text-white font-bold hover:opacity-70 transition-opacity">
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
              </div>
              Ver Vídeo Completo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const PortfolioLayout = ({ model }: { model: Model, niche: Niche }) => (
    <div className="pt-24 bg-white">
      <section className="px-6 py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-black uppercase tracking-widest opacity-40 mb-4 block">{model.tag} Portfolio</span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">{model.name}</h1>
            </div>
            <p className="text-slate-500 max-w-sm text-right">Transformando visões em realidade através de design e estratégia personalizada.</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[1,2,3,4,5,6].map(i => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="relative group rounded-3xl overflow-hidden cursor-pointer"
              >
                <img src={`https://picsum.photos/seed/port${i}/${i % 2 === 0 ? '800/1000' : '800/600'}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-white">
                  <h3 className="text-xl font-bold mb-2">Projeto Exemplo {i}</h3>
                  <p className="text-sm opacity-70 mb-4">Design de Interiores / 2026</p>
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const ProfessionalLayout = ({ model, niche }: { model: Model, niche: Niche }) => (
    <div className="pt-24 bg-slate-50">
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className={cn("absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-20", model.color)} />
            <img src={model.image} className="relative z-10 w-full aspect-square object-cover rounded-full border-[16px] border-white shadow-2xl" referrerPolicy="no-referrer" />
            <div className="absolute bottom-10 right-10 z-20 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Especialidade</p>
              <p className="text-lg font-bold text-slate-900">{model.tag}</p>
            </div>
          </div>
          <div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              Sua Marca, <br/> <span className="text-slate-400 italic">Seu Legado.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              {model.description} Aumente sua autoridade e conquiste mais clientes com um posicionamento digital de elite focado em {niche.name}.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-3xl font-bold mb-1">10+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Anos de Exp.</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">500+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Clientes</p>
              </div>
            </div>
            <button className={cn("w-full sm:w-auto px-12 py-5 rounded-2xl text-white font-bold text-lg shadow-xl hover:scale-105 transition-all", model.color)}>
              Contratar Consultoria
            </button>
          </div>
        </div>
      </section>
      <ServicesSection model={model} />
    </div>
  );

  const ServicesSection = ({ model }: { model: Model }) => (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">
            {model.tag === 'Mercado' ? 'Nossos Departamentos' : 
             model.tag === 'Restaurante' ? 'Destaques do Cardápio' : 
             'Serviços em Destaque'}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Conheça as principais soluções e produtos que oferecemos para garantir sua total satisfação.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { t: 'Serviço Premium', p: 'R$ 299,00', i: 'https://picsum.photos/seed/serv1/400/300' },
            { t: 'Solução Completa', p: 'R$ 599,00', i: 'https://picsum.photos/seed/serv2/400/300' },
            { t: 'Consultoria VIP', p: 'R$ 999,00', i: 'https://picsum.photos/seed/serv3/400/300' },
            { t: 'Pacote Exclusive', p: 'R$ 1.499,00', i: 'https://picsum.photos/seed/serv4/400/300' },
          ].map((item, i) => (
            <div key={i} className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
              <div className="aspect-video overflow-hidden">
                <img src={item.i} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{item.t}</h3>
                <p className="text-sm text-slate-500 mb-4">Descrição breve do produto ou serviço oferecido neste modelo de layout.</p>
                <div className="flex items-center justify-between">
                  <span className={cn("font-bold", model.color.replace('bg-', 'text-'))}>{item.p}</span>
                  <button className="p-2 rounded-full bg-white shadow-sm hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-700">
      <AnimatePresence mode="wait">
        {selectedModelId ? (
          renderModelPreview(selectedModel!)
        ) : (
          <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Navbar />
            <main>
              <Hero />
              <div id="galeria" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Nossa Galeria de Elite</h2>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">Navegue pelos nossos nichos e encontre o modelo perfeito para o seu próximo projeto.</p>
                </div>
                <div id="nichos">
                  {NICHES.map((niche) => (
                    <NicheSection key={niche.id} niche={niche} />
                  ))}
                </div>
              </div>
              <Benefits />
              <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-brand-600 rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-500/20">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 relative z-10">Pronto para elevar seu <br /> nível no digital?</h2>
                  <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto relative z-10">Junte-se a mais de 2.000 profissionais que já estão usando nossas landing pages para escalar seus negócios.</p>
                  <button className="relative z-10 bg-white text-brand-600 px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform shadow-xl">
                    Quero Acesso Vitalício
                  </button>
                </div>
              </section>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MEGA SWITCHER MENU */}
      <div className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500",
        showSwitcher ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}>
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200 p-2 rounded-3xl shadow-2xl flex items-center gap-1">
          <button 
            onClick={() => setSelectedModelId(null)}
            className={cn(
              "p-3 rounded-2xl transition-all flex items-center gap-2",
              !selectedModelId ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:bg-slate-100"
            )}
          >
            <Grid className="w-5 h-5" />
            {!selectedModelId && <span className="text-xs font-bold pr-1">Hub</span>}
          </button>

          <div className="w-px h-8 bg-slate-100 mx-1" />

          {NICHES.map((niche) => (
            <div 
              key={niche.id} 
              className="relative group"
              onMouseEnter={() => setHoveredNiche(niche.id)}
              onMouseLeave={() => setHoveredNiche(null)}
            >
              <button
                className={cn(
                  "p-3 rounded-2xl transition-all flex items-center gap-2",
                  selectedModelId && niche.models.some(m => m.id === selectedModelId)
                    ? "bg-brand-600 text-white shadow-lg"
                    : "text-slate-500 hover:bg-slate-50"
                )}
              >
                {niche.icon}
                <span className="text-xs font-bold hidden md:inline">{niche.name}</span>
              </button>

              {/* HOVER MODELS POPOVER */}
              <AnimatePresence>
                {hoveredNiche === niche.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -12, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 flex flex-col z-[110]"
                  >
                    <div className="p-3 bg-slate-50/80 backdrop-blur-sm border-b border-slate-100 rounded-t-[28px] shrink-0">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Explorar: {niche.name}</p>
                    </div>
                    <div className="p-1.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                      {niche.models.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedModelId(model.id);
                            setHoveredNiche(null);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left group/item mb-0.5 last:mb-0",
                            selectedModelId === model.id ? "bg-brand-50 text-brand-700" : "hover:bg-slate-50 text-slate-600"
                          )}
                        >
                          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                            <img src={model.image} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold truncate text-slate-900">{model.name}</p>
                            <p className="text-[9px] opacity-60 truncate font-medium">{model.tag}</p>
                          </div>
                          <div className={cn("w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-all bg-white shadow-sm border border-slate-100", model.color.replace('bg-', 'text-'))}>
                            <ChevronRight className="w-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <div className="w-px h-8 bg-slate-100 mx-1" />

          <button 
            onClick={() => setShowSwitcher(false)}
            className="p-3 text-slate-300 hover:text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!showSwitcher && (
        <button 
          onClick={() => setShowSwitcher(true)}
          className="fixed bottom-8 left-8 z-[100] bg-white p-4 rounded-full shadow-xl border border-slate-100 text-slate-600 hover:scale-110 transition-transform"
        >
          <Palette className="w-6 h-6" />
        </button>
      )}

      {/* Global WhatsApp Button */}
      <a 
        href="#" 
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 group"
      >
        <Phone className="w-8 h-8" />
      </a>
    </div>
  );
}

/* =====================================================
   JOAOLACERDA.DEV — Shared Script v2
   i18n · Particles · Nav · Animations
   ===================================================== */

// ── i18n Translations ─────────────────────────────────
const i18n = {
  pt: {
    'nav.home':'Início','nav.about':'Sobre','nav.exp':'Experiência',
    'nav.proj':'Projetos','nav.certs':'Certificações','nav.contact':'Contato','nav.resume':'Currículo',
    'hero.role':'Engenheiro de Software — Full Stack & Dados',
    'hero.desc':'Construo produtos digitais em produção: interfaces rápidas, APIs consistentes e pipelines que transformam dados em decisão — do banco ao navegador.',
    'hero.cta.work':'Ver projetos em produção','hero.cta.contact':'Falar comigo',
    'stat.projects':'Produtos em produção','stat.langs':'Idiomas',
    'stat.award':'Laureado','stat.award.label':'Láurea acadêmica',
    'comp.kicker':'// áreas de atuação','comp.title':'Minhas áreas',
    'comp.lede':'Três frentes conectadas: a interface que a pessoa usa, o dado que orienta a decisão e a infraestrutura que sustenta as duas.',
    'comp.fs.kicker':'Engenharia de produto','comp.fs.title':'Full Stack',
    'comp.fs.desc':'Interfaces, APIs e produtos completos — do banco de dados ao navegador. Aplicações em produção com foco em performance, acessibilidade e código simples de manter.',
    'comp.data.kicker':'Engenharia de dados','comp.data.title':'Dados & BI',
    'comp.data.desc':'Pipelines ETL/ELT, modelagem dimensional e dashboards que transformam dado bruto em decisão — da ingestão de APIs públicas à camada de apresentação.',
    'comp.cloud.kicker':'Infraestrutura & deploy','comp.cloud.title':'Cloud',
    'comp.cloud.desc':'Deploy, automação e confiabilidade: ambientes isolados, integração e entrega contínuas e monitoramento — sem depender de processos manuais para publicar.',
    'reel.kicker':'// entrega','reel.line':'Do primeiro commit ao produto em operação.',
    'home.work.title':'// em produção',
    'home.work.all':'Ver todos os projetos',
    'home.work.barrachopp':'Site institucional',
    'home.work.meiflow':'SaaS financeiro',
    'home.work.cerradowatch':'Dados ambientais',
    'home.work.brasilbid':'Licitações públicas',
    'about.title':'Sobre',
    'about.p1':'Sou engenheiro de software formado pela UniGOIÁS, laureado — a mais alta distinção acadêmica da instituição. Atuo no ponto em que produto e dados se encontram: interfaces claras, APIs bem desenhadas e pipelines confiáveis.',
    'about.p2':'Já coloquei produtos reais em produção — de um SaaS de gestão financeira para MEIs a sites institucionais, dashboards públicos e pipelines de dados ambientais. Gosto de resolver o problema inteiro, do banco ao navegador, com código simples de manter.',
    'about.p3':'Hoje meu foco é <span class="text-cyan">full stack</span> e <span class="text-cyan">engenharia de dados</span>, com base sólida em <span class="text-cyan">cloud e automação</span>. Trabalho o ciclo completo — e entrego.',
    'about.skills.title':'// tecnologias','about.edu.title':'// formação','about.resume':'Baixar currículo',
    'about.lang.title':'// idiomas',
    'about.lang.pt':'Português','about.lang.pt.level':'Nativo',
    'about.lang.en':'Inglês','about.lang.en.level':'Fluente',
    'about.lang.es':'Espanhol','about.lang.es.level':'Avançado',
    'sk.fullstack':'Full Stack','sk.data':'Dados & BI','sk.cloud':'Cloud',
    'edu.degree':'Bacharel em Engenharia de Software',
    'edu.school':'Centro Universitário de Goiás — UniGOIÁS · Goiânia, GO',
    'edu.status':'Graduado em 2026',
    'edu.laureate':'Laureado',
    'edu.laureate.desc':'Láurea acadêmica em Engenharia de Software — UniGOIÁS',
    'edu.laureate.note':'Melhor desempenho da turma de 2026',
    'exp.title':'Experiência',
    'exp.tab0':'Rede Nilo','exp.tab1':'Gigabyte Soluções','exp.tab2':'Quiosque Barra Chopp',
    'exp.0.title':'Assistente de TI','exp.0.company':'@ Rede Nilo Supermercados',
    'exp.0.period':'Set 2026 — Presente · Goiás, Brasil · Em atividade',
    'exp.0.b1':'Suporte técnico e correção de PDVs, com diagnóstico e resolução de falhas nas lojas.',
    'exp.0.b2':'Criação de usuários e atribuição de funções e permissões no banco de dados MySQL.',
    'exp.0.b3':'Análise e correção manual de cupons fiscais.',
    'exp.0.b4':'Operação e suporte ao ERP TOTVS no dia a dia das lojas.',
    'exp.0.b5':'Implantação e acompanhamento de self checkouts (caixas automáticos).',
    'exp.0.b6':'Desenvolvimento de ferramentas e automações internas para aumentar eficiência e produtividade.',
    'exp.1.title':'Estagiário de Desenvolvimento de Software','exp.1.company':'@ Gigabyte Soluções','exp.1.period':'Ago 2025 — Dez 2025 · Remoto',
    'exp.1.b1':'Desenvolvimento de módulo web (HTML/CSS/JS + Python/FastAPI) integrado ao banco de dados de um ERP desktop legado.',
    'exp.1.b2':'Elaboração de planos de teste, homologação de aplicações e validação de requisitos antes da entrega ao cliente.',
    'exp.1.b3':'Produção de documentação técnica: manuais de usuário, especificações de processo e relatórios de suporte.',
    'exp.2.title':'Operador de Sistema & Atendimento','exp.2.company':'@ Quiosque Barra Chopp','exp.2.period':'Jan 2021 — Jan 2025 · Barra do Garças, MT',
    'exp.2.b1':'Operava sistema de gestão integrado (NooChef): cadastro, atualização e exclusão de produtos diretamente no banco de dados.',
    'exp.2.b2':'Emissão de notas fiscais eletrônicas (NF-e) e conciliação de caixa com registros sistêmicos.',
    'exp.2.b3':'Controle sistemático de estoque com gestão de entradas, saídas e ajustes de inventário.',
    'proj.title':'Projetos em produção','proj.featured':'Destaque',
    'filter.all':'Todos','filter.fs':'Full Stack','filter.data':'Dados',
    'proj.barrachopp.title':'BarraChopp — Site institucional em produção',
    'proj.barrachopp.desc':'Site institucional para o Barra Chopp, com apresentação do espaço, cardápio, kit de chope e contato direto pelo WhatsApp. Projeto completo de ponta a ponta: design, front-end e publicação.',
    'proj.meiflow.title':'MEIFlow — SaaS de Gestão Financeira para MEIs',
    'proj.meiflow.desc':'SaaS multi-tenant para os 15 milhões de MEIs brasileiros. Dashboard financeiro com categorização automática, integração com a Receita Federal para validação de CNPJ, monitoramento do limite anual de R$ 81 mil e notificações de DAS via fila assíncrona.',
    'proj.cerradowatch.title':'CerradoWatch — Pipeline ETL de Dados Ambientais',
    'proj.cerradowatch.desc':'Pipeline ETL que ingere dados de queimadas, desmatamento e clima de APIs públicas (INPE, NASA FIRMS, INMET), transforma com dbt e serve um dashboard interativo via Streamlit. Orquestração semanal por GitHub Actions.',
    'proj.brasilibid.title':'BrasilBid — Monitor de Licitações Públicas',
    'proj.brasilibid.desc':'Pipeline ETL que ingere licitações do PNCP via API oficial, carrega em PostgreSQL, transforma com dbt e serve um app interativo via Streamlit. Mais de R$ 8 bilhões em licitações monitoradas de 27 UFs e 1.400+ órgãos públicos.',
    'proj.saudebr.title':'SaúdeBR — Painel de Inteligência da Saúde Pública',
    'proj.saudebr.desc':'Pipeline Python que consome APIs DATASUS/OpenDataSUS — internações por CID-10, mortalidade por estado e leitos por município — com limpeza e carga em Star Schema no PostgreSQL. Relatório Power BI com mapas de calor e taxa por 100 mil hab.',
    'certs.title':'Certificações',
    'certcat.edu':'// formação acadêmica',
    'certcat.courses':'// Cursos & Certificações',
    'cert.eng.title':'Engenharia de Software — Bacharelado',
    'cert.eng.issuer':'UniGOIÁS · Goiânia, GO',
    'cert.google.title':'Crash Course on Python','cert.google.level':'Concluído · 2025',
    'cert.mate.title':'JavaScript Essentials','cert.mate.level':'Concluído · 2026',
    'contact.title':'Contato','contact.heading':'Vamos conversar.',
    'contact.p1':'Atuo em engenharia de software, com foco em full stack, dados e cloud. Gosto de conversar sobre arquitetura, produtos digitais e projetos freelance.',
    'contact.p2':'Se quiser discutir um projeto ou simplesmente dizer olá, minha caixa de entrada está sempre aberta.',
    'contact.btn':'Enviar mensagem →',
    'form.name':'Nome','form.email':'E-mail','form.subject':'Assunto','form.message':'Mensagem','form.send':'Enviar mensagem','form.pendingNote':'Por enquanto, o envio abre seu cliente de e-mail. Você também pode escrever para joaopedroantuneslacerda@gmail.com.',
    'footer.built':'Desenhado & desenvolvido por',
    'footer.tagline':'Engenheiro de software — full stack, dados e cloud. Construindo produtos digitais que vão do banco ao navegador.',
    'footer.nav':'Navegação','footer.social':'Redes','footer.contact':'Contato',
    'footer.location':'Goiânia, Goiás — Brasil',
    'footer.rights':'© 2026 João Pedro. Todos os direitos reservados.',
    'footer.top':'Voltar ao topo',
  },
  en: {
    'nav.home':'Home','nav.about':'About','nav.exp':'Experience',
    'nav.proj':'Projects','nav.certs':'Certifications','nav.contact':'Contact','nav.resume':'Resume',
    'hero.role':'Software Engineer — Full Stack & Data',
    'hero.desc':'I build digital products in production: fast interfaces, consistent APIs and pipelines that turn data into decisions — from the database to the browser.',
    'hero.cta.work':'View live projects','hero.cta.contact':'Get in touch',
    'stat.projects':'Products in production','stat.langs':'Languages',
    'stat.award':'Laureate','stat.award.label':'Academic honours',
    'comp.kicker':'// expertise','comp.title':'Areas of expertise',
    'comp.lede':'Three connected fronts: the interface people use, the data that guides decisions and the infrastructure that sustains both.',
    'comp.fs.kicker':'Product engineering','comp.fs.title':'Full Stack',
    'comp.fs.desc':'Interfaces, APIs and complete products — from the database to the browser. Applications in production focused on performance, accessibility and code that is simple to maintain.',
    'comp.data.kicker':'Data engineering','comp.data.title':'Data & BI',
    'comp.data.desc':'ETL/ELT pipelines, dimensional modelling and dashboards that turn raw data into decisions — from public API ingestion to the presentation layer.',
    'comp.cloud.kicker':'Infrastructure & deployment','comp.cloud.title':'Cloud',
    'comp.cloud.desc':'Deployment, automation and reliability: isolated environments, continuous integration and delivery, and monitoring — without relying on manual release steps.',
    'reel.kicker':'// delivery','reel.line':'From the first commit to the product in operation.',
    'home.work.title':'// in production',
    'home.work.all':'See all projects',
    'home.work.barrachopp':'Institutional site',
    'home.work.meiflow':'Finance SaaS',
    'home.work.cerradowatch':'Environmental data',
    'home.work.brasilbid':'Public procurement',
    'about.title':'About',
    'about.p1':'I am a software engineer graduated from UniGOIÁS, laureate — the highest academic distinction awarded by the institution. I work where product and data meet: clear interfaces, well-designed APIs and reliable pipelines.',
    'about.p2':'I have shipped real products to production — from a financial management SaaS for solo entrepreneurs to institutional websites, public dashboards and environmental data pipelines. I like solving the whole problem, from database to browser, with code that is simple to maintain.',
    'about.p3':'Today my focus is <span class="text-cyan">full stack</span> and <span class="text-cyan">data engineering</span>, with a solid foundation in <span class="text-cyan">cloud and automation</span>. I work the full cycle — and ship.',
    'about.skills.title':'// technologies','about.edu.title':'// education','about.resume':'Download resume',
    'about.lang.title':'// languages',
    'about.lang.pt':'Portuguese','about.lang.pt.level':'Native',
    'about.lang.en':'English','about.lang.en.level':'Fluent',
    'about.lang.es':'Spanish','about.lang.es.level':'Advanced',
    'sk.fullstack':'Full Stack','sk.data':'Data & BI','sk.cloud':'Cloud',
    'edu.degree':'Bachelor of Software Engineering',
    'edu.school':'Centro Universitário de Goiás — UniGOIÁS · Goiânia, Brazil',
    'edu.status':'Graduated in 2026',
    'edu.laureate':'Laureate',
    'edu.laureate.desc':'Academic honours in Software Engineering — UniGOIÁS',
    'edu.laureate.note':'Highest academic standing — class of 2026',
    'exp.title':'Experience',
    'exp.tab0':'Rede Nilo','exp.tab1':'Gigabyte Soluções','exp.tab2':'Quiosque Barra Chopp',
    'exp.0.title':'IT Assistant','exp.0.company':'@ Rede Nilo Supermercados',
    'exp.0.period':'Sep 2026 — Present · Goiás, Brazil · Current role',
    'exp.0.b1':'Technical support and POS repair, diagnosing and resolving failures across stores.',
    'exp.0.b2':'Created database users and assigned roles and permissions in MySQL.',
    'exp.0.b3':'Analysis and manual correction of fiscal receipts.',
    'exp.0.b4':'Day-to-day operation and support of the TOTVS ERP.',
    'exp.0.b5':'Rollout and support of self checkouts.',
    'exp.0.b6':'Built internal tools and automations to improve efficiency and productivity.',
    'exp.1.title':'Software Development Intern','exp.1.company':'@ Gigabyte Soluções','exp.1.period':'Aug 2025 — Dec 2025 · Remote',
    'exp.1.b1':'Built a web module (HTML/CSS/JS + Python/FastAPI) integrated with the database of a legacy desktop ERP.',
    'exp.1.b2':'Wrote test plans, homologated applications and validated requirements before client delivery.',
    'exp.1.b3':'Produced technical documentation: user manuals, process specifications and support reports.',
    'exp.2.title':'Systems & Customer Service Operator','exp.2.company':'@ Quiosque Barra Chopp','exp.2.period':'Jan 2021 — Jan 2025 · Barra do Garças, Brazil',
    'exp.2.b1':'Operated an integrated management system (NooChef): created, updated and removed products directly in the database.',
    'exp.2.b2':'Issued electronic invoices (NF-e) and reconciled cash with system records.',
    'exp.2.b3':'Systematic inventory control with inbound, outbound and stock adjustment management.',
    'proj.title':'Projects in production','proj.featured':'Featured',
    'filter.all':'All','filter.fs':'Full Stack','filter.data':'Data',
    'proj.barrachopp.title':'BarraChopp — Institutional Site',
    'proj.barrachopp.desc':'Institutional website for Barra Chopp, presenting the venue, menu, draft beer kit and direct WhatsApp contact. A complete end-to-end project: design, front-end and deployment.',
    'proj.meiflow.title':'MEIFlow — Financial Management SaaS for Solo Entrepreneurs',
    'proj.meiflow.desc':'Multi-tenant SaaS for Brazil\'s 15 million solo entrepreneurs. Financial dashboard with automatic categorization, Receita Federal CNPJ validation, annual limit monitoring and DAS notifications through an async queue.',
    'proj.cerradowatch.title':'CerradoWatch — Environmental Data ETL Pipeline',
    'proj.cerradowatch.desc':'ETL pipeline ingesting wildfire, deforestation and weather data from public APIs (INPE, NASA FIRMS, INMET), transforming with dbt and serving an interactive dashboard via Streamlit. Weekly orchestration with GitHub Actions.',
    'proj.brasilibid.title':'BrasilBid — Public Procurement Monitor',
    'proj.brasilibid.desc':'ETL pipeline ingesting public procurement data from PNCP\'s official API, loading into PostgreSQL, transforming with dbt and serving an interactive Streamlit app. Over R$ 8 billion in monitored contracts across 27 states and 1,400+ public agencies.',
    'proj.saudebr.title':'SaúdeBR — Public Health Intelligence Dashboard',
    'proj.saudebr.desc':'Python pipeline consuming DATASUS/OpenDataSUS APIs — hospitalizations by ICD-10, mortality by state and beds by municipality — with cleaning and loading into a PostgreSQL Star Schema. Power BI report with heat maps and rates per 100k inhabitants.',
    'certs.title':'Certifications',
    'certcat.edu':'// academic background',
    'certcat.courses':'// Courses & Certifications',
    'cert.eng.title':'Software Engineering — Bachelor\'s degree',
    'cert.eng.issuer':'UniGOIÁS · Goiânia, Brazil',
    'cert.google.title':'Crash Course on Python','cert.google.level':'Completed · 2025',
    'cert.mate.title':'JavaScript Essentials','cert.mate.level':'Completed · 2026',
    'contact.title':'Contact','contact.heading':"Let's talk.",
    'contact.p1':'I work in software engineering, focused on full stack, data and cloud. I enjoy talking about architecture, digital products and freelance projects.',
    'contact.p2':'If you want to discuss a project or just say hi, my inbox is always open.',
    'contact.btn':'Send message →',
    'form.name':'Name','form.email':'Email','form.subject':'Subject','form.message':'Message','form.send':'Send message','form.pendingNote':'For now, submission opens your email client. You can also write to joaopedroantuneslacerda@gmail.com.',
    'footer.built':'Designed & built by',
    'footer.tagline':'Software engineer — full stack, data and cloud. Building digital products from the database to the browser.',
    'footer.nav':'Navigation','footer.social':'Social','footer.contact':'Contact',
    'footer.location':'Goiânia, Goiás — Brazil',
    'footer.rights':'© 2026 João Pedro. All rights reserved.',
    'footer.top':'Back to top',
  }
};

// ── Language Engine ────────────────────────────────────
const BR_TIMEZONES = new Set([
  'America/Sao_Paulo', 'America/Bahia', 'America/Fortaleza', 'America/Recife',
  'America/Belem', 'America/Manaus', 'America/Cuiaba', 'America/Campo_Grande',
  'America/Porto_Velho', 'America/Rio_Branco', 'America/Noronha',
  'America/Araguaina', 'America/Maceio', 'America/Santarem', 'America/Boa_Vista',
  'America/Eirunepe'
]);

function getStoredLang() {
  try { return localStorage.getItem('jl_lang'); } catch (e) { return null; }
}

function storeLang(lang) {
  try { localStorage.setItem('jl_lang', lang); } catch (e) { /* private mode */ }
}

function detectLang() {
  let timezone = '';
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  } catch (e) { timezone = ''; }

  if (timezone && timezone !== 'UTC' && !timezone.startsWith('Etc/')) {
    return BR_TIMEZONES.has(timezone) ? 'pt' : 'en';
  }

  const language = (navigator.language || '').toLowerCase();
  return language === 'pt-br' ? 'pt' : 'en';
}

const storedLang = getStoredLang();
let currentLang = storedLang === 'pt' || storedLang === 'en' ? storedLang : detectLang();

const pageTitles = {
  home: { pt: 'João Pedro — Engenheiro de Software Full Stack & Dados', en: 'João Pedro — Full Stack & Data Engineer' },
  about: { pt: 'Sobre — João Pedro', en: 'About — João Pedro' },
  exp: { pt: 'Experiência — João Pedro', en: 'Experience — João Pedro' },
  proj: { pt: 'Projetos — João Pedro', en: 'Projects — João Pedro' },
  certs: { pt: 'Certificações — João Pedro', en: 'Certifications — João Pedro' },
  contact: { pt: 'Contato — João Pedro', en: 'Contact — João Pedro' }
};

function applyLang(lang, persist = false) {
  currentLang = lang;
  if (persist) storeLang(lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  const titles = pageTitles[document.body.dataset.page];
  if (titles && titles[lang]) document.title = titles[lang];

  // Resume link follows the site language (PT -> resume.pdf, EN -> resume-en.pdf)
  document.querySelectorAll('a[href="resume.pdf"], a[href="resume-en.pdf"]').forEach(a => {
    a.setAttribute('href', lang === 'en' ? 'resume-en.pdf' : 'resume.pdf');
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = i18n[lang][key];
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    const val = i18n[lang][key];
    if (val !== undefined) el.innerHTML = val;
  });

  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', () => applyLang(currentLang === 'pt' ? 'en' : 'pt', true));
  }
  if (currentLang !== 'pt') applyLang(currentLang);
  else {
    // Just mark lang opts
    document.querySelectorAll('.lang-opt').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === 'pt');
    });
  }
});

// ── Scroll engine: reversible, scroll-linked motion ────
(function initScrollEngine() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  const panels = [...document.querySelectorAll('[data-scroll-panel]')];
  let raf = 0;

  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  const update = () => {
    raf = 0;
    const vh = innerHeight || 1;
    const max = root.scrollHeight - vh;

    root.style.setProperty('--scroll', max > 0 ? clamp(scrollY / max, 0, 1).toFixed(4) : '0');

    panels.forEach(panel => {
      const r = panel.getBoundingClientRect();
      // p: 0 → panel entering from below, 1 → panel fully past the top.
      const p = clamp((vh - r.top) / (r.height + vh), 0, 1);
      // e: 1 when the panel is centred in the viewport, 0 at the edges.
      const dist = Math.abs(r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      const e = Math.max(0, 1 - dist * dist);
      // c: −1 … 1 offset of the panel centre from the viewport centre.
      const c = clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1);

      panel.style.setProperty('--p', p.toFixed(4));
      panel.style.setProperty('--e', e.toFixed(4));
      panel.style.setProperty('--c', c.toFixed(4));
    });
  };

  const request = () => { if (!raf) raf = requestAnimationFrame(update); };
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request, { passive: true });
  update();
})();

// ── Ambient constellation ──────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  if (reduce || coarse || innerWidth < 768) { canvas.style.display = 'none'; return; }

  const ctx = canvas.getContext('2d');
  const INK = '10,10,12';
  const ACCENT = '27,59,255';
  const dpr = Math.min(devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  let particles = [];
  const mouse = { x: -9999, y: -9999, active: false };

  function makeParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.16,
      vy: (Math.random() - 0.5) * 0.16,
      r: Math.random() * 0.9 + 0.6,
      a: Math.random() * 0.22 + 0.12,
      pulse: Math.random() * Math.PI * 2
    };
  }

  function resize() {
    W = innerWidth; H = innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(Math.max(Math.floor((W * H) / 36000), 16), 42);
    particles = Array.from({ length: count }, makeParticle);
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.pulse += 0.012;
      if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
      if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${INK},${(1 - d / 130) * 0.05})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      if (mouse.active) {
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (md < 170) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${ACCENT},${(1 - md / 170) * 0.16})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      const alpha = p.a * (0.7 + 0.3 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${INK},${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }

  resize();
  frame();
  addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; }, { passive: true });
  addEventListener('mouseout', () => { mouse.active = false; }, { passive: true });
  let rt;
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 180); }, { passive: true });
})();

// ── Nav: scroll state, mobile drawer, active page ──────
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const reelSection = document.querySelector('.showreel');
  let lastY = scrollY;

  const onScroll = () => {
    const y = scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 24);
    const menuOpen = links && links.classList.contains('open');
    const reelRect = reelSection ? reelSection.getBoundingClientRect() : null;
    const reelVisible = !!reelRect && reelRect.top < innerHeight && reelRect.bottom > 0;
    if (nav && !menuOpen && !reelVisible && y > 380 && y > lastY + 2) nav.classList.add('is-hidden');
    else if (nav) nav.classList.remove('is-hidden');
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    if (!links || !toggle) return;
    links.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  };

  if (toggle && links) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
    addEventListener('resize', () => { if (innerWidth > 768) setMenu(false); }, { passive: true });
  }

  // Active nav link
  const page = document.body.dataset.page;
  const pageMap = {home:'index.html',about:'sobre.html',exp:'experiencia.html',proj:'projetos.html',certs:'certificacoes.html',contact:'contato.html'};
  const activeFile = pageMap[page];
  if (activeFile) {
    document.querySelectorAll('.nav-link').forEach(a => {
      const isActive = a.getAttribute('href') === activeFile;
      a.classList.toggle('active', isActive);
      if (isActive) a.setAttribute('aria-current', 'page');
    });
  }
});

// ── Scroll reveal (plays forward and in reverse) ───────
document.addEventListener('DOMContentLoaded', () => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Give inner groups their own staggered entrance.
  document.querySelectorAll('.skill-cat, .edu-item, .cert-card, .cert-card-link, .contact-info-item, .form-group, .lang-row')
    .forEach(el => { if (!el.classList.contains('fade-in')) el.classList.add('fade-in'); });

  const els = [...document.querySelectorAll('.fade-in')];
  if (!els.length) return;

  if (reduce || !('IntersectionObserver' in window)) return;

  els.forEach(el => {
    const siblings = [...(el.parentElement?.querySelectorAll('.fade-in') || [])];
    const idx = Math.max(0, siblings.indexOf(el));
    el.style.setProperty('--reveal-delay', Math.min(idx * 60, 360) + 'ms');
    el.classList.add('is-pending');
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      el.classList.toggle('is-in', entry.isIntersecting);
      el.classList.toggle('is-pending', !entry.isIntersecting);
    });
  }, { threshold: 0.08, rootMargin: '-2% 0px -6% 0px' });

  els.forEach(el => obs.observe(el));
});

// ── Counters (count up on view, reset on exit) ─────────
document.addEventListener('DOMContentLoaded', () => {
  const nums = [...document.querySelectorAll('.stat-num[data-target]')];
  if (!nums.length) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.querySelector('.hero') || document.body;

  const run = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    cancelAnimationFrame(el._raf);
    if (reduce) { el.textContent = String(target); return; }
    const start = performance.now();
    const dur = 1100;
    const step = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  };

  const reset = (el) => {
    cancelAnimationFrame(el._raf);
    el.textContent = '0';
  };

  if (!('IntersectionObserver' in window)) { nums.forEach(run); return; }

  let onScreen = null;
  new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    if (visible === onScreen) return;
    onScreen = visible;
    nums.forEach(visible ? run : reset);
  }, { threshold: 0.3 }).observe(hero);
});

// ── Project filters ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const filters = document.querySelectorAll('.proj-filter');
  if (!filters.length) return;
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.featured-project, .project-card').forEach(card => {
        const show = f === 'all' || card.dataset.category === f;
        card.classList.remove('is-filter-in');
        card.style.display = show ? '' : 'none';
        if (show) {
          void card.offsetWidth;
          card.classList.add('is-filter-in');
          setTimeout(() => card.classList.remove('is-filter-in'), 620);
        }
      });
    });
  });
});

// ── Photo fallback ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.profile-photo').forEach(img => {
    img.addEventListener('error', () => img.classList.add('hidden'));
  });
});

// ── Custom cursor (fine pointers only) ─────────────────
(function initCursor() {
  if (matchMedia('(pointer: coarse)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(dot, ring);
  document.documentElement.classList.add('has-cursor');
  dot.classList.add('is-hidden');
  ring.classList.add('is-hidden');

  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;

  let started = false;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    if (!started) {
      started = true;
      rx = mx; ry = my;
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    }
  }, { passive: true });

  (function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  })();

  const hoverables = 'a, button, .comp-panel, .comp-tech li, .project-card, .cert-card, .cert-card-link, .proj-filter';
  const viewables = '.fp-image';

  document.addEventListener('pointerover', e => {
    const target = e.target;
    if (!target || !target.closest) return;
    const isField = !!target.closest('input, textarea, select');
    const isView = !!target.closest(viewables);
    const isHover = !!target.closest(hoverables);

    document.documentElement.classList.toggle('is-text-field', isField);
    ring.classList.toggle('is-view', isView);
    ring.classList.toggle('is-hover', isHover && !isView);
    dot.classList.toggle('is-hidden', isView || isField);
    dot.classList.toggle('is-hover', isHover && !isView);
  });
  addEventListener('mousedown', () => ring.classList.add('is-down'));
  addEventListener('mouseup', () => ring.classList.remove('is-down'));
  document.documentElement.addEventListener('mouseleave', () => {
    dot.classList.add('is-hidden');
    ring.classList.add('is-hidden');
  });
  document.documentElement.addEventListener('mouseenter', () => {
    dot.classList.remove('is-hidden');
    ring.classList.remove('is-hidden');
  });
})();

// ── Scroll progress bar ────────────────────────────────
(function() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', () => {
    const pct = (scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, {passive: true});
})();

// ── Page curtain (bands) + hero entrance ──────────────
(function initCurtain() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const BANDS = 6;

  const curtain = document.createElement('div');
  curtain.className = 'page-curtain';
  curtain.setAttribute('aria-hidden', 'true');
  curtain.style.setProperty('--n', String(BANDS));

  const bandWrap = document.createElement('div');
  bandWrap.className = 'page-curtain__bands';
  for (let i = 0; i < BANDS; i++) {
    const band = document.createElement('span');
    band.className = 'page-curtain__band';
    band.style.setProperty('--i', String(i));
    band.style.top = ((i * 100) / BANDS) + '%';
    bandWrap.appendChild(band);
  }

  const mark = document.createElement('span');
  mark.className = 'page-curtain__mark';
  mark.innerHTML = 'JP<span>.</span>';

  curtain.append(bandWrap, mark);
  document.body.prepend(curtain);

  const heroText = document.querySelector('.hero-text');
  const heroName = document.querySelector('.hero-name');

  // Masked per-character reveal for the name (no data-i18n on it).
  // Words stay together so no artificial gaps appear between them.
  if (heroName && !reduce) {
    const textNode = [...heroName.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
    if (textNode) {
      const frag = document.createDocumentFragment();
      let i = 0;
      textNode.textContent.trim().split(/(\s+)/).forEach(chunk => {
        if (!chunk) return;
        if (/^\s+$/.test(chunk)) {
          frag.appendChild(document.createTextNode(' '));
          return;
        }
        const word = document.createElement('span');
        word.className = 'word';
        chunk.split('').forEach(ch => {
          const mask = document.createElement('span');
          mask.className = 'char-mask';
          const inner = document.createElement('span');
          inner.className = 'char';
          inner.style.transitionDelay = (110 + i * 34) + 'ms';
          inner.textContent = ch;
          mask.appendChild(inner);
          word.appendChild(mask);
          i++;
        });
        frag.appendChild(word);
      });
      textNode.replaceWith(frag);
    }
  }

  if (heroText && !reduce) heroText.classList.add('hero-anim');

  let fired = false;
  const reveal = () => {
    if (fired) return;
    fired = true;
    document.body.classList.add('is-ready');
    if (heroText) heroText.classList.add('is-ready');
    if (heroName) heroName.classList.add('chars-in');
    curtain.classList.add('is-lifting');
  };

  let booted = false;
  const boot = () => {
    if (booted) return;
    booted = true;
    setTimeout(reveal, reduce ? 0 : 140);
  };

  if (document.readyState === 'loading') {
    addEventListener('DOMContentLoaded', () => setTimeout(boot, 500), { once: true });
  } else {
    setTimeout(boot, 500);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(boot).catch(() => {});
  }
  setTimeout(boot, 1600); // safety net
})();

// ── Showreel: scroll-scrubbed video ────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const reel = document.querySelector('[data-showreel]');
  const section = document.querySelector('.showreel');
  if (!reel || !section) return;

  reel.pause();
  reel.removeAttribute('autoplay');

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try { reel.currentTime = 0; } catch (e) {}
    return;
  }

  const frame = section.querySelector('.showreel__frame');
  let duration = 0;
  let stickyTop = 0;

  function readDuration() {
    duration = Number.isFinite(reel.duration) ? reel.duration : 0;
  }

  function readStickyTop() {
    stickyTop = frame ? (parseFloat(getComputedStyle(frame).top) || 0) : 0;
  }

  function update() {
    if (!duration || !frame) return;

    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;

    const travel = section.offsetHeight - frame.offsetHeight;
    if (travel <= 0) return;

    const progress = Math.min(1, Math.max(0, (stickyTop - rect.top) / travel));
    const time = Math.min(progress * duration, duration - 0.05);

    if (Math.abs(reel.currentTime - time) > 0.02) {
      try { reel.currentTime = time; } catch (e) {}
    }
  }

  readDuration();
  readStickyTop();
  ['loadedmetadata', 'loadeddata', 'canplay'].forEach((evt) => {
    reel.addEventListener(evt, () => { readDuration(); update(); });
  });
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', () => { readStickyTop(); update(); }, { passive: true });
  update();
});

// ── Hero portrait parallax ─────────────────────────────
(function initParallax() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const wrap = document.querySelector('.hero-photo-wrap');
  if (!wrap) return;
  let raf = 0;
  const update = () => {
    raf = 0;
    const y = Math.min(scrollY, 900);
    wrap.style.transform = `translateY(${y * -0.045}px)`;
  };
  addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(update);
  }, { passive: true });
})();

// ── Page transitions between internal pages ────────────
document.addEventListener('click', e => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = e.target.closest('a');
  if (!link) return;
  const href = link.getAttribute('href');
  if (!href || link.target === '_blank' || link.hasAttribute('download')) return;
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return;
  if (!/\.html(\?|#|$)/.test(href)) return;

  e.preventDefault();
  document.body.classList.add('is-leaving');
  const curtain = document.querySelector('.page-curtain');
  if (curtain) curtain.classList.remove('is-lifting');
  setTimeout(() => { location.href = href; }, 760);
});

// ── Restore cleanly from the back/forward cache ────────
addEventListener('pageshow', (e) => {
  if (!e.persisted) return;
  document.body.classList.remove('is-leaving', 'menu-open');
  const curtain = document.querySelector('.page-curtain');
  if (curtain) {
    curtain.classList.add('is-instant');
    curtain.classList.add('is-lifting');
    requestAnimationFrame(() => curtain.classList.remove('is-instant'));
  }
  document.body.classList.add('is-ready');
});

// ── Console easter egg ─────────────────────────────────
console.log('%c┌──────────────────────────────────────┐\n│  João Pedro · joaolacerda.dev        │\n│  Full Stack · Dados · Cloud          │\n└──────────────────────────────────────┘', 'color:#1b3bff;font-family:monospace;font-size:13px');
console.log('%cOlá! Curioso(a) sobre o código? 👋\njoaopedroantuneslacerda@gmail.com', 'color:#6b6b74;font-family:monospace;font-size:11px');

// ── Magnetic buttons (desktop only) ────────────────────
(function initMagnetic() {
  if (matchMedia('(pointer: coarse)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.btn, .nav-resume-btn').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `translate(${x * 9}px, ${y * 7}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
})();

// ── Contact form ───────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form || form.dataset.pending !== 'true') return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#name')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const subject = form.querySelector('#subject')?.value || 'Contato pelo site';
    const message = form.querySelector('#message')?.value || '';
    const body = `From: ${name} (${email})\n\n${message}`;
    const mailtoUrl = `mailto:joaopedroantuneslacerda@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'pt';
    const msg = lang === 'pt'
      ? 'Seu cliente de e-mail foi aberto. Você também pode escrever diretamente para'
      : 'Your email client was opened. You can also write directly to';
    const sub = 'joaopedroantuneslacerda@gmail.com';
    form.innerHTML = `<div class="form-success"><div class="form-success-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></div><div class="form-success-text"><span class="text-cyan">${msg}</span></div><div class="form-success-email">${sub}</div></div>`;
  });
});







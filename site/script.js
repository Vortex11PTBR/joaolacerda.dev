/* =====================================================
   JOAOLACERDA.DEV — Shared Script v2
   i18n · Particles · Nav · Animations
   ===================================================== */

// ── i18n Translations ─────────────────────────────────
const i18n = {
  pt: {
    'nav.home':'Início','nav.about':'Sobre','nav.exp':'Experiência',
    'nav.proj':'Projetos','nav.certs':'Certificações','nav.contact':'Contato','nav.resume':'Currículo',
    'hero.greeting':'~/joaolacerda',
    'hero.desc':'Construo sistemas que escalam, analiso dados que geram insights e desenvolvo arquiteturas seguras — do front-end ao servidor, da pipeline ao modelo, da aplicação à defesa.',
    'hero.cta.work':'Ver Projetos','hero.cta.contact':'Falar Comigo',
    'stat.years':'Anos de Experiência','stat.projects':'Projetos Entregues','stat.users':'Usuários Atendidos',
    'areas.title':'// áreas de atuação',
    'area.fullstack':'Full Stack','area.fullstack.desc':'React, Node.js, TypeScript, APIs REST & GraphQL, bancos relacionais e NoSQL.',
    'area.data':'Dados & BI','area.data.desc':'Pipelines ETL/ELT, Spark, Airflow, dbt, modelagem dimensional e dashboards.',
    'area.security':'Cibersegurança','area.security.desc':'OWASP, pentest, hardening, análise de vulnerabilidades e resposta a incidentes.',
    'area.cloud':'Cloud & DevOps','area.cloud.desc':'AWS, GCP, Kubernetes, Terraform, CI/CD e arquiteturas de alta disponibilidade.',
    'about.title':'Sobre Mim',
    'about.p1':'Olá, sou o João — engenheiro de software apaixonado por construir sistemas que escalam, dados que geram valor e arquiteturas que protegem.',
    'about.p2':'Tive o privilégio de contribuir com startups em hipercrescimento e empresas consolidadas, construindo produtos que processam milhões de transações e servem audiências globais.',
    'about.p3':'Atualmente exploro a interseção entre desenvolvimento full stack, engenharia de dados e cibersegurança.',
    'about.skills.title':'// tecnologias','about.edu.title':'// formação','about.resume':'⬇ Baixar Currículo','about.lang.title':'// idiomas','about.lang.pt':'Português','about.lang.pt.level':'Nativo','about.lang.en':'Inglês','about.lang.en.level':'Avançado (C1)',
    'sk.fullstack':'Full Stack','sk.data':'Dados','sk.security':'Segurança','sk.cloud':'Cloud & DevOps',
    'edu.degree':'Bacharelado em Ciência da Computação','edu.school':'Universidade — Goiânia, Brasil',
    'exp.title':'Experiência','exp.tab0':'Empresa A','exp.tab1':'Empresa B','exp.tab2':'Empresa C','exp.tab3':'Empresa D',
    'exp.0.title':'Engenheiro de Software Sênior','exp.0.company':'@ Empresa A','exp.0.period':'Jan 2023 — Presente',
    'exp.0.b1':'Arquitetei e liderai a migração de sistema monolítico para microsserviços, reduzindo latência p99 em 60% e custos de infraestrutura em 35%.',
    'exp.0.b2':'Projetei pipeline de event-streaming distribuído processando 2M+ eventos/dia usando Kafka e Go, habilitando dashboards analíticos em tempo real.',
    'exp.0.b3':'Liderei equipe multifuncional de 8 engenheiros, estabelecendo padrões de engenharia e cultura de code review.',
    'exp.0.b4':'Implementei comunicação inter-serviço via gRPC, melhorando o throughput em 4× sobre REST para serviços internos.',
    'exp.1.title':'Engenheiro de Software II','exp.1.company':'@ Empresa B','exp.1.period':'Mar 2021 — Dez 2022',
    'exp.1.b1':'Construí API gateway de alta disponibilidade suportando 50K req/s, com circuit breakers e rate limiting.',
    'exp.1.b2':'Desenvolvi ferramentas de plataforma interna que reduziram o tempo de deploy de 45 minutos para menos de 5 minutos.',
    'exp.1.b3':'Colaborei com SRE para alcançar 99,95% de uptime nos serviços core.',
    'exp.1.b4':'Mentoreei 3 engenheiros juniores por meio de 1:1s estruturados e sessões de pair programming.',
    'exp.2.title':'Engenheiro de Software','exp.2.company':'@ Empresa C','exp.2.period':'Jun 2019 — Fev 2021',
    'exp.2.b1':'Entreguei features full stack para produto SaaS com 300K+ usuários usando React e Node.js.',
    'exp.2.b2':'Implementei suíte de testes E2E (Playwright) que capturou 30+ regressões antes de deploys.',
    'exp.2.b3':'Reformulei sistema de autenticação para suportar OAuth 2.0 e SAML SSO.',
    'exp.2.b4':'Contribuí para bibliotecas open source e documentação técnica usada em toda a organização.',
    'exp.3.title':'Engenheiro de Software Júnior','exp.3.company':'@ Empresa D','exp.3.period':'Jan 2018 — Mai 2019',
    'exp.3.b1':'Desenvolvi APIs RESTful e mantive serviços backend em Java/Spring Boot para plataforma fintech.',
    'exp.3.b2':'Escrevi testes unitários e de integração atingindo 85%+ de cobertura em módulos de pagamentos.',
    'exp.3.b3':'Participei de time Agile/Scrum, contribuindo para sprints, retrospectivas e design docs.',
    'proj.title':'Projetos','proj.featured':'Destaque','proj.other':'// outros projetos',
    'filter.all':'Todos','filter.fs':'Full Stack','filter.data':'Dados','filter.sec':'Segurança','filter.cloud':'Cloud',
    'proj.meiflow.title':'MEIFlow — SaaS de Gestão Financeira para MEIs',
    'proj.meiflow.desc':'SaaS multi-tenant para os 15 milhões de MEIs brasileiros. Dashboard financeiro com categorização automática via IA (Claude API), integração com a Receita Federal, monitoramento do limite de R$ 81 mil e notificações de DAS via fila assíncrona BullMQ.',
    'proj.olympic.title':'Olympic Data ETL — Pipeline Cloud End-to-End',
    'proj.olympic.desc':'Pipeline de produção que transforma dados olímpicos usando Apache Beam, BigQuery e Terraform. 10+ anos de dados em <5 min, dashboards em tempo real e 99.5% uptime.',
    'proj.streaming.title':'GitHub Streaming Analytics — Kafka + Spark',
    'proj.streaming.desc':'Pipeline de streaming que ingere GitHub Events via Kafka, processa com Spark Structured Streaming e persiste métricas em Parquet para dashboards.',
    'proj.ai.title':'AI SaaS Tool — Resumidor com Indexação Semântica',
    'proj.ai.desc':'SaaS completo: FastAPI + LLMs (Groq/LangChain), Next.js, upload e indexação com ChromaDB, auth com Clerk e pagamentos com Stripe.',
    'certs.title':'Certificações',
    'certcat.cloud':'// Cloud & Infra','certcat.data':'// Dados & IA','certcat.sec':'// Cibersegurança',
    'cert.saa.title':'AWS Certified Solutions Architect','cert.saa.level':'Professional · 2023',
    'cert.cka.title':'Certified Kubernetes Administrator',
    'cert.tf.title':'HashiCorp Certified: Terraform Associate','cert.tf.level':'Associate · 2023',
    'cert.gcp.title':'Google Cloud Professional Data Engineer','cert.gcp.level':'Professional · 2022',
    'cert.dbt.title':'dbt Analytics Engineering Certification',
    'cert.ceh.title':'Certified Ethical Hacker (CEH)',
    'cert.sc200.title':'Microsoft Security Operations Analyst',
    'contact.title':'Contato','contact.heading':'Vamos conversar.',
    'contact.p1':'Estou aberto a novas oportunidades — posição sênior em engenharia, liderança técnica ou consultoria em full stack, dados e segurança.',
    'contact.p2':'Se quiser discutir um projeto ou simplesmente dizer olá — minha caixa de entrada está sempre aberta.',
    'contact.btn':'Enviar Mensagem →',
    'form.name':'Nome','form.email':'E-mail','form.subject':'Assunto','form.message':'Mensagem','form.send':'Enviar Mensagem',
    'footer.built':'Desenhado & desenvolvido por',
  },
  en: {
    'nav.home':'Home','nav.about':'About','nav.exp':'Experience',
    'nav.proj':'Projects','nav.certs':'Certifications','nav.contact':'Contact','nav.resume':'Resume',
    'hero.greeting':'~/joaolacerda',
    'hero.desc':'I build systems that scale, analyze data that generates insights, and develop secure architectures — from front-end to server, from pipeline to model, from application to defense.',
    'hero.cta.work':'View Projects','hero.cta.contact':'Get In Touch',
    'stat.years':'Years Experience','stat.projects':'Projects Shipped','stat.users':'Users Reached',
    'areas.title':'// areas of expertise',
    'area.fullstack':'Full Stack','area.fullstack.desc':'React, Node.js, TypeScript, REST & GraphQL APIs, relational and NoSQL databases.',
    'area.data':'Data & BI','area.data.desc':'ETL/ELT pipelines, Spark, Airflow, dbt, dimensional modeling, and dashboards.',
    'area.security':'Cybersecurity','area.security.desc':'OWASP, pentesting, hardening, vulnerability analysis, and incident response.',
    'area.cloud':'Cloud & DevOps','area.cloud.desc':'AWS, GCP, Kubernetes, Terraform, CI/CD and high-availability architectures.',
    'about.title':'About Me',
    'about.p1':'Hi, I am João — a software engineer passionate about building systems that scale, data that generates value, and architectures that protect.',
    'about.p2':'I have had the privilege of contributing to hypergrowth startups and established companies, building products that process millions of transactions and serve global audiences.',
    'about.p3':'I currently explore the intersection of full stack development, data engineering, and cybersecurity.',
    'about.skills.title':'// technologies','about.edu.title':'// education','about.resume':'⬇ Download Resume','about.lang.title':'// languages','about.lang.pt':'Portuguese','about.lang.pt.level':'Native','about.lang.en':'English','about.lang.en.level':'Advanced (C1)',
    'sk.fullstack':'Full Stack','sk.data':'Data','sk.security':'Security','sk.cloud':'Cloud & DevOps',
    'edu.degree':'Bachelor in Computer Science','edu.school':'University — Goiânia, Brazil',
    'exp.title':'Experience','exp.tab0':'Company A','exp.tab1':'Company B','exp.tab2':'Company C','exp.tab3':'Company D',
    'exp.0.title':'Senior Software Engineer','exp.0.company':'@ Company A','exp.0.period':'Jan 2023 — Present',
    'exp.0.b1':'Architected and led the migration from monolith to microservices, reducing p99 latency by 60% and infrastructure costs by 35%.',
    'exp.0.b2':'Designed distributed event-streaming pipeline processing 2M+ events/day using Kafka and Go, enabling real-time analytics dashboards.',
    'exp.0.b3':'Led a cross-functional team of 8 engineers, establishing engineering standards and code review culture.',
    'exp.0.b4':'Implemented gRPC inter-service communication, improving throughput 4× over REST for internal services.',
    'exp.1.title':'Software Engineer II','exp.1.company':'@ Company B','exp.1.period':'Mar 2021 — Dec 2022',
    'exp.1.b1':'Built high-availability API gateway handling 50K+ req/s with circuit breakers and rate limiting.',
    'exp.1.b2':'Developed internal platform tools that reduced service deploy time from 45 minutes to under 5 minutes.',
    'exp.1.b3':'Collaborated with SRE team to achieve 99.95% uptime for core services.',
    'exp.1.b4':'Mentored 3 junior engineers through structured 1:1s and pair programming sessions.',
    'exp.2.title':'Software Engineer','exp.2.company':'@ Company C','exp.2.period':'Jun 2019 — Feb 2021',
    'exp.2.b1':'Delivered full-stack features for a SaaS product with 300K+ users using React and Node.js.',
    'exp.2.b2':'Implemented E2E test suite (Playwright) that caught 30+ regressions before production deploys.',
    'exp.2.b3':'Revamped auth system to support OAuth 2.0 and SAML SSO, enabling enterprise onboarding.',
    'exp.2.b4':'Contributed to open-source libraries and technical documentation used across the org.',
    'exp.3.title':'Junior Software Engineer','exp.3.company':'@ Company D','exp.3.period':'Jan 2018 — May 2019',
    'exp.3.b1':'Developed RESTful APIs and maintained Java/Spring Boot backend services for a fintech platform.',
    'exp.3.b2':'Wrote unit and integration tests achieving 85%+ coverage on critical payment modules.',
    'exp.3.b3':'Participated in Agile/Scrum team, contributing to sprint planning, retros and tech design docs.',
    'proj.title':'Projects','proj.featured':'Featured','proj.other':'// other projects',
    'filter.all':'All','filter.fs':'Full Stack','filter.data':'Data','filter.sec':'Security','filter.cloud':'Cloud',
    'proj.meiflow.title':'MEIFlow — Financial Management SaaS for Solo Entrepreneurs',
    'proj.meiflow.desc':'Multi-tenant SaaS for Brazil\'s 15 million solo entrepreneurs. Financial dashboard with AI-powered transaction categorization (Claude API), Receita Federal CNPJ integration, R$ 81k annual limit monitoring, and automated DAS email alerts via BullMQ async queue.',
    'proj.olympic.title':'Olympic Data ETL — End-to-End Cloud Pipeline',
    'proj.olympic.desc':'Production-grade pipeline that transforms Olympic Games data using Apache Beam, BigQuery and Terraform. 10+ years of data in <5 min, real-time dashboards and 99.5% uptime.',
    'proj.streaming.title':'GitHub Streaming Analytics — Kafka + Spark',
    'proj.streaming.desc':'Streaming pipeline that ingests GitHub Events via Kafka, processes with Spark Structured Streaming and persists metrics in Parquet for analytics dashboards.',
    'proj.ai.title':'AI SaaS Tool — Summarizer with Semantic Indexing',
    'proj.ai.desc':'Full SaaS app: FastAPI backend with LLMs (Groq/LangChain), Next.js frontend, document upload and indexing with ChromaDB, Clerk auth and Stripe payments.',
    'certs.title':'Certifications',
    'certcat.cloud':'// Cloud & Infra','certcat.data':'// Data & AI','certcat.sec':'// Cybersecurity',
    'cert.saa.title':'AWS Certified Solutions Architect','cert.saa.level':'Professional · 2023',
    'cert.cka.title':'Certified Kubernetes Administrator',
    'cert.tf.title':'HashiCorp Certified: Terraform Associate','cert.tf.level':'Associate · 2023',
    'cert.gcp.title':'Google Cloud Professional Data Engineer','cert.gcp.level':'Professional · 2022',
    'cert.dbt.title':'dbt Analytics Engineering Certification',
    'cert.ceh.title':'Certified Ethical Hacker (CEH)',
    'cert.sc200.title':'Microsoft Security Operations Analyst',
    'contact.title':'Contact','contact.heading':"Let's talk.",
    'contact.p1':'I am open to new opportunities — senior engineering roles, technical leadership, or consulting in full stack, data, and security.',
    'contact.p2':'If you want to discuss a project or just say hi — my inbox is always open.',
    'contact.btn':'Send Message →',
    'form.name':'Name','form.email':'Email','form.subject':'Subject','form.message':'Message','form.send':'Send Message',
    'footer.built':'Designed & built by',
  }
};

// ── Language Engine ────────────────────────────────────
let currentLang = localStorage.getItem('jl_lang') || 'pt';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('jl_lang', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = i18n[lang][key];
    if (val !== undefined) el.textContent = val;
  });
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === lang);
  });
  // Refresh typed phrases
  if (typeof restartTyping === 'function') restartTyping();
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('langToggle');
  if (toggle) {
    toggle.addEventListener('click', () => applyLang(currentLang === 'pt' ? 'en' : 'pt'));
  }
  if (currentLang !== 'pt') applyLang(currentLang);
  else {
    // Just mark lang opts
    document.querySelectorAll('.lang-opt').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === 'pt');
    });
  }
});

// ── Typed phrases per lang ─────────────────────────────
const typedPhrases = {
  pt: ['Desenvolvimento Full Stack.','Engenharia de Dados & BI.','Cibersegurança.','Cloud & DevOps.','Sistemas Distribuídos.'],
  en: ['Full Stack Development.','Data Engineering & BI.','Cybersecurity.','Cloud & DevOps.','Distributed Systems.']
};

let typedIdx = 0, charIdx = 0, deleting = false, paused = false, typedTimer = null;
function restartTyping() {
  clearTimeout(typedTimer);
  typedIdx = 0; charIdx = 0; deleting = false; paused = false;
  const el = document.getElementById('typed-text');
  if (el) { el.textContent = ''; tick(); }
}
function tick() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const phrases = typedPhrases[currentLang];
  const phrase = phrases[typedIdx];
  if (paused) { paused = false; typedTimer = setTimeout(tick, 1400); return; }
  if (!deleting) {
    el.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) { deleting = true; paused = true; typedTimer = setTimeout(tick, 20); return; }
  } else {
    el.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) { deleting = false; typedIdx = (typedIdx + 1) % phrases.length; }
  }
  typedTimer = setTimeout(tick, deleting ? 38 : 78);
}
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('typed-text')) setTimeout(tick, 600);
});

// ── Particle System ────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = innerWidth, H = innerHeight;
  canvas.width = W; canvas.height = H;
  const CYAN = '0,212,255', PURPLE = '124,58,237';
  const COUNT = Math.min(Math.floor((W * H) / 16000), 90);
  class P {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.size = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.color = Math.random() > 0.7 ? PURPLE : CYAN;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() { this.x += this.vx; this.y += this.vy; this.pulse += 0.02; if (this.y < -10) this.reset(); }
    draw() {
      const a = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${a})`; ctx.fill();
    }
  }
  const particles = Array.from({length: COUNT}, () => new P());
  function drawLines() {
    for (let i = 0; i < particles.length; i++)
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if (d < 120) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(${CYAN},${(1-d/120)*0.07})`; ctx.lineWidth=0.5; ctx.stroke(); }
      }
  }
  function animate() { ctx.clearRect(0,0,W,H); drawLines(); particles.forEach(p=>{p.update();p.draw();}); requestAnimationFrame(animate); }
  animate();
  addEventListener('resize', () => { W=innerWidth; H=innerHeight; canvas.width=W; canvas.height=H; }, {passive:true});
})();

// ── Nav: scroll + mobile toggle + active page ─────────
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', scrollY > 50);
  }, {passive:true});

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open'); toggle.classList.remove('open');
    }));
  }

  // Active nav link
  const page = document.body.dataset.page;
  const pageMap = {home:'index.html',about:'sobre.html',exp:'experiencia.html',proj:'projetos.html',certs:'certificacoes.html',contact:'contato.html'};
  const activeFile = pageMap[page];
  if (activeFile) {
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === activeFile);
    });
  }
});

// ── Fade-in on scroll ──────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = [...(entry.target.parentElement?.querySelectorAll('.fade-in') || [])];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08, rootMargin: '0px 0px -50px 0px'});
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
});

// ── Counters ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;
  let fired = false;
  const hero = document.querySelector('.hero') || document.body;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      setTimeout(() => nums.forEach(el => {
        const target = parseInt(el.dataset.target);
        let c = 0;
        const step = target / (1200 / 16);
        const t = setInterval(() => { c = Math.min(c + step, target); el.textContent = Math.floor(c); if (c >= target) clearInterval(t); }, 16);
      }), 500);
    }
  }, {threshold: 0.3}).observe(hero);
});

// ── Experience Tabs ────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.exp-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.exp-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.exp-panel[data-panel="${tab.dataset.tab}"]`)?.classList.add('active');
    });
  });
});

// ── Project Filters ────────────────────────────────────
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
        card.style.display = show ? '' : 'none';
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

// ── Cursor glow (desktop only) ─────────────────────────
(function() {
  if (matchMedia('(pointer:coarse)').matches) return;
  const g = document.createElement('div');
  g.style.cssText = 'position:fixed;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(0,212,255,0.035) 0%,transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);will-change:left,top;';
  document.body.appendChild(g);
  let mx=0,my=0,cx=0,cy=0;
  addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; }, {passive:true});
  (function loop() { cx+=(mx-cx)*.06; cy+=(my-cy)*.06; g.style.left=cx+'px'; g.style.top=cy+'px'; requestAnimationFrame(loop); })();
})();

// ── Console easter egg ─────────────────────────────────
console.log('%c┌──────────────────────────────────────┐\n│  João Lacerda · joaolacerda.dev      │\n│  Full Stack · Dados · Cibersegurança  │\n└──────────────────────────────────────┘', 'color:#00d4ff;font-family:monospace;font-size:13px');
console.log('%cOlá! Curioso(a) sobre o código? 👋\njoao@joaolacerda.dev', 'color:#94a3b8;font-family:monospace;font-size:11px');





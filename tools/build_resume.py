"""Gera os curriculos de 1 pagina (PT e EN) em layout ATS-friendly.

Uso:
    python tools/build_resume.py

Saida:
    site/resume.pdf     -> portugues
    site/resume-en.pdf  -> ingles

Layout: uma coluna, sem tabelas, datas na mesma linha do cargo,
fontes padrao (Helvetica/Times) e bullets com hifen.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)
from reportlab.platypus.flowables import Flowable

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "site"

EMAIL = "joaopedroantuneslacerda@gmail.com"
PHONE = "+55 66 98445-6613"
SITE_URL = "https://joaolacerda.dev"
LINKEDIN = "https://www.linkedin.com/in/jpalacerda/"
GITHUB = "https://github.com/Vortex11PTBR"

INK = colors.HexColor("#0a0a0c")
INK2 = colors.HexColor("#3a3a42")
MUTED = colors.HexColor("#6b6b74")
ACCENT = colors.HexColor("#1f4bff")
LINE = colors.HexColor("#d9d7cf")

registerFontFamily(
    "Helvetica",
    normal="Helvetica",
    bold="Helvetica-Bold",
    italic="Helvetica-Oblique",
    boldItalic="Helvetica-BoldOblique",
)
registerFontFamily(
    "Times",
    normal="Times-Roman",
    bold="Times-Bold",
    italic="Times-Italic",
    boldItalic="Times-BoldItalic",
)

st_name = ParagraphStyle("name", fontName="Times-Bold", fontSize=22, leading=24, textColor=INK)
st_role = ParagraphStyle(
    "role", fontName="Helvetica", fontSize=10.3, leading=13, textColor=ACCENT, spaceBefore=1
)
st_contact = ParagraphStyle(
    "contact", fontName="Helvetica", fontSize=8.1, leading=11, textColor=MUTED
)
st_avail = ParagraphStyle(
    "avail", fontName="Helvetica-Bold", fontSize=8.0, leading=11, textColor=ACCENT, spaceBefore=2
)
st_section = ParagraphStyle(
    "section", fontName="Helvetica-Bold", fontSize=8.1, leading=9.6, textColor=ACCENT
)
st_body = ParagraphStyle(
    "body", fontName="Helvetica", fontSize=9.3, leading=12.1, textColor=INK2
)
st_job = ParagraphStyle(
    "job", fontName="Helvetica", fontSize=9.5, leading=11.9, textColor=INK
)
st_bullet = ParagraphStyle(
    "bullet",
    fontName="Helvetica",
    fontSize=9.3,
    leading=11.9,
    textColor=INK2,
    leftIndent=9,
    firstLineIndent=-9,
)
st_project = ParagraphStyle(
    "project", fontName="Helvetica", fontSize=9.3, leading=11.9, textColor=INK2, spaceAfter=1.5
)

MARGIN_X = 15 * mm
MARGIN_Y = 12 * mm


def esc(text: str) -> str:
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def link(url: str, text: str) -> str:
    return f'<link href="{url}"><font color="#1f4bff">{esc(text)}</font></link>'


def section(title: str) -> list:
    return [
        Spacer(1, 8),
        Paragraph(title.upper(), st_section),
        HRFlowable(width="100%", thickness=0.6, color=LINE, spaceBefore=2, spaceAfter=5),
    ]


def job(title: str, company: str, period: str, bullets: list[str]) -> list[Flowable]:
    parts: list[Flowable] = [
        Paragraph(
            f"<b>{esc(title)}</b> — {esc(company)} "
            f'<font color="#6b6b74">| {esc(period)}</font>',
            st_job,
        )
    ]
    for bullet in bullets:
        parts.append(Paragraph("-  " + esc(bullet), st_bullet))
    parts.append(Spacer(1, 6))
    return [KeepTogether(parts)]


CONTENT = {
    "pt": {
        "title": "João Pedro Antunes Lacerda — Currículo",
        "subject": "Engenheiro de Software — Full Stack & Dados",
        "role": "Engenheiro de Software — Full Stack & Dados",
        "location": "Goiânia, Brasil",
        "availability": "Disponível para trabalho remoto e realocação",
        "summary": (
            "Engenheiro de software (bacharel, laureado) com experiência em produção em full "
            "stack e dados. Construo produtos de ponta a ponta com TypeScript/React, "
            "Python/FastAPI, PostgreSQL e dbt — do banco ao navegador. Criei um SaaS "
            "multi-tenant e produtos de dados públicos usados em escala nacional."
        ),
        "skills": [
            ("Linguagens", "Python, JavaScript, TypeScript, SQL"),
            ("Front-end", "React, Next.js, HTML/CSS"),
            ("Back-end", "Node.js, Fastify, FastAPI, REST APIs, Prisma"),
            ("Dados", "PostgreSQL, MySQL, Redis, dbt, Pandas, Power BI, DAX, Streamlit, ETL/ELT"),
            ("Cloud & DevOps", "Docker, GitHub Actions, CI/CD, Linux, Git"),
        ],
        "headings": {
            "summary": "Resumo",
            "skills": "Habilidades",
            "experience": "Experiência",
            "projects": "Projetos",
            "education": "Formação",
            "certs": "Certificações & Idiomas",
        },
        "jobs": [
            (
                "Assistente de TI",
                "Rede Nilo Supermercados, Barra do Garças, MT, Brasil",
                "Set 2026 – Presente",
                [
                    "Presto suporte L1/L2 a 80+ PDVs em 7 lojas, diagnosticando e resolvendo falhas de hardware e software.",
                    "Gerencio usuários, funções e permissões no MySQL para centenas de usuários; analiso e corrijo cupons fiscais.",
                    "Implanto e acompanho self checkouts e presto suporte ao ERP TOTVS em toda a rede de lojas.",
                    "Desenvolvo ferramentas e automações internas que reduzem trabalho manual e aumentam a eficiência nas 7 lojas.",
                ],
            ),
            (
                "Estagiário de Desenvolvimento de Software",
                "Gigabyte Soluções, Remoto",
                "Ago 2025 – Dez 2025",
                [
                    "Desenvolvi um módulo web (HTML/CSS/JS + Python/FastAPI) integrado ao banco de um ERP desktop legado.",
                    "Elaborei planos de teste e conduzi homologação de aplicações antes da entrega ao cliente.",
                    "Produzi manuais de usuário, especificações de processo e relatórios de suporte.",
                ],
            ),
            (
                "Operador de Sistema & Atendimento",
                "Quiosque Barra Chopp, Barra do Garças, Brasil",
                "Jan 2021 – Jan 2025",
                [
                    "Operei o sistema de gestão integrado (NooChef), mantendo os dados de produtos diretamente no banco.",
                    "Desenvolvi o site oficial do quiosque (barrachopp.com), do design ao deploy.",
                    "Realizei o atendimento ao público no dia a dia do quiosque.",
                ],
            ),
        ],
        "projects": [
            (
                "MEIFlow",
                (
                    "SaaS multi-tenant de finanças para 15M+ MEIs (Next.js/React, TypeScript, "
                    "Fastify/Node.js, PostgreSQL/Prisma, Redis, Docker). Categorização automática "
                    "de despesas com IA (Claude API), validação de CNPJ e alertas do limite de "
                    "R$ 81 mil; autenticação JWT, filas BullMQ e CI/CD."
                ),
            ),
            (
                "BrasilBid",
                (
                    "Pipeline ETL (API do PNCP para PostgreSQL/Neon, transformado com dbt) que "
                    "alimenta um dashboard público em Power BI com R$ 8 bi+ monitorados em 27 UFs "
                    "(26 estados + DF) e 1.400+ órgãos."
                ),
            ),
            (
                "CerradoWatch",
                (
                    "ETL ambiental (INPE/NASA FIRMS/INMET) com dbt e dashboard ao vivo em Streamlit, "
                    "orquestrado semanalmente via GitHub Actions."
                ),
            ),
            (
                "SaúdeBR",
                (
                    "Pipeline DATASUS/OpenDataSUS em Star Schema no PostgreSQL e relatório Power BI "
                    "de 3 visões com KPIs DAX por 100 mil habitantes."
                ),
            ),
            (
                "BarraChopp",
                (
                    "Site institucional (HTML/CSS/JS) desenhado, construído e publicado, com "
                    "cardápio, contato via WhatsApp e layout responsivo."
                ),
            ),
        ],
        "education": (
            "Bacharel em Engenharia de Software",
            "Centro Universitário de Goiás (UniGOIÁS), Goiânia · 2026",
            "Graduado com a mais alta distinção acadêmica (laureado).",
        ),
        "certs": "Google/Coursera — Crash Course on Python (2025); Mate Academy — JavaScript Essentials (2026)",
        "languages": "Idiomas: Português (nativo) · Inglês (fluente) · Espanhol (avançado)",
    },
    "en": {
        "title": "João Pedro Antunes Lacerda — Resume",
        "subject": "Software Engineer — Full Stack & Data",
        "role": "Software Engineer — Full Stack & Data",
        "location": "Goiânia, Brazil",
        "availability": "Open to remote work and relocation",
        "summary": (
            "Software engineer (B.S., highest academic honors) with production experience "
            "across full stack and data. I build end-to-end products with TypeScript/React, "
            "Python/FastAPI, PostgreSQL and dbt — from database to browser. Shipped a "
            "multi-tenant SaaS and public data products used at national scale."
        ),
        "skills": [
            ("Languages", "Python, JavaScript, TypeScript, SQL"),
            ("Front-end", "React, Next.js, HTML/CSS"),
            ("Back-end", "Node.js, Fastify, FastAPI, REST APIs, Prisma"),
            ("Data", "PostgreSQL, MySQL, Redis, dbt, Pandas, Power BI, DAX, Streamlit, ETL/ELT"),
            ("Cloud & DevOps", "Docker, GitHub Actions, CI/CD, Linux, Git"),
        ],
        "headings": {
            "summary": "Summary",
            "skills": "Skills",
            "experience": "Experience",
            "projects": "Projects",
            "education": "Education",
            "certs": "Certifications & Languages",
        },
        "jobs": [
            (
                "IT Assistant",
                "Rede Nilo Supermarkets, Barra do Garças, MT, Brazil",
                "Sep 2026 – Present",
                [
                    "Provide L1/L2 support for 80+ POS terminals across 7 stores, diagnosing and resolving hardware/software failures.",
                    "Manage MySQL users, roles and permissions for hundreds of users; analyze and correct fiscal receipts.",
                    "Roll out and support self-checkout lanes and the TOTVS ERP across the store network.",
                    "Build internal tools and automations that reduce manual work and improve efficiency across 7 stores.",
                ],
            ),
            (
                "Software Development Intern",
                "Gigabyte Soluções, Remote",
                "Aug 2025 – Dec 2025",
                [
                    "Built a web module (HTML/CSS/JS + Python/FastAPI) integrated with a legacy desktop ERP database.",
                    "Designed test plans and led application QA/homologation before client delivery.",
                    "Wrote user manuals, process specifications and support reports.",
                ],
            ),
            (
                "Systems & Customer Service Operator",
                "Quiosque Barra Chopp, Barra do Garças, Brazil",
                "Jan 2021 – Jan 2025",
                [
                    "Operated the integrated management system (NooChef), maintaining product data directly in the database.",
                    "Built the official website (barrachopp.com), from design to deployment.",
                    "Handled day-to-day customer service at the kiosk.",
                ],
            ),
        ],
        "projects": [
            (
                "MEIFlow",
                (
                    "Multi-tenant finance SaaS for 15M+ Brazilian micro-entrepreneurs "
                    "(Next.js/React, TypeScript, Fastify/Node.js, PostgreSQL/Prisma, Redis, Docker). "
                    "AI expense categorization (Claude API), CNPJ validation and R$81k "
                    "revenue-limit alerts; JWT auth, BullMQ queues and CI/CD."
                ),
            ),
            (
                "BrasilBid",
                (
                    "ETL pipeline (PNCP API into PostgreSQL/Neon, transformed with dbt) powering a "
                    "public Power BI dashboard tracking R$8B+ across 27 federal units "
                    "(26 states + DF) and 1,400+ agencies."
                ),
            ),
            (
                "CerradoWatch",
                (
                    "Environmental ETL (INPE/NASA FIRMS/INMET) with dbt and a live Streamlit dashboard, "
                    "orchestrated weekly via GitHub Actions."
                ),
            ),
            (
                "SaúdeBR",
                (
                    "DATASUS/OpenDataSUS pipeline into a PostgreSQL star schema and a 3-view Power BI "
                    "report with DAX KPIs per 100k inhabitants."
                ),
            ),
            (
                "BarraChopp",
                (
                    "Institutional website (HTML/CSS/JS) designed, built and deployed, with menu, "
                    "WhatsApp contact and responsive layout."
                ),
            ),
        ],
        "education": (
            "Bachelor of Science (B.S.) in Software Engineering",
            "Centro Universitário de Goiás (UniGOIÁS), Goiânia · 2026",
            "Graduated with highest academic honors (laureate).",
        ),
        "certs": "Google/Coursera — Crash Course on Python (2025); Mate Academy — JavaScript Essentials (2026)",
        "languages": "Languages: Portuguese (native) · English (fluent) · Spanish (advanced)",
    },
}


def build(lang: str, out_path: Path) -> None:
    data = CONTENT[lang]

    contact_1 = (
        f"{data['location']}  ·  {PHONE}  ·  " + link("mailto:" + EMAIL, EMAIL)
    )
    contact_2 = (
        link(SITE_URL, "joaolacerda.dev")
        + "  ·  "
        + link(LINKEDIN, "linkedin.com/in/jpalacerda")
        + "  ·  "
        + link(GITHUB, "github.com/Vortex11PTBR")
    )

    story: list[Flowable] = [
        Paragraph("João Pedro Antunes Lacerda", st_name),
        Paragraph(esc(data["role"]), st_role),
        Paragraph(contact_1, st_contact),
        Paragraph(contact_2, st_contact),
        Paragraph(esc(data["availability"]), st_avail),
        HRFlowable(width="100%", thickness=1.6, color=ACCENT, spaceBefore=6, spaceAfter=0),
    ]

    story += section(data["headings"]["summary"])
    story.append(Paragraph(esc(data["summary"]), st_body))

    story += section(data["headings"]["skills"])
    for label, values in data["skills"]:
        story.append(Paragraph(f"<b>{esc(label)}:</b> {esc(values)}", st_body))

    story += section(data["headings"]["experience"])
    for title, company, period, bullets in data["jobs"]:
        story += job(title, company, period, bullets)

    story += section(data["headings"]["projects"])
    for name, desc in data["projects"]:
        story.append(Paragraph(f"<b>{esc(name)}</b> — {esc(desc)}", st_project))

    story += section(data["headings"]["education"])
    degree, place, honors = data["education"]
    story.append(Paragraph(f"<b>{esc(degree)}</b> — {esc(place)}", st_body))
    story.append(Paragraph(esc(honors), st_body))

    story += section(data["headings"]["certs"])
    story.append(Paragraph(esc(data["certs"]), st_body))
    story.append(Paragraph(esc(data["languages"]), st_body))

    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=MARGIN_X,
        rightMargin=MARGIN_X,
        topMargin=MARGIN_Y,
        bottomMargin=MARGIN_Y,
        title=data["title"],
        author="João Pedro Antunes Lacerda",
        subject=data["subject"],
    )
    doc.build(story)


for lang, filename in (("pt", "resume.pdf"), ("en", "resume-en.pdf")):
    out = SITE / filename
    build(lang, out)
    print(f"wrote {out.relative_to(ROOT)}")

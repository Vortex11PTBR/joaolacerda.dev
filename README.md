# joaolacerda.dev

Portfólio pessoal — site estático em HTML, CSS e JavaScript puros.

## Estrutura

```
.
├── site/                    # o site publicado
│   ├── *.html               # páginas (início, sobre, experiência, projetos, certificações, contato)
│   ├── style.css
│   ├── script.js            # interações, i18n PT/EN e animações
│   ├── img/                 # imagens do site
│   ├── videos/entrega-720-trim.mp4 # vídeo da abertura (720p, 7,5s, scroll-scrub)
│   ├── photo.jpg            # foto de perfil
│   ├── resume.pdf           # currículo (PT, 1 página)
│   └── resume-en.pdf        # currículo (EN, 1 página)
├── certificacoes/
│   ├── certificados/        # PDFs exibidos na página de certificações
│   └── guias/               # guias de estudo (AWS, Google Data Engineer, PL-300)
├── videos-src/              # masters do vídeo (4K e 1080p, não publicados)
└── tools/
    ├── mkshots.py           # gera cópias das páginas sem animação para screenshots
    └── build_resume.py      # gera o site/resume.pdf a partir do conteúdo do site
```

## Visualizar localmente

Sirva a partir da raiz do repositório (os links de certificados usam `../certificacoes/`):

```sh
python -m http.server
```

Depois abra <http://localhost:8000/site/index.html>.

## Screenshots

```sh
python tools/mkshots.py
```

Gera `site/_shot_<página>.html` com animações desativadas (arquivos ignorados pelo git).

## Currículos (PDF)

Gera as versões PT e EN, ambas de 1 página e em layout ATS-friendly:

```sh
python tools/build_resume.py
```

- `site/resume.pdf` — português
- `site/resume-en.pdf` — inglês

O botão “Currículo” do site aponta para a versão conforme o idioma selecionado.
Requer `reportlab`.

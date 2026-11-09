"""Gera copias das paginas prontas para captura de tela.

Uso:
    python tools/mkshots.py

Escreve site/_shot_<pagina>.html, que sao as paginas originais com as
animacoes/transicoes desativadas para que o screenshot saia no estado final.
"""

from pathlib import Path

HERE = Path(__file__).resolve().parent
SITE = HERE.parent / "site"

OVERRIDE = """<style id="shot-override">
  html { scroll-behavior: auto !important; }
  .page-curtain { display: none !important; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-delay: 0ms !important;
    transition-duration: 0.001ms !important;
    transition-delay: 0ms !important;
  }
  .hero-text.hero-anim > * { opacity: 1 !important; transform: none !important; }
  .char { transform: none !important; }
  .fade-in, .fade-in.is-pending, .fade-in.is-in {
    opacity: 1 !important; transform: none !important; filter: none !important;
  }
  .comp-media { opacity: 1 !important; }
  .comp-media img, .comp-content { transform: none !important; }
  .comp-panel::before { transform: scaleX(1) !important; }
</style>
</head>"""

COMPACT = """<style id="compact">
  .hero { min-height: 0 !important; padding-top: 110px !important; padding-bottom: 20px !important; }
  .comp-panel { min-height: 0 !important; padding-top: 44px !important; padding-bottom: 44px !important; }
  .comp-intro { padding-top: 16px !important; }
</style>
</head>"""


def write(path: Path, text: str) -> None:
    with path.open("w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)


for page in sorted(SITE.glob("*.html")):
    name = page.name
    if name.startswith("_"):
        continue

    src = page.read_text(encoding="utf-8")
    write(SITE / f"_shot_{name}", src.replace("</head>", OVERRIDE, 1))

    if name == "index.html":
        compact = src.replace("</head>", OVERRIDE, 1).replace("</head>", COMPACT, 1)
        write(SITE / "_shot_compact_index.html", compact)

    print(f"wrote site/_shot_{name}")

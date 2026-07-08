# ICR-SV Beta Landing Page

Landing page publica do **ICR-SV Beta — Inventario Clinico-Reflexivo de Sentido de Vida**, recurso clinico-reflexivo para psicologos.

O projeto foi criado como uma pagina estatica premium, responsiva e pronta para publicacao via **Cloudflare Pages**.

## Objetivo

Vender e validar a oferta inicial do Kit Digital ICR-SV Beta, mantendo comunicacao clinica, sobria e eticamente responsavel.

O material e apresentado como recurso de apoio a escuta clinica. Ele nao e apresentado como teste psicologico, escala diagnostica, instrumento psicometrico validado ou ferramenta de avaliacao psicologica padronizada.

## Estrutura

```txt
.
├── index.html      # Landing page completa
├── styles.css      # Design system, responsividade e motion
├── script.js       # CTAs, modais, scroll progress e animacoes
├── raul1.jpeg      # Imagem do autor / Open Graph
├── raul2.jpeg      # Imagem do autor para mobile
├── _headers        # Headers de seguranca/cache para Cloudflare Pages
├── _redirects      # Fallback estatico
└── robots.txt      # Regras basicas de indexacao
```

## Edicoes principais

Links de compra e atendimento ficam em `script.js`:

```js
const CHECKOUT_URL = "#";
const WHATSAPP_URL = "https://wa.me/5547992642578";
```

Textos principais, preco e secoes da landing ficam em `index.html`.

Estilos, responsividade mobile-first e animacoes ficam em `styles.css`.

## Rodar localmente

Como o projeto e estatico, basta servir a pasta raiz com qualquer servidor estatico.

Exemplo com Node.js:

```bash
node - <<'NODE'
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png'};
http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  const file = path.join(root, pathname === '/' ? 'index.html' : pathname.replace(/^\//, ''));
  if (!file.startsWith(root)) return res.writeHead(403).end('Forbidden');
  fs.readFile(file, (err, data) => {
    if (err) return res.writeHead(404).end('Not found');
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream'});
    res.end(data);
  });
}).listen(4175, '127.0.0.1', () => console.log('http://127.0.0.1:4175'));
NODE
```

## Deploy na Cloudflare Pages

Configuracao recomendada para deploy conectado ao GitHub:

- Framework preset: `None`
- Build command: deixar vazio
- Build output directory: `.`
- Root directory: `/`
- Production branch: `main`

Depois de conectar o repositorio `guifast/icr-sv-beta`, cada push na branch `main` publica uma nova versao.

## Checklist antes de publicar

- Atualizar `CHECKOUT_URL` em `script.js`
- Confirmar WhatsApp em `script.js`
- Revisar preco em `index.html`
- Revisar termos, politica de privacidade e aviso de responsabilidade
- Testar responsividade mobile
- Testar CTAs e links

## Uso responsavel

O ICR-SV Beta e um recurso clinico-reflexivo complementar de apoio a escuta psicologica. Nao substitui avaliacao clinica, raciocinio tecnico, instrumentos psicologicos validados, condutas de emergencia ou avaliacao de risco.

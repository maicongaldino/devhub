# DevHub (PWA)

Este projeto foi organizado para ser responsivo em dispositivos móveis e funcionar como um PWA (Progressive Web App).

## Estrutura

- `index.html`: página principal
- `css/styles.css`: estilos
- `js/main.js`: lógica da SPA (views, busca) e registro do Service Worker
- `manifest.webmanifest`: manifest do PWA
- `sw.js`: Service Worker com cache básico
- `assets/icons/`: ícones do PWA (`favicon.svg`, `icon-192.svg`, `icon-512.svg`)

## Responsividade

- Sidebar fixa apenas em telas médias para cima (`md:fixed`), comportamento fluido em mobile.
- Layout usa classes responsivas do Tailwind (`md:*`) para grid, espaçamentos e largura.

## PWA

- Manifest adicionado em `index.html` com `link rel="manifest"`.
- Ícones SVG em `assets/icons`.
- Service Worker (`sw.js`) cacheia os arquivos principais e faz atualização em segundo plano.

### Testar localmente

Para testar o PWA é necessário servir os arquivos via HTTP (o Service Worker não funciona abrindo o `index.html` direto no disco).

Exemplos de servidores locais:

- Python: `python -m http.server 5500`
- Node (serve): `npx serve . -p 5500`

Acesse `http://localhost:5500/` e verifique no DevTools (Application → Service Workers) que o `sw.js` está registrado.

## Observações

- O cache lista: `index.html`, `css/styles.css`, `js/main.js`, `manifest.webmanifest` e ícones do `assets/icons`.
- O Service Worker usa estratégia cache-then-network com atualização e fallback para cache quando offline.


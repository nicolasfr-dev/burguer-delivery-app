# 🍔 Burguer Delivery

Aplicação web de cardápio e pedidos para uma hamburgueria. O cliente navega pelo cardápio, monta o carrinho, informa o endereço de entrega e **envia o pedido pronto pelo WhatsApp**. O histórico de pedidos fica salvo no próprio navegador, permitindo repetir um pedido anterior com um clique.

Não há back-end: o cardápio é um arquivo estático, o carrinho vive em memória (React Context) e o histórico usa `localStorage`.

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Como rodar](#como-rodar)
- [Scripts disponíveis](#scripts-disponíveis)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Arquitetura](#arquitetura)
  - [Rotas e layout](#rotas-e-layout)
  - [Estado do carrinho (`CarrinhoContext`)](#estado-do-carrinho-carrinhocontext)
  - [Fluxo de um pedido](#fluxo-de-um-pedido)
  - [Histórico de pedidos (`localStorage`)](#histórico-de-pedidos-localstorage)
- [Componentes](#componentes)
- [Cardápio: como adicionar ou editar produtos](#cardápio-como-adicionar-ou-editar-produtos)
- [Tema e estilo](#tema-e-estilo)
- [Configuração](#configuração)
- [Deploy](#deploy)
- [Limitações conhecidas e próximos passos](#limitações-conhecidas-e-próximos-passos)

---

## Funcionalidades

| Tela | Rota | O que faz |
|------|------|-----------|
| **Cardápio** | `/` | Lista lanches e bebidas separados por categoria, com busca por nome. Produtos com opções (tipo de pão, sabor do refrigerante) abrem um modal para escolher antes de adicionar. |
| **Pedidos** | `/pedidos` | Mostra os pedidos já enviados (data, hora, itens e total) e permite **repetir um pedido**, que joga os itens de volta no carrinho. |
| **Carrinho** | `/carrinho` | Lista os itens com controle de quantidade (+/−) e remoção, exibe o total e abre o modal de finalização (endereço + observações) que gera a mensagem para o WhatsApp. |

Outros detalhes:

- **Responsivo**: no mobile há uma barra de navegação fixa no rodapé; no desktop (`lg`) a navegação fica no cabeçalho.
- **Busca** só aparece no cardápio; filtra produtos pelo nome, sem diferenciar maiúsculas de minúsculas.
- **Frete e forma de pagamento** não são calculados no app: o total é exibido como "R$ X + Frete" e o restante é combinado pelo WhatsApp.

## Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| [React](https://react.dev) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org) | ~5.8 | Tipagem (modo `strict`) |
| [Vite](https://vite.dev) | 7 | Dev server e build |
| [React Router](https://reactrouter.com) | 7 | Roteamento (`BrowserRouter`) |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilo, via plugin `@tailwindcss/vite` |
| [Phosphor Icons](https://phosphoricons.com) | 2 | Ícones |
| ESLint + typescript-eslint | 9 / 8 | Lint (regras de hooks e react-refresh) |

Fonte: **Big Shoulders**, carregada do Google Fonts em `src/index.css`.

## Como rodar

Pré-requisito: **Node.js 20.19+ ou 22.12+** (exigência do Vite 7) e npm.

```bash
# o projeto fica dentro da pasta front-end
cd front-end

# configurar o número do WhatsApp que recebe os pedidos
cp .env.example .env   # depois edite VITE_WHATSAPP_NUMBER

# instalar dependências
npm install

# subir o servidor de desenvolvimento (http://localhost:5173)
npm run dev
```

## Scripts disponíveis

Executados dentro de `front-end/`:

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Checagem de tipos (`tsc -b`) + build de produção em `dist/` |
| `npm run preview` | Serve o build de `dist/` localmente para conferência |
| `npm run lint` | Roda o ESLint em todo o projeto |

## Estrutura de pastas

```
burguer-delivery-app/
└── front-end/
    ├── .env.example               # Modelo das variáveis de ambiente
    ├── index.html                 # HTML de entrada
    ├── public/
    │   └── favicon.png
    ├── vite.config.ts             # Plugins: React + Tailwind
    ├── eslint.config.js
    ├── tsconfig*.json
    └── src/
        ├── main.tsx               # Monta o React em #root (StrictMode)
        ├── App.tsx                # CarrinhoProvider + rotas
        ├── index.css              # Tailwind, fonte e cores do tema
        ├── assets/
        │   └── logo.png
        ├── data/
        │   └── products.ts        # Cardápio estático (tipos + lista de produtos)
        ├── contexts/
        │   └── CarrinhoContext.tsx# Estado global do carrinho + hook useCarrinho
        ├── routes/
        │   └── Paths.tsx          # Definição das rotas
        ├── layouts/
        │   └── LayoutBase.tsx     # Header + <Outlet> + NavBar; guarda o termo de busca
        ├── pages/
        │   ├── MainPage.tsx       # Cardápio
        │   ├── PedidosPage.tsx    # Histórico
        │   └── CarrinhoPage.tsx   # Carrinho + finalização via WhatsApp
        └── components/
            ├── Cardapio/          # CardapioList, CardapioItem, CardapioCategory
            ├── Carrinho/          # CarrinhoItem, CarrinhoList
            ├── Pedidos/           # PedidosList, PedidoItem
            ├── Logo/              # Logo
            └── UI/                # Header, NavBar, Modal
```

## Arquitetura

```
main.tsx
└── App
    └── CarrinhoProvider            ← estado global do carrinho
        └── Paths (BrowserRouter)
            └── LayoutBase          ← Header + NavBar + estado da busca
                ├── /          → MainPage     → CardapioList → CardapioItem (+ Modal de opções)
                ├── /pedidos   → PedidosPage  → PedidosList  → PedidoItem
                └── /carrinho  → CarrinhoPage → CarrinhoItem (+ Modal de finalização)
```

### Rotas e layout

`src/routes/Paths.tsx` define três rotas aninhadas sob `LayoutBase`, que renderiza:

1. **`Header`** — logo, links de navegação (desktop), botão de busca e ícone do carrinho.
2. **`<main>`** com o `<Outlet>` da rota atual.
3. **`NavBar`** — barra inferior fixa, visível apenas abaixo do breakpoint `lg`.

O termo de busca é um `useState` no `LayoutBase`. O `Header` recebe `onSearch` para atualizá-lo, e o valor chega às páginas via **`<Outlet context={{ search }}>`**; a `MainPage` lê com `useOutletContext<{ search: string }>()` e repassa para `CardapioList`. O botão de busca só é mostrado quando `location.pathname === "/"`.

### Estado do carrinho (`CarrinhoContext`)

`src/contexts/CarrinhoContext.tsx` expõe, pelo hook `useCarrinho()`:

| Membro | Assinatura | Comportamento |
|--------|-----------|---------------|
| `carrinho` | `CarrinhoItem[]` | Lista atual de itens |
| `adicionarItem` | `(item) => void` | Se já existe um item com o mesmo `id` **e** mesma `opcao`, soma a quantidade; senão, adiciona |
| `incrementar` | `(id, opcao?) => void` | +1 na quantidade |
| `decrementar` | `(id, opcao?) => void` | −1 na quantidade, com mínimo de 1 (para tirar o item use `removerItem`) |
| `removerItem` | `(id, opcao?) => void` | Remove o item |

```ts
interface CarrinhoItem {
  id: string;
  nome: string;
  preco: number;      // preço unitário
  quantidade: number;
  opcao?: string;     // ex.: "Pão Árabe", "Coca-Cola"
}
```

Um item é identificado pela combinação **`id` + `opcao`**. Quando o produto tem opções, o `CardapioItem` ainda monta o `id` como `"<id-do-produto>-<opção>"` (ex.: `bacon-burger-Pão Bola`), então o mesmo lanche com pães diferentes vira linhas separadas no carrinho.

`useCarrinho()` lança erro se for usado fora do `CarrinhoProvider`.

> O carrinho fica **só em memória**: ao recarregar a página, ele é perdido.

### Fluxo de um pedido

1. **Cardápio** — o usuário clica em **+** num produto.
   - Sem opções → item adicionado direto com `quantidade: 1`.
   - Com opções → abre um `Modal` com radio buttons; o botão **Confirmar** só é habilitado depois de escolher uma opção.
2. **Carrinho** — ajusta as quantidades e clica em **Finalizar Pedido**.
3. **Modal de finalização** — informa o **endereço de entrega** e **observações** (opcional) e clica em **Enviar Pedido**. A função `finalizarPedido`:
   1. monta um objeto de pedido e o **adiciona ao histórico** em `localStorage["pedidos"]`;
   2. gera a mensagem, codificada com `encodeURIComponent`;
   3. abre `https://wa.me/<VITE_WHATSAPP_NUMBER>?text=<mensagem>` numa nova aba;
   4. fecha o modal.

Exemplo da mensagem gerada:

```
*Olá, eu gostaria de fazer o seguinte pedido:*

• Bacon Burger (2x - Pão Bola) — R$ 20,00
• Refrigerante Lata (1x - Coca-Cola) — R$ 5,00

*Total:* R$ 25,00
*Entrega:* Rua Exemplo, 123 - Centro
*Observações:* Sem tomate
```

Valores são formatados com `toFixed(2)` trocando ponto por vírgula (helper `moeda`).

### Histórico de pedidos (`localStorage`)

Chave: **`pedidos`** — um array JSON no formato:

```ts
interface Pedido {
  numero: number;      // Date.now() no momento do envio (serve como id único)
  itens: {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
    opcao?: string;
  }[];
  total: number;       // soma de preco × quantidade, sem frete
  dataISO: string;     // new Date().toISOString()
}
```

`PedidosList` lê essa chave ao montar, formata data e hora em `pt-BR` e renderiza um `PedidoItem` por pedido. **Repetir pedido** chama `adicionarItem` para cada item salvo e navega para `/carrinho`.

Para limpar o histórico durante o desenvolvimento, rode no console do navegador:

```js
localStorage.removeItem("pedidos");
```

## Componentes

### Cardápio (`components/Cardapio`)

- **`CardapioList`** `{ search }` — filtra `products` pelo nome e separa em **Lanches** (`sanduiche`) e **Bebidas** (`bebida`), com mensagens de "nenhum item encontrado".
- **`CardapioItem`** `{ id, nome, preco, descricao?, opcoes? }` — card do produto com botão **+** e o modal de escolha de opção.
- **`CardapioCategory`** `{ titulo, items }` — seção genérica por categoria. *Ainda não é usado* (o `CardapioList` monta as seções direto).

### Carrinho (`components/Carrinho`)

- **`CarrinhoItem`** `{ id, nome, preco, quantidade, opcao? }` — linha do carrinho com subtotal, botões −/+ e lixeira.
- **`CarrinhoList`** — placeholder com "Seu carrinho está vazio." *Ainda não é usado.*

### Pedidos (`components/Pedidos`)

- **`PedidosList`** — carrega o histórico do `localStorage`.
- **`PedidoItem`** `{ numero, data, hora, preco, itens, conteudo }` — card do pedido com botão **Repetir pedido**. (`conteudo` é recebido, mas não é exibido.)

### UI (`components/UI`)

- **`Header`** `{ onSearch, showSearch }` — cabeçalho fixo. O campo de busca abre e fecha pelo ícone de lupa.
- **`NavBar`** — navegação inferior no mobile (Menu, Pedidos, Carrinho).
- **`Modal`** `{ open, onClose, title?, children, actions?, width? }` — modal reutilizável com overlay escuro, botão de fechar e área de ações no rodapé. `width` recebe uma classe Tailwind (padrão `max-w-md`).

### Logo (`components/Logo`)

- **`Logo`** — importa `assets/logo.png` (ícone de hambúrguer em traço preto) e aplica `invert` para ele ficar branco no header escuro. Tamanho: 56×56.

## Cardápio: como adicionar ou editar produtos

Todo o cardápio está em **`src/data/products.ts`**:

```ts
export interface Product {
  id: string;                         // único, em kebab-case
  nome: string;
  descricao: string;
  preco: number;                      // em reais, ex.: 10 ou 12.5
  categoria: "sanduiche" | "bebida";
  opcoes?: string[];                  // se houver, o cliente precisa escolher uma
}
```

Para adicionar um produto, inclua um objeto no array `products`:

```ts
{
  id: "x-tudo",
  nome: "X Tudo",
  descricao: "Carne, frango, bacon, ovo, queijo, presunto, alface e tomate",
  preco: 16,
  categoria: "sanduiche",
  opcoes: ["Pão Árabe", "Pão Bola"],
},
```

Para criar uma **nova categoria** (ex.: `"porcao"`):

1. adicione o valor ao union `categoria` em `Product`;
2. em `CardapioList.tsx`, filtre e renderize a nova seção (ou passe a usar o `CardapioCategory`).

Cardápio atual: **13 lanches** (R$ 6 a R$ 15, todos com opção Pão Árabe / Pão Bola) e **2 bebidas** (Refrigerante 200ml e Lata, com escolha de sabor).

## Tema e estilo

As cores ficam no bloco `@theme` de `src/index.css` e viram classes do Tailwind (`bg-primary`, `text-dark-gray2` etc.):

| Token | Cor | Uso principal |
|-------|-----|---------------|
| `dark-gray` | `#121212` | Fundo da página |
| `dark-gray2` | `#1c1c1c` | Cards, header, navbar |
| `dark-gray3` | `#2c2c2c` | Bordas, campo de busca |
| `light-gray` | `#f5f5f5` | Texto claro |
| `light-gray2` | `#e0e0e0` | Texto secundário |
| `primary` | `#ffbf00` | Destaques, botões, preços |
| `secondary` | `#ff9900` | — |
| `accent` | `#ff8000` | Estado ativo/pressionado dos botões |

O app usa apenas tema escuro.

## Configuração

### Variáveis de ambiente

Ficam em `front-end/.env`, que não vai para o git (use `front-end/.env.example` como modelo):

| Variável | Descrição |
|----------|-----------|
| `VITE_WHATSAPP_NUMBER` | Número que recebe os pedidos: DDI + DDD + número, só dígitos (ex.: `5511999999999`) |

No deploy, cadastre a mesma variável no painel do host (Vercel, Netlify...). Como ela entra no bundle durante o build, o número aparece no site publicado; isso é inevitável num link `wa.me`.

### Outros pontos de customização

| O quê | Onde |
|-------|------|
| Texto da mensagem do pedido | `src/pages/CarrinhoPage.tsx` → `finalizarPedido` |
| Produtos e preços | `src/data/products.ts` |
| Cores | `src/index.css` → `@theme` |
| Logo | `src/assets/logo.png` |
| Favicon | `public/favicon.png` |

## Deploy

```bash
cd front-end
npm run build      # gera front-end/dist/
```

O conteúdo de `dist/` é estático e pode ser publicado em qualquer host (Vercel, Netlify, GitHub Pages, Cloudflare Pages...).

Como o app usa `BrowserRouter`, o servidor precisa **redirecionar todas as rotas para `index.html`**, senão abrir `/pedidos` ou `/carrinho` direto dá 404. Exemplos:

- **Netlify** — crie `front-end/public/_redirects` com `/*  /index.html  200`
- **Vercel** — crie `front-end/vercel.json` com `{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }`

## Limitações conhecidas e próximos passos

Pontos observados no código atual:

- **Carrinho não é limpo após o envio** — existe o comentário `// limpar carrinho` em `finalizarPedido`, mas falta a ação; seria preciso expor um `limparCarrinho()` no contexto.
- **Carrinho não persiste** ao recarregar a página (só o histórico usa `localStorage`).
- **Endereço não é obrigatório** — dá para enviar o pedido com o endereço em branco.
- A classe `animate-fadeIn` usada no campo de busca não está definida no tema, então não tem efeito.
- `CardapioCategory` e `CarrinhoList` não são usados; a prop `conteudo` do `PedidoItem` é calculada e não exibida.
- O campo `imagem` existe nas props do `CardapioItem`, mas os produtos não têm imagens.
- Não há testes automatizados.

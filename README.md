# jvdm-ui

Design system em React 19 + Tailwind v4. Paleta em `oklch`, tema claro/escuro por reaponto de
token semantico, e componentes em quatro camadas.

```
tokens/     cor, tipografia, peso, raio, escala de espacamento, tema
atoms/      elemento indivisivel: Card, Label, Input, Button, Icon, Avatar, Skeleton
molecules/  poucos atoms como uma unidade: Field, StatCard, PageHeader, Empty, LoadError
organisms/  secao completa: DataTable, BarChart, Sparkline
```

A dependencia so desce, e o `eslint-plugin-boundaries` derruba o build de quem atravessar.

## Instalacao

```bash
npm install jvdm-ui
```

`react@^19` e peer dependency. O pacote e ESM puro.

## Uso

Importe o CSS de tokens depois do Tailwind, e diga ao Tailwind para varrer o pacote:

```css
@import "tailwindcss";
@import "jvdm-ui/tokens.css";
@source "../../node_modules/jvdm-ui/dist";
```

> A linha `@source` nao e opcional. A deteccao automatica de conteudo do Tailwind v4 ignora
> `node_modules`, entao sem ela as classes usadas pelos componentes nunca sao geradas e a UI vem
> sem estilo. O caminho e relativo ao arquivo CSS.

Aplique o tema antes do primeiro render, para a tela nao piscar no tema errado:

```tsx
import { applyStoredTheme } from "jvdm-ui/tokens";

applyStoredTheme();
```

Depois componha:

```tsx
import { Button, Card, Label } from "jvdm-ui/atoms";
import { Field, PageHeader } from "jvdm-ui/molecules";
import { DataTable } from "jvdm-ui/organisms";
```

Cada camada e um entry point proprio. Import fundo (`jvdm-ui/atoms/button`) nao e suportado: o
`exports` do pacote so publica as quatro camadas e a raiz.

## Idioma

Os textos padrao dos componentes estao em portugues. Os tres componentes que falam sozinhos
aceitam prop opcional para sobrescrever:

| Componente      | Prop         | Padrao                     |
| --------------- | ------------ | -------------------------- |
| `PasswordInput` | `showLabel`  | `"Mostrar senha"`          |
| `PasswordInput` | `hideLabel`  | `"Ocultar senha"`          |
| `ThemeToggle`   | `label`      | `(theme) => "Mudar para…"` |
| `LoadError`     | `retryLabel` | `"Tentar de novo"`         |

Todo o resto do texto entra por prop e e decisao do app.

## As escalas

Nenhum valor impar, em lugar nenhum. O lint quebra o CI em todas estas:

| dimensao    | escala                                                                |
| ----------- | --------------------------------------------------------------------- |
| tipografia  | 10, 12, 14, 16, 18, 22, 26, 52px (`text-2xs` … `text-display`)        |
| tracking    | `tracking-caps` (rotulo em caixa alta), `tracking-code`               |
| peso        | 400/500/700. A fonte nao tem 600: `font-semibold` o browser sintetiza |
| raio        | 4, 6, 8, 10, 16px (`radius-xs\|sm\|md\|lg\|xl`)                       |
| espacamento | 2px e multiplos de 4. `gap-px`, `gap-2.5` e `gap-[7px]` sao desvio    |
| icone       | 12, 16, 20, 24, 32px pelo `size` de `Icon`, nunca `h-* w-*` solto     |
| cor         | so token semantico. Primitivo `--p-*` e cor crua sao proibidos        |

Largura e altura ficam fora da escala — `w-[316px]` e permitido, em px par e com cautela.

## Desenvolvimento

```bash
npm run dev          # tsup em watch
npm run build        # dist/ + tokens.css
npm run typecheck
npm run lint
npm run format:check
```

Para desenvolver junto de um app na mesma maquina, aponte a dependencia para a pasta e deixe o
`tsup --watch` rodando:

```json
{ "dependencies": { "jvdm-ui": "file:../jvdm-ui" } }
```

## Norma

`docs/adr/` nao e historico: e a norma vigente. Leia [ADR 0001](docs/adr/0001-design-system.md)
antes de escrever componente. As regras nao se afrouxam para fechar task (R6).

## Licenca

MIT

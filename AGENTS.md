# AGENTS.md

Instrucoes para qualquer agente de IA que trabalhe neste repositorio.

Codigo e textos padrao sao em portugues. Mantenha assim.

## A ADR e o manual

`docs/adr/0001-design-system.md` nao e historico: e a norma vigente. Quando ela e este arquivo
divergirem, **a ADR vence**.

| Clausula | O que decide                                                          |
| -------- | --------------------------------------------------------------------- |
| R1       | quem consome compoe, nunca redefine                                   |
| R2       | inventario do design system antes de comecar                          |
| R3       | o que falta nasce na camada certa; componente com dominio nao entra   |
| R5       | as escalas (tipografia, peso, raio, espacamento, icone, cor)          |
| R6       | as regras nao se afrouxam para fechar task                            |
| R7       | texto que o componente diz sozinho mora no `locales.ts` da pasta dele |

**Sem comentario de codigo** — nem `//`, nem bloco, nem `eslint-disable`. O porque mora na ADR.
A regra local `no-comments` do `eslint.config.mjs` quebra o CI.

Nao edite `eslint.config.mjs` para um PR passar (R6). Mudanca de regra e mudanca de ADR.

## Estrutura

```
src/
  tokens/     tokens.css (primitivos, @theme, temas) + theme.ts (o data-theme)
  atoms/      elemento indivisivel
  molecules/  poucos atoms como uma unidade
  organisms/  secao completa
  index.ts    barrel da raiz
```

A dependencia so desce: `tokens <- atoms <- molecules <- organisms`. O
`eslint-plugin-boundaries` derruba quem atravessar.

**Um componente por pasta, no `index.tsx` dela.** Pasta que junta varios componentes nao tem
`index.tsx`: tem `index.ts` de barrel, uma subpasta por componente e o que eles dividem —
`input/` = `input/`, `select/`, `password-input/` mais `control.ts`; `chart/` = `bar-chart/`,
`sparkline/` mais `bar.ts`.

O import aponta para a pasta, nunca para o arquivo de dentro. Entre irmaos do mesmo grupo o
caminho e direto (`../svg`, `../control`), para o barrel nao criar ciclo.

**Este pacote nao conhece app nenhum.** Nada de `@shared/`, `@features/`, `@app/` ou roteador
aqui dentro — a regra local `no-app-import` cobra isso. Componente que conhece dominio (um `Pill`
que sabe o status de um lote) mora na feature do app, nunca aqui.

## Texto

Texto que o app decide entra por prop. Texto que o componente diz sozinho vai para o `locales.ts`
da pasta dele **e** ganha prop opcional com esse valor como padrao — o pacote e publico, e nem
todo consumidor fala portugues. Ver `atoms/theme-toggle/`, `atoms/input/` e `molecules/load-error/`.

## Antes de dar a task por pronta

```bash
npm run typecheck && npm run lint && npm run format:check && npm run build
```

Se voce mexer em `eslint.config.mjs`, verifique injetando o import proibido e conferindo que o
lint quebra: descritor que nao casa vira silencio, nao erro, e a regra morre sem avisar.

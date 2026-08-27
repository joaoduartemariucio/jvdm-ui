# ADR 0001 — Design system

- **Status:** aceita
- **Data:** 2026-08-20
- **Escopo:** `design-system/`. Um componente por arquivo e a forma dos imports sao a ADR 0003.

## Contexto

A UI precisa sair deste repositorio um dia, como pacote. Isso so e possivel se a fronteira for
verificavel: enquanto for convencao escrita, ela vaza no primeiro prazo apertado.

## Decisao

Toda a UI de qualquer feature e composta a partir de `design-system/`. Ele e a fonte unica de
componente, token e escala visual, e nao conhece o app: nada de `src/` la dentro.

Quatro camadas, dependencia so desce:

```
tokens/     cor, tipografia, peso, raio, escala de espacamento, tema
atoms/      elemento indivisivel: Card, Label, Input, Button, Icon, Avatar, Skeleton
molecules/  poucos atoms como uma unidade: Field, StatCard, PageHeader, Empty, LoadError
organisms/  secao completa: DataTable, BarChart, Sparkline
```

### R1 — Compor, nunca redefinir

Tela compoe o design system. Nao redefine botao, campo, card, tabela, rotulo ou estado vazio com
classes soltas. Escrever `text-2xs tracking-caps text-ink-muted` num `<span>` e reimplementar o
`Label`.

### R2 — Inventario antes de desenvolver

Antes de comecar uma tela: quais componentes ja atendem, o que falta, o que precisa mudar. Vai
escrito no PR — e o que permite discutir o componente antes de ele existir em tres versoes quase
iguais.

### R3 — O que falta nasce no design system

Faltou componente, ou faltou capacidade num que ja existe: cria-se no design system, na camada
certa. Estender o que existe vem antes de criar um irmao quase igual.

Excecao: componente que conhece dominio fica na feature (`Pill` e `StatusDot` sabem o status do
aluno; `PresencePanel` chama `useAccess()`). O lint impede que entrem aqui.

### R4 — Encostou, migra

Codigo fora do design system que a task ja toca e migrado no mesmo PR. Escopo: o que a task ja
abriu. Migracao maior vira task propria.

### R5 — Onde ha escala, valor cru e desvio

| dimensao    | escala                                                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cor         | tokens semanticos (`accent`, `ink`, `danger`…). Primitivo `--p-*` e cor crua sao proibidos. Quais sao os valores: [ADR 0004](0004-identidade-visual.md) |
| tipografia  | 8 degraus: 10, 12, 14, 16, 18, 22, 26, 52px. Tracking: `tracking-caps`, `tracking-code`                                                                 |
| peso        | 400/500/700. `font-semibold` nao existe na fonte — o browser sintetiza                                                                                  |
| raio        | 4, 6, 8, 10, 16px (`radius-xs\|sm\|md\|lg\|xl`)                                                                                                         |
| espacamento | 2px e multiplos de 4. Meio-passo (`gap-2.5`) e arbitrario (`gap-[7px]`) sao desvio                                                                      |
| icone       | 12, 16, 20, 24, 32px, pelo `size` de `Icon`                                                                                                             |

Nenhum valor impar, em lugar nenhum.

Largura e altura ficam fora da escala: a largura de um painel e uma medida, nao um passo de ritmo.
`w-[316px]` e permitido — em px par, com cautela, e virando token quando a medida se repetir.

### R6 — As regras nao se afrouxam para fechar task

Mudar as fronteiras do lint, a escala, os tokens ou qualquer regra desta ADR e decisao separada da
task que esbarrou nela. Exige consenso explicito e revisao desta ADR.

_"A task nao fecha sem isso"_ nao e justificativa, e a descricao do sintoma. Ou a task se adapta,
ou para e a regra se discute em separado.

### R7 — Texto do design system mora num `locales.ts`

Componente do design system nao carrega texto no corpo. O que ele precisa dizer por conta propria —
o rotulo do botao de repetir em `LoadError`, o `aria-label` do `ThemeToggle` — vive num `locales.ts`
na pasta do componente, do mesmo jeito que uma tela faz (ADR 0002, A5).

O design system nao conhece o app, mas conhece o idioma: enquanto for um pacote de um produto so,
pt-BR fica. O que R7 garante e que a troca seja um arquivo por componente, e nao uma cacada por
string no meio de JSX.

Texto que o app decide continua entrando por prop (`title` de `Empty`, `message` de `LoadError`).
R7 vale so para o que o componente diz sozinho.

## Como cada regra e sustentada

| regra      | quem cobra                                                                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| R1, R3     | `eslint-plugin-boundaries`: o design system nao importa `src/`; `types`/`services`/`hooks` nao importam componente                                                       |
| R5         | `no-restricted-syntax` em `eslint.config.mjs`: cor crua, tipografia arbitraria, peso inexistente, raio arbitrario, espacamento fora da escala e valor impar quebram o CI |
| R7         | as mesmas regras de texto de ADR 0002, A5, aplicadas a `design-system/**/*.tsx`: literal no JSX ou em prop de texto quebra o CI                                          |
| R2, R4, R6 | pessoas. O checklist de PR nao verifica — torna a omissao visivel                                                                                                        |

As regras do lint sao verificadas injetando a violacao e conferindo que o CI quebra — 30 sondas na
ultima revisao, entre fronteira, locales, texto e token. Descritor que nao casa vira **silencio**,
nao erro. Mexeu na configuracao, refaz as sondas.

`design-system/` esta **fora de `src/`**, entao precisa estar listado no `files:` e no
`boundaries/include` do bloco de fronteiras em `eslint.config.mjs`. Faltando, as regras desta ADR
nao rodam — e passam, sem erro nenhum. Ja aconteceu: ao mover a pasta para a raiz, o bloco continuou
so com `src/**` e as regras ficaram mudas ate a sonda acusar.

## Consequencias

- `design-system/` pode ser publicado como pacote, e o lint garante que continue assim.
- Componente novo nasce por necessidade real, nao por antecipacao.
- Task as vezes fica mais lenta: inventario e migracao sao trabalho antes do trabalho.
- R6 gera atrito por desenho — e o que separa "a regra nao serve" de "a regra e inconveniente agora".
- R2, R4 e R6 nao tem verificacao automatica. Assumido: um CI que finge medir disciplina seria pior.

## Alternativas descartadas

**Atomic design so como nomenclatura.** Sem impor a direcao de dependencia, daria vocabulario e
nenhuma garantia. A divisao vale porque atom nao consegue importar molecule.

**Escala de espacamento em potencias (2/4/8/16/24/32).** 63% dos usos caiam fora (12px em 64
lugares, 10px em 39, 20px em 37): seria redesenhar o ritmo de toda a UI, nao limpeza. A escala de 4
em 4 elimina so os meio-passos, a 85 ajustes de 2px.

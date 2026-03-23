---

```markdown
---
name: vanilla-frontend-master
description: Use esta skill sempre que o usuario solicitar a criacao, atualizacao ou otimizacao de paginas web, componentes de UI ou layouts usando estritamente HTML, CSS e JavaScript puros. Acione obrigatoriamente quando o usuario mencionar "sem frameworks", "vanilla", design moderno, ou mobile-first. A skill deve ditar a criacao de codigo limpo, utilizando variaveis CSS baseadas em logica de Material Design 3, semantica HTML rigorosa e padroes de JavaScript limpos.
---

# Diretrizes de Desenvolvimento Frontend Vanilla

O objetivo principal desta skill é gerar um código frontend altamente responsivo, elegante e de fácil manutenção, utilizando apenas as tecnologias nativas da web.

## Regras de Arquitetura

Sempre separe as responsabilidades. O projeto deve seguir uma arquitetura limpa e modularizada:
* `index.html`: Estrutura semântica pura.
* `style.css`: Estilização global, variáveis de tema e regras específicas de layout.
* `script.js`: Lógica de interação do usuário e manipulação do DOM.

## Padrao Mobile-First

Todo o CSS gerado deve seguir a metodologia mobile-first.
1.  Escreva os estilos base para telas pequenas (dispositivos móveis) fora de qualquer media query.
2.  Utilize `@media (min-width: ...)` para adaptar o layout progressivamente para tablets e desktops.
3.  Evite larguras fixas; prefira `rem`, `%`, `vw`/`vh`, e layouts flexíveis (`Flexbox` e `CSS Grid`).

## Sistema de Design (Material Design 3 Logic)

Todo projeto deve iniciar com um sistema de tokens de design em formato de variáveis CSS no seletor `:root`. Estruture a paleta de cores seguindo a lógica do Material Design 3 para garantir contraste e harmonia:

```css
:root {
  /* Paleta Principal */
  --md-sys-color-primary: #006A6A;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-secondary: #4A6363;
  
  /* Superficies e Fundos */
  --md-sys-color-surface: #FAFDFC;
  --md-sys-color-on-surface: #191C1C;
  --md-sys-color-surface-variant: #DAE4E4;
  
  /* Tipografia e Espacamentos */
  --font-family-base: 'Segoe UI', system-ui, sans-serif;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --radius-md: 12px;
}
```

## Estrutura HTML Semantica

Utilize tags semânticas para estruturar o documento, garantindo acessibilidade e bom ranqueamento (SEO).
* Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` e `<footer>`.
* Sempre inclua os atributos `aria-*` quando elementos interativos personalizados forem criados em HTML puro.

## Interatividade e JavaScript Limpo

O código JavaScript deve ser conciso e focado em melhorar a experiência do usuário. Evite poluir o escopo global.

**Padrao de Implementacao (Exemplo: Smart Navbar)**
Ao criar componentes de navegação, implemente comportamentos modernos, como ocultar a barra de navegação ao rolar para baixo e revelá-la ao rolar levemente para cima. Use `requestAnimationFrame` ou `IntersectionObserver` sempre que possível para manter o desempenho em 60 FPS.

```javascript
// Exemplo de padrao de inicializacao isolada
document.addEventListener('DOMContentLoaded', () => {
    initSmartNavbar();
});

function initSmartNavbar() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('header');

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Rolando para baixo
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Rolando para cima
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }, { passive: true });
}
```

## Formato de Entrega de Codigo

Quando o usuário pedir a construção de uma página ou componente:
1.  Apresente primeiro um breve resumo da estrutura visual.
2.  Forneça os blocos de código separados para HTML, CSS e JS.
3.  Explique brevemente onde o usuário deve inserir o código ou como testá-lo no navegador.
```

---

---
cover: "../../../assets/blog/code/styleguide/cover.png"
coverAlt: "styleguide"
# banner: "../../../assets/blog/code/styleguide/banner.png"
# bannerAlt: "styleguide"

title: "Styleguide"
description: "sanaBlog manual of style."
# author:
publicationDate: 2025-01-31
# creationDate: "Jan 2025"
sortOrder: 4
---

When I migrated and rebuilt this site using <a href="https://astro.build/" target="_blank" class="extlink">Astro</a>, I decided to remake the blog page from scratch. With that rose the need for a new design system—one that's tamer than the eye blasting black text on yellow background. I wanted the visual style of sanaBlog to reflect my [web design principles](/blog/work/rounded-corners). It had to be unobtrusive yet fun, honest yet stylistic. Most importantly, it had to put the user's focus on the content. I decided to focus on three key things:
- Comfortable and consistent typography
- Intuitive navigation
- Minimising everything else

You are seeing the result of my efforts by reading this, but I've also explicitly compiled a stylesheet:

<style>
  .stylesheet {
    display: grid;
    grid-column-gap: 1.8em;
    grid-row-gap: 1em;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    overflow: hidden;
    border: 1px solid var(--color-ui-normal);
    border-radius: var(--image-radius);
  }

  .swatch {
    display: grid;
    grid-column-gap: 1em;
    grid-template-columns: repeat(8, 1fr);
    overflow: hidden;
  }

  .square {
    aspect-ratio: 1 / 1;
    border: 1px solid var(--color-ui-hover);
    border-radius: var(--border-radius)
  }
</style>

<div class="wide stylesheet ppa">
  <!-- below HTML renders as preformatted text if there is a blank line. Does not render as markdown either, unless it's not nested. Then it works. idk -->
  <div class="ppa">
    <h1 class="mt0">Here's how H1 looks like</h1>
    <h2>And this is how H2 does</h2>
    <h3>H3 and H4 look the same</h3>
    <h5>H5 forces uppercase!</h5>
    <p class="mn2">Normal text is rendered like this. Text can be in *italics*, **bolded**, <span class="muted">muted</span>, or <span class="faint">muted even more</span>.</p>
    <p class="small">Small text is used for descriptions or captions.</p>
    <p class="smaller">Smaller text is there for you in those rare moments when you need to whisper something.</p>
    <a class="mn2">Links are underlined like this</a>.
    <br>
    <a class="extlink">External links are marked with an arrow</a>.
    <ul class="mn2">
      <li>This is a list item.</li>
        <ul>
          <li>Of course they can be nested.</li>
        </ul>
    </ul>
    <ol>
      <li>And indexed as well.</li>
    </ol>
    <blockquote class="mn2">
      <p>Blockquotes look like this</p>
    </blockquote>
    <kbd class="mn2">K</kbd><kbd>E</kbd><kbd>Y</kbd><kbd>S</kbd> and <code>code</code> both use <code>monospace</code>.
    <p class="mn2 mb">Colors:</p>
    <div class="swatch">
      <div class="square bg-re"></div>
      <div class="square bg-or"></div>
      <div class="square bg-ye"></div>
      <div class="square bg-gr"></div>
      <div class="square bg-cy"></div>
      <div class="square bg-bl"></div>
      <div class="square bg-pu"></div>     
      <div class="square bg-ma"></div>
    </div>
  </div>

  <div class="ppa">

  ```python
  print("code blocks make use of https://github.com/shikijs/shiki, with github dark theme")
  ```

  <pre style="overflow:auto; margin:auto">
Preformatted text exist for various uses.
Notably, things like this:
 
 ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣀⣀⠀⠀⣀⡠⠴⠒⠚⠉⠉⠓⠒⠦⣄⣶⠒⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡷⢬⣉⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠠⡌⠻⣧⢻⣧⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣖⠗⡋⢹⠀⠀⢰⡄⠀⠀⢸⣷⡀⠀⣠⠽⣆⢼⣇⢻⣸⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⡜⣡⣶⢋⡏⠙⢢⣏⣇⠀⠀⠈⣇⡵⡏⠀⠀⢹⡏⢾⣿⠃⢿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣾⢿⢻⣏⣿⡇⡄⣾⠀⠹⡄⠄⠀⡇⠀⠹⣤⠈⠹⣿⣾⢸⠀⢘⣷⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢠⣴⣯⣿⣽⣿⣷⢸⡗⠦⣄⡹⣼⣄⣿⣴⠛⠹⡄⡇⣿⣿⠾⠚⢹⢿⢽⣽⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⣿⣞⣾⣿⢿⣯⢻⢻⡴⠞⠁⠈⠻⣿⣌⡉⠓⣿⣰⡿⠀⠀⠀⠸⡜⡾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⡴⣡⠊⢸⣹⠁⠈⠙⣾⡄⠁⠀⢰⠛⠉⠉⠉⢳⣀⣿⣿⠃⠀⠀⣀⣀⣧⣿⡞⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣠⠋⡴⠁⠀⠸⢿⣤⣤⣤⣹⣿⣷⣶⣾⣷⣶⣶⣺⣋⣽⣿⣷⠶⠟⠛⠋⢧⠀⠀⠸⡜⣷⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⡜⠁⡰⠁⠀⠀⢠⡿⠀⠀⠀⠉⠉⠉⠙⢻⡟⣹⣿⠃⣿⠋⠁⠀⠀⠀⠀⠀⠸⡄⠀⠀⢣⠹⣧⠀⠀⠀⠀⠀⠀⠀
⠀⢠⠏⡀⢠⠇⠀⠀⢠⡿⠁⠀⠀⠀⠀⣤⣶⡴⠚⢻⠡⣸⠀⢹⣆⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠸⡄⢻⣇⠀⠀⠀⠀⠀⠀
⢀⡏⣼⠁⢸⠀⠀⠀⣾⠃⠀⠀⠀⠀⠀⢻⣿⣧⣀⣬⠋⠁⠀⣠⣿⣶⣆⠀⠀⠀⠀⠀⡇⠀⠀⠀⡇⠈⣿⡀⠀⠀⠀⠀⠀
⣸⣸⣿⠀⡇⠀⢰⣸⡟⠀⠀⠀⣀⣠⠴⠚⣟⣻⣧⣯⣗⣤⣾⣿⣿⡿⠋⠀⠀⠀⠀⣸⣤⠀⠀⠀⡇⡆⢻⠃⠀⠀⠀⠀⠀
⣿⡿⢸⡀⣇⠀⣸⣿⡁⠀⣾⣻⡁⣀⣤⣶⠟⠋⠉⠛⢿⣋⣻⡏⠉⠀⠀⠀⠀⠀⢰⣿⡇⠀⠀⠀⣷⡇⣸⡄⠀⠀⠀⠀⠀
⠿⠇⠀⢧⢸⠀⣿⡿⠇⠀⠈⠛⠛⠋⠉⠀⠀⠀⠀⠀⡟⠀⣿⠇⠀⠀⠀⠀⠀⢠⣿⣿⡇⠀⠀⣰⡿⣧⣿⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢿⣄⣹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡇⠀⣿⠀⠀⠀⠀⠀⠀⣸⡿⢸⠁⢠⣾⠋⢰⣿⡏⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠉⠛⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣶⣶⡿⠀⠀⠀⠀⠀⠀⠉⠁⢸⣶⡟⠁⠀⠾⠟⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  </pre>
  <table class="mn1">
    <tr>
      <td>Table heading 1</td>
      <td>Table heading 2</td>
    </tr>
    <tr>
      <td>Item A</td>
      <td>Description aa</td>
    </tr>
    <tr>
      <td>Item B</td>
      <td>Description bb</td>
    </tr>
    <tr>
      <td>Item C</td>
      <td>Description cc</td>
    </tr>
  </table>
  </div>
</div>

For sanaBlog, I use two CSS files: A modified version of `normalize.css` by <a href="https://github.com/necolas" target= "_blank" class="extlink" >Nicolas Gallagher</a>, and `initialise.css` for everything else. CSS specific to individual pages is included directly within their respective files. Let's see how I made this page by walking through `initialise.css` and explore the reasoning behind some of the design choices I’ve made.

## Objective

```css
/* the goal is to use more variables so it's easier to be consistent */
/* also trying out functional css so that styles are modularised and easily changed in html  */
/*     Q: why don't you use tailwind?    A: skill issue                                      */
/* also i don't want to name things like [page]_[classname] any more because that's cursed   */
/* also i was making entire classes for things i'd only use once, so let's not do that       */
```
I'm being pretty honest here. I wanted to experiment with functional (atomic) CSS and improve the quality of my code by introducing variables, maintaining consistent naming conventions, and so on. However, I did not want to adopt "industry standard" tools like Tailwind—or god forbid, Bootstrap. Vanilla CSS works well enough for this site.

## Variables

```css
:root {
  --font-content: Helvetica, Arial, sans-serif;
  --font-mono: FiraCode, Consolas, monospace;
  --border-radius: 4px;
  --font-small: 0.875em; /* 16 to 14 */
  --font-smaller: 0.8em; 
  --wrap-wide: 1000px;
  --wrap-normal: 70ch;
  --image-radius: 8px;
  --line-height: 1.5;
}

@media (max-width: 860px) {
  :root {
    --wrap-normal: 88vw;
    --wrap-wide: 100vw;
  }

  :root .wide {
    --border-radius: 0;
    --image-radius: 0;
  }
}
```

Here, I’ve established some foundational variables. `--wrap-normal` is set to 70 characters wide with a line height of 1.5 for comfortable reading. I also incorporated the ever-controversial rounded corners just so I could ![rant about them](/blog/work/rounded-corners).

## Colors

Next, I incorporated <a href="https://github.com/kepano/flexoki" target= "_blank" class="extlink" >Flexoki</a>, a color scheme emulating ink on paper for an analog look that I've come to love.

## Spacing

```css
/* Padding */
.p0 { padding: 0 }
.pt0 { padding-top: 0 }
.pr0 { padding-right: 0 }
.pb0 { padding-bottom: 0 }
.pl0 { padding-left: 0 }

.pa { padding: 1rem }
.pt { padding-top: 1rem }
.pr { padding-right: 1rem }
.pb { padding-bottom: 1rem }
.pl { padding-left: 1rem }

.ppa { padding: 2rem }
.ppt { padding-top: 2rem }
.ppr { padding-right: 2rem }
.ppb { padding-bottom: 2rem }
.ppl { padding-left: 2rem }

.pn1 { padding-top: 2rem }
.pn2 { padding-top: 4rem }
.pn3 { padding-top: 6rem }
.pn4 { padding-top: 8rem }

.ps1 { padding-bottom: 2rem }
.ps2 { padding-bottom: 4rem }
.ps3 { padding-bottom: 6rem }
.ps4 { padding-bottom: 8rem }

/* Margins */
.mt0 { margin-top: 0 }
.mr0 { margin-right: 0 }
.mb0 { margin-bottom: 0 }
.ml0 { margin-left: 0 }

.mt { margin-top: 1rem }
.mr { margin-right: 1rem }
.mb { margin-bottom: 1rem }
.ml { margin-left: 1rem }

.mmt { margin-top: 2rem }
.mmr { margin-right: 2rem }
.mmb { margin-bottom: 2rem }
.mml { margin-left: 2rem }

.mn1 { margin-top: 2rem }
.mn2 { margin-top: 4rem }
.mn3 { margin-top: 6rem }
.mn4 { margin-top: 8rem }

.ms1 { margin-bottom: 2rem }
.ms2 { margin-bottom: 4rem }
.ms3 { margin-bottom: 6rem }
.ms4 { margin-bottom: 8rem }
```

I noticed that using `rem` as a unit is infinitely easier to work with than pixels when it comes to responsive design. One thing I'm not a fan of is how  `.mmb` and `.ms1` have the exact same purpose, but I did not want to exclude `.ms1` for the sake of consistency. `n` and `s` stands for North and South respectively.

## Styling

Here is the bulk of the styling. Let's break it down into parts:

### Scrollbar

```css
::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: var(--color-ui-normal);
}
```
<p class="small muted c">scrollbar hijacking is controversial but i'm for it</p>

### Basic text

```css
html {
  width: 100%;
  height: 100%;
  font-size: 10px;
}

body {
  color-scheme: light dark;
  background-color: var(--color-bg-primary);
  padding: 3.2rem 0 32rem;
  color: var(--color-tx-normal);
  line-height: var(--line-height);
  font-family: var(--font-content);
  font-size: calc(1.4rem + 0.25vw);
}

.small {
  font-size: var(--font-small);
  line-height: 1.4;
}

.smaller {
  font-size: var(--font-smaller);
  line-height: 1.4;
}

.muted { color: var(--color-tx-muted) }

.faint { color: var(--color-tx-faint) }

.action { color: var(--color-action) }

.font-content { font-family: var(--font-content) }

.font-ui { font-family: var(--font-content) }

.font-mono { font-family: var(--font-mono) }

/* p {} */

.l { text-align: left }
.r { text-align: right }
.c { text-align: center }
.j { text-align: justify }
```

Most of these are trivial, but notice how `font-size` in `html` is exactly 10 pixels, while `font-size` in `body` is calculated to be approximately 16 pixels—an ideal size for most viewports. This setup allows me to use `rem` for spacing, working with multiples of ten when spacing things. 

The `var(--font-small)` variable is set to 0.875 em, reflecting the ratio between 16 and 14. Using variables enables me to adjust nearly all aspects of text formatting by tweaking a few values at the head of the document.

### Content wrapper

```css
content {
  display: block;
  max-width: var(--wrap-wide);
  width: var(--wrap-normal);
  margin-left: auto;
  margin-right: auto;
}

content .wide {
  width: Min(100vw, var(--wrap-wide));
  margin-left: calc((Min(100vw, var(--wrap-wide)) - 100%)/-2);
}
```

I'm not sure if this is the best way to center `.wide` elements, but here it is anyway.

## Miscellaneous

```css
.extlink {
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='Layer_2' data-name='Layer 2' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cstyle%3E .cls-1 %7B fill: rgb(135, 133, 128); stroke-width: 0px; %7D %3C/style%3E%3C/defs%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpath class='cls-1' d='M67.99,91.53L4.92,28.47C-5.11,18.44,1.12.85,15.28.03c.39-.02.78-.03,1.18-.03h60c11.05,0,20,8.95,20,20v60c0,.39-.01.79-.03,1.18-.82,14.16-18.4,20.39-28.43,10.36Z'/%3E%3C/g%3E%3C/svg%3E");
  background-position: right 10%;
  background-repeat: no-repeat;
  background-size: 0.55em;
  padding-right: 0.7em;
}
```
<p class="small muted c">arrows for external links.</p>

```css
pre code {
  background-color: transparent;
}    
```
<p class="small muted c">`code` has a background that needs to be removed if in a code block</p>

```css
img {
  width: auto;
  height: auto; /* these stupid things exist because Astro <Image> forces a width and height that must be overridden by these */
  max-width: 100%;
  display: block;
  border-radius: var(--image-radius);
}  
```
<p class="small muted c">figuring this out took an embarrassingly long hour.</p>

This is obviously not comprehensive. I've excluded many elements and classes, but all of them are even more trivial than the above examples that are frankly elementary.

<br>

<span id="lastupdate" class="muted">last updated on Jan 31, 2025</span>
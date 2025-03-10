---
cover: "../../../assets/blog/code/tidbits/cover.png"
coverAlt: "tidbits"
# banner: "../../../assets/blog/code/tidbits/banner.png"
# bannerAlt: "tidbits"

title: "tidbits"
description: "A collection of the dumbest, littlest things. In no particular order."
# author:
publicationDate: 2024-05-22
# creationDate: "May 2024"
sortOrder: 3
---

1. ### last updated

Should `last updated` be at the head of your content, or at the end? To those who revisit the page regularly for updates, the former would obviously be helpful, but it draws precious attention away from the title or header image.

Should it be sentence case, lowercase, or title case?

**verdict:** <a href="#lastupdate">at the feet</a>, in lowercase.

2. ### quick links

Should an interpunct (U+00B7) or a vertical bar (U+007C) be used as separators for these [quick links](/blog/reviews)?

<div class="flex justify-center mmb">
  <a class="plain mmr">music</a>&centerdot;
  <a class="plain mml mmr">games</a>&centerdot;
  <a class="plain mml mmr">film</a>&centerdot;
  <a class="plain mml mmr">webtoon</a>&centerdot;
  <a class="plain mml">tools</a>
</div>
<div class="flex justify-center">
  <a class="plain mmr">music</a>&VerticalLine;
  <a class="plain mml mmr">games</a>&VerticalLine;
  <a class="plain mml mmr">film</a>&VerticalLine;
  <a class="plain mml mmr">webtoon</a>&VerticalLine;
  <a class="plain mml">tools</a>
</div>

In code, should `&centerdot;` be used for clarity or is the conciseness of `&xB7;` more favourable?

**verdict:** `&centerdot;`.

3. ### ascending

*Why don't you provide ascending or descending sort options?* (aka: should i?)

I don't have that many entries to warrant them.

Side note: Is `Name (A-Z)` better than `Name (ascending)`? Perhaps `Name (alphabetical, ascending)`? What about `Number (High to Low)` compared to `Number: Descending`? Check this out: <a href="http://contemporary-home-computing.org/turing-complete-user/" target="_blank" class="extlink">contemporary-home-computing.org/turing-complete-user</a> and decide for yourself.

4. ### abbreviations

<div style="overflow:auto; width:25em;">

| |      |      |
|-|:-----|:-----|
| | CPU  | Processor
| | Mobo | Motherboard
| | RAM  | Memory
| | SSD  | Storage
| | GPU  | Video Card
| | PSU  | Power Supply
| | Case | Case

</div>

**verdict:** abbreviated.

5. ### slice

```js
return reviewEntries.map((entry) => ({
  // Removes "[directory]/" prefix from the slug. slice() isn't used for clarity
  params: { slug: entry.slug.replace(/^(music\/)/,"") },
  props: { entry },
}));
```

Regex sucks to use and `slice()` should be more performant, yet I went with regex in this case. Ask yourself if you agree with me.

6. ### file structure

<pre style="overflow:auto; margin:auto">
        📂parent                            📂parent
        ├─📂foo                             ├─📂foo
        │  ├─📜index.html                   │  └─📜(stuff)
        │  └─📜(stuff)                      ├─📜foo.html
        ├─📂bar                  or         ├─📂bar
        │  ├─📜index.html                   │  └─📜(stuff)
        │  └─📜(stuff)                      ├─📜bar.html
        └─📂qux                             └─📂qux
</pre>

The former makes intuitive sense at first glance but looking at multiple `index` files in your editor can be annoying. Pick your poison.

7. ### music table

<table id="reviewsContainer">
  <tr>
    <td class="column-image">
      <img src="https://ia801501.us.archive.org/29/items/mbid-0b73a715-d02f-40bd-b881-23e0e26f4b00/mbid-0b73a715-d02f-40bd-b881-23e0e26f4b00-34442586705_thumb250.jpg" />
    </td>
    <td>
      <a class="plain">Nebulous You</a>
      <br />
      <span class="muted">Della Zyr &centerdot; 2022</span>
    </td>
    <td><span class="muted">2020. 2. 12.</span></td>
    <td>78</td>
  </tr>
    <tr>
    <td class="column-image">
      <img src="https://ia801501.us.archive.org/29/items/mbid-0b73a715-d02f-40bd-b881-23e0e26f4b00/mbid-0b73a715-d02f-40bd-b881-23e0e26f4b00-34442586705_thumb250.jpg" />
    </td>
    <td>
      <a class="plain">Nebulous You</a>
      <br />
      <span class="small">Della Zyr &centerdot; 2022</span>
    </td>
    <td><span class="muted">2020. 2. 12.</span></td>
    <td>78</td>
  </tr>
    <tr>
    <td class="column-image">
      <img src="https://ia801501.us.archive.org/29/items/mbid-0b73a715-d02f-40bd-b881-23e0e26f4b00/mbid-0b73a715-d02f-40bd-b881-23e0e26f4b00-34442586705_thumb250.jpg" />
    </td>
    <td>
      <a class="plain">Nebulous You</a>
      <br />
      <span class="small">Della Zyr &centerdot; </span><span class="small muted">2022</span>
    </td>
    <td><span class="muted">2020. 2. 12.</span></td>
    <td>78</td>
  </tr>
</table>

<style>
  .column-image {
    width: 4em;
  }

  .column-image img {
    border-radius: 0;
    /* transition: border-width 50ms; */
  }

  .column-image img:hover {
    border-style: solid;
    border: 1px solid transparent;
  }
</style>

**verdict:** muted (first option).

8. ### external links

<a class="extlink">External link indicator before punctuation</a>. Next sentence.

<a class="extlink">External link indicator after punctuation.</a> Next sentence.

**verdict:** <a class="extlink plain">before</a>.

9. ### mie density

![Various render settings](../../../assets/blog/code/tidbits/compare.png)

**verdict:** full lighting (first option).

10. ### intro

It was difficult choosing between these three:

1. Welcome to <a class="extlink">my blog that is not</a>.

2. This is <a class="extlink">my blog that is not</a>.

3. sanaBlog is <a class="extlink">a blog that is not</a>.

While the differences look (and arguably, are) insignificant, I still struggled over this as it was one of the first thing a newcomer would read on my site, as well as it being a defining headline that ultimately dictates if they are welcome or not.

**verdict:** 3, though I might opt for it to be random.

11. ### vending machines

<div class="wide">

  ![Various image settings](../../../assets/blog/code/tidbits/spread.png)
</div>
<p class="small muted c">left to right: 250px B&W, 250px B/W/R, 400px B&W, 400px B/W/R</p>

**verdict:** 250px B&W.

12. ### capital letters

rUle oF ThUMb for capitalisation:
1. Sentences should be in sentence case. If a period is warranted, so is an initial capital.

2. Buttons, links, and UI elements need not be capitalised, especially if they are `muted` or `faint`. Exceptions to this are common UI elements such as `Sort by:`, which should follow conventions for user familiarity.

3. Page titles are free game. Stylised however I want.

4. Unique headings should be capitalised. Headings for a list (like this one) need not be.

5. **any of the above should be ignored and broken if deemed fit.**

<br>

13. ### is an unlucky number

**verdict:** maybe.

14. ### note

Should notes have a period? Should they come italicised? Should they be muted? Not sure how informal or prominent I want them to be.

- Note: this was originally a discord message

- Note: this was originally a discord message.

- *Note: this was originally a discord message*

- *Note: this was originally a discord message.*

This was hard, and I notice a trend: the less important a decision is, the harder it is for me to make.

**verdict:** italicised with period. Not muted.

15. ### CPU

<pre class="c" style="overflow: auto; margin:auto">
<span style="color: var(--color-bl)">AMD Ryzen™</span> <span style="color: var(--color-cy)">AI</span> <span style="color: var(--color-gr)">9</span> <span style="color: var(--color-ye)">9</span><span style="color: var(--color-or)">7</span><span style="color: var(--color-re)">00</span>     /     <span style="color: var(--color-bl)">AMD Ryzen™</span> <span style="color: var(--color-cy)">AI</span> <span style="color: var(--color-gr)">7</span> <span style="color: var(--color-ye)">9</span><span style="color: var(--color-or)">6</span><span style="color: var(--color-re)">50</span>
</pre>
<br>
<pre class="c" style="overflow: auto; width:25em; margin:auto">
<span style="color: var(--color-bl)">AMD Ryzen™</span> <span style="color: var(--color-cy)">AI</span> <span style="color: var(--color-gr)">9</span> <span style="color: var(--color-ye)">9</span><span style="color: var(--color-or)">7</span><span style="color: var(--color-re)">00</span>
------
<span style="color: var(--color-bl)">AMD Ryzen™</span> <span style="color: var(--color-cy)">AI</span> <span style="color: var(--color-gr)">7</span> <span style="color: var(--color-ye)">9</span><span style="color: var(--color-or)">6</span><span style="color: var(--color-re)">50</span>
</pre>

**verdict:** one line (first option).

16. ### Colons

> bringing the complete roundup to 3, 5, 7, 9, AI 9, and AI 9 HX.

Correct and used.

> bringing the complete roundup to: 3, 5, 7, 9, AI 9, and AI 9 HX.

Incorrect, not used.

> `Ultra` is one of four versions in a generation: the base model, Pro, Max, and Ultra.

Correct and used.

> `Ultra` is one of four versions in a generation the base model, Pro, Max, and Ultra.

Incorrect, not used.

> Their current flagship desktop CPU name looks like this: [preformatted text]

Correct and used.

> If that’s the case, why not something like: [preformatted text]

Incorrect but still used.

> So, if suffixes are somehow useless now, why not: [preformatted text]

Also incorrect but used.

> Apple's most powerful chip as of now is named: [preformatted text]

Also incorrect but used.

**verdict:** I'm not a good writer.

17. ### Quotes

> *しかし、Tokyo Shoegazerって、恥ずかしいバンド名といい、完コピっぷりといい、ネタバンドかと思ったら、実際に活動してるっぽいですね。カバーするなら新しい解釈で演奏するべきです。オリジナルと異なるアイディアがないのなら、発表する価値はないと思います。*
> <p class="muted">However, Tokyo Shoegazer, with its embarrassing band name and its perfect copy, made me think they were a joke band […]. If you’re going to cover a song, you should do it with a fresh interpretation. If you don't have any different ideas from the original, I don't think it is worth publishing.</p>

I suppose this is the way to go about translated text. The way blockquotes work aren't standard so I'm basing mine loosely off <a href="https://en.wikipedia.org/wiki/Template:Blockquote" target="_blank" class="extlink">Wikipedia</a>.

> On "When You Sleep" it sounds like me and Bilinda singing together, but it's just me – me slowed down and me speeded up at the same time. Some songs we sang over and over until we got bored – usually between 12 and 18 times. I started sorting through the tapes and it did my head in, so I just played them all together and it was really good – like one, vaguely distinct voice.
> 
>– Kevin Shields

I use an en dash here for no good justified reason.

<br>

<span id="lastupdate" class="muted">last updated on Jan 25, 2025</span>
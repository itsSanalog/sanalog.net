---
cover: "../../../assets/blog/code/tidbits/cover.png"
coverAlt: "tidbits"
# banner: "../../../assets/blog/code/tidbits/banner.png"
# bannerAlt: "tidbits"

title: "tidbits"
description: ""
# author:
publicationDate: 2024-05-22
# creationDate: "May 2024"
sortOrder: 3
---

A collection of the dumbest, littlest things. In no particular order.

<br>

1. ### Last updated

Should `last updated` be at the head of your content, or at the end? To those who revisit the page regularly for updates, the former would obviously be helpful, but it draws precious attention away from the title or header image.

Should it be sentence case, lowercase, or title case?

**verdict:** <a href="#lastupdate">at the feet</a>, in lowercase.

2. ### Quick links

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

3. ### Ascending

*Why don't you provide ascending or descending sort options?* (aka: should i?)

I don't have that many entries to warrant them.

Side note: Is `Name (A-Z)` better than `Name (ascending)`? Perhaps `Name (alphabetical, ascending)`? What about `Number (High to Low)` compared to `Number: Descending`? Check this out: <a href="http://contemporary-home-computing.org/turing-complete-user/" target="_blank" class="extlink">contemporary-home-computing.org/turing-complete-user</a> and decide for yourself.

4. ### Abbreviations

|||
|:-----|:---|
| CPU  | Processor
| Mobo | Motherboard
| RAM  | Memory
| SSD  | Storage
| GPU  | Video Card
| PSU  | Power Supply
| Case | Case

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

6. ### File structure
```
📂parent                            📂parent
 ├─📂foo                             ├─📂foo
 │  ├─📜index.html                   │  └─📜(stuff)
 │  └─📜(stuff)                      ├─📜foo.html
 ├─📂bar                  or         ├─📂bar
 │  ├─📜index.html                   │  └─📜(stuff)
 │  └─📜(stuff)                      ├─📜bar.html
 └─📂qux                             └─📂qux
```
The former makes intuitive sense at first glance but looking at multiple `index` files in your editor can be annoying. Pick your poison.

7. ### Music table

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

8. ### External links

<a class="extlink">External link indicator before punctuation</a>. Next sentence.

<a class="extlink">External link indicator after punctuation.</a> Next sentence.

**verdict:** <a class="extlink plain">before</a>.

9. ### Mie density

![Various render settings](../../../assets/blog/code/tidbits/compare.png)

**verdict:** full lighting (first option).

<br>

<span id="lastupdate" class="muted">last updated on Jun 26, 2024</span>
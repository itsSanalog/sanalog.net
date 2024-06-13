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

A collection of the dumbest, littlest things

<br/>

1. ### Last updated

Should `last updated` be at the head of your content, or at the end? To those who revisit the page regularly for updates, the former would obviously be helpful, but it draws precious attention away from the title or header image.

Should it be sentence case, lowercase, or title case?

**verdict:** at the feet, in lowercase.

2. ### Quick links

Should an interpunct (U+00B7) or a vertical bar (U+007C) be used as separators for [these links](http://localhost:4321/blog/reviews)?

In code, should `&centerdot;` be used for clarity or is the conciseness of `&xB7;` more favourable?

**verdict:** `&centerdot;`.

3. ### Ascending

*Why don't you provide ascending or descending sort options?* (aka: should i?)

I don't have that many entries to warrant them.

Side note: Is `Name (A-Z)` better than `Name (ascending)`? Perhaps `Name (alphabetical, ascending)`? What about `Number (High to Low)` compared to `Number: Descending`? Check this out http://contemporary-home-computing.org/turing-complete-user/ and decide for yourself.

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
// Remove the "[directory]/" prefix from the slug. slice() isn't used for clarity
params: { slug: entry.slug.replace(/^(music\/)/,"") },
props: { entry },
}));
```
Regex sucks and `slice()` should be more performant, yet I went with regex in this case.

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
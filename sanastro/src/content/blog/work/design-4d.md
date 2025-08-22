---
cover: "../../../assets/blog/work/design-4d/cover.png"
coverAlt: "design-4d"
# banner: "../../../assets/blog/work/design-4d/banner.png"
# bannerAlt: "design-4d"

title: "Design 4D!"
description: ""
# author:
publicationDate: 2025-08-21
# creationDate: "August 2025"
sortOrder: 4
---

Say you have to make a pocket radio. You have to include a circuit board, a speaker, and two AA batteries.

![](../../../assets/blog/work/design-4d/parts.png)(class: theme-aware, style: margin: auto;)

<p class="small muted c">a circuit board, a speaker, and two AA batteries</p>

You might go with an arrangement like this:

![](../../../assets/blog/work/design-4d/bad1.png)(class: theme-aware, style: margin: auto;)

<p class="small muted c">look at that mighty ergonomic handle</p>

Designing *as little as possible*, we can save some space by removing those ugly, unnecessary cavities:

![](../../../assets/blog/work/design-4d/bad.png)(class: theme-aware, style: margin: auto;)

But following good design principles, you will probably end up with this: 

![](../../../assets/blog/work/design-4d/arrange.png)(class: theme-aware, style: margin: auto;)

Indeed, this is what every sensible designer would do.

![](../../../assets/blog/work/design-4d/atom.jpg)

![](../../../assets/blog/work/design-4d/atom2.jpg)

<p class="small muted c">blog.naver.com/samurai1696/220379264970</p>

To many readers, the 'optimal' arrangement would have been immediately obvious. For product designers, this fundamental exercise is trivial and second nature. However, I wanted to investigate what goes on in our minds that makes us collectively arrive at the same answer. I assume your thought process is something very similar to mine:

> Since the product is a pocket radio, portability is the top priority for arranging the components. The largest parts are the PCB and the speaker, but AA batteries are thick. I'll thus overlap the speaker on the circuit board. The PCB could be L-shaped to accomodate the batteries. This way, not only have we minimised unused space inside the casing, but also the minimum bounding box (MBB) of the product, ensuring it fits comfortably in pockets.

# Quantifying goodness

Utilising the concept of minimum bounding boxes is very notable, because it explicitly defines a criteria to satisfy—minimise a variable which can be numericalised, calculated, and has a specific global/local minimum. This is why designs converge into one good, sensible, and 'optimal' design. It is also why a thousand people can come up with the same answer when faced with the same assignment. But while this approach creates good (enough) designs, it often fails to output truly exceptional ones.

What if, instead of just three dimensions, we were tasked to maximise the durability of the product as well? Now we have to take time into account, and with it, usage patterns, battery chemistry, 
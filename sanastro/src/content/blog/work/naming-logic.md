---
cover: "../../../assets/blog/work/naming-logic/cover.png"
coverAlt: "Naming Logic"
# banner: "../../../assets/blog/work/naming-logic/banner.png"
# bannerAlt: "Naming Logic"

title: "Naming Logic"
description: "Ranking processor naming schemes from various manufacturers."
# author:
publicationDate: 2024-07-04
# creationDate: "July 2022"
sortOrder: 2
---

Silicon is ubiquitous! I often get asked to help configure different systems, but this industry of making rocks think has been so dynamic and fast-moving that what little knowledge I have is apparently outdated. I think such a situation is relatable to many.

Let's take a look at how different chipmakers name and categorise their products. It's the chips of the personal computing space that one would make the most use of understanding, so those are what we'll focus on.

# Intel

Let's look at Intel's *Intel Core* lineup, which replaced Pentium as Intel's main consumer CPU line.

Doing a web search for 'Intel Core processor naming scheme' gives us two main results: <a href="https://www.intel.com/content/www/us/en/processors/processor-numbers.html" target="_blank" class="extlink">A Brief Guide to Our Latest Processor and Naming Updates</a> and <a href="https://www.intel.com/content/www/us/en/gaming/resources/gaming-processor-names.html" target="_blank" class="extlink">Intel® Processor Names for Gaming Computers</a>. The second article is full of the word 'gaming', but it is comprehensive enough and not only for gamers. The two are similar in content.

Their current flagship desktop CPU name looks like this:

<pre style="overflow: auto; ">
<span style="color: var(--color-bl)">Intel® Core™</span> <span style="color: var(--color-gr)">i9</span> processor <span style="color: var(--color-ye)">14</span><span style="color: var(--color-re)">900</span><span style="color: var(--color-ma)">K</span>
</pre>

> As a rule, the brand will come first, followed by the processor family, then the processor number—which contains the processor’s generation and SKU numbers—and, in some cases, the product line suffix.

The brand modifier `i_` is an iconic term that serves its purpose excellently, managing to penetrate and reside in the minds of the general consumer since its introduction in 2010. Ask any person and they could probably tell you an i7 is a 'good' processor. Despite i3 being conveniently left out in the article, there are four tiers: i3, i5, i7, and i9, with the last one only introduced in 2017. Very intuitive.

In the above example, `14` indicates generation, while `900` is the SKU number. In both, higher is better. While not immediately transparent, this is a good enough system anyone could use to compare two products quickly. Big number, big good.

The suffix is opaque, with arbitrary letters denoting some arbitrary variation. Below is a non-comprehensive list taken from <a href="https://www.intel.com/content/www/us/en/support/articles/000058567/processors/intel-core-processors.html" target="_blank" class="extlink">Intel's documentation</a>, but as you can see it's a complete mess, even after I picked the most useful.

|   |   |
|:-:|:--|
| K | Unlocked |
| S | Special edition |
| F | Requires discrete graphics |
| G | Includes discrete graphics on package |
| T | Power-optimised lifestyle (??) |
| X | Unlocked, High End |
|   |   |
| H | High performance for mobile |
| U | Mobile power efficient |
| Y | Mobile extremely low power |
| P<a href="#rfn:1" id="fn:1" class="footnote">*</a> | Performance optimised for thin and light laptops

<a href="#fn:1" id="rfn:1" class="reversefootnote mr">*</a><span class="muted">As far as I could tell, P has been deprecated in favour of H.</span>

Still, this is fine. In fact, I would argue that it was smart of Intel to marginalise the series name by including them in the form of a single letter suffix. By putting such indication in the periphery, inexperienced buyers are less likely to be overwhelmed. If you are the kind of person to need an unlocked CPU so you can overclock it, you wouldn't have a problem with this scheme either.


## Intel, again

Bad news. All of the above is now outdated. Shame. At the end of 2023, Intel announced a revision of their naming scheme for Core series processors. This has made a lot of people very angry and been widely regarded as a bad move. As of writing this, we are stuck in an awkward transitionary phase where consumers are faced with two different rules from the same company. It's a whole mess.

We now have something like:
<pre style="overflow: auto; ">
<span style="color: var(--color-bl)">Intel® Core™</span> <span style="color: var(--color-gr)">7</span> processor <span style="color: var(--color-ye)">1</span><span style="color: var(--color-re)">50</span><span style="color: var(--color-ma)">U</span>
</pre>

Changes:

- The 'i' branding is dropped, and the number is called a 'Brand Level' now.
- Generations has been reset to 1, and are called 'Series' now.
- SKU has been shortened to two digits, bringing the overall processor number to three digits (previously 4-5).

Overall, this doesn't change much. Why did they bother?

### What in the Ultra

<pre style="overflow: auto; ">
<span style="color: var(--color-bl)">Intel® Core™ Ultra</span> <span style="color: var(--color-gr)">9</span> processor <span style="color: var(--color-ye)">1</span><span style="color: var(--color-re)">85</span><span style="color: var(--color-ma)">H</span>
</pre>

It's because of the 'Ultra' lineup that was newly introduced. Let's see what it means.

> In addition to Intel® Core™ processor, we have also introduced Intel® Core™ Ultra processors. Designed for premium laptops, these advanced processors will usher in the age of the AI PC by featuring Intel’s first integrated neural processing unit, or NPU, for power-efficient AI acceleration and local inference on PC.

...what?

If we look past the marketing jargon, the brand reboot makes sense. Intel has adopted the chiplet architecture for its latest <a href="https://en.wikipedia.org/wiki/Meteor_Lake" target="_blank" class="extlink">Meteor Lake</a> microarchitecture, finally abandoning monolithic silicon dies. This conveniently comes with NPUs as they say above, just in time for the AI fever.

Clearly Intel wants to distinguish their disaggregated multi-chip module (MCM) processors from their existing products, so an Ultra branding was introduced. While they are at it, they thought it was a good time to refresh the mainline series' names as well. Fair enough, but there are certain hiccups in their execution that are simply infuriating:

1. An Ultra processor is never necessarily better than a non-Ultra one. Horrid.

2. There is an overlap between Core Ultra 5 / 7 and Core 5 / 7.

3. Every Raptor Lake chip followed the old naming scheme, but the <a href="https://en.wikipedia.org/wiki/Raptor_Lake#Raptor_Lake-U_Refresh" target="_blank" class="extlink">Raptor Lake-U Refresh</a> debuted under the new naming scheme as 'Intel Core 7 150U' and such. WHY?

4. What the NPU provides to the end user is either useless or underwhelming, although this should change as time passes and software takes better advantage of the hardware capabilities.

Despite such radical changes, the processor numbering system did not change much so my opinion remains unchanged.

(With these changes also came the 'N' prefix, but I won't even bother discussing that.)

## Overall thoughts

Intel's influence on the market has made even the average Joe aware of the i_ moniker, only for them to throw it away. Either way, the 3/5/7/9 tier numbering has a fundamental problem in that it does not differentiate generations. That number can be a good gauge of performance, but only if you are looking at processors from comparable generations. This matters less when one is choosing a brand new computer, but the second hand market is rampant with sellers who take terribly underpowered, older i7's and pose as if they are more performant than a newer gen i5. It is truly saddening to hear stories of people who talk about getting a steal of a used PC, only for me to find out that it's something like an i7-6700K (granted, that is quite useable).

Given a simple introduction, the processor number format is uncomplicated to understand and reasonably coherent. Regrettably, no part of a product's name suggests some absolute measure of performance, but that's the norm and relative performance is what consumers look for anyway.

While the controversial naming refresh is justified, the Ultra designation feels like a knee-jerk reaction to the emergence of AI. Some Ultra models can be outperformed by non-Ultra processors, so what does the term Ultra even mean to the end user? To me, it's not much more than a marketing gimmick.

Overall, it's hard to mix two products up, and most terms mean something. Numbering is logical, even if they require a manual to understand. Intel's naming scheme of their *Intel Core* series CPUs would earn itself a solid B tier, **if and only if** Ultra was out of the equation. Otherwise, C tier it is.



<!-- new chipmakers are disrupting the status quo. -->
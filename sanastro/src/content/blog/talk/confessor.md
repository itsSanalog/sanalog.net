---
cover: "../../../assets/blog/talk/confessor/cover.png"
coverAlt: "Confessor"
# banner: "../../../assets/blog/talk/confessor/banner.png"
# bannerAlt: "Confessor"

title: "Confessor"
description: ""
# author:
publicationDate: 2022-06-18
# creationDate: "June 2022"
sortOrder: 16
---

Scalds don't leave marks like cuts do. Cash is untraceable. Breath spray is good to have, though your dentist will be able to tell.

Pressing backspace repeatedly before typing out 'haha' and appending a suggested emoji, not knowing nor caring what it is. Turning the silver knob till it won't anymore, drowning yourself in the gritty reverb of amps and pedals. Hearing your blood flow.

Everyone is born a hater. What good is lamenting the congenital hatred for self, if she has it good? She has a house. She goes to school. Her father doesn't beat her (anymore) and her mother is a great cook. Furthermore, they aren't divorced (yet).

She doesn't talk to boys. Even a speck of lust would be too humbling. I must stand proud, back straight, hair bunned and nails trimmed. Plus, there are girls anyway. Always sheepish, I am herded around.

---

The carpark is her sanctuary. Its white grids are the only indication that it is one; They're easy enough to ignore but just enough to ground her. Today however, it's not empty.

"hi"

No reply.  It's not difficult to speak up here, and so she does. No reply. Peeking through the curtain of hair is the bright orange foam of the girl's headphones, and only upon noticing this does she resort to approaching the girl.

You're in my spot.

*You're not a car.*

Neither are you.

She has a.. frown? Scowl? Whatever it is, I should wear it, not her. I then realise I don't have to calculate my expression before putting on a similar dirty look.

*you're fucking weird*, she says. As she gets up and reveals the bright white line on the ground, I blink. I should not have done that. Before I can turn around and attempt to apologise, the wave of liberating catharsis shuts me up.

She did not smoke that day.

---

Days blend together, and so she cannot tell you how long has passed since that encounter, but she finds herself dethroned once again.

"about that tim--"

*cars don't talk.*

The girl leaves.

---

The surface is scuffed from years of use, but she can make the silhouette of her face out in its piano black finish. The glossy window is oily for some reason, but the deep, saturated blue penetrates through the fingerprints.

You grab the retro oracle and gives it a good shake.

<style>
  .eightball {
    width: 300px;
    height: 300px;
    background-color: var(--flexoki-black);
    border: 4px solid var(--flexoki-paper);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    position: relative;
    cursor: pointer;
  }
  .triangle {
    width: 150px;
    height: 150px;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,100 100,15 0,15" fill="rgb(0, 0, 204)" /></svg>');
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .answer {
    color: var(--flexoki-paper);
    font-size: 0.9em;
    text-align: center;
    width: 100px;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<script>
  const answers = [
    // "It is<br>certain",
    // "It is decidedly so",
    // "Without a doubt",
    // "Yes, definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you<br>now",
    "Cannot predict<br>now",
    "Concentrate and ask again",
    "Don't count<br>on it",
    "My reply is no",
    "My sources say no",
    "Outlook<br>not so<br>good",
    "Very doubtful"
    // "fuck"
  ];

  function shakeThemBalls() {
    const randomIndex = Math.floor(Math.random() * answers.length);
    const answer = answers[randomIndex];
    document.querySelector('.answer').innerHTML = answer;
  }
</script>

<div onclick="shakeThemBalls()" class="mn4 wrap eightball">
  <div class="triangle"></div>
  <div class="answer"></div>
</div>
import { animate, random, createTimeline } from 'animejs';

// Passive rotation
export function initPassiveRotation(root) {
  const elements = root.querySelectorAll('.rotate');
  if (!elements.length) return;
  
  animate(elements, {
    rotate: 360,
    duration: () => random(12000, 20000),
    easing: 'linear',
    loop: true,
  });
}

// Passive drift
export function initPassiveDrift(root) {
  const elements = root.querySelectorAll('.drift');
  if (!elements.length) return;

  elements.forEach((el) => {
    animate(el, {
      translateX: [-4, 4],
      direction: 'alternate',
      easing: 'easeInOutSine',
      duration: random(3000, 6000),
      loop: true,
    });
  });
}

// Bounce on hover
export function initHoverBounce(root) {
  root.querySelectorAll('[data-hover="bounce"]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      animate(el, {
        scale: [1, 1.15],
        easing: 'easeOutElastic(1, .6)',
        duration: 600,
      });
    });
  });
}

// SVG morph on hover
export function initHoverMorph(root) {
  root.querySelectorAll('[data-hover="morph"]').forEach((el) => {
    const path = el.querySelector('.shape');
    if (!path) return;

    const from = path.getAttribute('d');
    const to = path.dataset.alt;
    if (!from || !to) return;

    el.addEventListener('mouseenter', () => {
      animate(path, {
        d: to,
        duration: 500,
        easing: 'outQuad',
      });
    });

    el.addEventListener('mouseleave', () => {
      animate(path, {
        d: from,
        duration: 400,
        easing: 'outQuad',
      });
    });
  });
}


// Scroll animation
export function initScrollAnimation(root) {
  // survivors
  const sanalogS = root.getElementById('sanalogS');
  const sanalogA0 = root.getElementById('sanalogA0');
  const sanalogN = root.getElementById('sanalogN');
  const sanalogA1 = root.getElementById('sanalogA1');
  const sanalogL = root.getElementById('sanalogL');
  const sanalogO = root.getElementById('sanalogO');
  const sanalogG = root.getElementById('sanalogG');

  const aliveShapes = [sanalogS, sanalogA0, sanalogN, sanalogA1, sanalogL, sanalogO, sanalogG];
  
  // die
  const allShapes = Array.from(root.querySelectorAll('.shape, .type'));
  const dyingShapes = allShapes.filter(el => el !==sanalogS && el !==sanalogA0 && el !==sanalogN && el !==sanalogA1 && el !==sanalogL && el !==sanalogO && el !==sanalogG);

  const tl = createTimeline({
    autoplay: false,
    duration: 10 // does this even do anything xd
  });

  // dying anim
  tl.add(document.body, {
    backgroundColor: '#000000',
    easing: 'outQuad',
    duration: 250
  }, 0);

    tl.add(dyingShapes, {
    opacity: 0,
    // fill: '#000000',
    easing: 'outQuad',
    duration: 400
  }, 100);

  // living anim
  tl.add(aliveShapes, {
    fill: '#ffffff',
    easing: 'inOutQuad',
    duration: 400
  }, 0);

  tl.add(sanalogS, {
    translateX: 370,
    easing: 'inOutQuad',
    duration: 600
  }, 525);

  tl.add(sanalogA0, {
    translateX: 255,
    easing: 'inOutQuad',
    duration: 550
  }, 500);
  
  tl.add(sanalogN, {
    translateX: 115,
    easing: 'inOutQuad',
    duration: 500
  }, 450);

  tl.add(sanalogA1, {
    translateX: -50,
    easing: 'inOutQuad',
    duration: 500
  }, 425);

  tl.add(sanalogL, {
    translateX: -165,
    easing: 'inOutQuad',
    duration: 500
  }, 450);

  tl.add(sanalogO, {
    translateX: -405,
    easing: 'inOutQuad',
    duration: 550
  }, 500);

  tl.add(sanalogG, {
    translateX: -545,
    rotate: -390,
    easing: 'inOutQuad',
    duration: 600
  }, 525);

    tl.add(sanalogG, {
    rotate: -360,
    easing: 'linear',
    duration: 50
  }, 1400);
  
  // scroll listener
  window.addEventListener('scroll', () => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = window.scrollY / scrollHeight;

    tl.seek(scrollPercent * tl.duration);
  });
}
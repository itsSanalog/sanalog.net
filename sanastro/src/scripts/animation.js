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
  
  // die
  const allShapes = root.querySelectorAll('.shape, .type');
  const background = document.body;

  const tl = createTimeline({
    autoplay: false,
    duration: 1000
  });

  // dying anim
  tl.add(allShapes, {
    // opacity: 0.1,
    fill: '#000000',
    easing: 'outQuad',
    duration: 300
  }, 0);

  tl.add(document.body, {
    backgroundColor: '#050505',
    easing: 'linear',
    duration: 300
  }, 0);

  // living anim
  tl.add(sanalogS, {
    // translateX: 650,
    // translateY: 100, 
    fill: '#ffffff', 
    easing: 'inOutQuad',
    duration: 700
  }, 200);

  tl.add(sanalogA0, {
    // translateX: 550,
    // translateY: 75, 
    fill: '#ffffff', 
    easing: 'inOutQuad',
    duration: 700
  }, 300);
  
  tl.add(sanalogN, {
    // translateX: 450,
    // translateY: 50, 
    fill: '#ffffff', 
    easing: 'inOutQuad',
    duration: 700
  }, 400);

  tl.add(sanalogA1, {
    // translateX: 350,
    // translateY: 25,
    fill: '#ffffff',
    easing: 'inOutQuad',
    duration: 700
  }, 500);

  tl.add(sanalogL, {
    // translateX: 250,
    // translateY: 0,
    fill: '#ffffff',
    easing: 'inOutQuad',
    duration: 700
  }, 600);

  tl.add(sanalogO, {
    // translateX: 150,
    // translateY: -25,
    fill: '#ffffff',
    easing: 'inOutQuad',
    duration: 700
  }, 700);

  tl.add(sanalogG, {
    // translateX: 50,
    // translateY: -50,
    fill: '#ffffff',
    easing: 'inOutQuad',
    duration: 700
  }, 800);
  
  // scroll listener
  window.addEventListener('scroll', () => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = window.scrollY / scrollHeight;

    tl.seek(scrollPercent * tl.duration);
  });
}
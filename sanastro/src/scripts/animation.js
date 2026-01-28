import { animate, createTimeline, cubicBezier } from 'animejs';

// Passive rotation
export function initPassiveRotation1(root) {
  const elements = root.querySelectorAll('.rotate-90');
  
  animate(elements, {
    rotate: 90,
    ease: 'inOutExpo',
    loop: true,
  });
}

export function initPassiveRotation2(root) {
  const elements = root.querySelectorAll('.rotate-360');
  
  animate(elements, {
    rotate: [0, 180, 360],
    duration: 5000,
    ease: 'outElastic',
    loop: true,
  });
}

// Passive drift
export function initPassiveDrift(root) {
  const elements = root.querySelectorAll('.drift-x');

  elements.forEach((el) => {
    animate(el, {
      translateX: [0, 70, 0],
      ease: cubicBezier(0.7,0.1,0.5,0.9),
      duration: 8000,
      loop: true,
    });
  });
}

// Bounce
export function initPassiveBounce(root) {
  const elements = root.querySelectorAll('.bounce-x');

  elements.forEach((el) => {
    animate(el, {
      translateX: [0, -50, 0],
      ease: 'outBounce',
      duration: 2000,
      loop: true,
      loopDelay: 2000,
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
        ease: 'outQuad',
      });
    });

    el.addEventListener('mouseleave', () => {
      animate(path, {
        d: from,
        duration: 400,
        ease: 'outQuad',
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
    ease: 'outQuad',
    duration: 250
  }, 0);

    tl.add(dyingShapes, {
    opacity: 0,
    // fill: '#000000',
    ease: 'outQuad',
    duration: 400
  }, 100);

  // living anim
  tl.add(aliveShapes, {
    fill: '#ffffff',
    ease: 'inOutQuad',
    duration: 400
  }, 0);

  tl.add(sanalogS, {
    translateX: 370,
    ease: 'inOutQuad',
    duration: 600
  }, 525);

  tl.add(sanalogA0, {
    translateX: 255,
    ease: 'inOutQuad',
    duration: 550
  }, 500);
  
  tl.add(sanalogN, {
    translateX: 115,
    ease: 'inOutQuad',
    duration: 500
  }, 450);

  tl.add(sanalogA1, {
    translateX: -50,
    ease: 'inOutQuad',
    duration: 500
  }, 425);

  tl.add(sanalogL, {
    translateX: -165,
    ease: 'inOutQuad',
    duration: 500
  }, 450);

  tl.add(sanalogO, {
    translateX: -405,
    ease: 'inOutQuad',
    duration: 550
  }, 500);

  tl.add(sanalogG, {
    translateX: -545,
    rotate: -390,
    ease: 'inOutQuad',
    duration: 600
  }, 525);

    tl.add(sanalogG, {
    rotate: -360,
    ease: 'linear',
    duration: 50
  }, 1400);
  
  // scroll listener
  window.addEventListener('scroll', () => {
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = window.scrollY / scrollHeight;

    tl.seek(scrollPercent * tl.duration);
  });
}
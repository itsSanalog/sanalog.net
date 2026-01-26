import { animate, random } from 'animejs';

// Rotates elements continuously (e.g., the small geometric markers)
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

// Gently floats elements (e.g., the scattered squares)
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

// Bounce effect on hover (e.g., interactive buttons)
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

// Morph SVG paths on hover (e.g., the arches turning into circles)
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
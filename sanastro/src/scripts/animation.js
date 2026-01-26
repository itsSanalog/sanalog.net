import anime from 'animejs';

export function initPassiveRotation(root) {
  root.querySelectorAll('.rotate').forEach((el) => {
    anime({
      targets: el,
      rotate: 360,
      duration: anime.random(12000, 20000),
      easing: 'linear',
      loop: true,
    });
  });
}

export function initPassiveDrift(root) {
  root.querySelectorAll('.drift').forEach((el) => {
    anime({
      targets: el,
      translateX: [-4, 4],
      direction: 'alternate',
      easing: 'easeInOutSine',
      duration: anime.random(3000, 6000),
      loop: true,
    });
  });
}

export function initHoverBounce(root) {
  root.querySelectorAll('[data-hover="bounce"]').forEach((el) => {
    const bounce = anime({
      targets: el,
      scale: [1, 1.15],
      easing: 'easeOutElastic(1, .6)',
      duration: 600,
      autoplay: false,
    });

    el.addEventListener('mouseenter', () => bounce.restart());
  });
}

export function initHoverMorph(root) {
  root.querySelectorAll('[data-hover="morph"]').forEach((el) => {
    const path = el.querySelector('.shape');
    if (!path) return;

    const from = path.getAttribute('d');
    const to = path.dataset.alt;
    if (!from || !to) return;

    el.addEventListener('mouseenter', () => {
      anime({
        targets: path,
        d: [{ value: to }],
        duration: 500,
        easing: 'easeInOutQuad',
      });
    });

    el.addEventListener('mouseleave', () => {
      anime({
        targets: path,
        d: [{ value: from }],
        duration: 400,
        easing: 'easeInOutQuad',
      });
    });
  });
}

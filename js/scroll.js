// Récupération de tous les liens comportant un #
const links = document.querySelectorAll('a[href^="#"]');

// Fonction de scrolling
function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target);
  const targetPosition = targetElement.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return c / 2 * t * t + b;
    }
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Ajout d'un événement de clic sur chaque lien
links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = link.getAttribute('href');
    smoothScroll(target, 1000);
  });
});

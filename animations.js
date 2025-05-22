// JavaScript pour afficher les éléments en fondu quand ils apparaissent dans le viewport
function toggleMusic() {
  const music = document.getElementById('background-music');
  music.muted = !music.muted;
}

function revealOnScroll() {
  const elements = document.querySelectorAll('.fade-in');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('appear');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


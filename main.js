document.addEventListener("DOMContentLoaded", () => {
    console.log("Site KAMEJOALLANA chargé avec succès !");
    
    // Appliquer l'effet de fade-in aux sections visibles
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.5
    });

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // Assurer l'affichage des lecteurs audio
    document.querySelectorAll('audio').forEach(audio => {
        audio.style.display = "block";
    });

    // Afficher un message de confirmation immédiate pour les formulaires
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const message = form.querySelector(".form-message");
            message.style.display = "block";
            
            // Réinitialiser le formulaire après quelques secondes
            setTimeout(() => {
                form.reset();
                message.style.display = "none";
            }, 3000);
        });
    });

    // Chargement différé de Disqus
    setTimeout(() => {
        var d = document, s = d.createElement('script');
        s.src = 'https://kamejoallana-prod.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }, 2000); // Charge Disqus après 2 secondes

    // 🎵 Gestion de la musique de fond 🎵
    const audio = document.getElementById("bg-music");
    const toggleButton = document.getElementById("toggle-music");

    const playlist = ["musique1.mp3", "musique2.mp3", "musique3.mp3"];
    let currentTrack = 0;

    function playMusic() {
        audio.src = playlist[currentTrack];
        audio.play();
    }

    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        playMusic();
    }

    audio.addEventListener("ended", nextTrack); // Passe à la chanson suivante

    toggleButton.addEventListener("click", () => {
        if (audio.paused) {
            playMusic();
            toggleButton.textContent = "🔇 Couper la musique";
        } else {
            audio.pause();
            toggleButton.textContent = "🎵 Activer la musique";
        }
    });

    // Démarrer la musique dès le chargement du site
    playMusic();
});

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
    const musicButton = document.getElementById("music-button");

    const playlist = ["fond.mp3", "AMBIANCE.mp3", "audio/musique3.mp3"];
    let currentTrack = 0;

    function playMusic() {
        audio.src = playlist[currentTrack];
        audio.load();
        audio.play().catch(error => console.log("Autoplay bloqué :", error));
    }

    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        playMusic();
    }

    // Passer automatiquement à la chanson suivante après 20 secondes
    let trackInterval;
    audio.addEventListener("play", () => {
        clearInterval(trackInterval);
        trackInterval = setTimeout(() => {
            nextTrack();
        }, 20000);
    });

    audio.addEventListener("ended", nextTrack);

    musicButton.addEventListener("click", () => {
        if (audio.paused) {
            playMusic();
            musicButton.textContent = "🔊 Musique en cours... Click pour stopper";
        } else {
            audio.pause();
            musicButton.textContent = "🎧 Ambiance toi sur les dernières prod dispo<br>Click ICI";
        }
    });

    // Assurer que le bouton reste toujours visible et stylé
    musicButton.style.position = "fixed";
    musicButton.style.right = "20px";
    musicButton.style.bottom = "40px";
    musicButton.style.zIndex = "999";
    musicButton.style.padding = "12px 16px";
    musicButton.style.background = "linear-gradient(45deg, #ff6600, #ff0066)";
    musicButton.style.color = "#fff";
    musicButton.style.border = "none";
    musicButton.style.borderRadius = "8px";
    musicButton.style.fontSize = "16px";
    musicButton.style.fontWeight = "bold";
    musicButton.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    musicButton.style.cursor = "pointer";
    musicButton.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    musicButton.style.textAlign = "center";
    musicButton.style.animation = "pulse 2s infinite";

    // Animation pulsante pour attirer l'attention
    let styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(styleSheet);

    // Simuler un premier clic à 5 secondes, puis un deuxième clic à 10 secondes
    setTimeout(() => {
        musicButton.click();
        console.log("Premier clic simulé.");
        setTimeout(() => {
            musicButton.click();
            console.log("Deuxième clic simulé.");
        }, 5000);
    }, 5000);
});

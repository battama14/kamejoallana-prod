document.addEventListener("DOMContentLoaded", () => {
    console.log("Site KAMEJOALLANA chargé avec succès !");
    
    const audio = document.getElementById("bg-music");
    const musicButton = document.getElementById("music-button");

    const playlist = ["audio/musique1.mp3", "audio/musique2.mp3", "audio/musique3.mp3"];
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

    // Passage automatique à la chanson suivante après 20 secondes
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
            musicButton.textContent = "🎧 Ambiance toi sur les dernières prod<br>Click ICI";
        }
    });

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

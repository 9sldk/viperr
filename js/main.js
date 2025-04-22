document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const volumeBar = document.getElementById('volume-bar');
    const volumeContainer = document.getElementById('volume-container');
    const ticketBtn = document.querySelector('.ticket-btn');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.knopki');

mobileMenuBtn.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Адаптация меню при изменении размера
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.style.display = 'flex';
    } else {
        nav.style.display = 'none';
    }
});

    const hoverAudio = new Audio();
    let isHoverPlaying = false;

    function preloadAudios() {
        const audioFiles = [
            '/viperr/music/Kai Angel - Madam.mp3',
            '/viperr/music/9mice - Narcotic.mp3'
        ];
        
        audioFiles.forEach(file => {
            const audio = new Audio();
            audio.src = file;
        });
    }

    const metalSound = new Audio(''); 
    const ticketSound = new Audio('/viperr/music/cash-register.mp3');
    metalSound.volume = 0.3;
    ticketSound.volume = 0.4;

    document.querySelectorAll('.nav').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            metalSound.currentTime = 0;
            metalSound.play().catch(e => console.log("Sound error:", e));
        });
        
        btn.addEventListener('mouseleave', () => {
            metalSound.pause();
            metalSound.currentTime = 0;
        });
    });

    ticketBtn.addEventListener('mouseenter', () => {
        ticketSound.currentTime = 0;
        ticketSound.play().catch(e => console.log("Sound error:", e));
    });

    ticketBtn.addEventListener('mouseleave', () => {
        ticketSound.pause();
        ticketSound.currentTime = 0;
    });

    function setupHoverEffects() {
        const hoverImages = document.querySelectorAll('[data-audio]');
        
        hoverImages.forEach(img => {
            img.addEventListener('mouseenter', function() {
                if (!isHoverPlaying) {
                    hoverAudio.src = this.dataset.audio;
                    hoverAudio.volume = 0.1; 
                    hoverAudio.play()
                        .then(() => isHoverPlaying = true)
                        .catch(e => console.log("Autoplay blocked:", e));
                }
            });
            
            img.addEventListener('mouseleave', function() {
                hoverAudio.pause();
                hoverAudio.currentTime = 0;
                isHoverPlaying = false;
            });
        });
    }

    preloadAudios();
    setupHoverEffects();
});
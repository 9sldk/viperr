document.addEventListener('DOMContentLoaded', () => {
    gsap.from(".bio-block", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    const playButtons = document.querySelectorAll('.play-btn');
    let currentAudio = null;

    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (currentAudio) {
                currentAudio.pause();
                document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶');
            }

            if (this.textContent === '▶') {
                const audio = new Audio('music/track.mp3');
                audio.play();
                this.textContent = '❚❚';
                currentAudio = audio;
            } else {
                currentAudio = null;
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    let currentAudio = null;
    let currentButton = null;

    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', function() {
            const audioPath = this.getAttribute('data-audio');
            
            if (currentAudio && this === currentButton) {
                currentAudio.pause();
                this.textContent = '▶';
                currentAudio = null;
                currentButton = null;
                return;
            }
            
            if (currentAudio) {
                currentAudio.pause();
                currentButton.textContent = '▶';
            }
            
            currentAudio = new Audio(audioPath);
            currentAudio.play();
            this.textContent = '❚❚';
            currentButton = this;
            
            currentAudio.addEventListener('timeupdate', function() {
                const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
                const progressBar = button.closest('.track-player').querySelector('.progress-bar');
                progressBar.style.width = `${progress}%`;
            });
            
            currentAudio.addEventListener('ended', function() {
                button.textContent = '▶';
                currentAudio = null;
                currentButton = null;
            });
        });
    });
});

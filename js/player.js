document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const muteBtn = document.getElementById('mute-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const volumeSlider = document.createElement('input');
    
    // Создаем слайдер громкости
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '1';
    volumeSlider.step = '0.01';
    volumeSlider.value = audio.volume;
    volumeSlider.style.width = '80px';
    volumeSlider.style.margin = '0 10px';
    muteBtn.parentNode.insertBefore(volumeSlider, muteBtn.nextSibling);

    let isPlaying = false;
    let isDraggingProgress = false;

    // Инициализация
    audio.volume = 0.7;
    volumeSlider.value = 0.7;
    updateTime();

    // Функции
    function togglePlay() {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        updatePlayButton();
    }

    function updatePlayButton() {
        playBtn.textContent = isPlaying ? '❚❚' : '▶';
    }

    function toggleMute() {
        audio.muted = !audio.muted;
        muteBtn.innerHTML = audio.muted ? '<img src="/viperr/images/bobsadqq.png" alt="Mute">' : 
                                        '<img src="/viperr/images/sound.png" alt="Volume">';
    }

    function updateTime() {
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (!isNaN(audio.duration)) {
            const dMinutes = Math.floor(audio.duration / 60);
            const dSeconds = Math.floor(audio.duration % 60);
            durationEl.textContent = `${dMinutes}:${dSeconds < 10 ? '0' : ''}${dSeconds}`;
        }
    }

    function updateProgress() {
        if (!isDraggingProgress) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
        updateTime();
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    function handleProgressMouseDown() {
        isDraggingProgress = true;
    }

    function handleProgressMouseUp() {
        isDraggingProgress = false;
    }

    function setVolume() {
        audio.volume = volumeSlider.value;
        audio.muted = false;
        muteBtn.innerHTML = '<img src="/viperr/images/sound.png" alt="Volume">';
    }

    playBtn.addEventListener('click', togglePlay);
    muteBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', setVolume);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayButton();
    });
    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayButton();
    });
    audio.addEventListener('ended', () => {
        isPlaying = false;
        updatePlayButton();
    });
    progressContainer.addEventListener('click', setProgress);
    progressContainer.addEventListener('mousedown', handleProgressMouseDown);
    document.addEventListener('mouseup', handleProgressMouseUp);
});
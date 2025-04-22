class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.tracks = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.volume = 0.7;
        this.initElements();
        this.initEvents();
    }

    initElements() {
        this.playBtn = document.querySelector('.main-play-btn');
        this.nextBtn = document.querySelector('.main-next-btn');
        this.currentTrackEl = document.querySelector('.current-track');
        this.globalProgress = document.querySelector('.global-progress');
        this.volumeControl = document.querySelector('.master-volume');
        
        document.querySelectorAll('.track').forEach((track, index) => {
            const audioElement = track.querySelector('.audio-element');
            const title = track.querySelector('.track-title').textContent;
            
            this.tracks.push({
                element: track,
                playBtn: track.querySelector('.play-btn'),
                progress: track.querySelector('.progress-bar'),
                audioSrc: audioElement.src,
                title
            });
        });
    }

    initEvents() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.volumeControl.addEventListener('input', (e) => {
            this.setVolume(parseFloat(e.target.value));
        });
        
        this.tracks.forEach((track, index) => {
            track.playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (this.currentTrackIndex === index && this.isPlaying) {
                    this.pause();
                } else {
                    this.playTrack(index);
                }
            });
            
            track.element.addEventListener('click', () => {
                this.playTrack(index);
            });
        });
        
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.nextTrack());
        this.audio.addEventListener('volumechange', () => {
            this.volumeControl.value = this.audio.volume;
        });
        
        this.audio.volume = this.volume;
        this.volumeControl.value = this.volume;
    }

    playTrack(index) {
        this.currentTrackIndex = index;
        const track = this.tracks[index];
        
        this.audio.pause();
        
        this.audio.src = track.audioSrc;
        this.audio.currentTime = 0;
        
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.updateUI();
            })
            .catch(error => {
                console.error("Playback failed:", error);
            });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI();
    }

    togglePlay() {
        if (!this.audio.src && this.tracks.length > 0) {
            this.playTrack(0);
            return;
        }
        
        if (this.isPlaying) {
            this.pause();
        } else {
            this.audio.play()
                .then(() => {
                    this.isPlaying = true;
                    this.updateUI();
                })
                .catch(error => {
                    console.error("Playback failed:", error);
                });
        }
    }

    nextTrack() {
        const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.playTrack(nextIndex);
    }

    seek(percent) {
        if (!this.audio.src) return;
        const time = (percent / 100) * this.audio.duration;
        this.audio.currentTime = time;
    }

    setVolume(volume) {
        this.volume = volume;
        this.audio.volume = volume;
    }

    updateProgress() {
        if (!this.audio.src || isNaN(this.audio.duration)) return;
        
        const percent = (this.audio.currentTime / this.audio.duration) * 100 || 0;
        
        const currentTrack = this.tracks[this.currentTrackIndex];
        if (currentTrack) {
            currentTrack.progress.value = percent;
        }
    }

    updateUI() {
        const track = this.tracks[this.currentTrackIndex];
        
        if (track) {
            this.currentTrackEl.textContent = track.title;
            this.playBtn.textContent = this.isPlaying ? '⏸' : '▶';
            
            this.tracks.forEach((t, i) => {
                t.playBtn.textContent = (i === this.currentTrackIndex && this.isPlaying) ? '⏸' : '▶';
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new AudioPlayer());
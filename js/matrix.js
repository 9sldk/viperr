document.addEventListener('DOMContentLoaded', function() {
    const matrixRain = document.querySelector('.matrix-rain');
    const lyrics = [
        "NARCOTIC", "HEAVY METAL", "KAI ANGEL", "9MICE", "VIPERR",
        "PRADA PARTY", "CYBER IS DEAD", "FIRE ALARM", "LIPSTICK", "Paparazzi",
        "HATE PEOPLE", "BLUM", "PHOENIX", "DA VINCI", "We are shown the world not as it is"
    ];
    
    function createLine() {
        const line = document.createElement('div');
        line.className = 'matrix-line';
        
        line.textContent = lyrics[Math.floor(Math.random() * lyrics.length)];
        
        const left = Math.random() * 100;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        const fontSize = 9 + Math.random() * 10;
        
        line.style.left = `${left}%`;
        line.style.top = `-30px`;
        line.style.animationDuration = `${duration}s`;
        line.style.animationDelay = `${delay}s`;
        line.style.fontSize = `${fontSize}px`;
        line.style.opacity = Math.random() * 0.5 + 0.3;
        
        matrixRain.appendChild(line);
         
        setTimeout(() => {
            line.remove();
        }, duration * 1000);
    }
    
    setInterval(createLine, 300);
});
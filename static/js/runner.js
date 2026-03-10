// Canvas y contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Elementos del DOM
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const currentScoreDisplay = document.getElementById('currentScore');
const finalScoreDisplay = document.getElementById('finalScore');
const highScoreDisplay = document.getElementById('highScore');

// Variables del juego
let gameRunning = false;
let gameOver = false;
let score = 0;
let highScore = localStorage.getItem('charmanderHighScore') || 0;
let frameCount = 0;
let gameSpeed = 6;

// Charmander (jugador)
const player = {
    x: 50,
    y: 0,
    width: 50,
    height: 50,
    velocityY: 0,
    jumping: false,
    grounded: false,
    jumpPower: -12,
    gravity: 0.6,
    image: new Image()
};

// Cargar sprite de Charmander
player.image.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png';

// Obstáculos
let obstacles = [];
const obstacleImage = new Image();
obstacleImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png'; // Geodude como obstáculo

// Nube decorativa
let clouds = [];

// Backgrounds system
const backgrounds = [
    { name: 'sky', gradient1: '#87CEEB', gradient2: '#E0F6FF' }, // Sky blue
    { name: 'sunset', gradient1: '#FF6B35', gradient2: '#FF8C42' }, // Sunset orange
    { name: 'night', gradient1: '#1a1a2e', gradient2: '#16213e' }, // Dark night
    { name: 'forest', gradient1: '#2d5016', gradient2: '#3d7f2d' }, // Forest green
    { name: 'volcano', gradient1: '#8B4513', gradient2: '#D2691E' }, // Volcano brown
];

let currentBackgroundIndex = 0;

// Clase Obstáculo
class Obstacle {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = canvas.width;
        this.y = canvas.height - 60 - this.height;
        this.speed = gameSpeed;
        this.passed = false;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        ctx.drawImage(obstacleImage, this.x, this.y, this.width, this.height);
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }

    collidesWith(player) {
        return (
            player.x < this.x + this.width - 10 &&
            player.x + player.width - 10 > this.x &&
            player.y < this.y + this.height - 10 &&
            player.y + player.height - 10 > this.y
        );
    }
}

// Clase Nube
class Cloud {
    constructor() {
        this.x = canvas.width + Math.random() * 200;
        this.y = Math.random() * (canvas.height / 2);
        this.width = 60 + Math.random() * 40;
        this.height = 30;
        this.speed = 1 + Math.random() * 2;
    }

    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height / 2);
        }
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        ctx.ellipse(this.x + 20, this.y - 5, this.width / 3, this.height / 2.5, 0, 0, Math.PI * 2);
        ctx.ellipse(this.x + 40, this.y, this.width / 2.5, this.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Inicializar nubes
function initClouds() {
    clouds = [];
    for (let i = 0; i < 5; i++) {
        clouds.push(new Cloud());
    }
}

// Función para saltar
function jump() {
    if (!player.jumping && player.grounded) {
        player.velocityY = player.jumpPower;
        player.jumping = true;
        player.grounded = false;
    }
}

// Actualizar física del jugador
function updatePlayer() {
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Suelo
    const groundLevel = canvas.height - 60 - player.height;
    if (player.y >= groundLevel) {
        player.y = groundLevel;
        player.velocityY = 0;
        player.jumping = false;
        player.grounded = true;
    }
}

// Dibujar jugador
function drawPlayer() {
    // Dibujar Charmander
    ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

// Dibujar suelo
function drawGround() {
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
    
    // Línea de pasto
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, canvas.height - 60, canvas.width, 5);
}

// Dibujar cielo y nubes
function drawBackground() {
    // Determinar el índice de fondo basado en la puntuación
    const newBackgroundIndex = Math.floor(score / 100) % backgrounds.length;
    if (newBackgroundIndex !== currentBackgroundIndex) {
        currentBackgroundIndex = newBackgroundIndex;
    }

    // Degradado de cielo dinámico
    const currentBg = backgrounds[currentBackgroundIndex];
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, currentBg.gradient1);
    gradient.addColorStop(1, currentBg.gradient2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Nubes
    clouds.forEach(cloud => {
        cloud.update();
        cloud.draw();
    });
}

// Generar obstáculos
function spawnObstacle() {
    if (frameCount % 90 === 0) {
        obstacles.push(new Obstacle());
    }
}

// Actualizar obstáculos
function updateObstacles() {
    obstacles.forEach((obstacle, index) => {
        obstacle.update();
        obstacle.draw();

        // Incrementar puntuación cuando se pasa un obstáculo
        if (!obstacle.passed && obstacle.x + obstacle.width < player.x) {
            obstacle.passed = true;
            score += 10;
            currentScoreDisplay.textContent = score;
        }

        // Verificar colisión
        if (obstacle.collidesWith(player)) {
            endGame();
        }

        // Eliminar obstáculos fuera de pantalla
        if (obstacle.isOffScreen()) {
            obstacles.splice(index, 1);
        }
    });
}

// Incrementar velocidad del juego
function increaseGameSpeed() {
    if (frameCount % 300 === 0 && gameSpeed < 12) {
        gameSpeed += 0.5;
        obstacles.forEach(obstacle => obstacle.speed = gameSpeed);
    }
}

// Bucle del juego
function gameLoop() {
    if (!gameRunning || gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground();
    drawGround();

    updatePlayer();
    drawPlayer();

    spawnObstacle();
    updateObstacles();
    increaseGameSpeed();

    frameCount++;
    requestAnimationFrame(gameLoop);
}

// Iniciar juego
function startGame() {
    gameRunning = true;
    gameOver = false;
    score = 0;
    frameCount = 0;
    gameSpeed = 6;
    obstacles = [];
    player.y = canvas.height - 60 - player.height;
    player.velocityY = 0;
    player.jumping = false;
    player.grounded = true;

    currentScoreDisplay.textContent = score;
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');

    initClouds();
    gameLoop();
}

// Terminar juego
function endGame() {
    gameOver = true;
    gameRunning = false;

    // Mostrar jump scare del Exorcista
    const exorcistScare = document.getElementById('exorcistScare');
    exorcistScare.classList.remove('hidden');
    
    // Reproducir sonido de miedo (opcional)
    playScareSound();

    // Actualizar mejor puntuación
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('charmanderHighScore', highScore);
    }

    finalScoreDisplay.textContent = score;
    highScoreDisplay.textContent = highScore;
    
    // Mostrar pantalla de Game Over después del scare
    setTimeout(() => {
        exorcistScare.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
    }, 2000);
}

// Función para reproducir sonido de miedo
function playScareSound() {
    // Crear un sonido de miedo usando Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Frecuencia aterradora que baja rápidamente
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Controles
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameRunning && !gameOver) {
        e.preventDefault();
        jump();
    }
});

canvas.addEventListener('click', () => {
    if (gameRunning && !gameOver) {
        jump();
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// Mostrar mejor puntuación al cargar
document.addEventListener('DOMContentLoaded', () => {
    highScoreDisplay.textContent = highScore;
    initClouds();
    
    // Dibujar pantalla inicial
    drawBackground();
    drawGround();
    player.y = canvas.height - 60 - player.height;
    drawPlayer();
});

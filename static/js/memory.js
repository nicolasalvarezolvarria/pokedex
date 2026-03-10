// Pokémon Memory Game

// Pool of Pokémon IDs to pick from (first 151)
const POKEMON_POOL = Array.from({ length: 151 }, (_, i) => i + 1);

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 12;
let moves = 0;
let timerInterval = null;
let seconds = 0;
let isLocked = false;

const board = document.getElementById('memoryBoard');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const timerEl = document.getElementById('timer');
const winOverlay = document.getElementById('winOverlay');
const finalMovesEl = document.getElementById('finalMoves');
const finalTimeEl = document.getElementById('finalTime');
const newGameBtn = document.getElementById('newGameBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const difficultySelect = document.getElementById('difficultySelect');

function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getImageUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function startTimer() {
    stopTimer();
    seconds = 0;
    timerEl.textContent = '0s';
    timerInterval = setInterval(() => {
        seconds++;
        timerEl.textContent = `${seconds}s`;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function initGame() {
    totalPairs = parseInt(difficultySelect.value);
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    isLocked = false;

    movesEl.textContent = '0';
    pairsEl.textContent = '0';
    winOverlay.classList.add('hidden');

    // Pick random Pokémon IDs
    const picked = shuffle(POKEMON_POOL).slice(0, totalPairs);
    // Duplicate for pairs
    const cardData = shuffle([...picked, ...picked]);

    // Set grid columns
    board.className = 'memory-board';
    if (totalPairs <= 8) {
        board.classList.add('cols-4');
    } else {
        board.classList.add('cols-6');
    }

    // Build cards
    board.innerHTML = '';
    cards = [];

    cardData.forEach((pokeId, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.pokeid = pokeId;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${getImageUrl(pokeId)}" alt="Pokemon ${pokeId}" loading="lazy">
                </div>
                <div class="card-back"></div>
            </div>
        `;

        card.addEventListener('click', onCardClick);
        board.appendChild(card);
        cards.push(card);
    });

    startTimer();
}

function onCardClick(e) {
    const card = e.currentTarget;

    // Ignore if already flipped, matched, or locked
    if (
        isLocked ||
        card.classList.contains('flipped') ||
        card.classList.contains('matched')
    ) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesEl.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.pokeid === card2.dataset.pokeid;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsEl.textContent = matchedPairs;
        flippedCards = [];

        if (matchedPairs === totalPairs) {
            stopTimer();
            setTimeout(showWin, 600);
        }
    } else {
        isLocked = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isLocked = false;
        }, 1000);
    }
}

function showWin() {
    finalMovesEl.textContent = moves;
    finalTimeEl.textContent = `${seconds}s`;
    winOverlay.classList.remove('hidden');
}

newGameBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

// Start on load
initGame();

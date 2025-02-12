let levels = [6, 16, 32];
let currentLevel = 0;
let firstCard = null;
let secondCard = null;
let attempts = 0;
let images = Array.from({ length: 50 }, (_, i) => `image/img${i + 1}.jpg`);
const board = document.getElementById("game-board");

function generateCards(numCards) {
    let values = images.slice(0, numCards / 2);
    let cards = [...values, ...values].sort(() => Math.random() - 0.5);

    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${Math.sqrt(numCards)}, auto)`;

    cards.forEach(value => {
        let card = document.createElement("div");
        card.classList.add("card", "hidden");
        card.dataset.value = value;

        let img = document.createElement("img");
        img.src = value;
        img.alt = "Card image";
        card.appendChild(img);

        card.addEventListener("click", () => revealCard(card));
        board.appendChild(card);
    });
}

function revealCard(card) {
    if (!firstCard) {
        firstCard = card;
        firstCard.classList.add("revealed");
    } else if (!secondCard && card !== firstCard) {
        secondCard = card;
        secondCard.classList.add("revealed");
        attempts++;
        document.getElementById("attempts").textContent = attempts;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard = null;
        secondCard = null;
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

function checkWin() {
    if (document.querySelectorAll(".card:not(.revealed)").length === 0) {
        if (currentLevel < levels.length - 1) {
            document.getElementById("next-level").style.display = "block";
        } else {
            showCongratulations();
        }
    }
}


function showCongratulations() {
    document.getElementById("game-container").style.display = "none";
    document.getElementById("congratulations").style.display = "flex";
}

function resetGame() {
    attempts = 0;
    document.getElementById("attempts").textContent = attempts;
    document.getElementById("next-level").style.display = "none";
    generateCards(levels[currentLevel]);
}

function nextLevel() {
    if (currentLevel < levels.length - 1) {
        currentLevel++;
        resetGame();
    } else {
        // Nível bônus (100 cards)
        currentLevel++;
        levels.push(500); // Adiciona o nível bônus
        resetGame();
    }
}


function startBonusLevel() {
    document.getElementById("congratulations").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    generateCards(200);
    document.body.classList.add("bonus-level"); // Aplica o fundo animado
    document.getElementById("titulo").textContent = "Nível Bônus"; // Altera o título

    // Ativar a música e exibir o botão
    let music = document.getElementById("bonus-music");
    let musicButton = document.getElementById("toggle-music");

    music.play();
    music.loop = true;
    musicButton.style.display = "block";
    musicButton.textContent = "🔊 Música: ON";

    // Alternar entre tocar e pausar
    musicButton.addEventListener("click", function () {
        if (music.paused) {
            music.play();
            musicButton.textContent = "🔊 Música: ON";
        } else {
            music.pause();
            musicButton.textContent = "🔇 Música: OFF";
        }
    });
}


// generateCards(levels[currentLevel]);
startBonusLevel();

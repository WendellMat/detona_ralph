const states = {
    views: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#lifes")
    },
    values: {
        gameDelay: 1000,
        hitPosition: null,
        result: 0,
        currentTime: 60,
        lifes: 3
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000)
    }
}

function randomSquare() {
    states.views.squares.forEach((square) => {
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = states.views.squares[randomNumber];
    randomSquare.classList.add("enemy")

    states.values.hitPosition = randomSquare.id
}

function playSound(nameSound) {
    let audio = new Audio(`../src/audios/${nameSound}.wav`);
    audio.volume = 0.2;
    audio.play();
}

function listenerHitBox() {
    states.views.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === states.values.hitPosition) {
                states.values.result++;
                playSound("hit");
                states.views.score.textContent = states.values.result;
                states.values.hitPosition = null;
            } // Função criada com o objetivo de diminuir uma vida se o hit for errado e um som de erro
            else if (square.id != states.values.hitPosition) {
                states.values.lifes--;
                playSound("wrong-hit")
                states.views.life.textContent = states.values.lifes;

                if (states.views.life.textContent <= 0) {
                    zeraContadorDeTempo();

                    alert(`Suas vidas acabaram! Sua pontuação final foi ${states.values.result} pontos`)
                }
            }
        })
    })
}

function countDown() {
    states.values.currentTime--;
    states.views.timeLeft.textContent = states.values.currentTime;

    if(states.views.timeLeft.textContent <= 0) {
        zeraContadorDeTempo();

        alert(`Acabou seu tempo! Sua pontuação final foi ${states.values.result} pontos`)
    }
}

// Função criada com oobjetivo de evitar a repetição do código do limpador de tempo
function zeraContadorDeTempo() {
    clearInterval(states.actions.countDownTimerId);
    clearInterval(states.actions.timerId);
}

function main() {
    listenerHitBox();
}

main();
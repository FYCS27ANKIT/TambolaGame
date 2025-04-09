document.addEventListener("DOMContentLoaded", function () {
    const playerTicket = document.getElementById("playerTicket");
    const computerTicket = document.getElementById("computerTicket");
    const currentNumberElement = document.getElementById("currentNumber");
    const startGameButton = document.getElementById("startGame");
    const gameStatus = document.getElementById("gameStatus");

    let playerNumbers = generateTicket();
    let computerNumbers = generateTicket();
    let currentNumber = null;
    let drawnNumbers = new Set();
    let gameInterval;
    let totalNumbersDrawn = 0;

    function generateTicket() {
        let numbers = [];
        let ticketHTML = "";
        for (let i = 0; i < 2; i++) {
            ticketHTML += "<tr>";
            for (let j = 0; j < 4; j++) {
                let randomNumber;
                do {
                    randomNumber = Math.floor(Math.random() * 100) + 1;
                } while (numbers.includes(randomNumber));
                numbers.push(randomNumber);
                ticketHTML += `<td><button class="ticket-btn">${randomNumber}</button></td>`;
            }
            ticketHTML += "</tr>";
        }
        return { numbers, ticketHTML };
    }

    function renderTickets() {
        playerTicket.innerHTML = playerNumbers.ticketHTML;
        computerTicket.innerHTML = computerNumbers.ticketHTML;

        document.querySelectorAll("#playerTicket .ticket-btn").forEach(button => {
            button.addEventListener("click", function () {
                let num = parseInt(button.innerText);
                if (num === currentNumber) {
                    this.classList.add("blue");
                    missedNumbers.delete(num);
                }
                checkWinner();
            });
        });
    }

    function rollNumber() {
        if (totalNumbersDrawn >= 100) {
            endGame("Game Drawn!");
            return;
        }

        let randomNum;
        do {
            randomNum = Math.floor(Math.random() * 100) + 1;
        } while (drawnNumbers.has(randomNum));

        drawnNumbers.add(randomNum);
        currentNumber = randomNum;
        totalNumbersDrawn++;
        currentNumberElement.innerText = `Number: ${currentNumber}`;

        markComputerNumber();
    }

    function markComputerNumber() {
        document.querySelectorAll("#computerTicket .ticket-btn").forEach(button => {
            if (parseInt(button.innerText) === currentNumber) {
                button.classList.add("blue");
            }
        });

        checkWinner();
    }

    function checkWinner() {
        let playerWin = [...playerTicket.querySelectorAll("button")].every(btn => btn.classList.contains("blue"));
        let computerWin = [...computerTicket.querySelectorAll("button")].every(btn => btn.classList.contains("blue"));

        if (computerWin) {
            endGame("Computer Wins!");
        } else if (playerWin) {
            endGame(" You Win!");
        }
    }

    function endGame(result) {
        clearInterval(gameInterval);
        gameStatus.innerHTML = `<h2>${result}</h2>`;
        startGameButton.innerText = "New Game";
        startGameButton.style.display = "block";
        startGameButton.addEventListener("click", () => location.reload());
    }

    startGameButton.addEventListener("click", function () {
        startGameButton.style.display = "none";
        gameInterval = setInterval(() => {
            rollNumber();
        }, 2000);
    });

    renderTickets();
    
});

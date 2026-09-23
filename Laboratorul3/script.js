function calculateSum(a, b) {
    return a + b;
}

console.log("Suma 5 + 7:", calculateSum(5, 7));
console.log("Suma 12 + 12:", calculateSum(12, 12));

const student = {
    name: "Bogdan",
    surname: "Borcea",
    age: 18,,
    introduce: function() {
        console.log("Sunt " + this.name + " și am " + this.age + " ani.");
    }
};

student.introduce();
student.grade = 10;
console.log("Noua notă:", student.grade);

const choices = ["piatra", "hartia", "foarfeca"];

const gameScore = {
    player: 0,
    computer: 0,
    draws: 0,

    displayScore: function() {
        alert(
            "Scor actual:\n" +
            "Jucător: " + this.player + "\n" +
            "Calculator: " + this.computer + "\n" +
            "Egalități: " + this.draws
        );
    }
};

let rounds = 0;

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const newGameButton = document.getElementById("newGame");
const gameInfo = document.getElementById("gameInfo");

function getComputerChoice() {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

function getChoiceName(choice) {
    if (choice === "piatra") {
        return "Piatra";
    }

    if (choice === "hartia") {
        return "Hârtia";
    }

    return "Foarfeca";
}

function getLeader() {
    if (gameScore.player > gameScore.computer) {
        return "Jucătorul conduce";
    }

    if (gameScore.computer > gameScore.player) {
        return "Calculatorul conduce";
    }

    return "Egalitate";
}

function updateGameInfo(playerChoice, computerChoice, result) {
    gameInfo.innerHTML =
        "<div class='line'>Alegerea ta: " + getChoiceName(playerChoice) + "</div>" +
        "<div class='line'>Alegerea calculatorului: " + getChoiceName(computerChoice) + "</div>" +
        "<div class='line'>Rezultat: " + result + "</div>" +
        "<div class='line'>Scor: " + gameScore.player + " - " + gameScore.computer + "</div>" +
        "<div class='line'>Runde: " + rounds + "</div>" +
        "<div class='line'>Conducător: " + getLeader() + "</div>";
}

function playRound(playerChoice) {
    if (gameScore.player >= 5 || gameScore.computer >= 5) {
        return;
    }

    const computerChoice = getComputerChoice();
    let result;

    if (playerChoice === computerChoice) {
        gameScore.draws++;
        result = "Egalitate!";
    } else if (
        (playerChoice === "piatra" && computerChoice === "foarfeca") ||
        (playerChoice === "foarfeca" && computerChoice === "hartia") ||
        (playerChoice === "hartia" && computerChoice === "piatra")
    ) {
        gameScore.player++;
        result = "Ai câștigat!";
    } else {
        gameScore.computer++;
        result = "Calculatorul a câștigat!";
    }

    rounds++;

    updateGameInfo(playerChoice, computerChoice, result);

    gameScore.displayScore();

    if (gameScore.player === 5) {
        gameInfo.innerHTML +=
            "<div class='line'>Câștigător final: Ai câștigat jocul!</div>";
    } else if (gameScore.computer === 5) {
        gameInfo.innerHTML +=
            "<div class='line'>Câștigător final: Calculatorul a câștigat jocul!</div>";
    }
}

function resetGame() {
    gameScore.player = 0;
    gameScore.computer = 0;
    gameScore.draws = 0;
    rounds = 0;

    gameInfo.innerHTML =
        "<div class='line'>Jocul a fost resetat.</div>" +
        "<div class='line'>Scor: 0 - 0</div>" +
        "<div class='line'>Runde: 0</div>" +
        "<div class='line'>Conducător: Egalitate</div>";
}

rockButton.addEventListener("click", function() {
    playRound("piatra");
});

paperButton.addEventListener("click", function() {
    playRound("hartia");
});

scissorsButton.addEventListener("click", function() {
    playRound("foarfeca");
});

newGameButton.addEventListener("click", resetGame);
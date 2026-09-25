const calculateSum = (a, b) => {
    return a + b;
};

console.log("Suma 5 + 7:", calculateSum(5, 7));
console.log("Suma 12 + 12:", calculateSum(12, 12));

const student = {
    name: "Bogdan",
    age: 18,
    introduce() {
        console.log(`Sunt ${this.name} și am ${this.age} ani.`);
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

    displayScore() {
        alert(
            `Scor actual:\n` +
            `Jucător: ${this.player}\n` +
            `Calculator: ${this.computer}\n` +
            `Egalități: ${this.draws}`
        );
    }
};

let rounds = 0;

const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const newGameButton = document.getElementById("newGame");
const gameInfo = document.getElementById("gameInfo");

const getComputerChoice = () => {
    const index = Math.floor(Math.random() * choices.length);
    return choices[index];
};

const getChoiceName = (choice) => {
    switch (choice) {
        case "piatra":
            return "Piatra";
        case "hartia":
            return "Hârtia";
        case "foarfeca":
            return "Foarfeca";
        default:
            return choice;
    }
};

const getLeader = () => {
    if (gameScore.player > gameScore.computer) return "Jucătorul conduce";
    if (gameScore.computer > gameScore.player) return "Calculatorul conduce";
    return "Egalitate";
};

const updateGameInfo = (playerChoice, computerChoice, result) => {
    let html = `
        <div class='line'>Alegerea ta: ${getChoiceName(playerChoice)}</div>
        <div class='line'>Alegerea calculatorului: ${getChoiceName(computerChoice)}</div>
        <div class='line'>Rezultat: ${result}</div>
        <div class='line'>Scor: ${gameScore.player} -${gameScore.computer}</div>
        <div class='line'>Runde: ${rounds}</div>
        <div class='line'>Conducător: ${getLeader()}</div>
    `;

    if (gameScore.player === 5) {
        html += "<div class='line'><strong>Câștigător final: Ai câștigat jocul!</strong></div>";
    } else if (gameScore.computer === 5) {
        html += "<div class='line'><strong>Câștigător final: Calculatorul a câștigat jocul!</strong></div>";
    }

    gameInfo.innerHTML = html;
};

const playRound = (playerChoice) => {
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
};

const resetGame = () => {
    gameScore.player = 0;
    gameScore.computer = 0;
    gameScore.draws = 0;
    rounds = 0;

    gameInfo.innerHTML = `
        <div class='line'>Jocul a fost resetat.</div>
        <div class='line'>Scor: 0 - 0</div>
        <div class='line'>Runde: 0</div>
        <div class='line'>Conducător: Egalitate</div>
    `;
};

rockButton.addEventListener("click", () => playRound("piatra"));
paperButton.addEventListener("click", () => playRound("hartia"));
scissorsButton.addEventListener("click", () => playRound("foarfeca"));
newGameButton.addEventListener("click", resetGame);
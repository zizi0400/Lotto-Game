// DOM Elemente selektieren
const startButton = document.querySelector(".start__button");
const numberButtons = document.querySelectorAll(".number-button");
const selectedNumbersContainer = document.querySelector(".selected__numbers");
const startPage = document.querySelector(".start__page");
const onclickPage = document.querySelector(".onclick__page");
const luckyNumbersContainer = document.querySelector(".lucky__numbers");
const selectedNumbersOnclick = document.querySelector(
  ".selected__numbers--onclick"
);
const endMessage = document.querySelector(".end__message");
const endMessageDiv = document.querySelector(".end");
const lottoBalls = document.querySelectorAll(".lucky__numbers .lotto-ball");

const restartButton = document.querySelector(".restart-btn");

let selectedNumbers = [];
let luckyNumbers = [];

startButton.addEventListener("click", () => {
  if (selectedNumbers.length !== 5) {
    alert("Wähle bitte 5 Zahlen aus.");
    return;
  }

  // Zeige die Auslosungsseite
  onclickPage.classList.remove("hidden");

  // Generiere 5 Zahlen
  const luckyNumbers = generateLuckyNumbers();

  // Vom Nutzer ausgewählten Zahlen anzeigen
  selectedNumbersContainer.innerHTML = "";
  selectedNumbersContainer.appendChild(createNumbersList(selectedNumbers));

  // Gewinnerzahlen anzeigen
  lottoBalls.forEach((ball, index) => {
    ball.textContent = luckyNumbers[index];
  });

  // Die Ergebnisse anzeigen
  const resultMessage = getResultMessage(selectedNumbers, luckyNumbers);
  endMessage.textContent = resultMessage;

  // endMessage anzeigen nach 8 Sekunden
  setTimeout(() => {
    endMessageDiv.style.visibility = "visible";
  }, 8000);

  // onclick page animation
  onclickPage.classList.add("onclick--animation");
  startPage.classList.add("start__page--animation");
});

// Zahlen wählen
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = parseInt(button.textContent);

    // Falls die generierte Zahl noch nicht gezogen wurde, füge sie hinzu. Ansonsten nehme sie raus
    if (selectedNumbers.includes(number)) {
      selectedNumbers = selectedNumbers.filter((num) => num !== number);
      button.classList.remove("selected");
    } else if (selectedNumbers.length < 5) {
      selectedNumbers.push(number);
      button.classList.add("selected");
    }

    selectedNumbers.sort((a, b) => a - b);
    // Gezogene Zahlen aktualisieren zum Anzeigen
    selectedNumbersContainer.innerHTML = "";
    selectedNumbersContainer.append(createNumbersList(selectedNumbers));

    // Ausgewählte Zahlen anzeigen
    selectedNumbersOnclick.innerHTML = "";
    selectedNumbersOnclick.appendChild(createNumbersList(selectedNumbers));

    if (selectedNumbers.length === 0) {
      selectedNumbersContainer.innerHTML =
        "<h3>Du hast keine Zahlen ausgewählt.</h3>";
    }
  });
});

// Selected numbers list
function createNumbersList(numbers) {
  const list = document.createElement("ul");
  numbers.forEach((number) => {
    const listItem = document.createElement("li");
    listItem.textContent = number;
    list.appendChild(listItem);
  });
  return list;
}

// 5 Zahlen generieren
function generateLuckyNumbers() {
  const allNumbers = Array.from({ length: 16 }, (_, i) => i + 1);

  while (luckyNumbers.length < 5) {
    const randomIndex = Math.floor(Math.random() * allNumbers.length);
    const luckyNumber = allNumbers[randomIndex];
    luckyNumbers.push(luckyNumber);
    allNumbers.splice(randomIndex, 1);
  }

  return luckyNumbers.sort((a, b) => a - b);
}


// Abschlussnachricht
function getResultMessage(selectedNumbers, luckyNumbers) {
  const matchedNumbers = selectedNumbers.filter((number) =>
    luckyNumbers.includes(number)
  );
  const message = matchedNumbers.length === 0 ?
    `❌ Tut mir Leid! Du hast leider KEINE Treffer.❌` : matchedNumbers.length === 5 ?
      `🎊🎉 JACKPOT GEKNACKT!!! 🎉🎊` : `🍀 Gratuliere! Du hast ${matchedNumbers.length} Treffer! 🍀`;

  return message;
}

// dem Restart-Button einen eventListener hinzufügen
restartButton.addEventListener("click", () => {
  location.reload();
});



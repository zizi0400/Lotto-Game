const getRandomNumber = () => {
    return Math.floor(Math.random() * 16) + 1
}

const getRandomNumbers = () => {
    let numbers = [];
    while (numbers.length < 5) {
        let number = getRandomNumber();
        if (!numbers.includes(number)) {
            numbers.push(number);
        }
    }
    return numbers;
}

const sortNumbers = (numbers) => {
    return numbers.sort((a, b) => a - b);
}

let correctCount = 0;
for (let i = 0; i < 16; i++) {
    if (luckyNumbers.includes(userInput[i])) {
        correctCount += 1;
    }
}

if (correctCount === 5) {
    alert("Herzlichen Glückwunsch! Du hast alle fünf Zahlen richtig geraten!");
} else {
    alert("Schade! Du hast nur " + correctCount + " Zahlen richtig geraten. Die richtigen Zahlen waren: " + luckyNumbers);
}


import draws from "./data.js";

// Functie pentru a calcula frecvența numerelor
const calculateFrequency = (data) => {
  const frequency = {};
  data.forEach((draw) => {
    draw.numbers.forEach((num) => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
  });
  return frequency;
};

// Functie pentru a obține cele mai frecvente numere
const getMostFrequentNumbers = (frequency, count = 6) => {
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1]) // Sortează descrescător după frecvență
    .slice(0, count) // Ia primele "count" numere
    .map(([num]) => parseInt(num)); // Extrage doar numerele
};

// Functie pentru a obține numerele cu cea mai mare șansă de reușită
const getPredictedNumbers = (data, count = 6) => {
  const frequency = calculateFrequency(data);
  const mostFrequentNumbers = getMostFrequentNumbers(frequency, count * 3); // Ia mai multe numere pentru a avea diversitate
  const predictedNumbers = [];

  while (predictedNumbers.length < count) {
    const randomIndex = Math.floor(Math.random() * mostFrequentNumbers.length);
    const randomNum = mostFrequentNumbers[randomIndex];
    if (!predictedNumbers.includes(randomNum)) {
      predictedNumbers.push(randomNum);
    }
  }

  return predictedNumbers;
};

// Functie pentru filtrarea datelor dintr-un an specific
const filterDrawsByYear = (data, year) => {
  return data.filter((draw) => new Date(draw.date).getFullYear() === year);
};

// Functie pentru generarea și afișarea numerelor
const generateNumbers = () => {
  // Filtrare date pentru anul 2024
  const draws2024 = filterDrawsByYear(draws, 2024);

  // Varianta 1: Cele mai probabile numere din 2024
  const predictedNumbers2024 = getPredictedNumbers(draws2024);

  // Varianta 2: Cele mai probabile numere din toate datele
  const predictedNumbersAll = getPredictedNumbers(draws);

  // Afișează rezultatele pentru 2024
  const result2024Div = document.getElementById("result-2024");
  result2024Div.innerHTML = ""; // Golește rezultatul anterior
  predictedNumbers2024.forEach((num) => {
    const numberBox = document.createElement("div");
    numberBox.classList.add("number-box");
    numberBox.textContent = num;
    result2024Div.appendChild(numberBox);
  });

  // Afișează rezultatele pentru toate datele
  const resultAllDiv = document.getElementById("result-all");
  resultAllDiv.innerHTML = ""; // Golește rezultatul anterior
  predictedNumbersAll.forEach((num) => {
    const numberBox = document.createElement("div");
    numberBox.classList.add("number-box");
    numberBox.textContent = num;
    resultAllDiv.appendChild(numberBox);
  });
};

// Adaugă evenimentul click pe buton
document
  .getElementById("generate-btn")
  .addEventListener("click", generateNumbers);

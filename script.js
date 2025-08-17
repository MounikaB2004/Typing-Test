const quotes = [
  "Hello testers! Test your skill here.",
  "This is my fun project just done in minutes.",
  "For your skill to improve see my next sentence.",
  "fundamental boat good banded ghost rumour god rabbit perseverance depth",
  "Life hobby greenary table banned split attitude rift writ remedies mandamus"
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");

let timer = 60;
let timeLeft = timer;
let timerId;

let correctChars = 0;
let totalChars = 0;
let testText = "";
let startTime = null;

// Build continuous text (like LiveChat)
function buildContinuousText() {
  return quotes.join(" ");
}

function startTest() {
  timeLeft = timer;
  correctChars = 0;
  totalChars = 0;
  startTime = new Date(); // record when test starts

  testText = buildContinuousText(); // one long passage
  quoteEl.textContent = testText;

  inputEl.value = "";
  inputEl.disabled = false;
  inputEl.focus();
  startBtn.disabled = true;

  timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeEl.textContent = timeLeft;
  } else {
    endTest();
  }
}

function endTest() {
  clearInterval(timerId);
  inputEl.disabled = true;
  startBtn.disabled = false;

  let timeElapsed = (new Date() - startTime) / 1000 / 60; // minutes
  let wpm = Math.round((correctChars / 5) / timeElapsed);
  let accuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;

  assignBadge(wpm);
}

function assignBadge(wpm) {
  let badge = "";
  if (wpm < 20) {
    badge = "🐢 Tortoise";
  } else if (wpm < 30) {
    badge = "🚗 Car";
  } else if (wpm < 40) {
    badge = "✈️ Jet";
  } else {
    badge = "🚀 Rocket";
  }
  document.getElementById("badge").innerText = badge;
}

inputEl.addEventListener("input", () => {
  const typedText = inputEl.value;
  totalChars = typedText.length;

  correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === testText[i]) {
      correctChars++;
    }
  }
});

startBtn.addEventListener("click", startTest);

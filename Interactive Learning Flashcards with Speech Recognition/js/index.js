const flashcards = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the color of the sky?", answer: "Blue" }
];

let currentIndex = 0;
const flashcard = document.getElementById("flashcard");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const startBtn = document.getElementById("start-btn");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = function(event) {
  const lastResult = event.results[event.resultIndex];
  const command = lastResult[0].transcript.trim().toLowerCase();
  console.log("Command received:", command);
  if (command === "next") {
    nextFlashcard();
  } else if (command === "flip") {
    flipFlashcard();
  } else if (command === "previous") {
    previousFlashcard();
  }
};

recognition.onerror = function(event) {
  console.error("Speech Recognition Error:", event.error);
};

const startRecognition = () => {
  recognition.start();
  displayFlashcard();
  console.log("Speech recognition started");
};

const displayFlashcard = () => {
  question.textContent = flashcards[currentIndex].question;
  answer.textContent = flashcards[currentIndex].answer;
  speak(flashcards[currentIndex].question);
  console.log("Displayed flashcard:", flashcards[currentIndex]);
};

const nextFlashcard = () => {
  currentIndex = (currentIndex + 1) % flashcards.length;
  flashcard.classList.remove("flipped");
  displayFlashcard();
  console.log("Next flashcard");
};

const flipFlashcard = () => {
  flashcard.classList.toggle("flipped");
  if (flashcard.classList.contains("flipped")) {
    speak(answer.textContent);
  } else {
    speak(question.textContent);
  }
  console.log("Flipped flashcard");
};

const previousFlashcard = () => {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  flashcard.classList.remove("flipped");
  displayFlashcard();
  console.log("Previous flashcard");
};

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
  console.log("Speaking:", text);
};

startBtn.addEventListener("click", startRecognition);

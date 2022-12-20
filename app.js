// The global variable here
let play = false;
let newWord = "";
let ranWord = "";
let leftAttempts = 19;

// all element reference here
const button = document.getElementById("button");
const input = document.getElementById("guessingInput");
const showguessWord = document.getElementById("showGuessWord");
const totalLeftWord = document.getElementById("totalLeftWord");
totalLeftWord.innerHTML = `Remaining Word ( ${leftAttempts} )`;

// all audio sound effect
const clickSound = new Audio("./audios/click.mp3");
const winSound = new Audio("./audios/win.mp3");
const lostSound = new Audio("./audios/lost.mp3");
const gameWindowSound = new Audio("./audios/gameWindow.mp3");

// guessing words array
let guessWord = [
  "javascript",
  "html",
  "css",
  "bootstrap",
  "mysql",
  "python",
  "reactnative",
  "react",
  "tailwindcss",
  "java",
  "c++",
  "php",
  "sass",
  "nextjs",
  "typescript",
  "jquery",
  "angular",
  "swift",
  "c#",
];

// creating a function for generate the new word for guessing
const createWords = () => {
  let randomNum = Math.floor(Math.random() * guessWord.length);
  let randomWord = guessWord[randomNum];

  return randomWord;
};

// creating a function for scramble word in guessWord arr
const scrambleWord = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let temp = arr[i];
    let j = Math.floor(Math.random() * (i + 1));
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

// button event listener
button.addEventListener("click", () => {
  if (!play) {
    gameWindowSound.play();
    play = true;
    input.classList.toggle("hidden");
    button.innerText = "GUESS";
    showguessWord.style.display = "block";
    totalLeftWord.style.display = "block";
    newWord = createWords();
    ranWord = scrambleWord(newWord.split(""));
    showguessWord.innerText = `
                Guess The Word ( ${ranWord.join("")} )
    `;
  } else {
    let inputValue = input.value;
    if (inputValue === newWord) {
      play = false;
      winSound.play();
      showguessWord.innerText = `
            Well Done! You Win
      `;
      button.innerText = "START AGAIN";
      input.classList.toggle("hidden");
      totalLeftWord.style.display = "none";
      input.value = "";
    } else {
      lostSound.play();
      showguessWord.innerText = `
            You Lose! Try Again ( ${ranWord.join("")} )
      `;
      leftAttempts--;
      totalLeftWord.innerHTML = `Remaining Word ( ${leftAttempts} )`;

      if (leftAttempts < 0) {
        alert("Game over, Press ok to play again");
        totalLeftWord.innerHTML = 0;
        location.reload();
      }
    }
  }
});

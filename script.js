const url = "https://api.quotable.io/random?minLength=50&maxLength=100";
const quoteSection = document.getElementById("quote");
let startButton = document.getElementById("start-test");
let stopButton = document.getElementById("stop-test");
let quoteInput = document.getElementById("quote-input");
let mistakes = document.getElementById("mistakes");
let result = document.querySelector(".result");
let mistake = 0;
let timer = "";
let time = 60;
let quote = "";
async function fetchQuote() {
  let response = await fetch(url);
  let data = await response.json();
  quote = data.content;

  let arr = quote.split("").map((value) => {
    return "<span class='quote-chars'>" + value + "</span>";
  });
  quoteSection.innerHTML += arr.join("");
}
quoteInput.addEventListener("input", function () {
  let quoteChars = document.querySelectorAll(".quote-chars");
  quoteChars = Array.from(quoteChars);
  //   console.log(quoteChars);

  let quoteInputChars = quoteInput.value.split("");
  quoteChars.forEach((char, index) => {
    if (char.innerText === quoteInputChars[index]) {
      char.classList.add("success");
    } else if (quoteInputChars[index] == null) {
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    } else {
      if (!char.classList.contains("fail")) {
        mistake++;
        char.classList.add("fail");
      }
      mistakes.innerText = mistake;
    }
    let check = quoteChars.every((element) => {
      return element.classList.contains("success");
    });
    if (check) {
      displayResult();
    }
  });
});
const updateTime = () => {
  if (time === 0) {
    displayResult();
  } else {
    document.querySelector("#timer").innerText = --time + "s";
  }
};
const timeReduce = () => {
  time = 60;
  timer = setInterval(updateTime, 1000);
};
const displayResult = () => {
  result.style.display = "block";
  stopButton.style.display = "none";
  clearInterval(timer);
  quoteInput.disabled = true;

  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById("wpm").textContent =
    (quoteInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
  document.getElementById("accuracy").textContent =
    Math.round(
      ((quoteInput.value.length - mistake) / quoteInput.value.length) * 100
    ) + " %";
};
const startTest = () => {
  mistake = 0;
  timer = "";
  timeReduce();
  quoteInput.disabled = false;
  stopButton.style.display = "block";
  startButton.style.display = "none";
};
window.onload = () => {
  quoteInput.disabled = true;
  startButton.style.display = "block";
  stopButton.style.display = "none";
  fetchQuote();
};

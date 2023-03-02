let data = document.querySelectorAll("[data-num]");
let box = document.querySelectorAll(".box");
const game = document.querySelector(".game__wrapper");
const newgame = document.querySelector(".game__button");
let resultEl;
let array = [null, null, null, null, null, null, null, null, null];
let stop = false;

let concatBox = function (a, b, c) {
  let result = array[a] + array[b] + array[c];

  if (result === "xxx" || result === "ooo") {
    return result;
  }

  switch (result) {
    case "xxnull":
      return ["x", c];

    case "xnullx":
      return ["x", b];

    case "nullxx":
      return ["x", a];

    case "oonull":
      return ["o", c];

    case "onullo":
      return ["o", b];

    case "nulloo":
      return ["o", a];
  }
};

let stopGame = (a, b, c) => {
  data[a].style.color = "#faf6f6";
  data[b].style.color = "#faf6f6";
  data[c].style.color = "#faf6f6";
  let resultEl = document.createElement("p");
  resultEl.classList.add("text");
  let resultText;
  if (data[a].textContent === "x") {
    resultText = document.createTextNode("Победа!");
  } else if (data[a].textContent === "o"){
    resultText = document.createTextNode("Поражение!");
  } 
  resultEl.appendChild(resultText);
  game.appendChild(resultEl);
  stop = true;
};

let checkWinner = () => {
  for (let i = 0; i < 3; i++) {
    let result = concatBox(i, i + 3, i + 6);

    if (result === "xxx" || result === "ooo") {
      stopGame(i, i + 3, i + 6);
    }
  }
  for (let i = 0; i <= 6; i += 3) {
    let result = concatBox(i, i + 1, i + 2);

    if (result === "xxx" || result === "ooo") {
      stopGame(i, i + 1, i + 2);
    }
  }
  result = concatBox(0, 4, 8);
  if (result === "xxx" || result === "ooo") {
    stopGame(0, 4, 8);
  }
  result = concatBox(2, 4, 6);
  if (result === "xxx" || result === "ooo") {
    stopGame(2, 4, 6);
  }
};

let botPlay = function () {
  for (let i = 0; i < 3; i++) {
    let result = concatBox(i, i + 3, i + 6);
    if (typeof result === "object" && result[0] === "o") {
      data[result[1]].innerHTML = "o";
      array[result[1]] = "o";
      return;
    }
  }
  for (let i = 0; i <= 6; i += 3) {
    let result = concatBox(i, i + 1, i + 2);
    if (typeof result === "object" && result[0] === "o") {
      data[result[1]].innerHTML = "o";
      array[result[1]] = "o";
      return;
    }
  }

  result = concatBox(0, 4, 8);
  if (typeof result === "object" && result[0] === "o") {
    data[result[1]].innerHTML = "o";
    array[result[1]] = "o";
    return;
  }

  result = concatBox(2, 4, 6);
  if (typeof result === "object" && result[0] === "o") {
    data[result[1]].innerHTML = "o";
    array[result[1]] = "o";
    return;
  }

  for (let i = 0; i < 3; i++) {
    let result = concatBox(i, i + 3, i + 6);
    if (typeof result === "object" && result[0] === "x") {
      data[result[1]].innerHTML = "o";
      array[result[1]] = "o";
      return;
    }
  }
  for (let i = 0; i <= 6; i += 3) {
    let result = concatBox(i, i + 1, i + 2);
    if (typeof result === "object" && result[0] === "x") {
      data[result[1]].innerHTML = "o";
      array[result[1]] = "o";
      return;
    }
  }
  result = concatBox(0, 4, 8);
  if (typeof result === "object" && result[0] === "x") {
    data[result[1]].innerHTML = "o";
    array[result[1]] = "o";
    return;
  }
  result = concatBox(2, 4, 6);
  if (typeof result === "object" && result[0] === "x") {
    data[result[1]].innerHTML = "o";
    array[result[1]] = "o";
    return;
  }

  let tempArr = [];

  for (let i = 0; i < 9; i++) {
    if (array[i] === null) {
      tempArr.push(i);
    }
  }

  let randomIndexTempArr = Math.floor(Math.random() * tempArr.length);

  let randomNull = tempArr[randomIndexTempArr];
  if(randomNull === undefined) {
    let resultEl = document.createElement("p");
    resultEl.classList.add("text");
    let resultText = document.createTextNode("Ничья!");
    resultEl.appendChild(resultText);
    game.appendChild(resultEl);
    stopGame;
  } else {
    data[randomNull].innerHTML = "o";
    array[randomNull] = "o";
  }
};

let newGame = function() {
  document.querySelector(".text").remove();
  array = [null, null, null, null, null, null, null, null, null];	
  data.forEach(elem => {
    elem.innerHTML = "";
    elem.style.color = "";
  });
  stop = false;
  return
}

newgame.addEventListener('click', newGame);


addEventListener("click", function (event) {
  if (stop === true) {
    newGame;
    return;
  }

  if (event.target.className === "box" && event.target.textContent === "") {
    event.target.style.color = "#452f21";
    event.target.innerHTML = "x";

    array[event.target.dataset.num] = "x";
  } else {
		return
	}
  checkWinner();

  if (stop === true) {
    return;
  }

  botPlay();

  checkWinner();
});


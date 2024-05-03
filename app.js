let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let boxs = ["red", "blue", "green", "yellow"];

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;

    levelUp();
  }
});

function gameFlash(box) {
  box.classList.add("flash");
  setTimeout(function () {
    box.classList.remove("flash");
  }, 250);
}

function userFlash(box) {
  box.classList.add("userFlash");
  setTimeout(function () {
    box.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randInd = Math.floor(Math.random() * 4);
  let randColor = boxs[randInd];
  let randBox = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);

  gameFlash(randBox);
}

function checkAns(idx) {
  if (gameSeq[idx] === userSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over : Your Score was <b>${level}</b> <br> Press any Key to Start Again`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function boxPress() {
  let box = this;
  userFlash(box);

  userColor = box.getAttribute("id");

  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBoxs = document.querySelectorAll(".box");
for (box of allBoxs) {
  box.addEventListener("click", boxPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

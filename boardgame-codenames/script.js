const shuffleBtn = document.getElementById("shuffle");
const tableList = document.getElementsByClassName("table");
const container = document.getElementById("container");
const header = document.getElementById("header");

const spy = -1;
const redAgent = 1;
const blueAgent = 2;
const citizen = 0;

shuffleBtn.addEventListener("click", shuffle);

function shuffle() {
  const array = arrayShuffle(codenamesArray(tableList.length));
  for (let i = 0; i < tableList.length; i++) {
    tableList.item(i).classList.remove("spy", "red", "blue");
    if (array[i] === spy) {
      tableList.item(i).classList.add("spy");
    } else if (array[i] === redAgent) {
      tableList.item(i).classList.add("red");
    } else if (array[i] === blueAgent) {
      tableList.item(i).classList.add("blue");
    }
  }
}

function codenamesArray(length) {
  const doubleAgent = randomRadBlue();

  const array = [
    ...pushArr(spy, 1),
    ...pushArr(doubleAgent, 1),
    ...pushArr(redAgent, 7),
    ...pushArr(blueAgent, 7),
    ...pushArr(citizen, length - 16),
  ];

  return array;
}

function pushArr(agent, number) {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(agent);
  }
  return array;
}

function randomRadBlue() {
  const doubleAgent = Math.floor(Math.random() * 2) + 1;
  siren(doubleAgent);
  return doubleAgent;
}

function siren(doubleAgent) {
  if (doubleAgent === redAgent) {
    container.classList.remove("blue");
    container.classList.add("red");
    header.classList.remove("blue");
    header.classList.add("red");
  } else {
    container.classList.remove("red");
    container.classList.add("blue");
    header.classList.remove("red");
    header.classList.add("blue");
  }
}

function arrayShuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));
    const temporary = array[index];
    array[index] = array[randomPosition];
    array[randomPosition] = temporary;
  }
  return array;
}

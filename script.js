//주요 node들을 불러옵니다.
const shuffleBtn = document.querySelector("#shuffle");
const tableList = document.querySelectorAll(".table");
const container = document.querySelector("#container");
const header = document.querySelector("#header");

//해당 프로그램의 핵심인 codenames의 데이터를 관리하는 클래스입니다.
class Codenames {
  #size = tableList.length;
  #spy = -1;
  #redAgent = 1;
  #blueAgent = 2;
  #citizen = 0;
  #doubleAgent = 0;
  #table = [];

  get size() {
    return this.#size;
  }

  get spy() {
    return this.#spy;
  }

  get redAgent() {
    return this.#redAgent;
  }

  get blueAgent() {
    return this.#blueAgent;
  }

  get citizen() {
    return this.#citizen;
  }

  get doubleAgent() {
    return this.#doubleAgent;
  }

  get table() {
    return this.#table;
  }

  doubleAgentShuffle() {
    this.#doubleAgent = randomOneTwo();
    return this.#doubleAgent;
  }

  tableSetting() {
    this.#table = [
      ...pushArr(this.#spy, 1),
      ...pushArr(this.#doubleAgent, 1),
      ...pushArr(this.#redAgent, 7),
      ...pushArr(this.#blueAgent, 7),
      ...pushArr(this.#citizen, this.#size - 16),
    ];
    return this.#table;
  }

  tableShuffle() {
    this.#table = arrayShuffle(this.tableSetting());
    return this.#table;
  }

  shuffle() {
    this.doubleAgentShuffle();
    return this.tableShuffle();
  }
}

// // 아래는 ES5 문법으로 짠 코드입니다.
// function Codenames() {
//   const size = tableList.length;
//   const spy = -1;
//   const redAgent = 1;
//   const blueAgent = 2;
//   const citizen = 0;
//   let doubleAgent = 0;
//   let table = [];

//   return {
//     size: function () {
//       return size;
//     },
//     spy: function () {
//       return spy;
//     },
//     redAgent: function () {
//       return redAgent;
//     },
//     blueAgent: function () {
//       return blueAgent;
//     },
//     citizen: function () {
//       return citizen;
//     },
//     doubleAgent: function () {
//       return doubleAgent;
//     },
//     table: function () {
//       return table;
//     },
//     doubleAgentShuffle: function () {
//       doubleAgent = randomOneTwo();
//       return doubleAgent;
//     },
//     tableSetting: function () {
//       table = [
//         ...pushArr(spy, 1),
//         ...pushArr(doubleAgent, 1),
//         ...pushArr(redAgent, 7),
//         ...pushArr(blueAgent, 7),
//         ...pushArr(citizen, size - 16),
//       ];
//       return table;
//     },

//     tableShuffle: function () {
//       table = arrayShuffle(this.tableSetting());
//       return table;
//     },
//     shuffle: function () {
//       doubleAgent = this.doubleAgentShuffle();
//       return this.tableShuffle();
//     },
//   };
// }

const game = new Codenames();

//shuffle버튼의 클릭을 감지합니다.
shuffleBtn.addEventListener("click", clickShuffle);

function clickShuffle() {
  paintTable(game.shuffle());
  sirenFirstTurn(game.doubleAgent);
}

//정렬 내에 agent를 number만큼 반복 삽입합니다.
function pushArr(agent, number) {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(agent);
  }
  return array;
}

//1 또는 2를 랜덤 출력합니다.
function randomOneTwo() {
  return Math.floor(Math.random() * 2) + 1;
}

//피셔-예이츠 셔플 방법을 이용해 array를 랜덤 셔플합니다.
function arrayShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * (i + 1));
    const temporary = array[i];
    array[i] = array[randomPosition];
    array[randomPosition] = temporary;
  }
  return array;
}

//whoIs(doubleAgent)의 값이 redAgent/blueAgent인지 확인 후 화면에 강조 표시를 띄웁니다.
function sirenFirstTurn(whoIs) {
  if (whoIs === game.redAgent) {
    container.classList.remove("blue");
    container.classList.add("red");
    header.classList.remove("blue");
    header.classList.add("red");
  } else if (whoIs === game.blueAgent) {
    container.classList.remove("red");
    container.classList.add("blue");
    header.classList.remove("red");
    header.classList.add("blue");
  }
}

//화면의 table을 array내 값에 따라 색칠합니다.
function paintTable(array) {
  for (let i = 0; i < game.size; i++) {
    tableList.item(i).classList.remove("spy", "red", "blue");
    if (array[i] === game.spy) {
      tableList.item(i).classList.add("spy");
    } else if (array[i] === game.redAgent) {
      tableList.item(i).classList.add("red");
    } else if (array[i] === game.blueAgent) {
      tableList.item(i).classList.add("blue");
    }
  }
}

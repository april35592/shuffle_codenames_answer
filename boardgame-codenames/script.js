const shuffleBtn = document.getElementById("shuffle");
const tableList = document.getElementsByClassName("table");
const container = document.getElementById("container");
const header = document.getElementById("header");

const codenames = {
  size: tableList.length,
  team: {
    spy: -1,
    redAgent: 1,
    blueAgent: 2,
    citizen: 0,
    doubleAgent: {
      value: 0,
      shuffle() {
        codenames.team.doubleAgent.value = randomOneTwo();
      },
    },
  },
  array: {
    value: [],
    setting: () => {
      codenames.array.value = [
        ...pushArr(codenames.team.spy, 1),
        ...pushArr(codenames.team.doubleAgent.value, 1),
        ...pushArr(codenames.team.redAgent, 7),
        ...pushArr(codenames.team.blueAgent, 7),
        ...pushArr(codenames.team.citizen, codenames.size - 16),
      ];
    },
    shuffle: () => {
      codenames.array.setting();
      codenames.array.value = arrayShuffle(codenames.array.value);
      return codenames.array.value;
    },
  },
  shuffle: () => {
    codenames.team.doubleAgent.shuffle();
    return codenames.array.shuffle();
  },
};

shuffleBtn.addEventListener("click", clickShuffle);

function clickShuffle() {
  paintTable(codenames.shuffle());
  sirenFirstTurn(codenames.team.doubleAgent.value);
}

function pushArr(agent, number) {
  const array = [];
  for (let i = 0; i < number; i++) {
    array.push(agent);
  }
  return array;
}

function randomOneTwo() {
  return Math.floor(Math.random() * 2) + 1;
}

function arrayShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * (i + 1));
    const temporary = array[i];
    array[i] = array[randomPosition];
    array[randomPosition] = temporary;
  }
  return array;
}

function sirenFirstTurn(whoIs) {
  if (whoIs === codenames.team.redAgent) {
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

function paintTable(array) {
  for (let i = 0; i < tableList.length; i++) {
    tableList.item(i).classList.remove("spy", "red", "blue");
    if (array[i] === codenames.team.spy) {
      tableList.item(i).classList.add("spy");
    } else if (array[i] === codenames.team.redAgent) {
      tableList.item(i).classList.add("red");
    } else if (array[i] === codenames.team.blueAgent) {
      tableList.item(i).classList.add("blue");
    }
  }
}

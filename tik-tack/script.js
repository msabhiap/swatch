let cells = document.querySelectorAll(".cell");
cells.forEach((cel) => {
  cel.addEventListener("click", handle, { once: true });
});
let win = false;
let currentPlayer = "x";
let winningPlayer = null;

function handle() {
  if (win) return;
  this.innerHTML = currentPlayer;
  currentPlayer = currentPlayer === "x" ? "0" : "x";
  checkWinner();
  if (win) alert("won by player:" + winningPlayer);
}
let cellIndex = [
  //row
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //column
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  let data = [].fill("")
  cells.forEach((cell) => {
    data.push(cell.innerText);
  });
  // console.log(data)
  cellIndex.forEach((pattern) => {
    // console.log(index)
    const [a, b, c] = pattern;
    if (data[a] && data[b] && data[c]) {
      if (data[a] === data[b] && data[b] === data[c]) {
        win = true;
        winningPlayer = currentPlayer;
        return;
      }
    }
  });
}

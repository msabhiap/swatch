const paletteEl = document.getElementById("palette");
const outputEl = document.getElementById("output");

// Current hex code (remembered for the "Copy" button)
let currentColor = null;
let colors = [];

// Build a random hex color like "#a3e4f5"
function randomColor() {
  const hex = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hex.length);
    color += hex[randomIndex];
  }
  return color;
}
function generateColor() {
  let list = [];
  for (let i = 0; i < 6; i++) {
    list.push(randomColor());
  }
  return list;
}
colors=generateColor()

// Generate N random colors and render them
function renderPalette() {
  paletteEl.innerHTML = ""; // clear old swatches

  for (const color of colors) {
    // const color = randomColor();

    const swatch = document.createElement("div");
    swatch.className = "swatch";
    swatch.style.backgroundColor = color;
    swatch.textContent = color;

    // CLOSURE: `color` is captured and remembered by this listener
    swatch.addEventListener("click", () => {
      currentColor = color;
      outputEl.textContent = color;
    });

    paletteEl.appendChild(swatch);
  }
}
//measure the hex color
/* ie measures the light of 6 colors i mean it add
codeblock
colors = ["#f2a3b1", "#03c4d2", "#a1e04f", "#8833aa", "#ff9900", "#1b2a49"]

brightness of each:
  #1b2a49 → 27 + 42 + 73  = 142  (darkest)
  #8833aa → 136 + 51 + 170 = 357
  #a1e04f → 161 + 224 + 79 = 464
  #03c4d2 → 3 + 196 + 210 = 409
  #ff9900 → 255 + 153 + 0 = 408
  #f2a3b1 → 242 + 163 + 177 = 582 (lightest)
 */
/* in below it tkes the value of b2 inly as we see sclice base 16 which is a=10  #a3e4f5 in slice 1 exclude # then rgb=e3 g=e4 b=65 which mean the value of r g b*/

function brightness(hexcolor) {
  let r = parseInt(hexcolor.slice(1, 3), 16);//a3 red
  let g = parseInt(hexcolor.slice(3, 5), 16);////fe4
  let b = parseInt(hexcolor.slice(5, 7), 16);//f5
  return r + g + b;
}
/* the value of hex coloe pass to down */
function sortColor() {
  colors.sort((a, b) => brightness(a) - brightness(b));
  renderPalette();
}
function newPalette() {
  generateColor();
  renderPalette();
}

document.getElementById("generate").addEventListener("click", newPalette);
// New palette
// document.getElementById("generate").addEventListener("click", renderPalette);
// Sort colors
document.getElementById("sort").addEventListener("click", sortColor);
// Copy the current color
document.getElementById("copy").addEventListener("click", () => {
  if (currentColor) {
    navigator.clipboard.writeText(currentColor);
    outputEl.textContent = "Copied " + currentColor + " to clipboard!";
  } else {
    outputEl.textContent = "Click a color first!";
  }
});

// Start with a palette
newPalette();

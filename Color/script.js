const paletteEl = document.getElementById("palette");
    const outputEl = document.getElementById("output");

    // Current hex code (remembered for the "Copy" button)
    let currentColor = null;

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

    // Generate N random colors and render them
    function renderPalette() {
      paletteEl.innerHTML = "";          // clear old swatches

      for (let i = 0; i < 6; i++) {
        const color = randomColor();

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

    // New palette
    document.getElementById("generate").addEventListener("click", renderPalette);

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
    renderPalette();
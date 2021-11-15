const DEFAULT_COLOR = "#333333";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode ;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
}


function changeSize(value) {
  setCurrentSize(value)
  updatePixelSize(value)
  reloadGrid()
}


function updatePixelSize(value) {
  pixelSize.innerHTML = `${value} x ${value}`
}


const colorPicker = document.querySelector("#color-picker");
const colorBtn = document.querySelector("#color-btn");
const rainbowBtn = document.querySelector("#rainbow-btn");
const cleanerBtn = document.querySelector("#cleaner-btn");
const deleteBtn = document.querySelector("#clear-btn");
const pixelSize = document.querySelector("#pixelSize");
const pixelSlider = document.querySelector("#pixelSlider");
const grid = document.querySelector("#grid");

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("color")
rainbowBtn.onclick = () => setCurrentMode("rainbow")
cleanerBtn.onclick = () => setCurrentMode("eraser")
deleteBtn.onclick = () => reloadGrid()
pixelSlider.onmousemove = () => updatePixelSize(e.target.value)
pixelSlider.onchange = (e) => changeSize(e.target.value)



function reloadGrid() {
    deleteGrid()
    setupGrid(currentSize)
  }
  
  function deleteGrid() {
    grid.innerHTML = ""
  }

  function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement("div")
      gridElement.addEventListener("click", changeColor)
      grid.appendChild(gridElement)
    }
  }

  function changeColor(e) {
    if (currentMode === "rainbow") {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === "color") {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === "eraser") {
      e.target.style.backgroundColor = "#FF6D6D"
    }
  }

  function activateButton(newMode) {
    if (currentMode === "rainbow") {
      rainbowBtn.classList.remove("active")
    } else if (currentMode === "color") {
      colorBtn.classList.remove("active")
    } else if (currentMode === "eraser") {
      cleanerBtn.classList.remove("active")
    }
  
    if (newMode === "rainbow") {
      rainbowBtn.classList.add("active")
    } else if (newMode === "color") {
      colorBtn.classList.add("active")
    } else if (newMode === "eraser") {
      cleanerBtn.classList.add("active")
    }
  }


window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }
  
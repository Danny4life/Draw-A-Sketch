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

const colorPicker = document.getElementById("color-picker");
const colorBtn = document.getElementById("color-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const cleanerBtn = document.getElementById("cleaner-btn");
const clearBtn = document.getElementById("clear-btn");
const pixelSize = document.getElementById("pixelSize");
const pixelSlider = document.getElementById("pixelSlider");
const grid = document.getElementById("grid");

colorPicker.onchange = (e) => setCurrentColor(e.target.value);
colorBtn.onclick = () => setCurrentMode("color")
rainbowBtn.onclick = () => setCurrentMode("rainbow")
cleanerBtn.onclick = () => setCurrentMode("eraser")
clearBtn.onclick = () => reloadGrid()
pixelSlider.onmousemove = () => updatePixelSize(e.target.value)
pixelSlider.onchange = (e) => changeSize(e.target.value)

function changeSize(value) {
    setCurrentSize(value)
    updatePixelSize(value)
    reloadGrid()
}

function updatePixelSize(value) {
    pixelSize.innerHTML = `${value} x ${value}`
  }


function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
  }
  
  function clearGrid() {
    grid.innerHTML = ''
  }

  function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div')
      gridElement.addEventListener('mouseover', changeColor)
      grid.appendChild(gridElement)
    }
  }

  function changeColor(e) {
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    }
  }

  function activateButton(newMode) {
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      cleanerBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      cleanerBtn.classList.add('active')
    }
  }


window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
  }
  
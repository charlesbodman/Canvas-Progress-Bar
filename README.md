# Simple Canvas Progress Bar
Simple canvas progress bar for smooth progress bar animations

# <img src="https://github.com/charlesbodman/simple-canvas-progress-bar/blob/master/progressbar.gif" width="487"/>

## Installation
```sh
npm install simple-canvas-progress-bar --save
```
## Usage
###
```typescript
import SimpleCanvasProgressBar from 'simple-canvas-progress-bar';

const canvasProgressBar = new SimpleCanvasProgressBar();

// Set the size of the progress bar in px
canvasProgressBar.setSize(450, 25);

// Set the colors of the progress bar
canvasProgressBar.setColors({ bar: ['#94f407', '#36a804'] });

// Animate the progress bar :)
canvasProgressBar.animate({
    from: 50, // Animate from percent
    to: 100, // Animate to percent
    speed: 1000, // Speed it takes from 0 to 100
    stripeSpeed: 100 // Speed the stripes animate at. (PX per second)
});


// Get canvas element to add to the dom
const canvasEl = canvasProgressBar.getCanvas();

// Example
var app = document.getElementById("app");
if (app !== null) {
    app.appendChild(canvasProgressBar.getCanvas());
}
```

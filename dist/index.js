"use strict";
/**
 * This class handles drawing of progress bar
 * @author Charles Bodman
 *
 * @example
 * const canvasProgressBar = new CanvasProgressBar();
 * canvasProgressBar.setSize(450, 25);
 * canvasProgressBar.setBarColors(['#94f407', '#36a804']);
 * canvasProgressBar.animate({
 *   from: 20,
 *   to: 100,
 *   speed: 1000
 * });
 *
 */
var CanvasProgressBar = /** @class */ (function () {
    function CanvasProgressBar() {
        // Create canvas element
        var canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
        this.barColor = '#00FF00';
        this.animating = false;
        this.animationOptions = {
            from: 0,
            to: 100,
            speed: 1000
        };
        this.animationPercentElapsed = 0;
        this.lastAnimationTimeStamp = Date.now();
        this.loop = this.loop.bind(this);
    }
    /**
     * Sets the size of the canvas element
     * @param {Number} width
     * @param {Numbers} height
     */
    CanvasProgressBar.prototype.setSize = function (width, height) {
        var canvas = this.canvas;
        canvas.width = width;
        canvas.height = height;
    };
    /**
     * Returns the canvas
     * @returns {HTMLCanvasElement}
     */
    CanvasProgressBar.prototype.getCanvas = function () {
        return this.canvas;
    };
    /**
    * Starts the drawing process
    */
    CanvasProgressBar.prototype.draw = function (percent) {
        this.drawProgressBar(percent);
    };
    /**
     * Animates the progress bar
     * @param {CanvasProgressBarAnimationOptions} options
     */
    CanvasProgressBar.prototype.animate = function (options) {
        this.animationOptions = options;
        this.animationPercentElapsed = 0;
        this.animating = true;
        this.lastAnimationTimeStamp = Date.now();
        this.loop();
    };
    /**
     * Animate the progress bar
     */
    CanvasProgressBar.prototype.loop = function () {
        var currentTime = Date.now();
        var delta = currentTime - this.lastAnimationTimeStamp;
        var animationOptions = this.animationOptions;
        var progressPercent = (((animationOptions.from / 100) + this.animationPercentElapsed));
        this.draw(progressPercent);
        this.animationPercentElapsed += (((100 / animationOptions.speed) * delta) / 100);
        this.lastAnimationTimeStamp = currentTime;
        window.requestAnimationFrame(this.loop);
    };
    /**
     * Set Bar Color
     * @param color
     */
    CanvasProgressBar.prototype.setBarColors = function (colors) {
        if (colors.length === 1) {
            this.barColor = colors[0];
        }
        else {
            this.barColor = this.createLinearGradient(colors);
        }
    };
    /**
     * Creates a canvas linear gradient
     * @param {String[]} colors
     */
    CanvasProgressBar.prototype.createLinearGradient = function (colors) {
        var canvas = this.canvas;
        var width = canvas.width;
        var height = canvas.height;
        var colorsCount = colors.length;
        if (this.canvasCtx === null) {
            throw new Error('Canvas context is null');
        }
        var gradient = this.canvasCtx.createLinearGradient(0, 0, 0, height);
        for (var i = 0; i < colorsCount; i++) {
            gradient.addColorStop(i / (colorsCount - 1), colors[i]);
        }
        return gradient;
    };
    /**
     * Draws the progress bar
     * @param {Number} progress
     */
    CanvasProgressBar.prototype.drawProgressBar = function (progress) {
        var canvasCtx = this.canvasCtx;
        var canvas = this.canvas;
        var width = canvas.width;
        var height = canvas.height;
        var fillWidth = width * progress;
        if (canvasCtx !== null) {
            canvasCtx.save();
            // Clear progress bar
            canvasCtx.clearRect(0, 0, width, height);
            // Create clipping
            canvasCtx.beginPath();
            canvasCtx.rect(0, 0, fillWidth, height);
            canvasCtx.strokeStyle = this.barColor;
            canvasCtx.stroke();
            canvasCtx.clip();
            // Fill Bar
            canvasCtx.fillStyle = this.barColor;
            canvasCtx.fillRect(0, 0, width, height);
            this.drawOverlayLines();
            canvasCtx.restore();
        }
    };
    /**
     * Draws overlay lines
     */
    CanvasProgressBar.prototype.drawOverlayLines = function () {
        var canvas = this.canvas;
        var canvasCtx = this.canvasCtx;
        var width = canvas.width;
        var height = canvas.height;
        var overlayLines = 5;
        var spread = width / overlayLines;
        var lineWidth = 30;
        if (canvasCtx !== null) {
            canvasCtx.beginPath();
            var overlayAnimationOffset = -(Date.now() / 10) % spread;
            for (var i = -2; i <= overlayLines; i++) {
                var offset = (i * spread) + (overlayAnimationOffset);
                canvasCtx.strokeStyle = 'rgba(255,255,255,0.5)';
                canvasCtx.lineWidth = lineWidth;
                canvasCtx.moveTo(0 + offset - lineWidth, height + lineWidth);
                canvasCtx.lineTo(spread + offset + lineWidth, -lineWidth);
            }
            canvasCtx.stroke();
        }
    };
    return CanvasProgressBar;
}());
var canvasProgressBar = new CanvasProgressBar();
canvasProgressBar.setSize(450, 25);
canvasProgressBar.setBarColors(['#94f407', '#36a804']);
canvasProgressBar.animate({
    from: 20,
    to: 100,
    speed: 1000
});
var app = document.getElementById("app");
if (app !== null) {
    app.appendChild(canvasProgressBar.getCanvas());
}

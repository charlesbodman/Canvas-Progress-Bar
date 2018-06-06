"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple progress bar for smooth progress bar animations
 * @author Charles Bodman
 *
 */
var SimpleCanvasProgressBar = /** @class */ (function () {
    /**
     * The contructor of the canvas progress bar creates it's on canvas reference.
     */
    function SimpleCanvasProgressBar() {
        var _this = this;
        /**
         * Progress bar color
         */
        this.barColor = '#00FF00';
        /**
         * Progress bar line color
         */
        this.stripeColor = 'rgba(255,255,255,0.3)';
        /**
         * Flag for whether canvas bar is animating or not
         */
        this.animating = false;
        /**
         * Animation Options
         * @type {SimpleCanvasProgressBarAnimationOptions}
         */
        this.animationOptions = {
            from: 0,
            to: 100,
            speed: 1000,
            stripeSpeed: 100
        };
        /**
         * Animation percent progress elapsed
         */
        this.animationPercentElapsed = 0;
        /**
         * Last animation timestamp
         */
        this.lastAnimationTimeStamp = 0;
        /**
         * Animate the progress bar
         */
        this.loop = function () {
            if (_this.animating) {
                var currentTime = Date.now();
                var delta = currentTime - _this.lastAnimationTimeStamp;
                var animationOptions = _this.animationOptions;
                var progressPercent = (((animationOptions.from / 100) + _this.animationPercentElapsed));
                _this.draw(progressPercent);
                if (progressPercent < (animationOptions.to / 100)) {
                    _this.animationPercentElapsed += (((100 / animationOptions.speed) * delta) / 100);
                }
                _this.lastAnimationTimeStamp = currentTime;
                window.requestAnimationFrame(_this.loop);
            }
        };
        var canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
    }
    /**
     * Sets the size of the canvas element
     * @param {Number} width
     * @param {Numbers} height
     */
    SimpleCanvasProgressBar.prototype.setSize = function (width, height) {
        var canvas = this.canvas;
        canvas.width = width;
        canvas.height = height;
    };
    /**
     * Returns the canvas
     * @returns {HTMLCanvasElement}
     */
    SimpleCanvasProgressBar.prototype.getCanvas = function () {
        return this.canvas;
    };
    /**
    * Starts the drawing process
    */
    SimpleCanvasProgressBar.prototype.draw = function (percent) {
        this.drawProgressBar(percent);
    };
    /**
     * Animates the progress bar
     * @param {SimpleCanvasProgressBarAnimationOptions} options
     */
    SimpleCanvasProgressBar.prototype.animate = function (options) {
        this.animationOptions = __assign({}, this.animationOptions, options);
        this.animationPercentElapsed = 0;
        this.animating = true;
        this.lastAnimationTimeStamp = Date.now();
        this.loop();
    };
    /**
     * Stops the animation loop
     */
    SimpleCanvasProgressBar.prototype.stopAnimation = function () {
        this.animating = false;
    };
    /**
     * Set Bar Color
     * @param {String[]} colors
     * Setting multiple colours will create a simple top down linear gradient
     */
    SimpleCanvasProgressBar.prototype.setColors = function (colorOptions) {
        if (colorOptions.bar) {
            var barColor = colorOptions.bar;
            if (colorOptions.bar.length === 1) {
                this.barColor = barColor[0];
            }
            else {
                this.barColor = this.createLinearGradient(barColor);
            }
        }
        if (colorOptions.stripes) {
            this.stripeColor = colorOptions.stripes;
        }
    };
    /**
     * Creates a canvas linear gradient
     * @param {String[]} colors
     */
    SimpleCanvasProgressBar.prototype.createLinearGradient = function (colors) {
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
    SimpleCanvasProgressBar.prototype.drawProgressBar = function (progress) {
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
            // Draw overlay lines -> / / / /
            this.drawStripes();
            // Restore context
            canvasCtx.restore();
        }
    };
    /**
     * Draws overlay lines
     */
    SimpleCanvasProgressBar.prototype.drawStripes = function () {
        var canvas = this.canvas;
        var canvasCtx = this.canvasCtx;
        var width = canvas.width;
        var height = canvas.height;
        var overlayLines = 5;
        var lineWidth = 30;
        var spread = width / overlayLines;
        if (canvasCtx !== null) {
            canvasCtx.beginPath();
            var stripeSpeed = (Date.now() / 1000) * this.animationOptions.stripeSpeed;
            var overlayAnimationOffset = -(stripeSpeed) % spread;
            for (var i = 0; i <= overlayLines; i++) {
                var offset = (i * spread) + (overlayAnimationOffset);
                canvasCtx.strokeStyle = this.stripeColor;
                canvasCtx.lineWidth = lineWidth;
                canvasCtx.moveTo(0 + offset - lineWidth, height + lineWidth);
                canvasCtx.lineTo(spread + offset + lineWidth, -lineWidth);
            }
            canvasCtx.stroke();
        }
    };
    return SimpleCanvasProgressBar;
}());
exports.default = SimpleCanvasProgressBar;

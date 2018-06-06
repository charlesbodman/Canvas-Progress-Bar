/**
 * This class handles drawing of progress bar
 * @author Charles Bodman
 *
 */
declare class CanvasProgressBar {
    /**
     * Progress bar canvas element
     */
    private canvas;
    /**
     * Progress bar canvas 2d context
     */
    private canvasCtx;
    /**
     * Progress bar color
     */
    private barColor;
    /**
     * Progress bar line color
     */
    private stripeColor;
    /**
     * Flag for whether canvas bar is animating or not
     */
    private animating;
    /**
     * Animation Options
     * @type {CanvasProgressBarAnimationOptions}
     */
    private animationOptions;
    /**
     * Animation percent progress elapsed
     */
    private animationPercentElapsed;
    /**
     * Last animation timestamp
     */
    private lastAnimationTimeStamp;
    /**
     * The contructor of the canvas progress bar creates it's on canvas reference.
     */
    constructor();
    /**
     * Sets the size of the canvas element
     * @param {Number} width
     * @param {Numbers} height
     */
    setSize(width: number, height: number): void;
    /**
     * Returns the canvas
     * @returns {HTMLCanvasElement}
     */
    getCanvas(): HTMLCanvasElement;
    /**
    * Starts the drawing process
    */
    draw(percent: number): void;
    /**
     * Animates the progress bar
     * @param {CanvasProgressBarAnimationOptions} options
     */
    animate(options: Partial<CanvasProgressBarAnimationOptions>): void;
    /**
     * Stops the animation loop
     */
    stopAnimation(): void;
    /**
     * Animate the progress bar
     */
    private loop;
    /**
     * Set Bar Color
     * @param {String[]} colors
     * Setting multiple colours will create a simple top down linear gradient
     */
    setColors(colorOptions: CanvasProgressBarColorOptions): void;
    /**
     * Creates a canvas linear gradient
     * @param {String[]} colors
     */
    private createLinearGradient;
    /**
     * Draws the progress bar
     * @param {Number} progress
     */
    private drawProgressBar;
    /**
     * Draws overlay lines
     */
    private drawStripes;
}
/**
 * Options for animatiing
 * This is used in the {CanvasProgressBar} animate method
 */
declare type CanvasProgressBarAnimationOptions = {
    /**
     * Animation from bar percent
     */
    from: number;
    /**
     * Animation from to percent
     */
    to: number;
    /**
     * Animations speed from 0 to 100 in ms
     */
    speed: number;
    /**
     * Animation speed of the line movement (PX per second)
     */
    stripeSpeed: number;
};
declare type CanvasProgressBarOverlayOptions = {
    /**
     * Number of stripes across the progress bar
     */
    stripeCount: number;
    /**
     * Thickness of the stripes across the progress bar
     */
    stripeThickness: number;
};
declare type CanvasProgressBarColorOptions = {
    /**
     * Bar colors. If multiple colors are provided, they will be drawn in a simple top down linear gradient
     */
    bar: string[];
    /**
     * Line color
     */
    stripes?: string;
};

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
    animate(options: CanvasProgressBarAnimationOptions): void;
    /**
     * Animate the progress bar
     */
    private loop;
    /**
     * Set Bar Color
     * @param color
     */
    setBarColors(colors: string[]): void;
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
    private drawOverlayLines;
}
/**
 * Canvas progress bar animation options type
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
};
declare const canvasProgressBar: CanvasProgressBar;
declare const app: HTMLElement | null;

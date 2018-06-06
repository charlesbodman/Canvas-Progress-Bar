
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
class CanvasProgressBar
{
    /**
     * Progress bar canvas element
     */
    private canvas: HTMLCanvasElement;

    /**
     * Progress bar canvas 2d context
     */
    private canvasCtx: CanvasRenderingContext2D | null;

    /**
     * Progress bar color
     */
    private barColor: string | CanvasGradient;

    /**
     * Flag for whether canvas bar is animating or not
     */
    private animating: boolean;

    /**
     * Animation Options
     * @type {CanvasProgressBarAnimationOptions}
     */
    private animationOptions: CanvasProgressBarAnimationOptions;

    /**
     * Animation percent progress elapsed
     */
    private animationPercentElapsed: number;

    /**
     * Last animation timestamp
     */
    private lastAnimationTimeStamp: number;


    constructor()
    {
        // Create canvas element
        const canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');

        this.barColor = '#00FF00';

        this.animating = false;

        this.animationOptions = {
            from:0,
            to:100,
            speed:1000
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
    public setSize(width: number, height: number)
    {
        const canvas = this.canvas;
        canvas.width = width;
        canvas.height = height;
    }

    /**
     * Returns the canvas
     * @returns {HTMLCanvasElement}
     */
    public getCanvas(): HTMLCanvasElement
    {
        return this.canvas;
    }

    /**
    * Starts the drawing process
    */
    public draw(percent: number)
    {
        this.drawProgressBar(percent);
    }

    /**
     * Animates the progress bar
     * @param {CanvasProgressBarAnimationOptions} options
     */
    public animate(options: CanvasProgressBarAnimationOptions)
    {
        this.animationOptions = options;
        this.animationPercentElapsed = 0;
        this.animating = true;
        this.lastAnimationTimeStamp = Date.now();
        this.loop();
    }

    /**
     * Animate the progress bar
     */
    private loop()
    {
        const currentTime = Date.now();
        const delta = currentTime - this.lastAnimationTimeStamp;
        const animationOptions = this.animationOptions;
        const progressPercent = (((animationOptions.from / 100) + this.animationPercentElapsed));

        this.draw(progressPercent);
        this.animationPercentElapsed += (((100 / animationOptions.speed) * delta) / 100);
        this.lastAnimationTimeStamp = currentTime;
        window.requestAnimationFrame(this.loop);
    }

    /**
     * Set Bar Color
     * @param color
     */
    public setBarColors(colors: string[])
    {
        if (colors.length === 1)
        {
            this.barColor = colors[0];
        }
        else
        {
            this.barColor = this.createLinearGradient(colors);
        }
    }

    /**
     * Creates a canvas linear gradient
     * @param {String[]} colors
     */
    private createLinearGradient(colors: string[]): CanvasGradient | string
    {
        const canvas = this.canvas;
        const width = canvas.width;
        const height = canvas.height;
        const colorsCount = colors.length;

        if(this.canvasCtx === null)
        {
            throw new Error('Canvas context is null');
        }

        const gradient = this.canvasCtx.createLinearGradient(0, 0, 0, height);
        for (let i = 0; i < colorsCount; i++)
        {
            gradient.addColorStop(i / (colorsCount - 1), colors[i]);
        }

        return gradient;
    }

    /**
     * Draws the progress bar
     * @param {Number} progress
     */
    private drawProgressBar(progress: number)
    {
        const canvasCtx = this.canvasCtx;
        const canvas = this.canvas;
        const width = canvas.width;
        const height = canvas.height;

        const fillWidth = width * progress;

        if (canvasCtx !== null)
        {
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
    }

    /**
     * Draws overlay lines
     */
    private drawOverlayLines()
    {
        const canvas = this.canvas;
        const canvasCtx = this.canvasCtx;
        const width = canvas.width;
        const height = canvas.height;

        const overlayLines = 5;
        const spread = width / overlayLines;
        const lineWidth = 30;

        if( canvasCtx !== null )
        {
            canvasCtx.beginPath();

            const overlayAnimationOffset = -(Date.now() / 10) % spread;
            for (let i = -2; i <= overlayLines; i++)
            {
                const offset = (i * spread) + (overlayAnimationOffset);
                canvasCtx.strokeStyle = 'rgba(255,255,255,0.5)';
                canvasCtx.lineWidth = lineWidth;
                canvasCtx.moveTo(0 + offset - lineWidth, height + lineWidth);
                canvasCtx.lineTo(spread + offset + lineWidth, -lineWidth);
            }

            canvasCtx.stroke();
        }

    }

}


/**
 * Canvas progress bar animation options type
 * This is used in the {CanvasProgressBar} animate method
 */
type CanvasProgressBarAnimationOptions = {
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
}





const canvasProgressBar = new CanvasProgressBar();
canvasProgressBar.setSize(450, 25);
canvasProgressBar.setBarColors(['#94f407', '#36a804']);
canvasProgressBar.animate({
    from: 20,
    to: 100,
    speed: 1000
});

const app = document.getElementById("app");
if( app !== null )
{
    app.appendChild(canvasProgressBar.getCanvas());
}


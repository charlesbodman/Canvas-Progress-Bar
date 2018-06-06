
/**
 * This class handles drawing of progress bar
 * @author Charles Bodman
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
    private barColor: string | CanvasGradient = '#00FF00';

    /**
     * Progress bar line color
     */
    private stripeColor: string = 'rgba(255,255,255,0.3)';

    /**
     * Flag for whether canvas bar is animating or not
     */
    private animating: boolean = false;

    /**
     * Animation Options
     * @type {CanvasProgressBarAnimationOptions}
     */
    private animationOptions: CanvasProgressBarAnimationOptions = {
        from:0,
        to:100,
        speed:1000,
        stripeSpeed: 1
    };

    /**
     * Animation percent progress elapsed
     */
    private animationPercentElapsed: number = 0;

    /**
     * Last animation timestamp
     */
    private lastAnimationTimeStamp: number = 0;

    /**
     * The contructor of the canvas progress bar creates it's on canvas reference.
     */
    constructor()
    {
        const canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.canvasCtx = canvas.getContext('2d');
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
    public animate(options: Partial<CanvasProgressBarAnimationOptions>)
    {
        this.animationOptions = {...this.animationOptions, ...options};
        this.animationPercentElapsed = 0;
        this.animating = true;
        this.lastAnimationTimeStamp = Date.now();
        this.loop();
    }

    /**
     * Stops the animation loop
     */
    public stopAnimation()
    {
        this.animating = false;
    }

    /**
     * Animate the progress bar
     */
    private loop = () =>
    {
        if( this.animating )
        {
            const currentTime = Date.now();
            const delta = currentTime - this.lastAnimationTimeStamp;
            const animationOptions = this.animationOptions;
            const progressPercent = (((animationOptions.from / 100) + this.animationPercentElapsed));

            this.draw(progressPercent);

            if( progressPercent < (animationOptions.to/100) )
            {
                this.animationPercentElapsed += (((100 / animationOptions.speed) * delta) / 100);
            }

            this.lastAnimationTimeStamp = currentTime;
            window.requestAnimationFrame(this.loop);
        }
    }

    /**
     * Set Bar Color
     * @param {String[]} colors
     * Setting multiple colours will create a simple top down linear gradient
     */
    public setColors(colorOptions: CanvasProgressBarColorOptions)
    {
        if ( colorOptions.bar )
        {
            const barColor = colorOptions.bar;

            if (colorOptions.bar.length === 1)
            {
                this.barColor = barColor[0];
            }
            else
            {
                this.barColor = this.createLinearGradient(barColor);
            }
        }

        if( colorOptions.stripes )
        {
            this.stripeColor = colorOptions.stripes;
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

        if (this.canvasCtx === null)
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

            // Draw overlay lines -> / / / /
            this.drawStripes();

            // Restore context
            canvasCtx.restore();
        }
    }

    /**
     * Draws overlay lines
     */
    private drawStripes()
    {
        const canvas = this.canvas;
        const canvasCtx = this.canvasCtx;
        const width = canvas.width;
        const height = canvas.height;

        const overlayLines = 5;
        const lineWidth = 30;
        const spread = width / overlayLines;

        if (canvasCtx !== null)
        {
            canvasCtx.beginPath();

            const overlayAnimationOffset = -(Date.now() / 10) % spread;
            for (let i = 0; i <= overlayLines; i++)
            {
                const offset = (i * spread) + (overlayAnimationOffset);
                canvasCtx.strokeStyle = this.stripeColor;
                canvasCtx.lineWidth = lineWidth;
                canvasCtx.moveTo(0 + offset - lineWidth, height + lineWidth);
                canvasCtx.lineTo(spread + offset + lineWidth, -lineWidth);
            }

            canvasCtx.stroke();
        }

    }

}

/**
 * Options for animatiing
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

    /**
     * Animation speed of the line movement
     */
    stripeSpeed: number;
}

type CanvasProgressBarOverlayOptions = {

    /**
     * Number of stripes across the progress bar
     */
    stripeCount: number;

    /**
     * Thickness of the stripes across the progress bar
     */
    stripeThickness: number;

}

type CanvasProgressBarColorOptions = {

    /**
     * Bar colors. If multiple colors are provided, they will be drawn in a simple top down linear gradient
     */
    bar: string[],

    /**
     * Line color
     */
    stripes?: string;
}
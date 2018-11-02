import * as $ from 'jquery';

export class Display {
    protected readonly msInSec: number = 1000;
    protected readonly msInMin: number = this.msInSec * 60;

    private content: HTMLElement;
    protected canvas: HTMLCanvasElement;

    public constructor(content: HTMLElement) {
        this.content = content;
        this.canvas = $('<canvas>')[0] as HTMLCanvasElement;
    }

    protected delay(ms: number): Promise<number> {
        return new Promise<number>(resolve => setTimeout(resolve, ms));
    }

    protected clearCtx(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    protected setCtxStyle(ctx: CanvasRenderingContext2D) {
        ctx.font = "12px Lekton";
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#FFF";
    }

    protected async drawTerminalText (ctx: CanvasRenderingContext2D, 
        row: number, column: number, text: string) {
        let x = column * 8;
        let y = (row + 1) * 12;
        await this.delay(this.msInSec);
        ctx.fillText(text.toUpperCase(), x, y);
    }

    protected async render() {
        await this.delay(15 * this.msInSec);
    }

    public async run() {
        while (true) {
            let wait = Math.random() * this.msInSec;
            await this.delay(wait);
            let cont = $(this.content);
            await this.flickerEffect(cont);
            cont.replaceWith(this.canvas);
            await this.render();
            $(this.canvas).replaceWith(this.content);
        }
    }

    private async flickerEffect(cont: JQuery<HTMLElement>) {
        await this.flicker(cont, 'slow', 1500);
        await this.flicker(cont, 'medium', 1000);
        await this.flicker(cont, 'fast', 500);
    }

    private async flicker(cont: JQuery<HTMLElement>, cls: string, ms: number) {
        var cssClass = 'flicker-' + cls
        cont.toggleClass(cssClass);
        await this.delay(ms);
        cont.toggleClass(cssClass);
    }
}
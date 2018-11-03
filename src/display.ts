import * as $ from 'jquery';

const canvasHeight = 222;
const msInSec = 1000;
const msInMin = msInSec * 60;

export class Display {
    private content: HTMLElement;
    protected canvas: HTMLCanvasElement;

    public constructor(content: HTMLElement) {
        this.content = content;
        this.canvas = $('<canvas>')[0] as HTMLCanvasElement;
        this.canvas.height = canvasHeight;
    }

    protected delay(ms: number): Promise<number> {
        return new Promise<number>(resolve => setTimeout(resolve, ms));
    }

    protected clearCtx(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    protected setCtxStyle(ctx: CanvasRenderingContext2D) {
        ctx.font = "15px Lekton";
        ctx.fillStyle = "#DDD";
        ctx.strokeStyle = "#FFF";
    }

    protected async drawTerminalText(ctx: CanvasRenderingContext2D,
        row: number, column: number, text: string) {
        let x = column * 10;
        let y = (row + 1) * 17;
        await this.delay(msInSec);
        ctx.fillText(text.toUpperCase(), x, y);
    }

    protected async drawAxis(ctx: CanvasRenderingContext2D) {
        let w = this.canvas.width - 3;
        let h = canvasHeight - 3;
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.lineTo(2, 0);
        ctx.lineTo(4, 2);
        ctx.moveTo(2, 0);
        ctx.lineTo(2, h);
        ctx.lineTo(w, h);
        ctx.lineTo(w - 2, h - 2);
        ctx.moveTo(w, h);
        ctx.lineTo(w - 2, h + 2);
        ctx.stroke();
    }

    protected async drawLineGraphs(ctx: CanvasRenderingContext2D,
        series: number[][]) {
        let maxx = Math.max(...series.map(s => s.length));
        let dx = this.canvas.width / maxx;
        let maxvals = series.map(s => Math.max(...s));
        let maxy = Math.max(...maxvals);
        let scaley = canvasHeight / maxy;
        for (let i = 0; i < series.length; i++) {
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight - (series[i][0] * scaley));
            await this.delay(msInSec);
            for (let j = 0; j < series[i].length; j++) {
                ctx.lineTo(j * dx, canvasHeight - (series[i][j] * scaley))
            }
            ctx.stroke();
        }
    }

    protected async render() {
        await this.delay(15 * msInSec);
    }

    public async run() {
        while (true) {
            let wait = Math.random() * msInSec * 5;
            await this.delay(wait);
            let cont = $(this.content);
            await this.flickerEffect(cont);
            this.canvas.width = this.content.clientWidth;
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
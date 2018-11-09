export const canvasHeight = 222;
export const msInSec = 1000;
export const msInMin = msInSec * 60;
export const msInHour = msInMin * 60;
export const msInDay = msInHour * 24;
export const msInWeek = msInDay * 7;
const defaultFont = "15px Lekton";
const defaultColor = "#DDD";

export class Display {
	private content: HTMLElement;
	protected canvas: HTMLCanvasElement;

	public constructor(content: HTMLElement) {
		this.content = content;
		this.canvas = document.createElement("canvas");
		this.canvas.height = canvasHeight;
	}

	protected delay(ms: number): Promise<number> {
		return new Promise<number>(resolve => setTimeout(resolve, ms));
	}

	protected clearCtx(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	protected setCtxStyle(ctx: CanvasRenderingContext2D) {
		ctx.font = defaultFont;
		ctx.fillStyle = defaultColor;
		ctx.strokeStyle = defaultColor;
	}

	protected async drawTerminalText(ctx: CanvasRenderingContext2D,
		row: number, column: number, text: string) {
		let { x, y } = this.charPosToXY(column, row);
		await this.delay(msInSec);
		ctx.fillText(text.toUpperCase(), x, y);
	}

	private charPosToXY(column: number, row: number) {
		let x = column * 10;
		let y = (row + 1) * 17;
		return { x, y };
	}

	protected async drawBigText(ctx: CanvasRenderingContext2D,
		row: number, column: number, size: number, text: string) {
		ctx.font = `${size}px Lekton`;
		this.drawTerminalText(ctx, row, column, text);		
		ctx.font = defaultFont;
	}

	protected async render() {
		await this.delay(15 * msInSec);
	}

	public async run() {
		while (true) {
			let wait = Math.random() * msInSec * 30 + (msInSec * 15);
			await this.delay(wait);
			await this.flickerEffect(this.content);
			this.canvas.width = this.content.clientWidth;
			this.content.replaceWith(this.canvas);
			await this.render();
			this.canvas.replaceWith(this.content);
		}
	}

	private async flickerEffect(cont: HTMLElement) {
		await this.flicker(cont, 'slow', 1500);
		await this.flicker(cont, 'medium', 1000);
		await this.flicker(cont, 'fast', 500);
	}

	private async flicker(cont: HTMLElement, cls: string, ms: number) {
		var cssClass = 'flicker-' + cls
		cont.classList.add(cssClass);
		await this.delay(ms);
		cont.classList.remove(cssClass);
	}
}
import { canvasHeight, msInDay, msInWeek, Display } from './display';
import { Contrib, contribHistory } from './github-contrib';

const rectSize = 12;
const rectSpacing = 18;
const xstart = 8;
const ystart = 32;

export class GithubDisplay extends Display {
    private username: string;

    constructor(content: HTMLElement, username: string) {
        super(content);
        this.username = username;
    }

    private getContribColor (count: number): string {
        let c = Math.min (count * 2 + 2, 15).toString(16);
        return `#${c}${c}${c}`;
    }

    protected async render() {
        let ctx = this.canvas.getContext("2d")
        if (!ctx) return;
        super.clearCtx (ctx);
        super.setCtxStyle(ctx);
        let contribs = await contribHistory(this.username);
        let x = xstart;
        let month = 0;
        for (let i = 0; i < contribs.length; i++) {
            let c = contribs[i];
            let weekday = c.day.getDay();
            if (weekday == 0) {
                x += rectSpacing;
                let m = c.day.getMonth() + 1;
                if (m != month) {
                    month = m;
                    ctx.fillText(`${m}/${c.day.getDate()}`, x, ystart - 8);
                }
            }
            let y = weekday * rectSpacing + ystart;
            ctx.lineWidth = Math.max (c.count / 4, 0.25);
            ctx.strokeRect(x, y, rectSize, rectSize);
            await super.delay(100);
        }
        await super.render();
    }
}
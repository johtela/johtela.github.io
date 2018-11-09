import { canvasHeight, msInDay, msInWeek, Display } from './display';
import { Contrib, Repo, contribHistory, fetchRepos } from './github-contrib';

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

    protected async render() {
        let ctx = this.canvas.getContext("2d")
        if (!ctx) return;
        super.clearCtx (ctx);
        super.setCtxStyle(ctx);
        let [ contribs, repos ] = await Promise.all ([
            contribHistory(this.username), fetchRepos(this.username)]);
        await this.drawContribCalendar(ctx, contribs);
        await this.drawRepoSummary(ctx, repos);
        await super.render();
    }

    private async drawContribCalendar(ctx: CanvasRenderingContext2D,
        contribs: Contrib[]) {
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
            ctx.lineWidth = Math.max(c.count / 4, 0.25);
            ctx.strokeRect(x, y, rectSize, rectSize);
            await super.delay(100);
        }
    }

    private async drawRepoSummary(ctx: CanvasRenderingContext2D, repos: Repo[]) {
        let row = 9;
        await this.drawLabel(ctx, row++, "repositories:", repos.length);
        let oi = repos.reduce((cnt, r) => r.open_issues + cnt, 0);
        await this.drawLabel(ctx, row++, "open issues:", oi);
        let wc = repos.reduce((cnt, r) => r.watchers + cnt, 0);
        await this.drawLabel(ctx, row++, "watchers:", wc);
        let fc = repos.reduce((cnt, r) => r.forks + cnt, 0);
        await this.drawLabel(ctx, row++, "forks:", fc);
    }

    private async drawLabel(ctx: CanvasRenderingContext2D, row: number,
        label: string, val: number) {
        await super.drawTerminalText(ctx, row, 2, label);
        await super.drawTerminalText(ctx, row, 16, val.toString());
    }
}
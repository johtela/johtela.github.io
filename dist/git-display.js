var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Display } from './display';
import { contribHistory, fetchRepos } from './github-contrib';
const rectSize = 12;
const rectSpacing = 18;
const xstart = 8;
const ystart = 32;
export class GithubDisplay extends Display {
    constructor(content, username) {
        super(content);
        this.username = username;
    }
    render() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let ctx = this.canvas.getContext("2d");
            if (!ctx)
                return;
            _super("clearCtx").call(this, ctx);
            _super("setCtxStyle").call(this, ctx);
            let [contribs, repos] = yield Promise.all([
                contribHistory(this.username), fetchRepos(this.username)
            ]);
            yield this.drawContribCalendar(ctx, contribs);
            yield this.drawRepoSummary(ctx, repos);
            yield _super("render").call(this);
        });
    }
    drawContribCalendar(ctx, contribs) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
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
                yield _super("delay").call(this, 100);
            }
        });
    }
    drawRepoSummary(ctx, repos) {
        return __awaiter(this, void 0, void 0, function* () {
            let row = 9;
            yield this.drawLabel(ctx, row++, "repositories:", repos.length);
            let oi = repos.reduce((cnt, r) => r.open_issues + cnt, 0);
            yield this.drawLabel(ctx, row++, "open issues:", oi);
            let wc = repos.reduce((cnt, r) => r.watchers + cnt, 0);
            yield this.drawLabel(ctx, row++, "watchers:", wc);
            let fc = repos.reduce((cnt, r) => r.forks + cnt, 0);
            yield this.drawLabel(ctx, row++, "forks:", fc);
        });
    }
    drawLabel(ctx, row, label, val) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("drawTerminalText").call(this, ctx, row, 2, label);
            yield _super("drawTerminalText").call(this, ctx, row, 16, val.toString());
        });
    }
}
//# sourceMappingURL=git-display.js.map
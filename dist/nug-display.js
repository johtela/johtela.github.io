var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { canvasHeight, msInSec, Display } from './display';
export class NugetDisplay extends Display {
    constructor(content, author) {
        super(content);
        this.author = author;
        this.getApiQuery();
    }
    render() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let ctx = this.canvas.getContext("2d");
            if (!(ctx && this.query))
                return;
            let packages = yield this.getPackages();
            if (packages.length == 0)
                return;
            this.setCtxStyle(ctx);
            this.clearCtx(ctx);
            this.drawAxis(ctx);
            yield this.drawLegend(ctx, packages);
            yield this.drawLineGraphs(ctx, packages);
            yield _super("render").call(this);
        });
    }
    getApiQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch("https://api.nuget.org/v3/index.json");
            if (!res.ok)
                return;
            let resources = (yield res.json()).resources;
            this.query = resources.find(r => r['@type'] === 'SearchQueryService')['@id'] +
                `?q=authors:["${this.author}"]`;
        });
    }
    getPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch(this.query);
            if (!res.ok)
                return [];
            let resp = yield res.json();
            return resp['data'];
        });
    }
    drawAxis(ctx) {
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
    drawLegend(ctx, packages) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < packages.length; i++) {
                yield this.drawTerminalText(ctx, i, 1, packages[i].id);
                yield this.drawTerminalText(ctx, i, 31, packages[i].totalDownloads.toString());
            }
        });
    }
    drawLineGraphs(ctx, packages) {
        return __awaiter(this, void 0, void 0, function* () {
            let maxx = Math.max(...packages.map(p => p.versions.length));
            let dx = this.canvas.width / maxx;
            let maxvals = packages.map(p => Math.max(...p.versions.map(v => v.downloads)));
            let maxy = Math.max(...maxvals);
            let scaley = canvasHeight * 0.75 / maxy;
            for (let i = 0; i < packages.length; i++) {
                let pkg = packages[i];
                ctx.beginPath();
                ctx.moveTo(0, canvasHeight - (pkg.versions[0].downloads * scaley));
                yield this.delay(msInSec);
                for (let j = 0; j < pkg.versions.length; j++) {
                    let pver = pkg.versions[j];
                    let x = j * dx;
                    let y = canvasHeight - (pver.downloads * scaley);
                    ctx.lineTo(x, y);
                    ctx.fillText(pver.version, x, y);
                }
                ctx.stroke();
            }
        });
    }
}
//# sourceMappingURL=nug-display.js.map
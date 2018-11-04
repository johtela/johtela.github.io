import { canvasHeight, msInSec, Display } from './display';

interface PackageVersion {
    version: string;
    downloads: number;
}

interface Package {
    id: string;
    version: string;
    totalDownloads: number;
    versions: PackageVersion[];
}

export class NugetDisplay extends Display {
    private author: string;
    private query: string;

    constructor(content: HTMLElement, author: string) {
        super(content);
        this.author = author;
        this.getApiQuery();
    }

    protected async render() {
        let ctx = this.canvas.getContext("2d")
        if (!(ctx && this.query)) return;
        let packages = await this.getPackages();
        if (packages.length == 0) return;
        this.setCtxStyle(ctx);
        this.clearCtx(ctx);
        this.drawAxis(ctx);
        await this.drawLegend(ctx, packages);
        await this.drawLineGraphs(ctx, packages);
        await super.render();
    }

    private async getApiQuery() {
        let res = await fetch("https://api.nuget.org/v3/index.json")
        if (!res.ok)
            return;
        let resources = (await res.json()).resources as any[];
        this.query = resources.find(r => r['@type'] === 'SearchQueryService')['@id'] +
            `?q=authors:["${this.author}"]`;
    }

    private async getPackages(): Promise<Package[]> {
        let res = await fetch(this.query)
        if (!res.ok)
            return [];
        let resp = await res.json();
        return resp['data'] as Package[];
    }

    protected drawAxis(ctx: CanvasRenderingContext2D) {
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

    private async drawLegend(ctx: CanvasRenderingContext2D,
        packages: Package[]) {
        for (let i = 0; i < packages.length; i++) {
            await this.drawTerminalText(ctx!, i, 1, packages[i].id);
            await this.drawTerminalText(ctx!, i, 31, packages[i].totalDownloads.toString());
        }
    }

    protected async drawLineGraphs(ctx: CanvasRenderingContext2D,
        packages: Package[]) {
        let maxx = Math.max(...packages.map(p => p.versions.length));
        let dx = this.canvas.width / maxx;
        let maxvals = packages.map(p => Math.max(...p.versions.map (v => v.downloads)));
        let maxy = Math.max(...maxvals);
        let scaley = canvasHeight * 0.75 / maxy;
        for (let i = 0; i < packages.length; i++) {
            let pkg = packages[i];
            ctx.beginPath();
            ctx.moveTo(0, canvasHeight - (pkg.versions[0].downloads * scaley));
            await this.delay(msInSec);
            for (let j = 0; j < pkg.versions.length; j++) {
                let pver = pkg.versions[j];
                let x = j * dx;
                let y = canvasHeight - (pver.downloads * scaley);
                ctx.lineTo(x, y);
                ctx.fillText(pver.version, x, y);
            }
            ctx.stroke();
        }
    }
}
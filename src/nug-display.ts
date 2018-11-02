import { Display } from './display';

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
        for (let i = 0; i < packages.length; i++) {
            await this.drawTerminalText(ctx!, i, 0, packages[i].id)
            await this.drawTerminalText (ctx!, i, 32, 
                packages[i].totalDownloads.toString())
        }
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
}
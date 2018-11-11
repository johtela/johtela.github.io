import { Display } from './display';

interface Build {
    buildNumber: number;
    version: string;
    branch: string;
    status: string;
}

interface Project {
    name: string;
    slug: string;
}

interface BuildStatus {
    project: Project;
    build: Build;
}

export class AppveyorDisplay extends Display {
    username: string;
    projects: string[];

    constructor(content: HTMLElement, username: string,
        projects: string[]) {
        super(content);
        this.username = username;
        this.projects = projects;
    }

    private async getBuildStatuses(): Promise<BuildStatus[]> {
        let resps = await Promise.all(this.projects.map(p =>
            fetch(`https://ci.appveyor.com/api/projects/${this.username}/${p}`)));
        let res = await Promise.all(resps.filter(r => r.ok).map(r => r.json()));
        return res as BuildStatus[];
    }

    protected async render() {
        let ctx = this.canvas.getContext("2d")
        if (!ctx) return;
        super.clearCtx(ctx);
        super.setCtxStyle(ctx);
        let statuses = await this.getBuildStatuses();
        for (let i = 0; i < statuses.length; i++) {
            const bs = statuses[i];
            let row = i * 3;
            await super.drawTerminalText(ctx, row, 0, bs.project.name);
            await super.drawTerminalText(ctx, row + 1, 0, bs.build.version);
            await super.drawHighlightedText(ctx, row, 16, "Michroma", 16, 
            bs.build.status, bs.build.status !== "success");
        }
        await super.render();
    }
}
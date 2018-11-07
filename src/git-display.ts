import { canvasHeight, msInSec, Display } from './display';
import { fetchEvents } from './github-contrib';

export class GithubDisplay extends Display {
    private username: string;

    constructor(content: HTMLElement, username: string) {
        super(content);
        this.username = username;
    }

    protected async render() {
        let data = await fetchEvents(this.username);
    }
}
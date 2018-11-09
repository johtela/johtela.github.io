import { Display } from './display';
import { NugetDisplay } from './nug-display';
import { GithubDisplay } from './git-display'

let displayMap = {
    nuget: (e: HTMLElement) => new NugetDisplay(e, "Tommi Johtela"),
    git: (e: HTMLElement) => new GithubDisplay(e, "johtela"),
    linkedin: (e: HTMLElement) => new Display(e)
}

function animateMonitors() {
    var monitors = document.body.getElementsByClassName("monitor-content");
    for (let i = 0; i < monitors.length; i++) {
        let e = monitors[i];
        let d = displayMap[e.id](e);
        d.run();
    }
}

document.addEventListener("DOMContentLoaded", animateMonitors);
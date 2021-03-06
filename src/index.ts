import { Display } from './display';
import { NugetDisplay } from './nug-display';
import { GithubDisplay } from './git-display';
import { AppveyorDisplay } from './apv-display';
import { FunDisplay } from "./fun-display";

let displayMap = {
    nuget: (e: HTMLElement) => new NugetDisplay(e, "Tommi Johtela"),
    git: (e: HTMLElement) => new GithubDisplay(e, "johtela"),
    appveyor: (e: HTMLElement) => new AppveyorDisplay(e, "johtela", 
        ["extensioncord", "linqcheck", "literatecs"]),
    fun: (e: HTMLElement) => new FunDisplay(e)
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
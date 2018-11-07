import * as $ from 'jquery';
import { Display } from './display';
import { NugetDisplay } from './nug-display';
import { GithubDisplay } from './git-display'

let displayMap = {
    nuget: (e: HTMLElement) => new NugetDisplay(e, "Tommi Johtela"),
    git: (e: HTMLElement) => new GithubDisplay(e, "johtela"),
    linkedin: (e: HTMLElement) => new Display(e)
}

function animateMonitors() {
    $(".monitor-content")
        .map((i, e) => displayMap[e.id](e))
        .each((i, d) => {
            d.run();
        });
}

$(document).ready(animateMonitors)

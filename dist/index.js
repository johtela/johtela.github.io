import * as $ from 'jquery';
import { Display } from './display';
import { NugetDisplay } from './nug-display';
import { GithubDisplay } from './git-display';
let displayMap = {
    nuget: (e) => new NugetDisplay(e, "Tommi Johtela"),
    git: (e) => new GithubDisplay(e, "johtela"),
    linkedin: (e) => new Display(e)
};
function animateMonitors() {
    $(".monitor-content")
        .map((i, e) => displayMap[e.id](e))
        .each((i, d) => {
        d.run();
    });
}
$(document).ready(animateMonitors);
//# sourceMappingURL=index.js.map
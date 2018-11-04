import * as $ from 'jquery';
import { Display } from './display';
import { NugetDisplay } from './nug-display';
let displayMap = {
    nuget: (e) => new NugetDisplay(e, "Tommi Johtela"),
    git: (e) => new Display(e),
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
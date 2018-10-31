import * as $ from 'jquery';
import { Display } from './display';
function animateMonitors() {
    $(".monitor-content").map((i, e) => new Display(e)).each((i, d) => {
        d.run();
    });
}
$(document).ready(animateMonitors);
//# sourceMappingURL=index.js.map
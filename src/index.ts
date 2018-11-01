import * as $ from 'jquery';
import { Display } from './display';

let displayMap = {
    nuget: (e: HTMLElement) => new Display (e),
    git: (e: HTMLElement) => new Display (e),
    linkedin: (e: HTMLElement) => new Display (e)
}

function animateMonitors ()
{
    $(".monitor-content")
        .map ((i, e) => displayMap[e.id](e))
        .each ((i, d) => 
        {
            d.run ();
        });
}

$(document).ready (animateMonitors)

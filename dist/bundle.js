/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/apv-display.ts":
/*!****************************!*\
  !*** ./src/apv-display.ts ***!
  \****************************/
/*! exports provided: AppveyorDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppveyorDisplay", function() { return AppveyorDisplay; });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class AppveyorDisplay extends _display__WEBPACK_IMPORTED_MODULE_0__["Display"] {
    constructor(content, username, projects) {
        super(content);
        this.username = username;
        this.projects = projects;
    }
    getBuildStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            let resps = yield Promise.all(this.projects.map(p => fetch(`https://ci.appveyor.com/api/projects/${this.username}/${p}`)));
            let res = yield Promise.all(resps.filter(r => r.ok).map(r => r.json()));
            return res;
        });
    }
    render() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let ctx = this.canvas.getContext("2d");
            if (!ctx)
                return;
            _super("clearCtx").call(this, ctx);
            _super("setCtxStyle").call(this, ctx);
            let statuses = yield this.getBuildStatuses();
            for (let i = 0; i < statuses.length; i++) {
                const bs = statuses[i];
                let row = i * 3;
                yield _super("drawTerminalText").call(this, ctx, row, 0, bs.project.name);
                yield _super("drawTerminalText").call(this, ctx, row + 1, 0, bs.build.version);
                yield _super("drawHighlightedText").call(this, ctx, row, 16, "Michroma", 16, bs.build.status, bs.build.status !== "success");
            }
            yield _super("render").call(this);
        });
    }
}


/***/ }),

/***/ "./src/display.ts":
/*!************************!*\
  !*** ./src/display.ts ***!
  \************************/
/*! exports provided: canvasHeight, msInSec, msInMin, msInHour, msInDay, msInWeek, Display */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasHeight", function() { return canvasHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "msInSec", function() { return msInSec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "msInMin", function() { return msInMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "msInHour", function() { return msInHour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "msInDay", function() { return msInDay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "msInWeek", function() { return msInWeek; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Display", function() { return Display; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const canvasHeight = 222;
const msInSec = 1000;
const msInMin = msInSec * 60;
const msInHour = msInMin * 60;
const msInDay = msInHour * 24;
const msInWeek = msInDay * 7;
const defaultFont = "15px Lekton";
const defaultColor = "#DDD";
class Display {
    constructor(content) {
        this.content = content;
        this.canvas = document.createElement("canvas");
        this.canvas.height = canvasHeight;
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    clearCtx(ctx) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    setCtxStyle(ctx) {
        ctx.font = defaultFont;
        ctx.fillStyle = defaultColor;
        ctx.strokeStyle = defaultColor;
    }
    drawTerminalText(ctx, row, column, text) {
        return __awaiter(this, void 0, void 0, function* () {
            let { x, y } = this.charPosToXY(column, row);
            yield this.delay(msInSec);
            ctx.fillText(text.toUpperCase(), x, y);
        });
    }
    charPosToXY(column, row) {
        let x = column * 10;
        let y = (row + 1) * 17;
        return { x, y };
    }
    drawHighlightedText(ctx, row, column, font, fontsize, text, highlighted) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.font = `${fontsize}px ${font}`;
            let utext = text.toUpperCase();
            let { width } = ctx.measureText(utext);
            let { x, y } = this.charPosToXY(column, row);
            yield this.delay(msInSec);
            if (highlighted)
                ctx.lineWidth = 3;
            ctx.strokeRect(x - 2, y - fontsize, width + 4, fontsize + 4);
            ctx.fillText(utext, x, y + 1);
            ctx.font = defaultFont;
            ctx.lineWidth = 1;
        });
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delay(15 * msInSec);
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                let wait = Math.random() * msInSec * 30 + (msInSec * 15);
                yield this.delay(wait);
                yield this.flickerEffect(this.content);
                this.canvas.width = this.content.clientWidth;
                this.content.replaceWith(this.canvas);
                yield this.render();
                this.canvas.replaceWith(this.content);
            }
        });
    }
    flickerEffect(cont) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.flicker(cont, 'slow', 1500);
            yield this.flicker(cont, 'medium', 1000);
            yield this.flicker(cont, 'fast', 500);
        });
    }
    flicker(cont, cls, ms) {
        return __awaiter(this, void 0, void 0, function* () {
            var cssClass = 'flicker-' + cls;
            cont.classList.add(cssClass);
            yield this.delay(ms);
            cont.classList.remove(cssClass);
        });
    }
}


/***/ }),

/***/ "./src/git-display.ts":
/*!****************************!*\
  !*** ./src/git-display.ts ***!
  \****************************/
/*! exports provided: GithubDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GithubDisplay", function() { return GithubDisplay; });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _github_contrib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./github-contrib */ "./src/github-contrib.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const rectSize = 12;
const rectSpacing = 18;
const xstart = 8;
const ystart = 32;
class GithubDisplay extends _display__WEBPACK_IMPORTED_MODULE_0__["Display"] {
    constructor(content, username) {
        super(content);
        this.username = username;
    }
    /**
     * Render the Git display.
     */
    render() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let ctx = this.canvas.getContext("2d");
            if (!ctx)
                return;
            _super("clearCtx").call(this, ctx);
            _super("setCtxStyle").call(this, ctx);
            let [contribs, repos] = yield Promise.all([
                Object(_github_contrib__WEBPACK_IMPORTED_MODULE_1__["contribHistory"])(this.username), Object(_github_contrib__WEBPACK_IMPORTED_MODULE_1__["fetchRepos"])(this.username)
            ]);
            yield this.drawContribCalendar(ctx, contribs);
            yield this.drawRepoSummary(ctx, repos);
            yield _super("render").call(this);
        });
    }
    drawContribCalendar(ctx, contribs) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let x = xstart;
            let month = 0;
            for (let i = 0; i < contribs.length; i++) {
                let c = contribs[i];
                let weekday = c.day.getDay();
                if (weekday == 0) {
                    x += rectSpacing;
                    let m = c.day.getMonth() + 1;
                    if (m != month) {
                        month = m;
                        ctx.fillText(`${m}/${c.day.getDate()}`, x, ystart - 8);
                    }
                }
                let y = weekday * rectSpacing + ystart;
                ctx.lineWidth = Math.max(c.count / 4, 0.25);
                ctx.strokeRect(x, y, rectSize, rectSize);
                yield _super("delay").call(this, 100);
            }
        });
    }
    drawRepoSummary(ctx, repos) {
        return __awaiter(this, void 0, void 0, function* () {
            let row = 9;
            yield this.drawLabel(ctx, row++, "repositories:", repos.length);
            let oi = repos.reduce((cnt, r) => r.open_issues + cnt, 0);
            yield this.drawLabel(ctx, row++, "open issues:", oi);
            let wc = repos.reduce((cnt, r) => r.watchers + cnt, 0);
            yield this.drawLabel(ctx, row++, "watchers:", wc);
            let fc = repos.reduce((cnt, r) => r.forks + cnt, 0);
            yield this.drawLabel(ctx, row++, "forks:", fc);
        });
    }
    drawLabel(ctx, row, label, val) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("drawTerminalText").call(this, ctx, row, 2, label);
            yield _super("drawTerminalText").call(this, ctx, row, 16, val.toString());
        });
    }
}


/***/ }),

/***/ "./src/github-contrib.ts":
/*!*******************************!*\
  !*** ./src/github-contrib.ts ***!
  \*******************************/
/*! exports provided: fetchEvents, fetchRepos, contribHistory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchEvents", function() { return fetchEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRepos", function() { return fetchRepos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contribHistory", function() { return contribHistory; });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function DatePart(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
function fetchEvents(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(`https://api.github.com/users/${username}/events?per_page=100`);
        let res = {};
        if (!resp.ok)
            return res;
        let events = yield resp.json();
        events.forEach(e => {
            let date = DatePart(new Date(e.created_at));
            let count = res[date];
            res[date] = count === undefined ? 1 : count + 1;
        });
        return res;
    });
}
function fetchRepos(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        let res = [];
        if (!resp.ok)
            return res;
        return yield resp.json();
    });
}
function contribHistory(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let today = Math.trunc(Date.now() / _display__WEBPACK_IMPORTED_MODULE_0__["msInDay"]) * _display__WEBPACK_IMPORTED_MODULE_0__["msInDay"];
        let events = yield fetchEvents(username);
        let res = new Array(90);
        let day = today - (89 * _display__WEBPACK_IMPORTED_MODULE_0__["msInDay"]);
        for (let i = 0; i < res.length; i++) {
            let d = new Date(day);
            let c = events[DatePart(d)] || 0;
            res[i] = {
                day: d,
                count: c
            };
            day += _display__WEBPACK_IMPORTED_MODULE_0__["msInDay"];
        }
        return res;
    });
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.ts");
/* harmony import */ var _nug_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nug-display */ "./src/nug-display.ts");
/* harmony import */ var _git_display__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./git-display */ "./src/git-display.ts");
/* harmony import */ var _apv_display__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./apv-display */ "./src/apv-display.ts");




let displayMap = {
    nuget: (e) => new _nug_display__WEBPACK_IMPORTED_MODULE_1__["NugetDisplay"](e, "Tommi Johtela"),
    git: (e) => new _git_display__WEBPACK_IMPORTED_MODULE_2__["GithubDisplay"](e, "johtela"),
    appveyor: (e) => new _apv_display__WEBPACK_IMPORTED_MODULE_3__["AppveyorDisplay"](e, "johtela", ["extensioncord", "linqcheck", "literatecs"]),
    linkedin: (e) => new _display__WEBPACK_IMPORTED_MODULE_0__["Display"](e)
};
function animateMonitors() {
    var monitors = document.body.getElementsByClassName("monitor-content");
    for (let i = 0; i < monitors.length; i++) {
        let e = monitors[i];
        let d = displayMap[e.id](e);
        d.run();
    }
}
document.addEventListener("DOMContentLoaded", animateMonitors);


/***/ }),

/***/ "./src/nug-display.ts":
/*!****************************!*\
  !*** ./src/nug-display.ts ***!
  \****************************/
/*! exports provided: NugetDisplay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NugetDisplay", function() { return NugetDisplay; });
/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ "./src/display.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class NugetDisplay extends _display__WEBPACK_IMPORTED_MODULE_0__["Display"] {
    constructor(content, author) {
        super(content);
        this.author = author;
        this.getApiQuery();
    }
    render() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            let ctx = this.canvas.getContext("2d");
            if (!(ctx && this.query))
                return;
            let packages = yield this.getPackages();
            if (packages.length == 0)
                return;
            this.setCtxStyle(ctx);
            this.clearCtx(ctx);
            this.drawAxis(ctx);
            yield this.drawLegend(ctx, packages);
            yield this.drawLineGraphs(ctx, packages);
            yield _super("render").call(this);
        });
    }
    getApiQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch("https://api.nuget.org/v3/index.json");
            if (!res.ok)
                return;
            let resources = (yield res.json()).resources;
            this.query = resources.find(r => r['@type'] === 'SearchQueryService')['@id'] +
                `?q=authors:["${this.author}"]`;
        });
    }
    getPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield fetch(this.query);
            if (!res.ok)
                return [];
            let resp = yield res.json();
            return resp['data'];
        });
    }
    drawAxis(ctx) {
        let w = this.canvas.width - 3;
        let h = _display__WEBPACK_IMPORTED_MODULE_0__["canvasHeight"] - 3;
        ctx.beginPath();
        ctx.moveTo(0, 2);
        ctx.lineTo(2, 0);
        ctx.lineTo(4, 2);
        ctx.moveTo(2, 0);
        ctx.lineTo(2, h);
        ctx.lineTo(w, h);
        ctx.lineTo(w - 2, h - 2);
        ctx.moveTo(w, h);
        ctx.lineTo(w - 2, h + 2);
        ctx.stroke();
    }
    drawLegend(ctx, packages) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < packages.length; i++) {
                yield this.drawTerminalText(ctx, i, 1, packages[i].id);
                yield this.drawTerminalText(ctx, i, 31, packages[i].totalDownloads.toString());
            }
        });
    }
    drawLineGraphs(ctx, packages) {
        return __awaiter(this, void 0, void 0, function* () {
            let maxx = Math.max(...packages.map(p => p.versions.length));
            let dx = this.canvas.width / maxx;
            let maxvals = packages.map(p => Math.max(...p.versions.map(v => v.downloads)));
            let maxy = Math.max(...maxvals);
            let scaley = _display__WEBPACK_IMPORTED_MODULE_0__["canvasHeight"] * 0.75 / maxy;
            for (let i = 0; i < packages.length; i++) {
                let pkg = packages[i];
                ctx.beginPath();
                ctx.moveTo(0, _display__WEBPACK_IMPORTED_MODULE_0__["canvasHeight"] - (pkg.versions[0].downloads * scaley));
                yield this.delay(_display__WEBPACK_IMPORTED_MODULE_0__["msInSec"]);
                for (let j = 0; j < pkg.versions.length; j++) {
                    let pver = pkg.versions[j];
                    let x = j * dx;
                    let y = _display__WEBPACK_IMPORTED_MODULE_0__["canvasHeight"] - (pver.downloads * scaley);
                    ctx.lineTo(x, y);
                    ctx.fillText(pver.version, x, y);
                }
                ctx.stroke();
            }
        });
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fwdi1kaXNwbGF5LnRzIiwid2VicGFjazovLy8uL3NyYy9kaXNwbGF5LnRzIiwid2VicGFjazovLy8uL3NyYy9naXQtZGlzcGxheS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZ2l0aHViLWNvbnRyaWIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9udWctZGlzcGxheS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRm9DO0FBbUI3QixNQUFNLGVBQWdCLFNBQVEsZ0RBQU87SUFJeEMsWUFBWSxPQUFvQixFQUFFLFFBQWdCLEVBQzlDLFFBQWtCO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxR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LFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ2YsSUFBSSxDQUFDLEdBQUcscURBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUM7b0JBQ2pELEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNqQixHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUNwQztnQkFDRCxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDaEI7UUFDTCxDQUFDO0tBQUE7Q0FDSiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IERpc3BsYXkgfSBmcm9tICcuL2Rpc3BsYXknO1xyXG5cclxuaW50ZXJmYWNlIEJ1aWxkIHtcclxuICAgIGJ1aWxkTnVtYmVyOiBudW1iZXI7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBicmFuY2g6IHN0cmluZztcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUHJvamVjdCB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBzbHVnOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBCdWlsZFN0YXR1cyB7XHJcbiAgICBwcm9qZWN0OiBQcm9qZWN0O1xyXG4gICAgYnVpbGQ6IEJ1aWxkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQXBwdmV5b3JEaXNwbGF5IGV4dGVuZHMgRGlzcGxheSB7XHJcbiAgICB1c2VybmFtZTogc3RyaW5nO1xyXG4gICAgcHJvamVjdHM6IHN0cmluZ1tdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEhUTUxFbGVtZW50LCB1c2VybmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHByb2plY3RzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgICAgICB0aGlzLnByb2plY3RzID0gcHJvamVjdHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRCdWlsZFN0YXR1c2VzKCk6IFByb21pc2U8QnVpbGRTdGF0dXNbXT4ge1xyXG4gICAgICAgIGxldCByZXNwcyA9IGF3YWl0IFByb21pc2UuYWxsKHRoaXMucHJvamVjdHMubWFwKHAgPT5cclxuICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vY2kuYXBwdmV5b3IuY29tL2FwaS9wcm9qZWN0cy8ke3RoaXMudXNlcm5hbWV9LyR7cH1gKSkpO1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBQcm9taXNlLmFsbChyZXNwcy5maWx0ZXIociA9PiByLm9rKS5tYXAociA9PiByLmpzb24oKSkpO1xyXG4gICAgICAgIHJldHVybiByZXMgYXMgQnVpbGRTdGF0dXNbXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYXN5bmMgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcclxuICAgICAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG4gICAgICAgIHN1cGVyLmNsZWFyQ3R4KGN0eCk7XHJcbiAgICAgICAgc3VwZXIuc2V0Q3R4U3R5bGUoY3R4KTtcclxuICAgICAgICBsZXQgc3RhdHVzZXMgPSBhd2FpdCB0aGlzLmdldEJ1aWxkU3RhdHVzZXMoKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXR1c2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJzID0gc3RhdHVzZXNbaV07XHJcbiAgICAgICAgICAgIGxldCByb3cgPSBpICogMztcclxuICAgICAgICAgICAgYXdhaXQgc3VwZXIuZHJhd1Rlcm1pbmFsVGV4dChjdHgsIHJvdywgMCwgYnMucHJvamVjdC5uYW1lKTtcclxuICAgICAgICAgICAgYXdhaXQgc3VwZXIuZHJhd1Rlcm1pbmFsVGV4dChjdHgsIHJvdyArIDEsIDAsIGJzLmJ1aWxkLnZlcnNpb24pO1xyXG4gICAgICAgICAgICBhd2FpdCBzdXBlci5kcmF3SGlnaGxpZ2h0ZWRUZXh0KGN0eCwgcm93LCAxNiwgXCJNaWNocm9tYVwiLCAxNiwgXHJcbiAgICAgICAgICAgIGJzLmJ1aWxkLnN0YXR1cywgYnMuYnVpbGQuc3RhdHVzICE9PSBcInN1Y2Nlc3NcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGF3YWl0IHN1cGVyLnJlbmRlcigpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNvbnN0IGNhbnZhc0hlaWdodCA9IDIyMjtcclxuZXhwb3J0IGNvbnN0IG1zSW5TZWMgPSAxMDAwO1xyXG5leHBvcnQgY29uc3QgbXNJbk1pbiA9IG1zSW5TZWMgKiA2MDtcclxuZXhwb3J0IGNvbnN0IG1zSW5Ib3VyID0gbXNJbk1pbiAqIDYwO1xyXG5leHBvcnQgY29uc3QgbXNJbkRheSA9IG1zSW5Ib3VyICogMjQ7XHJcbmV4cG9ydCBjb25zdCBtc0luV2VlayA9IG1zSW5EYXkgKiA3O1xyXG5jb25zdCBkZWZhdWx0Rm9udCA9IFwiMTVweCBMZWt0b25cIjtcclxuY29uc3QgZGVmYXVsdENvbG9yID0gXCIjREREXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzcGxheSB7XHJcblx0cHJpdmF0ZSBjb250ZW50OiBIVE1MRWxlbWVudDtcclxuXHRwcm90ZWN0ZWQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGRlbGF5KG1zOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4ocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2xlYXJDdHgoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgc2V0Q3R4U3R5bGUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuXHRcdGN0eC5mb250ID0gZGVmYXVsdEZvbnQ7XHJcblx0XHRjdHguZmlsbFN0eWxlID0gZGVmYXVsdENvbG9yO1xyXG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gZGVmYXVsdENvbG9yO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFzeW5jIGRyYXdUZXJtaW5hbFRleHQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcblx0XHRyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIsIHRleHQ6IHN0cmluZykge1xyXG5cdFx0bGV0IHsgeCwgeSB9ID0gdGhpcy5jaGFyUG9zVG9YWShjb2x1bW4sIHJvdyk7XHJcblx0XHRhd2FpdCB0aGlzLmRlbGF5KG1zSW5TZWMpO1xyXG5cdFx0Y3R4LmZpbGxUZXh0KHRleHQudG9VcHBlckNhc2UoKSwgeCwgeSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNoYXJQb3NUb1hZKGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlcikge1xyXG5cdFx0bGV0IHggPSBjb2x1bW4gKiAxMDtcclxuXHRcdGxldCB5ID0gKHJvdyArIDEpICogMTc7XHJcblx0XHRyZXR1cm4geyB4LCB5IH07XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgYXN5bmMgZHJhd0hpZ2hsaWdodGVkVGV4dChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuXHRcdHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlciwgZm9udDogc3RyaW5nLCBmb250c2l6ZTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsXHJcblx0XHRoaWdobGlnaHRlZDogYm9vbGVhbikge1xyXG5cdFx0Y3R4LmZvbnQgPSBgJHtmb250c2l6ZX1weCAke2ZvbnR9YDtcclxuXHRcdGxldCB1dGV4dCA9IHRleHQudG9VcHBlckNhc2UoKTtcclxuXHRcdGxldCB7IHdpZHRoIH0gPSBjdHgubWVhc3VyZVRleHQodXRleHQpO1xyXG5cdFx0bGV0IHsgeCwgeSB9ID0gdGhpcy5jaGFyUG9zVG9YWShjb2x1bW4sIHJvdyk7XHJcblx0XHRhd2FpdCB0aGlzLmRlbGF5KG1zSW5TZWMpO1xyXG5cdFx0aWYgKGhpZ2hsaWdodGVkKVxyXG5cdFx0XHRjdHgubGluZVdpZHRoID0gMztcclxuXHRcdGN0eC5zdHJva2VSZWN0KHggLSAyLCB5IC0gZm9udHNpemUsIHdpZHRoICsgNCwgZm9udHNpemUgKyA0KTtcclxuXHRcdGN0eC5maWxsVGV4dCh1dGV4dCwgeCwgeSArIDEpO1xyXG5cdFx0Y3R4LmZvbnQgPSBkZWZhdWx0Rm9udDtcclxuXHRcdGN0eC5saW5lV2lkdGggPSAxO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFzeW5jIHJlbmRlcigpIHtcclxuXHRcdGF3YWl0IHRoaXMuZGVsYXkoMTUgKiBtc0luU2VjKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyBydW4oKSB7XHJcblx0XHR3aGlsZSAodHJ1ZSkge1xyXG5cdFx0XHRsZXQgd2FpdCA9IE1hdGgucmFuZG9tKCkgKiBtc0luU2VjICogMzAgKyAobXNJblNlYyAqIDE1KTtcclxuXHRcdFx0YXdhaXQgdGhpcy5kZWxheSh3YWl0KTtcclxuXHRcdFx0YXdhaXQgdGhpcy5mbGlja2VyRWZmZWN0KHRoaXMuY29udGVudCk7XHJcblx0XHRcdHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5jb250ZW50LmNsaWVudFdpZHRoO1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQucmVwbGFjZVdpdGgodGhpcy5jYW52YXMpO1xyXG5cdFx0XHRhd2FpdCB0aGlzLnJlbmRlcigpO1xyXG5cdFx0XHR0aGlzLmNhbnZhcy5yZXBsYWNlV2l0aCh0aGlzLmNvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhc3luYyBmbGlja2VyRWZmZWN0KGNvbnQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRhd2FpdCB0aGlzLmZsaWNrZXIoY29udCwgJ3Nsb3cnLCAxNTAwKTtcclxuXHRcdGF3YWl0IHRoaXMuZmxpY2tlcihjb250LCAnbWVkaXVtJywgMTAwMCk7XHJcblx0XHRhd2FpdCB0aGlzLmZsaWNrZXIoY29udCwgJ2Zhc3QnLCA1MDApO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhc3luYyBmbGlja2VyKGNvbnQ6IEhUTUxFbGVtZW50LCBjbHM6IHN0cmluZywgbXM6IG51bWJlcikge1xyXG5cdFx0dmFyIGNzc0NsYXNzID0gJ2ZsaWNrZXItJyArIGNsc1xyXG5cdFx0Y29udC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcclxuXHRcdGF3YWl0IHRoaXMuZGVsYXkobXMpO1xyXG5cdFx0Y29udC5jbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzKTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgeyBjYW52YXNIZWlnaHQsIG1zSW5EYXksIG1zSW5XZWVrLCBEaXNwbGF5IH0gZnJvbSAnLi9kaXNwbGF5JztcclxuaW1wb3J0IHsgQ29udHJpYiwgUmVwbywgY29udHJpYkhpc3RvcnksIGZldGNoUmVwb3MgfSBmcm9tICcuL2dpdGh1Yi1jb250cmliJztcclxuXHJcbmNvbnN0IHJlY3RTaXplID0gMTI7XHJcbmNvbnN0IHJlY3RTcGFjaW5nID0gMTg7XHJcbmNvbnN0IHhzdGFydCA9IDg7XHJcbmNvbnN0IHlzdGFydCA9IDMyO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdpdGh1YkRpc3BsYXkgZXh0ZW5kcyBEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBIVE1MRWxlbWVudCwgdXNlcm5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbmRlciB0aGUgR2l0IGRpc3BsYXkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhc3luYyByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKVxyXG4gICAgICAgIGlmICghY3R4KSByZXR1cm47XHJcbiAgICAgICAgc3VwZXIuY2xlYXJDdHggKGN0eCk7XHJcbiAgICAgICAgc3VwZXIuc2V0Q3R4U3R5bGUoY3R4KTtcclxuICAgICAgICBsZXQgWyBjb250cmlicywgcmVwb3MgXSA9IGF3YWl0IFByb21pc2UuYWxsIChbXHJcbiAgICAgICAgICAgIGNvbnRyaWJIaXN0b3J5KHRoaXMudXNlcm5hbWUpLCBmZXRjaFJlcG9zKHRoaXMudXNlcm5hbWUpXSk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5kcmF3Q29udHJpYkNhbGVuZGFyKGN0eCwgY29udHJpYnMpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZHJhd1JlcG9TdW1tYXJ5KGN0eCwgcmVwb3MpO1xyXG4gICAgICAgIGF3YWl0IHN1cGVyLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZHJhd0NvbnRyaWJDYWxlbmRhcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICAgICAgICBjb250cmliczogQ29udHJpYltdKSB7XHJcbiAgICAgICAgbGV0IHggPSB4c3RhcnQ7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRyaWJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gY29udHJpYnNbaV07XHJcbiAgICAgICAgICAgIGxldCB3ZWVrZGF5ID0gYy5kYXkuZ2V0RGF5KCk7XHJcbiAgICAgICAgICAgIGlmICh3ZWVrZGF5ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHggKz0gcmVjdFNwYWNpbmc7XHJcbiAgICAgICAgICAgICAgICBsZXQgbSA9IGMuZGF5LmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG0gIT0gbW9udGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBtb250aCA9IG07XHJcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGAke219LyR7Yy5kYXkuZ2V0RGF0ZSgpfWAsIHgsIHlzdGFydCAtIDgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB5ID0gd2Vla2RheSAqIHJlY3RTcGFjaW5nICsgeXN0YXJ0O1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gTWF0aC5tYXgoYy5jb3VudCAvIDQsIDAuMjUpO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCh4LCB5LCByZWN0U2l6ZSwgcmVjdFNpemUpO1xyXG4gICAgICAgICAgICBhd2FpdCBzdXBlci5kZWxheSgxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGRyYXdSZXBvU3VtbWFyeShjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcmVwb3M6IFJlcG9bXSkge1xyXG4gICAgICAgIGxldCByb3cgPSA5O1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZHJhd0xhYmVsKGN0eCwgcm93KyssIFwicmVwb3NpdG9yaWVzOlwiLCByZXBvcy5sZW5ndGgpO1xyXG4gICAgICAgIGxldCBvaSA9IHJlcG9zLnJlZHVjZSgoY250LCByKSA9PiByLm9wZW5faXNzdWVzICsgY250LCAwKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmRyYXdMYWJlbChjdHgsIHJvdysrLCBcIm9wZW4gaXNzdWVzOlwiLCBvaSk7XHJcbiAgICAgICAgbGV0IHdjID0gcmVwb3MucmVkdWNlKChjbnQsIHIpID0+IHIud2F0Y2hlcnMgKyBjbnQsIDApO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZHJhd0xhYmVsKGN0eCwgcm93KyssIFwid2F0Y2hlcnM6XCIsIHdjKTtcclxuICAgICAgICBsZXQgZmMgPSByZXBvcy5yZWR1Y2UoKGNudCwgcikgID0+IHIuZm9ya3MgKyBjbnQsIDApO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZHJhd0xhYmVsKGN0eCwgcm93KyssIFwiZm9ya3M6XCIsIGZjKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGRyYXdMYWJlbChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgcm93OiBudW1iZXIsXHJcbiAgICAgICAgbGFiZWw6IHN0cmluZywgdmFsOiBudW1iZXIpIHtcclxuICAgICAgICBhd2FpdCBzdXBlci5kcmF3VGVybWluYWxUZXh0KGN0eCwgcm93LCAyLCBsYWJlbCk7XHJcbiAgICAgICAgYXdhaXQgc3VwZXIuZHJhd1Rlcm1pbmFsVGV4dChjdHgsIHJvdywgMTYsIHZhbC50b1N0cmluZygpKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IG1zSW5EYXkgfSBmcm9tIFwiLi9kaXNwbGF5XCI7XHJcblxyXG5pbnRlcmZhY2UgRXZlbnQge1xyXG5cdHR5cGU6IHN0cmluZztcclxuXHRjcmVhdGVkX2F0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJpYiB7XHJcblx0ZGF5OiBEYXRlO1xyXG5cdGNvdW50OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUmVwbyB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdG9wZW5faXNzdWVzOiBudW1iZXI7XHJcblx0d2F0Y2hlcnM6IG51bWJlcjtcclxuXHRmb3JrczogbnVtYmVyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBEYXRlUGFydChkOiBEYXRlKTogc3RyaW5nIHtcclxuXHRyZXR1cm4gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke2QuZ2V0TW9udGgoKSArIDF9LSR7ZC5nZXREYXRlKCl9YDtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoRXZlbnRzKHVzZXJuYW1lOiBzdHJpbmcpIHtcclxuXHRsZXQgcmVzcCA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlcm5hbWV9L2V2ZW50cz9wZXJfcGFnZT0xMDBgKTtcclxuXHRsZXQgcmVzOiB7IFtkYXRlOiBzdHJpbmddOiBudW1iZXIgfCB1bmRlZmluZWQgfSA9IHt9O1xyXG5cdGlmICghcmVzcC5vaylcclxuXHRcdHJldHVybiByZXM7XHJcblx0bGV0IGV2ZW50cyA9IGF3YWl0IHJlc3AuanNvbigpIGFzIEV2ZW50W107XHJcblx0ZXZlbnRzLmZvckVhY2goZSA9PiB7XHJcblx0XHRsZXQgZGF0ZSA9IERhdGVQYXJ0KG5ldyBEYXRlKGUuY3JlYXRlZF9hdCkpO1xyXG5cdFx0bGV0IGNvdW50ID0gcmVzW2RhdGVdO1xyXG5cdFx0cmVzW2RhdGVdID0gY291bnQgPT09IHVuZGVmaW5lZCA/IDEgOiBjb3VudCArIDE7XHJcblx0fSk7XHJcblx0cmV0dXJuIHJlcztcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoUmVwb3ModXNlcm5hbWU6IHN0cmluZykge1xyXG5cdGxldCByZXNwID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLmdpdGh1Yi5jb20vdXNlcnMvJHt1c2VybmFtZX0vcmVwb3M/cGVyX3BhZ2U9MTAwYCk7XHJcblx0bGV0IHJlczogUmVwb1tdID0gW107XHJcblx0aWYgKCFyZXNwLm9rKVxyXG5cdFx0cmV0dXJuIHJlcztcclxuXHRyZXR1cm4gYXdhaXQgcmVzcC5qc29uKCkgYXMgUmVwb1tdO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY29udHJpYkhpc3RvcnkodXNlcm5hbWU6IHN0cmluZyk6IFxyXG5cdFByb21pc2U8Q29udHJpYltdPiB7XHJcblx0bGV0IHRvZGF5ID0gTWF0aC50cnVuYyAoRGF0ZS5ub3coKSAvIG1zSW5EYXkpICogbXNJbkRheTtcclxuXHRsZXQgZXZlbnRzID0gYXdhaXQgZmV0Y2hFdmVudHModXNlcm5hbWUpO1xyXG5cdGxldCByZXMgPSBuZXcgQXJyYXk8Q29udHJpYj4oOTApO1xyXG5cdGxldCBkYXkgPSB0b2RheSAtICg4OSAqIG1zSW5EYXkpO1xyXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcmVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRsZXQgZCA9IG5ldyBEYXRlKGRheSk7XHJcblx0XHRsZXQgYyA9IGV2ZW50c1tEYXRlUGFydChkKV0gfHwgMDtcclxuXHRcdHJlc1tpXSA9IHtcclxuXHRcdFx0ZGF5OiBkLFxyXG5cdFx0XHRjb3VudDogY1xyXG5cdFx0fTtcclxuXHRcdGRheSArPSBtc0luRGF5O1xyXG5cdH1cclxuXHRyZXR1cm4gcmVzO1xyXG59XHJcbiIsImltcG9ydCB7IERpc3BsYXkgfSBmcm9tICcuL2Rpc3BsYXknO1xyXG5pbXBvcnQgeyBOdWdldERpc3BsYXkgfSBmcm9tICcuL251Zy1kaXNwbGF5JztcclxuaW1wb3J0IHsgR2l0aHViRGlzcGxheSB9IGZyb20gJy4vZ2l0LWRpc3BsYXknO1xyXG5pbXBvcnQgeyBBcHB2ZXlvckRpc3BsYXkgfSBmcm9tICcuL2Fwdi1kaXNwbGF5JztcclxuXHJcbmxldCBkaXNwbGF5TWFwID0ge1xyXG4gICAgbnVnZXQ6IChlOiBIVE1MRWxlbWVudCkgPT4gbmV3IE51Z2V0RGlzcGxheShlLCBcIlRvbW1pIEpvaHRlbGFcIiksXHJcbiAgICBnaXQ6IChlOiBIVE1MRWxlbWVudCkgPT4gbmV3IEdpdGh1YkRpc3BsYXkoZSwgXCJqb2h0ZWxhXCIpLFxyXG4gICAgYXBwdmV5b3I6IChlOiBIVE1MRWxlbWVudCkgPT4gbmV3IEFwcHZleW9yRGlzcGxheShlLCBcImpvaHRlbGFcIiwgXHJcbiAgICAgICAgW1wiZXh0ZW5zaW9uY29yZFwiLCBcImxpbnFjaGVja1wiLCBcImxpdGVyYXRlY3NcIl0pLFxyXG4gICAgbGlua2VkaW46IChlOiBIVE1MRWxlbWVudCkgPT4gbmV3IERpc3BsYXkoZSlcclxufVxyXG5cclxuZnVuY3Rpb24gYW5pbWF0ZU1vbml0b3JzKCkge1xyXG4gICAgdmFyIG1vbml0b3JzID0gZG9jdW1lbnQuYm9keS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9uaXRvci1jb250ZW50XCIpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb25pdG9ycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGxldCBlID0gbW9uaXRvcnNbaV07XHJcbiAgICAgICAgbGV0IGQgPSBkaXNwbGF5TWFwW2UuaWRdKGUpO1xyXG4gICAgICAgIGQucnVuKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGFuaW1hdGVNb25pdG9ycyk7IiwiaW1wb3J0IHsgY2FudmFzSGVpZ2h0LCBtc0luU2VjLCBEaXNwbGF5IH0gZnJvbSAnLi9kaXNwbGF5JztcclxuXHJcbmludGVyZmFjZSBQYWNrYWdlVmVyc2lvbiB7XHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XHJcbiAgICBkb3dubG9hZHM6IG51bWJlcjtcclxufVxyXG5cclxuaW50ZXJmYWNlIFBhY2thZ2Uge1xyXG4gICAgaWQ6IHN0cmluZztcclxuICAgIHZlcnNpb246IHN0cmluZztcclxuICAgIHRvdGFsRG93bmxvYWRzOiBudW1iZXI7XHJcbiAgICB2ZXJzaW9uczogUGFja2FnZVZlcnNpb25bXTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE51Z2V0RGlzcGxheSBleHRlbmRzIERpc3BsYXkge1xyXG4gICAgcHJpdmF0ZSBhdXRob3I6IHN0cmluZztcclxuICAgIHByaXZhdGUgcXVlcnk6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBIVE1MRWxlbWVudCwgYXV0aG9yOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihjb250ZW50KTtcclxuICAgICAgICB0aGlzLmF1dGhvciA9IGF1dGhvcjtcclxuICAgICAgICB0aGlzLmdldEFwaVF1ZXJ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFzeW5jIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXHJcbiAgICAgICAgaWYgKCEoY3R4ICYmIHRoaXMucXVlcnkpKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHBhY2thZ2VzID0gYXdhaXQgdGhpcy5nZXRQYWNrYWdlcygpO1xyXG4gICAgICAgIGlmIChwYWNrYWdlcy5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2V0Q3R4U3R5bGUoY3R4KTtcclxuICAgICAgICB0aGlzLmNsZWFyQ3R4KGN0eCk7XHJcbiAgICAgICAgdGhpcy5kcmF3QXhpcyhjdHgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZHJhd0xlZ2VuZChjdHgsIHBhY2thZ2VzKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmRyYXdMaW5lR3JhcGhzKGN0eCwgcGFja2FnZXMpO1xyXG4gICAgICAgIGF3YWl0IHN1cGVyLnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZ2V0QXBpUXVlcnkoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkubnVnZXQub3JnL3YzL2luZGV4Lmpzb25cIilcclxuICAgICAgICBpZiAoIXJlcy5vaylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCByZXNvdXJjZXMgPSAoYXdhaXQgcmVzLmpzb24oKSkucmVzb3VyY2VzIGFzIGFueVtdO1xyXG4gICAgICAgIHRoaXMucXVlcnkgPSByZXNvdXJjZXMuZmluZChyID0+IHJbJ0B0eXBlJ10gPT09ICdTZWFyY2hRdWVyeVNlcnZpY2UnKVsnQGlkJ10gK1xyXG4gICAgICAgICAgICBgP3E9YXV0aG9yczpbXCIke3RoaXMuYXV0aG9yfVwiXWA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRQYWNrYWdlcygpOiBQcm9taXNlPFBhY2thZ2VbXT4ge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBmZXRjaCh0aGlzLnF1ZXJ5KVxyXG4gICAgICAgIGlmICghcmVzLm9rKVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgbGV0IHJlc3AgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICAgIHJldHVybiByZXNwWydkYXRhJ10gYXMgUGFja2FnZVtdO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBkcmF3QXhpcyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIGxldCB3ID0gdGhpcy5jYW52YXMud2lkdGggLSAzO1xyXG4gICAgICAgIGxldCBoID0gY2FudmFzSGVpZ2h0IC0gMztcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY3R4Lm1vdmVUbygwLCAyKTtcclxuICAgICAgICBjdHgubGluZVRvKDIsIDApO1xyXG4gICAgICAgIGN0eC5saW5lVG8oNCwgMik7XHJcbiAgICAgICAgY3R4Lm1vdmVUbygyLCAwKTtcclxuICAgICAgICBjdHgubGluZVRvKDIsIGgpO1xyXG4gICAgICAgIGN0eC5saW5lVG8odywgaCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh3IC0gMiwgaCAtIDIpO1xyXG4gICAgICAgIGN0eC5tb3ZlVG8odywgaCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh3IC0gMiwgaCArIDIpO1xyXG4gICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGRyYXdMZWdlbmQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgICAgICAgcGFja2FnZXM6IFBhY2thZ2VbXSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2FnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kcmF3VGVybWluYWxUZXh0KGN0eCEsIGksIDEsIHBhY2thZ2VzW2ldLmlkKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5kcmF3VGVybWluYWxUZXh0KGN0eCEsIGksIDMxLCBwYWNrYWdlc1tpXS50b3RhbERvd25sb2Fkcy50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFzeW5jIGRyYXdMaW5lR3JhcGhzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxyXG4gICAgICAgIHBhY2thZ2VzOiBQYWNrYWdlW10pIHtcclxuICAgICAgICBsZXQgbWF4eCA9IE1hdGgubWF4KC4uLnBhY2thZ2VzLm1hcChwID0+IHAudmVyc2lvbnMubGVuZ3RoKSk7XHJcbiAgICAgICAgbGV0IGR4ID0gdGhpcy5jYW52YXMud2lkdGggLyBtYXh4O1xyXG4gICAgICAgIGxldCBtYXh2YWxzID0gcGFja2FnZXMubWFwKHAgPT4gTWF0aC5tYXgoLi4ucC52ZXJzaW9ucy5tYXAgKHYgPT4gdi5kb3dubG9hZHMpKSk7XHJcbiAgICAgICAgbGV0IG1heHkgPSBNYXRoLm1heCguLi5tYXh2YWxzKTtcclxuICAgICAgICBsZXQgc2NhbGV5ID0gY2FudmFzSGVpZ2h0ICogMC43NSAvIG1heHk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWNrYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcGtnID0gcGFja2FnZXNbaV07XHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbygwLCBjYW52YXNIZWlnaHQgLSAocGtnLnZlcnNpb25zWzBdLmRvd25sb2FkcyAqIHNjYWxleSkpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRlbGF5KG1zSW5TZWMpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHBrZy52ZXJzaW9ucy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHB2ZXIgPSBwa2cudmVyc2lvbnNbal07XHJcbiAgICAgICAgICAgICAgICBsZXQgeCA9IGogKiBkeDtcclxuICAgICAgICAgICAgICAgIGxldCB5ID0gY2FudmFzSGVpZ2h0IC0gKHB2ZXIuZG93bmxvYWRzICogc2NhbGV5KTtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oeCwgeSk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQocHZlci52ZXJzaW9uLCB4LCB5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ==
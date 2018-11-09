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
    drawBigText(ctx, row, column, size, text) {
        return __awaiter(this, void 0, void 0, function* () {
            ctx.font = `${size}px Lekton`;
            this.drawTerminalText(ctx, row, column, text);
            ctx.font = defaultFont;
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



let displayMap = {
    nuget: (e) => new _nug_display__WEBPACK_IMPORTED_MODULE_1__["NugetDisplay"](e, "Tommi Johtela"),
    git: (e) => new _git_display__WEBPACK_IMPORTED_MODULE_2__["GithubDisplay"](e, "johtela"),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rpc3BsYXkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2dpdC1kaXNwbGF5LnRzIiwid2VicGFjazovLy8uL3NyYy9naXRodWItY29udHJpYi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL251Zy1kaXNwbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZPLE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQztBQUN6QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDckIsTUFBTSxPQUFPLEdBQUcsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUM3QixNQUFNLFFBQVEsR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQzlCLE1B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QU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3BDO2dCQUNELEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNoQjtRQUNMLENBQUM7S0FBQTtDQUNKIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiZXhwb3J0IGNvbnN0IGNhbnZhc0hlaWdodCA9IDIyMjtcclxuZXhwb3J0IGNvbnN0IG1zSW5TZWMgPSAxMDAwO1xyXG5leHBvcnQgY29uc3QgbXNJbk1pbiA9IG1zSW5TZWMgKiA2MDtcclxuZXhwb3J0IGNvbnN0IG1zSW5Ib3VyID0gbXNJbk1pbiAqIDYwO1xyXG5leHBvcnQgY29uc3QgbXNJbkRheSA9IG1zSW5Ib3VyICogMjQ7XHJcbmV4cG9ydCBjb25zdCBtc0luV2VlayA9IG1zSW5EYXkgKiA3O1xyXG5jb25zdCBkZWZhdWx0Rm9udCA9IFwiMTVweCBMZWt0b25cIjtcclxuY29uc3QgZGVmYXVsdENvbG9yID0gXCIjREREXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzcGxheSB7XHJcblx0cHJpdmF0ZSBjb250ZW50OiBIVE1MRWxlbWVudDtcclxuXHRwcm90ZWN0ZWQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHR0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gY2FudmFzSGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGRlbGF5KG1zOiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4ocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2xlYXJDdHgoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuXHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgc2V0Q3R4U3R5bGUoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuXHRcdGN0eC5mb250ID0gZGVmYXVsdEZvbnQ7XHJcblx0XHRjdHguZmlsbFN0eWxlID0gZGVmYXVsdENvbG9yO1xyXG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gZGVmYXVsdENvbG9yO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFzeW5jIGRyYXdUZXJtaW5hbFRleHQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcblx0XHRyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIsIHRleHQ6IHN0cmluZykge1xyXG5cdFx0bGV0IHsgeCwgeSB9ID0gdGhpcy5jaGFyUG9zVG9YWShjb2x1bW4sIHJvdyk7XHJcblx0XHRhd2FpdCB0aGlzLmRlbGF5KG1zSW5TZWMpO1xyXG5cdFx0Y3R4LmZpbGxUZXh0KHRleHQudG9VcHBlckNhc2UoKSwgeCwgeSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNoYXJQb3NUb1hZKGNvbHVtbjogbnVtYmVyLCByb3c6IG51bWJlcikge1xyXG5cdFx0bGV0IHggPSBjb2x1bW4gKiAxMDtcclxuXHRcdGxldCB5ID0gKHJvdyArIDEpICogMTc7XHJcblx0XHRyZXR1cm4geyB4LCB5IH07XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgYXN5bmMgZHJhd0JpZ1RleHQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcblx0XHRyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIsIHNpemU6IG51bWJlciwgdGV4dDogc3RyaW5nKSB7XHJcblx0XHRjdHguZm9udCA9IGAke3NpemV9cHggTGVrdG9uYDtcclxuXHRcdHRoaXMuZHJhd1Rlcm1pbmFsVGV4dChjdHgsIHJvdywgY29sdW1uLCB0ZXh0KTtcdFx0XHJcblx0XHRjdHguZm9udCA9IGRlZmF1bHRGb250O1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFzeW5jIHJlbmRlcigpIHtcclxuXHRcdGF3YWl0IHRoaXMuZGVsYXkoMTUgKiBtc0luU2VjKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyBydW4oKSB7XHJcblx0XHR3aGlsZSAodHJ1ZSkge1xyXG5cdFx0XHRsZXQgd2FpdCA9IE1hdGgucmFuZG9tKCkgKiBtc0luU2VjICogMzAgKyAobXNJblNlYyAqIDE1KTtcclxuXHRcdFx0YXdhaXQgdGhpcy5kZWxheSh3YWl0KTtcclxuXHRcdFx0YXdhaXQgdGhpcy5mbGlja2VyRWZmZWN0KHRoaXMuY29udGVudCk7XHJcblx0XHRcdHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5jb250ZW50LmNsaWVudFdpZHRoO1xyXG5cdFx0XHR0aGlzLmNvbnRlbnQucmVwbGFjZVdpdGgodGhpcy5jYW52YXMpO1xyXG5cdFx0XHRhd2FpdCB0aGlzLnJlbmRlcigpO1xyXG5cdFx0XHR0aGlzLmNhbnZhcy5yZXBsYWNlV2l0aCh0aGlzLmNvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhc3luYyBmbGlja2VyRWZmZWN0KGNvbnQ6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRhd2FpdCB0aGlzLmZsaWNrZXIoY29udCwgJ3Nsb3cnLCAxNTAwKTtcclxuXHRcdGF3YWl0IHRoaXMuZmxpY2tlcihjb250LCAnbWVkaXVtJywgMTAwMCk7XHJcblx0XHRhd2FpdCB0aGlzLmZsaWNrZXIoY29udCwgJ2Zhc3QnLCA1MDApO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhc3luYyBmbGlja2VyKGNvbnQ6IEhUTUxFbGVtZW50LCBjbHM6IHN0cmluZywgbXM6IG51bWJlcikge1xyXG5cdFx0dmFyIGNzc0NsYXNzID0gJ2ZsaWNrZXItJyArIGNsc1xyXG5cdFx0Y29udC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcclxuXHRcdGF3YWl0IHRoaXMuZGVsYXkobXMpO1xyXG5cdFx0Y29udC5jbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzKTtcclxuXHR9XHJcbn0iLCJpbXBvcnQgeyBjYW52YXNIZWlnaHQsIG1zSW5EYXksIG1zSW5XZWVrLCBEaXNwbGF5IH0gZnJvbSAnLi9kaXNwbGF5JztcclxuaW1wb3J0IHsgQ29udHJpYiwgUmVwbywgY29udHJpYkhpc3RvcnksIGZldGNoUmVwb3MgfSBmcm9tICcuL2dpdGh1Yi1jb250cmliJztcclxuXHJcbmNvbnN0IHJlY3RTaXplID0gMTI7XHJcbmNvbnN0IHJlY3RTcGFjaW5nID0gMTg7XHJcbmNvbnN0IHhzdGFydCA9IDg7XHJcbmNvbnN0IHlzdGFydCA9IDMyO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdpdGh1YkRpc3BsYXkgZXh0ZW5kcyBEaXNwbGF5IHtcclxuICAgIHByaXZhdGUgdXNlcm5hbWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50OiBIVE1MRWxlbWVudCwgdXNlcm5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYXN5bmMgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcclxuICAgICAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG4gICAgICAgIHN1cGVyLmNsZWFyQ3R4IChjdHgpO1xyXG4gICAgICAgIHN1cGVyLnNldEN0eFN0eWxlKGN0eCk7XHJcbiAgICAgICAgbGV0IFsgY29udHJpYnMsIHJlcG9zIF0gPSBhd2FpdCBQcm9taXNlLmFsbCAoW1xyXG4gICAgICAgICAgICBjb250cmliSGlzdG9yeSh0aGlzLnVzZXJuYW1lKSwgZmV0Y2hSZXBvcyh0aGlzLnVzZXJuYW1lKV0pO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZHJhd0NvbnRyaWJDYWxlbmRhcihjdHgsIGNvbnRyaWJzKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmRyYXdSZXBvU3VtbWFyeShjdHgsIHJlcG9zKTtcclxuICAgICAgICBhd2FpdCBzdXBlci5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGRyYXdDb250cmliQ2FsZW5kYXIoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgICAgICAgY29udHJpYnM6IENvbnRyaWJbXSkge1xyXG4gICAgICAgIGxldCB4ID0geHN0YXJ0O1xyXG4gICAgICAgIGxldCBtb250aCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250cmlicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYyA9IGNvbnRyaWJzW2ldO1xyXG4gICAgICAgICAgICBsZXQgd2Vla2RheSA9IGMuZGF5LmdldERheSgpO1xyXG4gICAgICAgICAgICBpZiAod2Vla2RheSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB4ICs9IHJlY3RTcGFjaW5nO1xyXG4gICAgICAgICAgICAgICAgbGV0IG0gPSBjLmRheS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgICAgIGlmIChtICE9IG1vbnRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbW9udGggPSBtO1xyXG4gICAgICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChgJHttfS8ke2MuZGF5LmdldERhdGUoKX1gLCB4LCB5c3RhcnQgLSA4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgeSA9IHdlZWtkYXkgKiByZWN0U3BhY2luZyArIHlzdGFydDtcclxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IE1hdGgubWF4KGMuY291bnQgLyA0LCAwLjI1KTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgcmVjdFNpemUsIHJlY3RTaXplKTtcclxuICAgICAgICAgICAgYXdhaXQgc3VwZXIuZGVsYXkoMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBkcmF3UmVwb1N1bW1hcnkoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHJlcG9zOiBSZXBvW10pIHtcclxuICAgICAgICBsZXQgcm93ID0gOTtcclxuICAgICAgICBhd2FpdCB0aGlzLmRyYXdMYWJlbChjdHgsIHJvdysrLCBcInJlcG9zaXRvcmllczpcIiwgcmVwb3MubGVuZ3RoKTtcclxuICAgICAgICBsZXQgb2kgPSByZXBvcy5yZWR1Y2UoKGNudCwgcikgPT4gci5vcGVuX2lzc3VlcyArIGNudCwgMCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5kcmF3TGFiZWwoY3R4LCByb3crKywgXCJvcGVuIGlzc3VlczpcIiwgb2kpO1xyXG4gICAgICAgIGxldCB3YyA9IHJlcG9zLnJlZHVjZSgoY250LCByKSA9PiByLndhdGNoZXJzICsgY250LCAwKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmRyYXdMYWJlbChjdHgsIHJvdysrLCBcIndhdGNoZXJzOlwiLCB3Yyk7XHJcbiAgICAgICAgbGV0IGZjID0gcmVwb3MucmVkdWNlKChjbnQsIHIpICA9PiByLmZvcmtzICsgY250LCAwKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmRyYXdMYWJlbChjdHgsIHJvdysrLCBcImZvcmtzOlwiLCBmYyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBkcmF3TGFiZWwoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHJvdzogbnVtYmVyLFxyXG4gICAgICAgIGxhYmVsOiBzdHJpbmcsIHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgYXdhaXQgc3VwZXIuZHJhd1Rlcm1pbmFsVGV4dChjdHgsIHJvdywgMiwgbGFiZWwpO1xyXG4gICAgICAgIGF3YWl0IHN1cGVyLmRyYXdUZXJtaW5hbFRleHQoY3R4LCByb3csIDE2LCB2YWwudG9TdHJpbmcoKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBtc0luRGF5IH0gZnJvbSBcIi4vZGlzcGxheVwiO1xyXG5cclxuaW50ZXJmYWNlIEV2ZW50IHtcclxuXHR0eXBlOiBzdHJpbmc7XHJcblx0Y3JlYXRlZF9hdDogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyaWIge1xyXG5cdGRheTogRGF0ZTtcclxuXHRjb3VudDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcG8ge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRvcGVuX2lzc3VlczogbnVtYmVyO1xyXG5cdHdhdGNoZXJzOiBudW1iZXI7XHJcblx0Zm9ya3M6IG51bWJlcjtcclxufVxyXG5cclxuZnVuY3Rpb24gRGF0ZVBhcnQoZDogRGF0ZSk6IHN0cmluZyB7XHJcblx0cmV0dXJuIGAke2QuZ2V0RnVsbFllYXIoKX0tJHtkLmdldE1vbnRoKCkgKyAxfS0ke2QuZ2V0RGF0ZSgpfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEV2ZW50cyh1c2VybmFtZTogc3RyaW5nKSB7XHJcblx0bGV0IHJlc3AgPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9hcGkuZ2l0aHViLmNvbS91c2Vycy8ke3VzZXJuYW1lfS9ldmVudHM/cGVyX3BhZ2U9MTAwYCk7XHJcblx0bGV0IHJlczogeyBbZGF0ZTogc3RyaW5nXTogbnVtYmVyIHwgdW5kZWZpbmVkIH0gPSB7fTtcclxuXHRpZiAoIXJlc3Aub2spXHJcblx0XHRyZXR1cm4gcmVzO1xyXG5cdGxldCBldmVudHMgPSBhd2FpdCByZXNwLmpzb24oKSBhcyBFdmVudFtdO1xyXG5cdGV2ZW50cy5mb3JFYWNoKGUgPT4ge1xyXG5cdFx0bGV0IGRhdGUgPSBEYXRlUGFydChuZXcgRGF0ZShlLmNyZWF0ZWRfYXQpKTtcclxuXHRcdGxldCBjb3VudCA9IHJlc1tkYXRlXTtcclxuXHRcdHJlc1tkYXRlXSA9IGNvdW50ID09PSB1bmRlZmluZWQgPyAxIDogY291bnQgKyAxO1xyXG5cdH0pO1xyXG5cdHJldHVybiByZXM7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaFJlcG9zKHVzZXJuYW1lOiBzdHJpbmcpIHtcclxuXHRsZXQgcmVzcCA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5naXRodWIuY29tL3VzZXJzLyR7dXNlcm5hbWV9L3JlcG9zP3Blcl9wYWdlPTEwMGApO1xyXG5cdGxldCByZXM6IFJlcG9bXSA9IFtdO1xyXG5cdGlmICghcmVzcC5vaylcclxuXHRcdHJldHVybiByZXM7XHJcblx0cmV0dXJuIGF3YWl0IHJlc3AuanNvbigpIGFzIFJlcG9bXTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbnRyaWJIaXN0b3J5KHVzZXJuYW1lOiBzdHJpbmcpOiBcclxuXHRQcm9taXNlPENvbnRyaWJbXT4ge1xyXG5cdGxldCB0b2RheSA9IE1hdGgudHJ1bmMgKERhdGUubm93KCkgLyBtc0luRGF5KSAqIG1zSW5EYXk7XHJcblx0bGV0IGV2ZW50cyA9IGF3YWl0IGZldGNoRXZlbnRzKHVzZXJuYW1lKTtcclxuXHRsZXQgcmVzID0gbmV3IEFycmF5PENvbnRyaWI+KDkwKTtcclxuXHRsZXQgZGF5ID0gdG9kYXkgLSAoODkgKiBtc0luRGF5KTtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0bGV0IGQgPSBuZXcgRGF0ZShkYXkpO1xyXG5cdFx0bGV0IGMgPSBldmVudHNbRGF0ZVBhcnQoZCldIHx8IDA7XHJcblx0XHRyZXNbaV0gPSB7XHJcblx0XHRcdGRheTogZCxcclxuXHRcdFx0Y291bnQ6IGNcclxuXHRcdH07XHJcblx0XHRkYXkgKz0gbXNJbkRheTtcclxuXHR9XHJcblx0cmV0dXJuIHJlcztcclxufVxyXG4iLCJpbXBvcnQgeyBEaXNwbGF5IH0gZnJvbSAnLi9kaXNwbGF5JztcclxuaW1wb3J0IHsgTnVnZXREaXNwbGF5IH0gZnJvbSAnLi9udWctZGlzcGxheSc7XHJcbmltcG9ydCB7IEdpdGh1YkRpc3BsYXkgfSBmcm9tICcuL2dpdC1kaXNwbGF5J1xyXG5cclxubGV0IGRpc3BsYXlNYXAgPSB7XHJcbiAgICBudWdldDogKGU6IEhUTUxFbGVtZW50KSA9PiBuZXcgTnVnZXREaXNwbGF5KGUsIFwiVG9tbWkgSm9odGVsYVwiKSxcclxuICAgIGdpdDogKGU6IEhUTUxFbGVtZW50KSA9PiBuZXcgR2l0aHViRGlzcGxheShlLCBcImpvaHRlbGFcIiksXHJcbiAgICBsaW5rZWRpbjogKGU6IEhUTUxFbGVtZW50KSA9PiBuZXcgRGlzcGxheShlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRlTW9uaXRvcnMoKSB7XHJcbiAgICB2YXIgbW9uaXRvcnMgPSBkb2N1bWVudC5ib2R5LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb25pdG9yLWNvbnRlbnRcIik7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbml0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGUgPSBtb25pdG9yc1tpXTtcclxuICAgICAgICBsZXQgZCA9IGRpc3BsYXlNYXBbZS5pZF0oZSk7XHJcbiAgICAgICAgZC5ydW4oKTtcclxuICAgIH1cclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYW5pbWF0ZU1vbml0b3JzKTsiLCJpbXBvcnQgeyBjYW52YXNIZWlnaHQsIG1zSW5TZWMsIERpc3BsYXkgfSBmcm9tICcuL2Rpc3BsYXknO1xyXG5cclxuaW50ZXJmYWNlIFBhY2thZ2VWZXJzaW9uIHtcclxuICAgIHZlcnNpb246IHN0cmluZztcclxuICAgIGRvd25sb2FkczogbnVtYmVyO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgUGFja2FnZSB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gICAgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgdG90YWxEb3dubG9hZHM6IG51bWJlcjtcclxuICAgIHZlcnNpb25zOiBQYWNrYWdlVmVyc2lvbltdO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTnVnZXREaXNwbGF5IGV4dGVuZHMgRGlzcGxheSB7XHJcbiAgICBwcml2YXRlIGF1dGhvcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBxdWVyeTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRlbnQ6IEhUTUxFbGVtZW50LCBhdXRob3I6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMuYXV0aG9yID0gYXV0aG9yO1xyXG4gICAgICAgIHRoaXMuZ2V0QXBpUXVlcnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYXN5bmMgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIilcclxuICAgICAgICBpZiAoIShjdHggJiYgdGhpcy5xdWVyeSkpIHJldHVybjtcclxuICAgICAgICBsZXQgcGFja2FnZXMgPSBhd2FpdCB0aGlzLmdldFBhY2thZ2VzKCk7XHJcbiAgICAgICAgaWYgKHBhY2thZ2VzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zZXRDdHhTdHlsZShjdHgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJDdHgoY3R4KTtcclxuICAgICAgICB0aGlzLmRyYXdBeGlzKGN0eCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5kcmF3TGVnZW5kKGN0eCwgcGFja2FnZXMpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZHJhd0xpbmVHcmFwaHMoY3R4LCBwYWNrYWdlcyk7XHJcbiAgICAgICAgYXdhaXQgc3VwZXIucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRBcGlRdWVyeSgpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5udWdldC5vcmcvdjMvaW5kZXguanNvblwiKVxyXG4gICAgICAgIGlmICghcmVzLm9rKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgbGV0IHJlc291cmNlcyA9IChhd2FpdCByZXMuanNvbigpKS5yZXNvdXJjZXMgYXMgYW55W107XHJcbiAgICAgICAgdGhpcy5xdWVyeSA9IHJlc291cmNlcy5maW5kKHIgPT4gclsnQHR5cGUnXSA9PT0gJ1NlYXJjaFF1ZXJ5U2VydmljZScpWydAaWQnXSArXHJcbiAgICAgICAgICAgIGA/cT1hdXRob3JzOltcIiR7dGhpcy5hdXRob3J9XCJdYDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldFBhY2thZ2VzKCk6IFByb21pc2U8UGFja2FnZVtdPiB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGZldGNoKHRoaXMucXVlcnkpXHJcbiAgICAgICAgaWYgKCFyZXMub2spXHJcbiAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICBsZXQgcmVzcCA9IGF3YWl0IHJlcy5qc29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BbJ2RhdGEnXSBhcyBQYWNrYWdlW107XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGRyYXdBeGlzKGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgbGV0IHcgPSB0aGlzLmNhbnZhcy53aWR0aCAtIDM7XHJcbiAgICAgICAgbGV0IGggPSBjYW52YXNIZWlnaHQgLSAzO1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICBjdHgubW92ZVRvKDAsIDIpO1xyXG4gICAgICAgIGN0eC5saW5lVG8oMiwgMCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyg0LCAyKTtcclxuICAgICAgICBjdHgubW92ZVRvKDIsIDApO1xyXG4gICAgICAgIGN0eC5saW5lVG8oMiwgaCk7XHJcbiAgICAgICAgY3R4LmxpbmVUbyh3LCBoKTtcclxuICAgICAgICBjdHgubGluZVRvKHcgLSAyLCBoIC0gMik7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyh3LCBoKTtcclxuICAgICAgICBjdHgubGluZVRvKHcgLSAyLCBoICsgMik7XHJcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXN5bmMgZHJhd0xlZ2VuZChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcclxuICAgICAgICBwYWNrYWdlczogUGFja2FnZVtdKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWNrYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRyYXdUZXJtaW5hbFRleHQoY3R4ISwgaSwgMSwgcGFja2FnZXNbaV0uaWQpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmRyYXdUZXJtaW5hbFRleHQoY3R4ISwgaSwgMzEsIHBhY2thZ2VzW2ldLnRvdGFsRG93bmxvYWRzLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYXN5bmMgZHJhd0xpbmVHcmFwaHMoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXHJcbiAgICAgICAgcGFja2FnZXM6IFBhY2thZ2VbXSkge1xyXG4gICAgICAgIGxldCBtYXh4ID0gTWF0aC5tYXgoLi4ucGFja2FnZXMubWFwKHAgPT4gcC52ZXJzaW9ucy5sZW5ndGgpKTtcclxuICAgICAgICBsZXQgZHggPSB0aGlzLmNhbnZhcy53aWR0aCAvIG1heHg7XHJcbiAgICAgICAgbGV0IG1heHZhbHMgPSBwYWNrYWdlcy5tYXAocCA9PiBNYXRoLm1heCguLi5wLnZlcnNpb25zLm1hcCAodiA9PiB2LmRvd25sb2FkcykpKTtcclxuICAgICAgICBsZXQgbWF4eSA9IE1hdGgubWF4KC4uLm1heHZhbHMpO1xyXG4gICAgICAgIGxldCBzY2FsZXkgPSBjYW52YXNIZWlnaHQgKiAwLjc1IC8gbWF4eTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2thZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBwa2cgPSBwYWNrYWdlc1tpXTtcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKDAsIGNhbnZhc0hlaWdodCAtIChwa2cudmVyc2lvbnNbMF0uZG93bmxvYWRzICogc2NhbGV5KSk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuZGVsYXkobXNJblNlYyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcGtnLnZlcnNpb25zLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHZlciA9IHBrZy52ZXJzaW9uc1tqXTtcclxuICAgICAgICAgICAgICAgIGxldCB4ID0gaiAqIGR4O1xyXG4gICAgICAgICAgICAgICAgbGV0IHkgPSBjYW52YXNIZWlnaHQgLSAocHZlci5kb3dubG9hZHMgKiBzY2FsZXkpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChwdmVyLnZlcnNpb24sIHgsIHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9
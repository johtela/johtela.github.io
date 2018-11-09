var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const canvasHeight = 222;
export const msInSec = 1000;
export const msInMin = msInSec * 60;
export const msInHour = msInMin * 60;
export const msInDay = msInHour * 24;
export const msInWeek = msInDay * 7;
const defaultFont = "15px Lekton";
const defaultColor = "#DDD";
export class Display {
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
            cont.class;
            toggleClass(cssClass);
            yield this.delay(ms);
            cont.toggleClass(cssClass);
        });
    }
}
//# sourceMappingURL=display.js.map
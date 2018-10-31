var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as $ from 'jquery';
export class Display {
    constructor(content) {
        this.content = content;
        this.canvas = $('<canvas>')[0];
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.delay(15000);
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                let wait = Math.random() * 60000;
                yield this.delay(wait);
                let cont = $(this.content);
                yield this.flickerEffect(cont);
                cont.replaceWith(this.canvas);
                yield this.render();
                $(this.canvas).replaceWith(this.content);
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
            cont.toggleClass(cssClass);
            yield this.delay(ms);
            cont.toggleClass(cssClass);
        });
    }
}
//# sourceMappingURL=display.js.map
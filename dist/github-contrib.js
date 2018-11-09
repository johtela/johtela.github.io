var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { msInDay } from "./display";
function DatePart(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
export function fetchEvents(username) {
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
export function fetchRepos(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        let res = [];
        if (!resp.ok)
            return res;
        return yield resp.json();
    });
}
export function contribHistory(username) {
    return __awaiter(this, void 0, void 0, function* () {
        let today = Math.trunc(Date.now() / msInDay) * msInDay;
        let events = yield fetchEvents(username);
        let res = new Array(90);
        let day = today - (89 * msInDay);
        for (let i = 0; i < res.length; i++) {
            let d = new Date(day);
            let c = events[DatePart(d)] || 0;
            res[i] = {
                day: d,
                count: c
            };
            day += msInDay;
        }
        return res;
    });
}
//# sourceMappingURL=github-contrib.js.map
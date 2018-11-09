import { msInDay } from "./display";

interface Event {
	type: string;
	created_at: string;
}

export interface Contrib {
	day: Date;
	count: number;
}

export interface Repo {
	name: string;
	open_issues: number;
	watchers: number;
	forks: number;
}

function DatePart(d: Date): string {
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export async function fetchEvents(username: string) {
	let resp = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
	let res: { [date: string]: number | undefined } = {};
	if (!resp.ok)
		return res;
	let events = await resp.json() as Event[];
	events.forEach(e => {
		let date = DatePart(new Date(e.created_at));
		let count = res[date];
		res[date] = count === undefined ? 1 : count + 1;
	});
	return res;
}

export async function fetchRepos(username: string) {
	let resp = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
	let res: Repo[] = [];
	if (!resp.ok)
		return res;
	return await resp.json() as Repo[];
}

export async function contribHistory(username: string): 
	Promise<Contrib[]> {
	let today = Math.trunc (Date.now() / msInDay) * msInDay;
	let events = await fetchEvents(username);
	let res = new Array<Contrib>(90);
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
}

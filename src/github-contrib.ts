interface Event {
	type: string;
	created_at: string;
}

function DatePart(d: Date): string {
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export async function fetchEvents(username: string) {
	let resp = await fetch(`https://api.github.com/users/${username}/events`);
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
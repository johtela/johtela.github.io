import * as $ from 'jquery'

export async function fetchYears(username: string) {
    let data = await fetch(`https://github.com/${username}`, { mode: 'cors' });
    let text = await data.text();
    let html = $(text);
    return html.find(".js-year-link")
      .map((i, a) => {
        let $a = $(a);
        return {
          href: $a.attr("href") || '',
          text: $a.text().trim()
        };
      });
  }
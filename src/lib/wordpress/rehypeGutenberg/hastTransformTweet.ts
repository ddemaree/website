import type { Element, Text } from "hast";
import { select } from "hast-util-select";
import { toText } from "hast-util-to-text";
import { fromHtml } from "hast-util-from-html";
import { h } from "hastscript";
import { DateTime } from "luxon";
import twtxt from "twitter-text";

/* 
Transform's WordPress's Twitter embed markup (which is just a wrapper around the default oEmbed output) into a JS-free embed, to be styled by the website.
*/
export default function hastTransformTweet(node: Element) {
  const twQuote = select("blockquote.twitter-tweet > p", node);
  const twLink = select("blockquote > a", node);
  let twUrl: URL | null = null;
  let twText: string = "";
  let twHandle: string = "";
  let twAuthor: string = "";
  let tweetId: string = "";
  let twDate: string = "";
  let twISODate: string = "";
  let twHTML: string = "";
  let twStruct: any[] = [];

  if (twLink) {
    twDate = toText(twLink);
    // TODO: Parse this date
    // twISODate = DateTime.fromFormat(twDate, "LLLL dd, YYYY").toISODate();
  }

  if (twLink && twLink.properties) {
    twUrl = new URL(twLink?.properties.href as string);
    twUrl.search = "";
    const twMatches = twUrl.pathname.match(
      /^\/(?<handle>[^\/]+)\/status\/(?<id>\d+)$/
    );

    if (twMatches && twMatches.groups) {
      twHandle = twMatches.groups.handle;
      tweetId = twMatches.groups.id;
    }
  }

  if (twQuote) {
    twText = toText(twQuote);
    twHTML = twtxt.autoLink(twText);

    let twHTMLStruct = fromHtml(`<div class="tw-text">${twHTML}</div>`, {
      fragment: true,
    });

    if (twHTMLStruct) {
      twStruct = select(".tw-text", twHTMLStruct)!.children;
    }
  }

  const twBlockquote = select("blockquote.twitter-tweet", node); //.children[1];
  if (node && twBlockquote) {
    const twByline = twBlockquote.children
      .filter((child) => child.type === "text" && child.value.match(/\w+/))
      .at(0) as Text | null;

    if (twByline) {
      const twBylineMatch = twByline.value.match(
        /— (?<author>.+) \(@(?<handle>\w+)\)/
      );

      if (twBylineMatch?.groups) twAuthor = twBylineMatch.groups.author;
    }
  }

  const headerNode = h("header", { className: ["tweet-header"] }, [
    "\n    ",
    h("a", { href: `https://twitter.com/${twHandle}` }, [
      "\n      ",
      h("img", {
        src: `https://res.cloudinary.com/demaree/image/twitter_name/w_300,f_auto,q_auto/${twHandle}.jpg`,
        alt: `Twitter profile picture for ${twHandle}`,
        className: "tweet-author-img",
      }),
      "\n      ",
      h("div", {}, [
        h("div", { className: "tweet-author-name" }, twAuthor),
        h("div", { className: "tweet-author-handle" }, [`@${twHandle}`]),
      ]),
      "\n    ",
    ]),
    "\n  ",
  ]);

  const newNode = h(
    "figure",
    {
      className: ["dd-embed", "dd-embed-tweet"],
      "data-tweet-id": tweetId,
      "data-tweet-username": twHandle,
    },
    [
      "\n  ",
      headerNode,
      "\n  ",
      h("div", {}, [
        "\n    ",
        h("p", { className: ["tweet-content"] }, twStruct),
        "\n    ",
        h("footer", { className: ["tweet-footer"] }, [
          h("a", { href: twUrl?.toString(), className: ["tweet-date"] }, [
            twDate,
          ]),
        ]),
        "\n  ",
      ]),
      "\n",
    ]
  );

  return newNode;
}

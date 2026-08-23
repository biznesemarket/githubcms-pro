export function detectQAPageFromHtml($) {
  const featured = $(".featured-snippet, .block-answer").first();
  if (!featured.length) return null;
  const text = featured.text().replace(/\s+/g, " ").trim();
  if (text.length < 80) return null;
  const qMatch = featured.prevAll("h2, h3, h4").first().text().trim();
  return { "@context": "https://schema.org", "@type": "QAPage", mainEntity: { "@type": "Question", name: qMatch || "Question", acceptedAnswer: { "@type": "Answer", text: text.slice(0, 500) } } };
}

export function detectItemListFromHtml($) {
  const items = [];
  $(".fact-number").each((_, el) => {
    const num = $(el).text().trim();
    const text = $(el).closest("div").next(".fact-text").text().trim() || $(el).siblings(".fact-text").first().text().trim();
    if (num && text) items.push({ name: `${num} — ${text}` });
  });
  if (items.length >= 3) {
    return { "@context": "https://schema.org", "@type": "ItemList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name })) };
  }
  return null;
}

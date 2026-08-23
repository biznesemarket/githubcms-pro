export function detectTableFromHtml($) {
  const results = [];
  $("table").each((_, table) => {
    const h = [];
    $(table).find("th").each((_, th) => { h.push($(th).text().trim()); });
    if (h.length >= 2) results.push({ "@context":"https://schema.org","@type":"Table", name: "Comparison: " + h.slice(1,4).join(" vs ") });
  });
  return results;
}

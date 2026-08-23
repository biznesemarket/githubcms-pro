export function detectDefinedTermFromHtml($) {
  const results = []; let c = 0;
  $("h3").each((_, el) => {
    if (c >= 5) return false;
    const t = $(el).text().trim();
    if (t.length < 5 || t.length > 60) return;
    const nextP = $(el).next("p").first();
    if (!nextP.length) return;
    const d = nextP.text().trim();
    if (d.length < 30 || d.length > 300) return;
    if (/^[0-9.\s]+$/.test(t)) return;
    results.push({ "@context":"https://schema.org","@type":"DefinedTerm", name: t, description: d });
    c++;
  });
  return results;
}

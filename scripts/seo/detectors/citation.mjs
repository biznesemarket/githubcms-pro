export function detectCitationFromHtml(text) {
  const sources = [];
  const re = /\[([^\]]{5,80})\]/g; let m, c = 0;
  while ((m = re.exec(text)) !== null && c < 5) { const t = m[1].trim(); if (/\d{4}/.test(t) && t.length > 10) { sources.push({ text: t }); c++; } }
  if (sources.length < 2) { const dr = /(?:согласно|по данным|according to|based on)\s+([^.<]{10,80})/gi; while ((m = dr.exec(text)) !== null) sources.push({ text: m[1].trim() }); }
  if (sources.length >= 2) return { "@context":"https://schema.org","@type":"ScholarlyArticle", citation: sources.map(s => ({ "@type":"Citation", text: s.text })) };
  return null;
}

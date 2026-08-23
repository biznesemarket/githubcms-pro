export function detectPersonFromHtml(text, siteName) {
  const m = text.match(/(?:Автор|author)[:\s]+([А-ЯA-Z][а-яa-z]+\s+[А-ЯA-Z][а-яa-z]+)/i) || text.match(/(?:Автор|author)[:\s]+([^,\n]{3,60})/i);
  if (!m) return null;
  return { "@context":"https://schema.org","@type":"Person", name: m[1].trim(), affiliation: { "@type":"Organization", name: siteName } };
}

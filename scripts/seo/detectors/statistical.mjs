export function detectStatisticalFromHtml(text) {
  const results = []; let c = 0;
  const re = /(\d+(?:[.,]\d+)?)\s*%(?:\s+([^.]{10,150}?(?:\([^)]*\d{4}[^)]*\)|по данным\s+[^.]+)))/gi; let m;
  while ((m = re.exec(text)) !== null && c < 3) {
    const v = Number.parseFloat(m[1].replace(",",".")), t = m[2].trim().replace(/\s+/g," ");
    if (v > 0 && v <= 100 && t.length > 10 && t.length < 200) { results.push({ "@context":"https://schema.org","@type":"StatisticalVariable", name: t.slice(0,80), value: { "@type":"QuantitativeValue", value: v, unitText: "percent" }, citation: { "@type":"Citation", text: t.slice(0,120) } }); c++; }
  }
  return results;
}

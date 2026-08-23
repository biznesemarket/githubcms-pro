export function detectReviewFromHtml(text) {
  const reviews = [];
  const starRegex = /(★{1,5})/g; let m;
  while ((m = starRegex.exec(text)) !== null) {
    const rating = m[1].length;
    const after = text.substring(m.index + m[0].length, m.index + m[0].length + 400);
    const nm = after.match(/([А-ЯA-Z][а-яa-z]+\s+[А-ЯA-Z][а-яa-z]+)/);
    const tm = after.match(/[^.!?]{20,150}[.!?]/);
    if (nm && tm) reviews.push({ a: nm[1], r: rating, t: tm[0].trim(), d: new Date().toISOString().slice(0,10) });
  }
  if (reviews.length >= 1) {
    const avg = (reviews.reduce((s,r)=>s+r.r,0)/reviews.length).toFixed(1);
    return { "@context":"https://schema.org","@type":"Product", name:"Reviewed item", aggregateRating: { "@type":"AggregateRating", ratingValue: Number(avg), bestRating:5, worstRating:1, ratingCount: reviews.length, reviewCount: reviews.length }, review: reviews.map(r=>({ "@type":"Review", author:{ "@type":"Person", name: r.a }, reviewRating:{ "@type":"Rating", ratingValue: r.r, bestRating:5, worstRating:1 }, reviewBody: r.t, datePublished: r.d })) };
  }
  return null;
}

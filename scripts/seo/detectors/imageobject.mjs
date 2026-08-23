export function detectImageObjectFromHtml($) {
  const results = []; let c = 0;
  $("img").each((_, el) => {
    if (c >= 3) return false;
    const s = $(el).attr("src") || "";
    const a = $(el).attr("alt") || "";
    if (s && a.length > 5 && s.startsWith("http")) {
      const ext = s.split("?")[0].split(".").pop()?.toLowerCase();
      const formatMap = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", svg: "image/svg+xml" };
      results.push({ "@context":"https://schema.org","@type":"ImageObject", name: a.slice(0,80), url: s, description: a.slice(0,120), contentUrl: s, encodingFormat: formatMap[ext] || "image/png" });
      c++;
    }
  });
  return results;
}

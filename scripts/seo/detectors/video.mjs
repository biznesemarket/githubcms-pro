export function detectVideoFromHtml($) {
  const results = [];
  $("iframe[src*='youtube.com'], iframe[src*='youtu.be'], iframe[src*='vimeo.com']").each((_, el) => {
    const u = $(el).attr("src");
    if (u) results.push({ "@context":"https://schema.org","@type":"VideoObject", name: "Video", description: "Embedded video", contentUrl: u, uploadDate: new Date().toISOString().slice(0,10) });
  });
  $("video[src]").each((_, el) => {
    const u = $(el).attr("src");
    if (u) results.push({ "@context":"https://schema.org","@type":"VideoObject", name: "Video", description: "Embedded video", contentUrl: u, uploadDate: new Date().toISOString().slice(0,10) });
  });
  return results;
}

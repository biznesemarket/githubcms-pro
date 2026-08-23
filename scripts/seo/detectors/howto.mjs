export function detectHowToFromHtml($) {
  const steps = [];
  $(".step-number").each((_, el) => {
    const num = $(el).text().trim();
    const container = $(el).closest("div").parent();
    const name = container.find("h3, h4").first().text().trim() || `Step ${num}`;
    const text = container.find("p").first().text().trim();
    if (name && text) steps.push({ name, text });
  });
  if (steps.length >= 3) {
    const titleMatch = $("h1, h2").first().text().trim();
    return { "@context": "https://schema.org", "@type": "HowTo", name: titleMatch || "Instructions", step: steps.map((s, i) => ({ "@type": "HowToStep", position: String(i + 1), name: s.name, text: s.text })) };
  }
  return null;
}

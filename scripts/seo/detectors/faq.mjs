export function detectFaqFromHtml($) {
  const items = [];

  // Pattern 1: Bootstrap accordion FAQ — [data-bs-toggle="collapse"] buttons
  $('[data-bs-toggle="collapse"]').each((_, btn) => {
    const target = $(btn).attr("data-bs-target") || $(btn).attr("href");
    if (!target) return;
    const q = $(btn).text().trim();
    const panel = $(target);
    const a = panel.find("p").first().text().trim();
    if (q && a && q.length > 5 && a.length > 10 && !items.some(i => i.question === q)) {
      items.push({ question: q, answer: a });
    }
  });

  // Pattern 2: Markdown **Q:** / **A:** rendered as <strong>Q:</strong>
  if (items.length < 3) {
    $("strong").each((_, el) => {
      const txt = $(el).text().trim();
      if (!/^Q:\s/i.test(txt)) return;
      const q = txt.replace(/^Q:\s*/i, "").trim();
      const nextP = $(el).parent().next("p").first();
      let a = "";
      if (nextP.length) {
        a = nextP.text().trim().replace(/^\s*\*\*A:\s*\*\*?\s*/i, "").trim();
      } else {
        const container = $(el).closest("section, div, p, li");
        const rest = container.text().replace(txt, "").trim();
        a = rest.replace(/^\s*\*\*A:\s*\*\*?\s*/i, "").slice(0, 500);
      }
      if (q && a && q.length > 5 && a.length > 15 && !items.some(i => i.question === q)) {
        items.push({ question: q, answer: a });
      }
    });
  }

  // Pattern 3: Section-based FAQ with h3/h4 + p pairs
  if (items.length < 3) {
    const faqSection = $("#faq");
    if (faqSection.length) {
      faqSection.find("h3, h4, strong").each((_, el) => {
        const q = $(el).text().trim();
        if (q.length < 5 || q.length > 200) return;
        const nextP = $(el).next("p").first();
        if (!nextP.length) return;
        const a = nextP.text().trim();
        if (a.length < 15) return;
        if (items.some(i => i.question === q)) return;
        items.push({ question: q, answer: a });
      });
    }
  }

  // Pattern 4: Raw HTML Q: / A: patterns in section articles
  if (items.length < 3) {
    $("strong, b").each((_, el) => {
      const txt = $(el).text().trim();
      if (!/^Q:\s/i.test(txt)) return;
      const qContainer = $(el).parent();
      const qNext = qContainer.contents().filter((_, n) => n.type === "text").text().trim() || "";
      const q = (txt.replace(/^Q:\s*/i, "") + " " + qNext).trim();
      const aEl = qContainer.nextAll("p, div").first();
      if (!aEl.length) return;
      let aText = "";
      // Find next A: marker
      let current = aEl;
      while (current.length) {
        const aTxt = current.text().trim();
        if (/^A:\s/i.test(aTxt)) {
          aText = aTxt.replace(/^A:\s*/i, "").trim();
          break;
        }
        if (current.find("strong, b").length && /^A:\s/i.test(current.find("strong, b").text())) {
          aText = current.text().replace(/^A:\s*/i, "").trim();
          break;
        }
        current = current.next("p, div").first();
      }
      if (!aText) aText = aEl.text().trim();
      if (q && aText && q.length > 5 && aText.length > 15 && !items.some(i => i.question === q)) {
        items.push({ question: q, answer: aText });
      }
    });
  }

  return items.length >= 3 ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) } : null;
}

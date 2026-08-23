export function detectMethodologyFromHtml(text, siteName) {
  if (!/(методолог|methodology|как мы |how we |источник|первичный опыт)/i.test(text)) return null;
  const mm = text.match(/(?:методология|methodology|как мы (?:это |проверя|созда|исследу))[:\s]+([^.<]{30,300})/i);
  if (!mm) return null;
  return { "@context":"https://schema.org","@type":"ScholarlyArticle", name: siteName, methodology: mm[1].trim(), inLanguage: "ru" };
}

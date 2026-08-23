export function detectPlanActionFromHtml(text) {
  const phases = [];
  const re = /(?:Phase\s+|Этап\s+|Q[1-4]\s*[-–]\s*Q[1-4]\s*)(\d{4})?[:\s]*([^<]{10,80})/gi; let m;
  while ((m = re.exec(text)) !== null) {
    if (m[2]?.trim().length > 5) phases.push({ phase: m[2].trim(), period: m[1] || new Date().getFullYear().toString(), actions: m[2].trim(), results: "Planned" });
  }
  if (phases.length >= 2) return { "@context":"https://schema.org","@type":"PlanAction", name: "Roadmap", step: phases.map((p,i) => ({ "@type":"OrganizeAction", position: i+1, name: p.phase, startTime: p.period, description: p.actions, result: p.results })) };
  return null;
}

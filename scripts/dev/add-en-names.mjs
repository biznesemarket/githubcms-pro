import { readFileSync, writeFileSync } from "fs";

const src = readFileSync("scripts/inject-seo.mjs", "utf8");

const enMap = {
  "galaxy-s25-ultra":"Galaxy S25 Ultra","macbook-air-m4":"MacBook Air M4","ipad-pro-m4":"iPad Pro M4","airpods-pro-3":"AirPods Pro 3","watch-ultra-2":"Watch Ultra 2","power-bank-20000":"Power Bank 20000mAh",
  "lg-side-by-side":"LG Side-by-Side Fridge","bosch-washing":"Bosch Serie 6 Washer","xiaomi-x10":"Xiaomi X10+ Robot Vacuum","samsung-microwave":"Samsung MG Microwave","electrolux-stove":"Electrolux Induction Stove","bosch-dishwasher":"Bosch SMV Dishwasher",
  "sofa-milan":"Milan Corner Sofa","table-loft":"Loft Dining Table","ergo-chair":"Ergo Pro Office Chair","wardrobe-premium":"Premium Wardrobe","bed-oslo":"Oslo Bed","dresser-scandi":"Scandi Dresser",
  "kettler-tr1":"Kettler TR1 Treadmill","trek-bike":"Trek X-Caliber Bike","salomon-tent":"Salomon 3-Person Tent","nike-zoom":"Nike Air Zoom Shoes","protein-on":"Optimum Nutrition Protein","garmin-venu":"Garmin Venu 3",
  "svetocopy-paper":"SvetoCopy A4 Paper","parker-jotter":"Parker Jotter Pen","desk-organizer":"Desk Organizer","hp-laserjet":"HP LaserJet M234","epson-projector":"Epson EB-X51 Projector","rexel-shredder":"Rexel Auto+ 100X Shredder",
};

let modified = src;
for (const [slug, enName] of Object.entries(enMap)) {
  // Find: "slug": {id:...,name:"Name",
  // Replace with: "slug": {id:...,name:"Name",enName:"EnName",
  const key = `"${slug}":`;
  const idx = modified.indexOf(key);
  if (idx < 0) { console.log(`NOT FOUND: ${slug}`); continue; }
  const nameMatch = modified.slice(idx).match(/name:"([^"]*)"/);
  if (!nameMatch) { console.log(`NO NAME: ${slug}`); continue; }
  const oldStr = `name:"${nameMatch[1]}"`;
  const newStr = `name:"${nameMatch[1]}",enName:"${enName}"`;
  modified = modified.slice(0, idx) + modified.slice(idx).replace(oldStr, newStr);
}

writeFileSync("scripts/inject-seo.mjs", modified);
console.log(`Modified ${Object.keys(enMap).length} products`);

import sanitizeHtml from "sanitize-html";

export const sanitizerOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "section", "article", "details", "summary", "button"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "rel"],
    img: ["src", "alt", "width", "height", "loading"],
    button: ["type", "data-bs-toggle", "data-bs-target", "data-slide", "data-target", "data-toggle", "aria-expanded", "aria-controls"],
    "*": ["id", "class", "style", "data-*", "aria-*"],
  },
  // Explicitly allow only https: and mailto: schemes on all URL attributes
  allowedSchemes: ["https", "mailto"],
  // Force rel="noopener noreferrer" on all links with target="_blank" behavior
  transformTags: {
    a: (tagName, attribs) => {
      if (attribs.target === "_blank") {
        attribs.rel = [attribs.rel, "noopener", "noreferrer"].filter(Boolean).join(" ");
        delete attribs.target;
      }
      return { tagName, attribs };
    },
  },
  allowedStyles: {
    "*": {
      // Colors — safe static values
      background: [/^#[0-9a-fA-F]{3,8}$/, /^rgba?\([\d,\s.]+\)$/, /^linear-gradient\(/, /^radial-gradient\(/, /^none$/],
      "background-color": [/^#[0-9a-fA-F]{3,8}$/, /^rgba?\([\d,\s.]+\)$/, /^transparent$/],
      // background-image: only data URIs and pixinlink.ru domain
      "background-image": [/^url\(['"]?data:image\//, /^url\(['"]?https:\/\/pixinlink\.ru\//, /^none$/, /^url\(['"]?https:\/\/placehold\.co\//],
      color: [/^#[0-9a-fA-F]{3,8}$/, /^rgba?\([\d,\s.]+\)$/, /^#fff$/, /^#ffffff$/],
      opacity: [/^[\d.]+$/],
      // Typography
      "font-size": [/^[\d.]+(px|rem|em|%)?$/],
      "font-weight": [/^[\d]+$/],
      // Dimensions
      width: [/^[\d.]+(px|%|rem|vw)?$/, /^auto$/, /^fit-content$/],
      height: [/^[\d.]+(px|%|rem|vh)?$/, /^auto$/, /^fit-content$/],
      "min-height": [/^[\d.]+(px|%|rem|vh)?$/],
      "min-width": [/^[\d.]+(px|%|rem|vw)?$/],
      "max-width": [/^[\d.]+(px|%|rem|vw)?$/],
      "max-height": [/^[\d.]+(px|%|rem|vh)?$/],
      // Spacing
      padding: [/^[\d.]+(px|rem|em|%)?(\s+[\d.]+(px|rem|em|%)?){0,3}$/],
      "padding-top": [/^[\d.]+(px|rem|em|%)?$/],
      "padding-right": [/^[\d.]+(px|rem|em|%)?$/],
      "padding-bottom": [/^[\d.]+(px|rem|em|%)?$/],
      "padding-left": [/^[\d.]+(px|rem|em|%)?$/],
      margin: [/^[\d.]+(px|rem|em|%)?(\s+[\d.]+(px|rem|em|%)?){0,3}$/, /^0 auto$/, /^auto$/],
      "margin-top": [/^[\d.]+(px|rem|em|%)?$/],
      "margin-right": [/^[\d.]+(px|rem|em|%)?$/],
      "margin-bottom": [/^[\d.]+(px|rem|em|%)?$/],
      "margin-left": [/^[\d.]+(px|rem|em|%)?$/],
      // Borders
      border: [/^[\d.]+(px)\s+(solid|dashed|dotted)\s+(#[0-9a-fA-F]{3,8}|rgba?\([\d,\s.]+\)|transparent)$/],
      "border-radius": [/^[\d.]+(px|%)?$/],
      "border-top": [/^[\d.]+(px)\s+(solid|dashed|dotted)\s+(#[0-9a-fA-F]{3,8}|rgba?\([\d,\s.]+\)|transparent)$/],
      "border-left": [/^[\d.]+(px)\s+(solid|dashed|dotted)\s+(#[0-9a-fA-F]{3,8}|rgba?\([\d,\s.]+\)|transparent)$/],
      "border-right": [/^[\d.]+(px)\s+(solid|dashed|dotted)\s+(#[0-9a-fA-F]{3,8}|rgba?\([\d,\s.]+\)|transparent)$/],
      "border-bottom": [/^[\d.]+(px)\s+(solid|dashed|dotted)\s+(#[0-9a-fA-F]{3,8}|rgba?\([\d,\s.]+\)|transparent)$/],
      // Layout — restricted positioning (no fixed/z-index overlay attacks)
      display: [/^(flex|grid|block|inline-block|inline-flex|inline|none)$/],
      flex: [/^[\d\s]*(px|rem|%)?(\s+[\d\s]*(px|rem|%)?){0,2}$/, /^1$/],
      "flex-basis": [/^[\d.]+(px|rem|%)?$/, /^auto$/],
      "flex-shrink": [/^[\d.]+$/],
      "flex-wrap": [/^(wrap|nowrap|wrap-reverse)$/],
      "flex-direction": [/^(row|column|row-reverse|column-reverse)$/],
      "grid-template-columns": [/^repeat\(/, /^[\d.]+(px|fr|rem|%)?(?:\s+[\d.]+(px|fr|rem|%)?)*$/, /^auto$/],
      "grid-template-rows": [/^[\d.]+(px|fr|rem|%)?(?:\s+[\d.]+(px|fr|rem|%)?)*$/],
      "grid-auto-flow": [/^(row|column|dense)$/],
      "align-items": [/^(center|flex-start|flex-end|stretch|baseline)$/],
      "justify-content": [/^(center|flex-start|flex-end|space-between|space-around|space-evenly)$/],
      gap: [/^[\d.]+(px|rem|%)?$/],
      // Positioning — only non-fixed, z-index capped
      position: [/^(relative|absolute|static|sticky)$/],
      top: [/^[\-\d.]+(px|rem|%)?$/],
      left: [/^[\-\d.]+(px|rem|%)?$/],
      right: [/^[\-\d.]+(px|rem|%)?$/],
      bottom: [/^[\-\d.]+(px|rem|%)?$/],
      "z-index": [/^\d{1,4}$/],
      overflow: [/^(hidden|auto|scroll|visible)$/],
      "object-fit": [/^(cover|contain|fill|none|scale-down)$/],
      "object-position": [/^[\d.]+(px|rem|%)?(\s+[\d.]+(px|rem|%)?)?$/],
      // Visual
      "box-shadow": [/^[\d\s.-]+(px)+\s+(#[0-9a-fA-F]{3,8}|rgba?\([\d,\s.]+\))$/],
      "text-align": [/^(left|center|right|justify)$/],
      "text-transform": [/^(uppercase|lowercase|capitalize|none)$/],
      "text-decoration": [/^(none|underline|line-through)$/],
      "letter-spacing": [/^[\d.]+(px|rem)?$/],
      "line-height": [/^[\d.]+$/],
      transition: [/^[\s\w\d.\-(),]+$/],
      transform: [/^(scale|translate|rotate)\(/, /^none$/],
      "backdrop-filter": [/^blur\(/],
      cursor: [/^(pointer|default|text|not-allowed)$/],
      "-webkit-background-clip": [/^(text|border-box|padding-box|content-box)$/],
      "-webkit-text-fill-color": [/^(#[0-9a-fA-F]{3,8}|rgba?\([\d,\s.]+\)|currentColor|inherit|initial)$/],
    },
  },
};

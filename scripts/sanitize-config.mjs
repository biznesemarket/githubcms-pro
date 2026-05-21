import sanitizeHtml from "sanitize-html";

export const sanitizerOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "section", "article"]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    a: ["href", "name", "target", "rel"],
    img: ["src", "alt", "width", "height", "loading"],
    "*": ["id", "class", "style"],
  },
  allowedStyles: {
    "*": {
      background: [/.*/], "background-color": [/.*/], "background-image": [/.*/],
      color: [/.*/], opacity: [/.*/], "font-size": [/.*/], "font-weight": [/.*/],
      width: [/.*/], height: [/.*/], "min-height": [/.*/], "min-width": [/.*/],
      "max-width": [/.*/], "max-height": [/.*/], padding: [/.*/], "padding-top": [/.*/],
      "padding-right": [/.*/], "padding-bottom": [/.*/], "padding-left": [/.*/],
      margin: [/.*/], "margin-top": [/.*/], "margin-right": [/.*/], "margin-bottom": [/.*/],
      "margin-left": [/.*/], border: [/.*/], "border-radius": [/.*/],
      "border-top": [/.*/], "border-left": [/.*/], "border-right": [/.*/], "border-bottom": [/.*/],
      display: [/.*/], flex: [/.*/], "flex-wrap": [/.*/], "flex-direction": [/.*/],
      "align-items": [/.*/], "justify-content": [/.*/], gap: [/.*/],
      position: [/.*/], top: [/.*/], left: [/.*/], right: [/.*/], bottom: [/.*/],
      "z-index": [/.*/], overflow: [/.*/], "object-fit": [/.*/], "object-position": [/.*/],
      "box-shadow": [/.*/], "text-align": [/.*/], "text-transform": [/.*/], "text-decoration": [/.*/],
      "letter-spacing": [/.*/], "line-height": [/.*/], transition: [/.*/],
      transform: [/.*/], "backdrop-filter": [/.*/], cursor: [/.*/],
      "-webkit-background-clip": [/.*/], "-webkit-text-fill-color": [/.*/],
    },
  },
};

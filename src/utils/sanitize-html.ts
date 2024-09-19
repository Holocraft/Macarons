import sanitizeHtml from "sanitize-html";

export default function sanitizeInput(input: string) {
  return sanitizeHtml(input, {
    allowedTags: [], // allow no tags
    allowedAttributes: {}, // allow no attributes
  });
}

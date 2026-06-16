const fs = require("fs");
const path = require("path");

module.exports = function () {
  const yamlPath = path.join(__dirname, "../../content/photography.yml");
  const raw = fs.readFileSync(yamlPath, "utf8");

  // Parse the simple YAML manually (no yaml dep)
  const photos = [];
  let current = null;
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- order:")) {
      if (current) photos.push(current);
      current = { order: parseInt(trimmed.replace("- order:", "").trim()) };
    } else if (current && trimmed.startsWith("image:")) {
      current.image = trimmed.replace("image:", "").trim().replace(/^"|"$/g, "");
    } else if (current && trimmed.startsWith("width:")) {
      current.width = trimmed.replace("width:", "").trim().replace(/^"|"$/g, "");
    } else if (current && trimmed.startsWith("caption:")) {
      current.caption = trimmed.replace("caption:", "").trim().replace(/^"|"$/g, "");
    }
  }
  if (current) photos.push(current);
  return photos.sort((a, b) => a.order - b.order);
};

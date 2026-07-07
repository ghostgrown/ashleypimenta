const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = function () {
  const yamlPath = path.join(__dirname, "../../content/illustration.yml");
  const raw = fs.readFileSync(yamlPath, "utf8");
  const data = yaml.load(raw) || {};
  const items = data.items || [];
  return items.slice().sort((a, b) => (a.order || 0) - (b.order || 0));
};

const fs = require("fs");
const path = require("path");

module.exports = function () {
  const dir = path.resolve(__dirname, "../../content/projects");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const projects = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf8");

    // Parse YAML frontmatter
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const fm = match[1];

    function getScalar(key) {
      const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?\\s*$`, "m"));
      return m ? m[1].trim() : "";
    }

    function getList(key) {
      // Match key: followed by lines starting with "  - "
      const block = fm.match(new RegExp(`^${key}:\\n((?:  - .*\\n?)*)`, "m"));
      if (!block) return [];
      return block[1].match(/  - "?([^"\n]*)"?/g)?.map((l) =>
        l.replace(/  - "?/, "").replace(/"?$/, "").trim()
      ) || [];
    }

    // Parse gallery items
    const galleryIdx = fm.indexOf('\ngallery:\n');
    const gallery = [];
    const galleryRaw = galleryIdx >= 0 ? fm.slice(galleryIdx + '\ngallery:\n'.length) : null;

    if (galleryRaw) {
      // Take lines that are indented (part of the gallery block)
      const galleryLines = galleryRaw.split('\n').filter(l => l === '' || l.startsWith(' '));
      const galleryBlock = galleryLines.join('\n');
      // Split by "  - type:"
      const itemBlocks = galleryBlock.split(/(?=  - type:)/);
      for (const block of itemBlocks) {
        if (!block.trim()) continue;
        const type = (block.match(/type:\s*(\w+)/) || [])[1];
        if (!type) continue;

        if (type === "image") {
          const image = (block.match(/image:\s*"([^"]*)"/) || [])[1] || "";
          const caption = (block.match(/caption:\s*"([^"]*)"/) || [])[1] || "";
          const width = (block.match(/width:\s*"([^"]*)"/) || [])[1] || "1-1";
          gallery.push({ type, image, caption, width });
        } else if (type === "slider") {
          const width = (block.match(/width:\s*"([^"]*)"/) || [])[1] || "1-1";
          const slides = [];
          const slideBlocks = block.split(/(?=      - image:)/);
          for (const sb of slideBlocks) {
            const img = (sb.match(/image:\s*"([^"]*)"/) || [])[1] || "";
            const cap = (sb.match(/caption:\s*"([^"]*)"/) || [])[1] || "";
            if (img) slides.push({ image: img, caption: cap });
          }
          gallery.push({ type, slides, width });
        } else if (type === "video") {
          const file = (block.match(/file:\s*"([^"]*)"/) || [])[1] || "";
          const width = (block.match(/width:\s*"([^"]*)"/) || [])[1] || "1-1";
          gallery.push({ type, file, width });
        }
      }
    }

    // Parse description block scalar (description: |\n  line1\n  line2)
    function getBlockScalar(key) {
      const idx = fm.indexOf(`\n${key}: |\n`);
      if (idx < 0) return "";
      const after = fm.slice(idx + `\n${key}: |\n`.length);
      const lines = after.split('\n');
      const bodyLines = [];
      for (const line of lines) {
        if (line === '' || line.startsWith('  ')) {
          bodyLines.push(line.startsWith('  ') ? line.slice(2) : '');
        } else {
          break;
        }
      }
      return bodyLines.join('\n').trimEnd();
    }

    // Parse links: array of {label, url} objects
    function getLinks() {
      const idx = fm.indexOf('\nlinks:\n');
      if (idx < 0) return [];
      const after = fm.slice(idx + '\nlinks:\n'.length);
      const lines = after.split('\n');
      const links = [];
      let current = null;
      for (const line of lines) {
        if (!line.startsWith('  ')) break;
        const itemMatch = line.match(/^  - label:\s*"([^"]*)"/);
        if (itemMatch) {
          if (current) links.push(current);
          current = { label: itemMatch[1], url: '' };
        }
        const urlMatch = line.match(/^    url:\s*"([^"]*)"/);
        if (urlMatch && current) current.url = urlMatch[1];
      }
      if (current) links.push(current);
      return links;
    }

    return {
      slug,
      title: getScalar("title"),
      subtitle: getScalar("subtitle"),
      order: parseInt(getScalar("order")) || 99,
      categories: getList("categories"),
      cover: getScalar("cover"),
      gallery,
      exploration: getScalar("exploration") === "true",
      hidden: getScalar("hidden") === "true",
      description: getBlockScalar("description"),
      links: getLinks(),
    };
  }).filter(Boolean);

  return projects.sort((a, b) => a.order - b.order);
};

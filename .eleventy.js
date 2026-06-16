module.exports = function (eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "uploads": "uploads" });

  // Portfolio projects collection — reads from content/projects/*.md
  eleventyConfig.addCollection("projects", function (collectionApi) {
    const path = require("path");
    const glob = path.resolve(__dirname, "content/projects/*.md");
    return collectionApi
      .getFilteredByGlob(glob)
      .sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
  });

  // Filter: get unique categories across all projects
  eleventyConfig.addFilter("allCategories", function (projects) {
    const cats = new Set();
    projects.forEach((p) => (p.data.categories || []).forEach((c) => cats.add(c)));
    return [...cats].sort();
  });

  // Filter: slugify a category for CSS data-attribute
  eleventyConfig.addFilter("catClass", function (cat) {
    return (cat || "").toLowerCase().replace(/[^a-z0-9]/g, "-");
  });

  // Filter: join categories as space-separated CSS-safe classes
  eleventyConfig.addFilter("catClasses", function (cats) {
    return (cats || []).map((c) => c.toLowerCase().replace(/[^a-z0-9]/g, "-")).join(" ");
  });

  // Filter: current year for footer
  eleventyConfig.addFilter("currentYear", function () {
    return new Date().getFullYear();
  });

  // Filter: convert newlines to <br> tags
  eleventyConfig.addFilter("nl2br", function (str) {
    if (!str) return "";
    return String(str).replace(/\n/g, "<br>");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

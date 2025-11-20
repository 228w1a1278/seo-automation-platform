const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://228w1a1278_db_user:Siva%4011111@cluster0.2xud4pp.mongodb.net/?appName=Cluster0";

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const Website = mongoose.model("Website", {
  url: String,
  meta: String,
  keywords: [String],
  traffic: Number,
  score: Number,
  verified: Boolean,
});

// GET all websites
app.get("/api/websites", async (req, res) => {
  const allSites = await Website.find();
  res.json(allSites);
});

// POST new website
app.post("/api/websites", async (req, res) => {
  const newSite = new Website(req.body);
  await newSite.save();
  res.json(newSite);
});

// DELETE website
app.delete("/api/websites/:id", async (req, res) => {
  const deleted = await Website.findByIdAndDelete(req.params.id);
  if (deleted) {
    res.json({ success: true, id: req.params.id });
  } else {
    res.status(404).json({ success: false, error: "Website not found" });
  }
});

// PUT verify website
app.put("/api/websites/:id/verify", async (req, res) => {
  const updated = await Website.findByIdAndUpdate(
    req.params.id,
    { verified: true },
    { new: true }
  );
  res.json(updated);
});

// POST sitemaps (mock/demo)
app.post("/api/sitemaps/:id", async (req, res) => {
  res.json({
    status: "ok",
    message: "Sitemap(s) saved!",
    sitemaps: req.body.sitemaps,
  });
});

// GET: trends (mock)
app.get("/api/trends/:url", (req, res) => {
  const decodedUrl = decodeURIComponent(req.params.url);
  res.json({
    keywords: ["AI", "SEO automation", "Google Trends"],
    freshness: Math.random() > 0.5 ? "Stale" : "Fresh",
    url: decodedUrl,
  });
});

// POST: meta suggestion (mock)
app.post("/api/meta", (req, res) => {
  const { url, keywords } = req.body;
  const meta = `Latest ${keywords.join(", ")} updates at ${url}`;
  res.json({ meta });
});

// POST: title suggestion (mock)
app.post("/api/title", (req, res) => {
  const { url, keywords } = req.body;
  const title = `${keywords[0]} News & Updates | ${url.replace(
    "https://",
    ""
  )}`;
  res.json({ title });
});

// GET: performance monitoring (mock)
app.get("/api/performance/:url", (req, res) => {
  const decodedUrl = decodeURIComponent(req.params.url);
  res.json({
    current: Math.floor(Math.random() * 1000) + 500,
    improved: Math.floor(Math.random() * 1200) + 800,
    url: decodedUrl,
  });
});

// POST: internal links (mock)
app.post("/api/internal-links", (req, res) => {
  res.json({
    links: [
      ["Home", "Blog"],
      ["Blog", "Contact"],
    ],
  });
});

// POST: snippet suggestion (mock)
app.post("/api/snippet", (req, res) => {
  res.json({
    snippet: `How does ${req.body.keywords[0]} improve SEO automation?`,
  });
});

// POST: schema generator (mock)
app.post("/api/schema", (req, res) => {
  res.json({
    schema: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: req.body.url,
      name: "Demo Site",
    },
  });
});

// GET: competitor trends (mock)
app.get("/api/competitor/:url", (req, res) => {
  res.json({
    keywords: ["marketing", "automation", "lead gen"],
    score: Math.floor(Math.random() * 100) + 20,
  });
});

// POST: voice search (mock)
app.post("/api/voice-search", (req, res) => {
  res.json({ voiceSnippet: `What is ${req.body.keywords[0]}?` });
});

// POST: image SEO (mock)
app.post("/api/image-seo", (req, res) => {
  res.json({ altTag: `${req.body.keywords[0]}: boost search visibility` });
});

// GET: core web vitals (mock)
app.get("/api/core-web-vitals/:url", (req, res) => {
  res.json({
    LCP: Math.round(Math.random() * 1000 + 1500),
    FID: Math.round(Math.random() * 50 + 10),
    CLS: Number((Math.random() * 0.15).toFixed(2)),
  });
});

// GET: local SEO trends (mock)
app.get("/api/local-trends/:city", (req, res) => {
  const trends = {
    Delhi: ["Best chai", "street food", "Temple tours"],
    Mumbai: ["Beach fun", "Bollywood", "Local trains"],
    London: ["Tea etiquette", "Pub culture", "Taxi hacks"],
    Default: ["Near me", "Open now", "Trending around you"],
  };
  const city = req.params.city;
  res.json({ keywords: trends[city] || trends.Default });
});

// GET: festival/holiday trends (mock)
app.get("/api/festival-trends/:region", (req, res) => {
  const region = req.params.region.toLowerCase();
  const trends = {
    india: ["Diwali gifts", "Holi colors", "Raksha Bandhan deals"],
    usa: ["Thanksgiving recipes", "Christmas sales", "Black Friday"],
    Default: ["Holiday offers", "Festival deals"],
  };
  res.json({ festivalKeywords: trends[region] || trends.Default });
});

// GET: geo-restricted content (mock)
app.get("/api/geo-restricted/:url", (req, res) => {
  const regions = [
    "US only",
    "India restricted",
    "UK available everywhere",
    "Blocked in EU",
  ];
  res.json({ geoInfo: regions[Math.floor(Math.random() * regions.length)] });
});

// GET: Google Search Console data (mock)
app.get("/api/gsc-data/:url", (req, res) => {
  res.json({
    clicks: 218,
    impressions: 1325,
    ctr: "16.5%",
    averagePosition: 7.1,
    verified: true,
    sitemaps: [
      "https://example.com/sitemap.xml",
      "https://example.com/sitemap-blog.xml",
    ],
  });
});

// GET: trend correlation report (mock)
app.get("/api/trend-correlation/:url", (req, res) => {
  res.json({
    report: [
      { keyword: "SEO tool", trafficBoost: 12 },
      { keyword: "automation", trafficBoost: 7 },
      { keyword: "schema markup", trafficBoost: 2 },
    ],
  });
});

// GET: content update suggestions (mock)
app.get("/api/content-update/:url", (req, res) => {
  res.json({
    suggestions: [
      { page: "Home", reason: "Stale content" },
      { page: "Blog", reason: "Missing trending keyword: AI" },
    ],
  });
});

app.listen(5000, () => console.log("API running on port 5000"));

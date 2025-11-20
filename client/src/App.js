import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [websites, setWebsites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [trend, setTrend] = useState(null);

  const [meta, setMeta] = useState("");
  const [showMeta, setShowMeta] = useState(false);

  const [title, setTitle] = useState("");
  const [showTitle, setShowTitle] = useState(false);

  const [links, setLinks] = useState([]);
  const [showLinks, setShowLinks] = useState(false);

  const [snippet, setSnippet] = useState("");
  const [showSnippet, setShowSnippet] = useState(false);

  const [schema, setSchema] = useState(null);
  const [showSchema, setShowSchema] = useState(false);

  const [competitor, setCompetitor] = useState(null);
  const [showCompetitor, setShowCompetitor] = useState(false);
  const [competitorUrl, setCompetitorUrl] = useState("");

  const [voice, setVoice] = useState("");
  const [showVoice, setShowVoice] = useState(false);

  const [altTag, setAltTag] = useState("");
  const [showAltTag, setShowAltTag] = useState(false);

  const [performance, setPerformance] = useState(null);
  const [coreVitals, setCoreVitals] = useState(null);

  const [localCity, setLocalCity] = useState("");
  const [localTrends, setLocalTrends] = useState([]);
  const [showLocalTrends, setShowLocalTrends] = useState(false);

  const [festivalRegion, setFestivalRegion] = useState("");
  const [festivalTrends, setFestivalTrends] = useState([]);
  const [showFestivalTrends, setShowFestivalTrends] = useState(false);

  const [geoInfo, setGeoInfo] = useState("");
  const [showGeoInfo, setShowGeoInfo] = useState(false);

  const [gscData, setGscData] = useState(null);
  const [showGsc, setShowGsc] = useState(false);

  const [sitemaps, setSitemaps] = useState("");
  const [sitemapMsg, setSitemapMsg] = useState("");
  const [trendCorr, setTrendCorr] = useState([]);
  const [showTrendCorr, setShowTrendCorr] = useState(false);

  const [updateSug, setUpdateSug] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  const [websiteUrl, setWebsiteUrl] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/websites")
      .then((res) => setWebsites(res.data));
  }, []);

  const handleSelect = (site) => {
    setSelected(site);
    axios
      .get(`http://localhost:5000/api/trends/${encodeURIComponent(site.url)}`)
      .then((res) => setTrend(res.data));
    axios
      .get(
        `http://localhost:5000/api/performance/${encodeURIComponent(site.url)}`
      )
      .then((res) => setPerformance(res.data));
    axios
      .get(
        `http://localhost:5000/api/core-web-vitals/${encodeURIComponent(
          site.url
        )}`
      )
      .then((res) => setCoreVitals(res.data));
    setMeta("");
    setShowMeta(false);
    setTitle("");
    setShowTitle(false);
    setLinks([]);
    setShowLinks(false);
    setSnippet("");
    setShowSnippet(false);
    setSchema(null);
    setShowSchema(false);
    setCompetitor(null);
    setShowCompetitor(false);
    setCompetitorUrl("");
    setVoice("");
    setShowVoice(false);
    setAltTag("");
    setShowAltTag(false);
    setLocalTrends([]);
    setShowLocalTrends(false);
    setFestivalTrends([]);
    setShowFestivalTrends(false);
    setGeoInfo("");
    setShowGeoInfo(false);
    setGscData(null);
    setShowGsc(false);
    setSitemaps("");
    setSitemapMsg("");
    setTrendCorr([]);
    setShowTrendCorr(false);
    setUpdateSug([]);
    setShowUpdate(false);
  };

  const handleAddWebsite = () => {
    if (!websiteUrl) return;
    axios
      .post("http://localhost:5000/api/websites", {
        url: websiteUrl,
        meta: "",
        keywords: [],
        traffic: 0,
        score: 0,
        verified: false,
      })
      .then((res) => {
        setWebsites([...websites, res.data]);
        setWebsiteUrl("");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-teal-100 flex flex-col items-center py-8 px-2">
      <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-8 tracking-tight">
        SEO Automation Platform
      </h1>

      {/* Add Site */}
      <div className="flex items-center gap-3 mb-8 p-4 bg-white rounded-2xl shadow-xl max-w-xl w-full">
        <input
          type="text"
          placeholder="https://yourwebsite.com"
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-lg transition-all duration-150"
        />
        <button
          onClick={handleAddWebsite}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-xl active:scale-95 transition duration-150"
        >
          Add Site
        </button>
      </div>

      {/* Websites List + Delete Mode */}
      <div className="mb-8 max-w-xl w-full">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Websites</h2>
        <div className="flex flex-wrap gap-3 mt-2">
          {websites.map((site) => (
            <button
              key={site._id}
              onClick={() => {
                if (deleteMode) {
                  if (
                    window.confirm(`Delete ${site.url}? This cannot be undone.`)
                  ) {
                    axios
                      .delete(`http://localhost:5000/api/websites/${site._id}`)
                      .then((res) => {
                        setWebsites(websites.filter((w) => w._id !== site._id));
                        if (selected && selected._id === site._id)
                          setSelected(null);
                      });
                  }
                } else {
                  if (selected && selected._id === site._id) {
                    setSelected(null);
                    setTrend(null);
                    setPerformance(null);
                    setCoreVitals(null);
                    setMeta("");
                    setShowMeta(false);
                    setTitle("");
                    setShowTitle(false);
                    setLinks([]);
                    setShowLinks(false);
                    setSnippet("");
                    setShowSnippet(false);
                    setSchema(null);
                    setShowSchema(false);
                    setCompetitor(null);
                    setShowCompetitor(false);
                    setCompetitorUrl("");
                    setVoice("");
                    setShowVoice(false);
                    setAltTag("");
                    setShowAltTag(false);
                    setLocalTrends([]);
                    setShowLocalTrends(false);
                    setFestivalTrends([]);
                    setShowFestivalTrends(false);
                    setGeoInfo("");
                    setShowGeoInfo(false);
                    setGscData(null);
                    setShowGsc(false);
                    setSitemaps("");
                    setSitemapMsg("");
                    setTrendCorr([]);
                    setShowTrendCorr(false);
                    setUpdateSug([]);
                    setShowUpdate(false);
                  } else {
                    handleSelect(site);
                  }
                }
              }}
              className={`py-2 px-4 rounded-xl border shadow-xl transition-all duration-150 font-semibold ${
                selected && selected._id === site._id
                  ? "bg-blue-100 border-blue-500 font-bold text-blue-700"
                  : deleteMode
                  ? "border-red-500 text-red-700 bg-red-50 hover:bg-red-100"
                  : "bg-white border-gray-200 hover:bg-blue-50 text-gray-700"
              }`}
              title={deleteMode ? "Delete Website" : "Select Website"}
            >
              {site.url}
              {deleteMode && <span className="ml-2 text-red-500">🗑️</span>}
            </button>
          ))}
        </div>
        <div className="mt-8">
          <button
            onClick={() => setDeleteMode(!deleteMode)}
            className={`w px-4 py-2 rounded-xl active:scale-95 ${
              deleteMode
                ? "bg-red-600 text-white"
                : "bg-white border border-red-500 text-red-500 hover:bg-red-50"
            } font-bold shadow-xl transition duration-150`}
          >
            {deleteMode ? "Exit Delete Mode" : "Delete a Website"}
          </button>
        </div>
      </div>

      {/* Selected Site Feature Panel */}
      {selected && (
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 mb-12 hover:shadow-3xl transition-shadow duration-200">
          <h3 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-3">
            Selected:{" "}
            <span className="text-blue-700 break-all">{selected.url}</span>
            <span
              className={`inline-block text-xs rounded-full px-2 py-1 ${
                selected.verified
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {selected.verified ? "✔ Verified" : "Unverified"}
            </span>
          </h3>

          {trend && (
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 rounded-2xl shadow-xl transition-all duration-300">
                <span className="font-semibold text-blue-800">
                  Trending keywords:
                </span>{" "}
                {trend.keywords.join(", ")}
              </div>
              <div className="bg-teal-50 border-l-4 border-teal-400 px-4 py-3 rounded-2xl shadow-xl transition-all duration-300">
                <span className="font-semibold text-teal-800">
                  Content freshness:
                </span>{" "}
                {trend.freshness}
              </div>
            </div>
          )}

          <h4 className="font-semibold text-xl text-blue-700 mt-8 mb-3 border-b pb-1">
            SEO Actions
          </h4>
          <div className="grid grid-cols-2 gap-4 my-6">
            {/* Meta Description */}
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showMeta ? "ring-2 ring-blue-300" : ""
              }`}
              onClick={() => {
                if (showMeta) {
                  setShowMeta(false);
                  setMeta("");
                } else {
                  axios
                    .post("http://localhost:5000/api/meta", {
                      url: selected.url,
                      keywords: trend.keywords,
                    })
                    .then((res) => setMeta(res.data.meta));
                  setShowMeta(true);
                }
              }}
            >
              {showMeta ? "Hide Meta" : "Suggest Meta Description"}
            </button>
            {/* Title Tag */}
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showTitle ? "ring-2 ring-blue-300" : ""
              }`}
              onClick={() => {
                if (showTitle) {
                  setShowTitle(false);
                  setTitle("");
                } else {
                  axios
                    .post("http://localhost:5000/api/title", {
                      url: selected.url,
                      keywords: trend.keywords,
                    })
                    .then((res) => setTitle(res.data.title));
                  setShowTitle(true);
                }
              }}
            >
              {showTitle ? "Hide Title" : "Suggest Title Tag"}
            </button>
            {/* Internal Links */}
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showLinks ? "ring-2 ring-blue-300" : ""
              }`}
              onClick={() => {
                if (showLinks) {
                  setShowLinks(false);
                  setLinks([]);
                } else {
                  axios
                    .post("http://localhost:5000/api/internal-links", {
                      url: selected.url,
                    })
                    .then((res) => setLinks(res.data.links));
                  setShowLinks(true);
                }
              }}
            >
              {showLinks ? "Hide Links" : "Internal Links"}
            </button>
            {/* Featured Snippet */}
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showSnippet ? "ring-2 ring-blue-300" : ""
              }`}
              onClick={() => {
                if (showSnippet) {
                  setShowSnippet(false);
                  setSnippet("");
                } else {
                  axios
                    .post("http://localhost:5000/api/snippet", {
                      keywords: trend.keywords,
                    })
                    .then((res) => setSnippet(res.data.snippet));
                  setShowSnippet(true);
                }
              }}
            >
              {showSnippet ? "Hide Snippet" : "Featured Snippet"}
            </button>
            {/* Schema */}
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showSchema ? "ring-2 ring-blue-300" : ""
              }`}
              onClick={() => {
                if (showSchema) {
                  setShowSchema(false);
                  setSchema(null);
                } else {
                  axios
                    .post("http://localhost:5000/api/schema", {
                      url: selected.url,
                    })
                    .then((res) => setSchema(res.data.schema));
                  setShowSchema(true);
                }
              }}
            >
              {showSchema ? "Hide Schema" : "Generate Schema"}
            </button>
          </div>

          {/* Outputs: meta/title/links/snippet/schema */}
          {showMeta && meta && (
            <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-blue-800">
                Suggested Meta:
              </span>{" "}
              {meta}
            </div>
          )}
          {showTitle && title && (
            <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-blue-800">
                Suggested Title:
              </span>{" "}
              {title}
            </div>
          )}
          {showLinks && links.length > 0 && (
            <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-blue-800">
                Internal Links:
              </span>{" "}
              {links.map(([a, b], i) => (
                <span key={i}>
                  {a} → {b};{" "}
                </span>
              ))}
            </div>
          )}
          {showSnippet && snippet && (
            <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-blue-800">
                Featured Snippet:
              </span>{" "}
              {snippet}
            </div>
          )}
          {showSchema && schema && (
            <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-blue-800">Schema:</span>
              <pre className="text-xs">{JSON.stringify(schema, null, 2)}</pre>
            </div>
          )}

          {/* Competitor */}
          <h4 className="font-semibold text-xl text-teal-700 mt-10 mb-3 border-b pb-1">
            Competitors & SEO Panel
          </h4>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Competitor URL"
              value={competitorUrl}
              onChange={(e) => setCompetitorUrl(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition flex-1"
            />
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showCompetitor ? "ring-2 ring-blue-300" : ""
              }`}
              onClick={() => {
                if (showCompetitor) {
                  setShowCompetitor(false);
                  setCompetitor(null);
                } else {
                  if (!competitorUrl) return;
                  axios
                    .get(
                      "http://localhost:5000/api/competitor/" +
                        encodeURIComponent(competitorUrl)
                    )
                    .then((res) => setCompetitor(res.data));
                  setShowCompetitor(true);
                }
              }}
            >
              {showCompetitor ? "Hide Competitor" : "Check Competitor"}
            </button>
          </div>
          {showCompetitor && competitor && (
            <div className="bg-teal-50 border-l-4 border-teal-400 px-4 py-3 mt-2 rounded-2xl shadow-xl">
              <b>Competitor Keywords:</b> {competitor.keywords.join(", ")}
              <br />
              <b>Competitor Score:</b> {competitor.score}
            </div>
          )}

          {/* Voice & Image SEO */}
          <div className="grid grid-cols-2 gap-4 my-5">
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showVoice ? "ring-2 ring-blue-300" : ""
              }`}
              onClick={() => {
                if (showVoice) {
                  setShowVoice(false);
                  setVoice("");
                } else {
                  axios
                    .post("http://localhost:5000/api/voice-search", {
                      keywords: trend.keywords,
                    })
                    .then((res) => setVoice(res.data.voiceSnippet));
                  setShowVoice(true);
                }
              }}
            >
              {showVoice ? "Hide Voice" : "Voice Search Suggestion"}
            </button>
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showAltTag ? "ring-2 ring-blue-300" : ""
              }`}
              onClick={() => {
                if (showAltTag) {
                  setShowAltTag(false);
                  setAltTag("");
                } else {
                  axios
                    .post("http://localhost:5000/api/image-seo", {
                      keywords: trend.keywords,
                    })
                    .then((res) => setAltTag(res.data.altTag));
                  setShowAltTag(true);
                }
              }}
            >
              {showAltTag ? "Hide Alt Tag" : "Image Alt Tag Suggestion"}
            </button>
          </div>
          {showVoice && voice && (
            <div className="bg-purple-50 border-l-4 border-purple-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-purple-800">
                Voice Snippet:
              </span>{" "}
              {voice}
            </div>
          )}
          {showAltTag && altTag && (
            <div className="bg-purple-50 border-l-4 border-purple-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-purple-800">
                Image Alt Tag:
              </span>{" "}
              {altTag}
            </div>
          )}

          {/* Performance */}
          {performance && (
            <div className="bg-green-50 border-l-4 border-green-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <b>Current traffic:</b> {performance.current} <br />
              <b>Expected after Optimization:</b> {performance.improved}
            </div>
          )}
          {coreVitals && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-yellow-700">
                Core Web Vitals:
              </span>
              <br />
              LCP: {coreVitals.LCP} ms <br />
              FID: {coreVitals.FID} ms <br />
              CLS: {coreVitals.CLS}
              <div className="text-xs mt-1">
                {coreVitals.LCP < 2500 ? "✅ Good" : "⚠ Needs improvement"}
                <br />
                {coreVitals.FID < 100 ? "✅ Good" : "⚠ Needs improvement"}
                <br />
                {coreVitals.CLS < 0.1 ? "✅ Good" : "⚠ Needs improvement"}
              </div>
            </div>
          )}

          <h4 className="font-semibold text-xl text-green-700 mt-10 mb-3 border-b pb-1">
            Local SEO & Festival Trends
          </h4>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={localCity}
              onChange={(e) => setLocalCity(e.target.value)}
              placeholder="Enter city name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 transition flex-1"
            />
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showLocalTrends ? "ring-2 ring-green-300" : ""
              }`}
              onClick={() => {
                if (showLocalTrends) {
                  setShowLocalTrends(false);
                  setLocalTrends([]);
                } else {
                  axios
                    .get(`http://localhost:5000/api/local-trends/${localCity}`)
                    .then((res) => setLocalTrends(res.data.keywords));
                  setShowLocalTrends(true);
                }
              }}
            >
              {showLocalTrends ? "Hide Local Trends" : "Get Local Trends"}
            </button>
          </div>
          {showLocalTrends && localTrends.length > 0 && (
            <div className="bg-green-50 border-l-4 border-green-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-green-800">
                Popular local keywords:
              </span>{" "}
              {localTrends.join(", ")}
            </div>
          )}

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={festivalRegion}
              onChange={(e) => setFestivalRegion(e.target.value)}
              placeholder="Enter region (e.g., India, USA)"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 transition flex-1"
            />
            <button
              className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showFestivalTrends ? "ring-2 ring-orange-300" : ""
              }`}
              onClick={() => {
                if (showFestivalTrends) {
                  setShowFestivalTrends(false);
                  setFestivalTrends([]);
                } else {
                  axios
                    .get(
                      `http://localhost:5000/api/festival-trends/${festivalRegion}`
                    )
                    .then((res) =>
                      setFestivalTrends(res.data.festivalKeywords)
                    );
                  setShowFestivalTrends(true);
                }
              }}
            >
              {showFestivalTrends ? "Hide Festival Trends" : "Get Trends"}
            </button>
          </div>
          {showFestivalTrends && festivalTrends.length > 0 && (
            <div className="bg-orange-50 border-l-4 border-orange-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
              <span className="font-semibold text-orange-800">
                Current season keywords:
              </span>{" "}
              {festivalTrends.join(", ")}
            </div>
          )}

          {/* Geo-restriction */}
          <div className="mt-6">
            <button
              className={`bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showGeoInfo ? "ring-2 ring-purple-300" : ""
              }`}
              onClick={() => {
                if (showGeoInfo) {
                  setShowGeoInfo(false);
                  setGeoInfo("");
                } else {
                  axios
                    .get(
                      `http://localhost:5000/api/geo-restricted/${encodeURIComponent(
                        selected.url
                      )}`
                    )
                    .then((res) => setGeoInfo(res.data.geoInfo));
                  setShowGeoInfo(true);
                }
              }}
            >
              {showGeoInfo ? "Hide Geo" : "Check Geo-Restriction"}
            </button>
            {showGeoInfo && geoInfo && (
              <div className="bg-purple-50 border-l-4 border-purple-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
                <span className="font-semibold text-purple-800">Geo Info:</span>{" "}
                {geoInfo}
              </div>
            )}
          </div>

          {/* Google Search Console Panel */}
          <div className="mt-6">
            <button
              className={`bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showGsc ? "ring-2 ring-teal-300" : ""
              }`}
              onClick={() => {
                if (showGsc) {
                  setShowGsc(false);
                  setGscData(null);
                } else {
                  axios
                    .get(
                      `http://localhost:5000/api/gsc-data/${encodeURIComponent(
                        selected.url
                      )}`
                    )
                    .then((res) => setGscData(res.data));
                  setShowGsc(true);
                }
              }}
            >
              {showGsc ? "Hide GSC" : "Google Search Console (Demo)"}
            </button>
            {showGsc && gscData && (
              <div className="bg-teal-50 border-l-4 border-teal-400 px-4 py-3 my-2 rounded-2xl shadow-xl">
                <b>Search Console Data (Demo):</b>
                <br />
                Site Verified: {gscData.verified ? "Yes" : "No"}
                <br />
                Clicks: {gscData.clicks}
                <br />
                Impressions: {gscData.impressions}
                <br />
                CTR: {gscData.ctr}
                <br />
                Avg. Position: {gscData.averagePosition}
                <br />
                Sitemaps:{" "}
                {gscData.sitemaps.map((sm, i) => (
                  <div key={i}>{sm}</div>
                ))}
              </div>
            )}
          </div>

          {/* Verify & Sitemaps */}
          <h4 className="font-semibold text-xl text-blue-700 mt-10 mb-3 border-b pb-1">
            Site Verification
          </h4>
          <div className="flex flex-row gap-4 flex-wrap items-center">
            {!selected.verified && (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition"
                onClick={() => {
                  axios
                    .put(
                      `http://localhost:5000/api/websites/${selected._id}/verify`
                    )
                    .then((res) => {
                      setSelected({ ...selected, verified: true });
                      setWebsites(
                        websites.map((w) =>
                          w._id === selected._id ? { ...w, verified: true } : w
                        )
                      );
                    });
                }}
              >
                Verify Site (Demo)
              </button>
            )}
            {selected.verified && (
              <span className="text-green-700 font-bold">Site verified!</span>
            )}
            <input
              type="text"
              placeholder="Paste sitemap URLs separated by commas"
              value={sitemaps}
              onChange={(e) => setSitemaps(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition"
              onClick={() => {
                axios
                  .post(`http://localhost:5000/api/sitemaps/${selected._id}`, {
                    sitemaps: sitemaps.split(",").map((str) => str.trim()),
                  })
                  .then((res) => setSitemapMsg(res.data.message));
              }}
            >
              Submit Sitemaps (Demo)
            </button>
            {sitemapMsg && (
              <span className="text-blue-700 font-bold">{sitemapMsg}</span>
            )}
          </div>

          {/* Trend Correlation Report */}
          <h4 className="font-semibold text-xl text-pink-700 mt-10 mb-3 border-b pb-1">
            Trend Correlation Report & Content Updates
          </h4>
          <div className="mt-2">
            <button
              className={`bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showTrendCorr ? "ring-2 ring-pink-300" : ""
              }`}
              onClick={() => {
                if (showTrendCorr) {
                  setShowTrendCorr(false);
                  setTrendCorr([]);
                } else {
                  axios
                    .get(
                      `http://localhost:5000/api/trend-correlation/${encodeURIComponent(
                        selected.url
                      )}`
                    )
                    .then((res) => setTrendCorr(res.data.report));
                  setShowTrendCorr(true);
                }
              }}
            >
              {showTrendCorr ? "Hide Trend" : "Trend Correlation Report"}
            </button>
            {showTrendCorr && trendCorr.length > 0 && (
              <table className="w-full mt-3 text-left bg-pink-50 rounded-xl shadow-xl">
                <thead>
                  <tr className="text-pink-800 font-bold">
                    <th className="py-2 px-3">Keyword</th>
                    <th className="py-2 px-3">Traffic Boost (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {trendCorr.map((r, i) => (
                    <tr
                      key={i}
                      className={i % 2 === 0 ? "bg-white" : "bg-pink-100"}
                    >
                      <td className="py-2 px-3">{r.keyword}</td>
                      <td className="py-2 px-3">{r.trafficBoost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Content Update Suggestions */}
          <div className="mt-4">
            <button
              className={`bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow-xl active:scale-95 transition ${
                showUpdate ? "ring-2 ring-indigo-300" : ""
              }`}
              onClick={() => {
                if (showUpdate) {
                  setShowUpdate(false);
                  setUpdateSug([]);
                } else {
                  axios
                    .get(
                      `http://localhost:5000/api/content-update/${encodeURIComponent(
                        selected.url
                      )}`
                    )
                    .then((res) => setUpdateSug(res.data.suggestions));
                  setShowUpdate(true);
                }
              }}
            >
              {showUpdate ? "Hide Updates" : "Content Update Suggestions"}
            </button>
            {showUpdate && updateSug.length > 0 && (
              <ul className="mt-2 bg-indigo-50 border-l-4 border-indigo-400 px-4 py-3 rounded-xl shadow-xl">
                {updateSug.map((s, i) => (
                  <li key={i}>
                    <b>{s.page}:</b> {s.reason}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;

/**
 * Hugging Face Proxy Function
 * Securely calls the Hugging Face Inference API from the server.
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 10 });

// Helper: basic CORS handling for browser requests
function setCors(res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
}

exports.hfProxy = onRequest(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { inputs, parameters, options } = req.body || {};
    if (!inputs || typeof inputs !== "string") {
      return res.status(400).json({ error: "Missing 'inputs' string in body" });
    }

    const hfApiKey = process.env.HF_API_KEY;
    const hfModel = process.env.HF_MODEL || "Swasti2004/results";

    if (!hfApiKey) {
      logger.error("HF_API_KEY not set in environment");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const hfResponse = await fetch(`https://api-inference.huggingface.co/models/${hfModel}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs, parameters, options }),
    });

    const text = await hfResponse.text();
    const contentType = hfResponse.headers.get("content-type") || "application/json";
    res.setHeader("content-type", contentType);

    if (!hfResponse.ok) {
      logger.error("Hugging Face API error", { status: hfResponse.status, body: text });
      return res.status(hfResponse.status).send(text);
    }

    return res.status(200).send(text);
  } catch (err) {
    logger.error("hfProxy failed", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

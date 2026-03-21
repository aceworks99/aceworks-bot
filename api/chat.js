const { GoogleGenerativeAI } = require("@google/generative-ai");

// ── Your API keys (add in Vercel environment variables) ──
const API_KEYS = [
  process.env.GEMINI_KEY_1,
  process.env.GEMINI_KEY_2,
];

let currentKey = 0;

// ── Client configs — add new client here ──
const CLIENTS = {
  // Client 1 — replace with real info when you get a client
  "demo": {
    name: "Demo Store",
    email: "help@demostore.com",
    prompt: `You are an AI receptionist for Demo Store — an online shop.
Your job:
- Answer questions about products, shipping and returns
- Help customers find what they need  
- Be friendly, helpful and concise
- If you don't know something say: "Great question! Email us at help@demostore.com and we'll help."
Keep replies short and natural. Never make up information.`
  },

  // Add more clients like this:
  // "clientid": {
  //   name: "Store Name",
  //   email: "help@store.com",
  //   prompt: `You are an AI receptionist for Store Name...`
  // },
};

// ── Main handler ──
module.exports = async (req, res) => {
  // Allow requests from any website (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, clientId } = req.body;

  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  // Get client config — default to demo if not found
  const client = CLIENTS[clientId] || CLIENTS["demo"];

  // Try each API key
  for (let attempt = 0; attempt < API_KEYS.length; attempt++) {
    try {
      const key = API_KEYS[currentKey];

      if (!key) {
        currentKey = (currentKey + 1) % API_KEYS.length;
        continue;
      }

      const genAI = new GoogleGenerativeAI(key);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: client.prompt,
      });

      const result = await model.generateContent(message);
      const reply = result.response.text();

      return res.status(200).json({ reply });

    } catch (error) {
      console.log(`Key ${currentKey + 1} failed: ${error.message}`);
      currentKey = (currentKey + 1) % API_KEYS.length;
    }
  }

  // All keys failed
  return res.status(500).json({
    reply: `Sorry, having trouble right now. Please email us at ${client.email}`
  });
};

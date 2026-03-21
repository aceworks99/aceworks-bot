# aceworks. AI Bot — Setup Guide

## Folder Structure
```
aceworks_bot/
├── api/
│   └── chat.js          ← Bot brain (Gemini API)
├── public/
│   ├── bot.js           ← Chat widget (what clients use)
│   └── test.html        ← Test page
├── package.json
├── vercel.json
└── README.md
```

---

## Step 1 — Install Node.js
- Go to nodejs.org
- Download LTS version
- Install (tick "Add to PATH")
- Check: node --version

## Step 2 — Install dependencies
Open Command Prompt in this folder and run:
```
npm install
```

## Step 3 — Set up GitHub
1. Go to github.com — create free account
2. Create new repository called "aceworks-bot"
3. Upload all these files to it

## Step 4 — Deploy to Vercel
1. Go to vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your "aceworks-bot" repository
5. Click Deploy

## Step 5 — Add API Keys in Vercel
1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add:
   - GEMINI_KEY_1 = your first API key
   - GEMINI_KEY_2 = your second API key
4. Redeploy

## Step 6 — Update bot.js URL
In public/bot.js, replace:
```
const BOT_API_URL = "https://YOUR_VERCEL_URL.vercel.app/api/chat";
```
With your actual Vercel URL.

## Step 7 — Test it
Open test.html in browser — chat bubble should appear!

---

## Adding a New Client

In api/chat.js, add to the CLIENTS object:
```js
"clientid": {
  name: "Store Name",
  email: "help@store.com",
  prompt: `You are an AI receptionist for Store Name...`
}
```

Then give client this script tag:
```html
<script
  src="https://YOUR_VERCEL_URL.vercel.app/bot.js"
  data-client="clientid">
</script>
```

Done! New client live in 10 minutes.

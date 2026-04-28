# Pantry App — Salt Fat Acid Heat
### A smart grocery tracker for 2 people in Cleveland, OH

---

## What this is
A PWA (Progressive Web App) you can add to your iPhone or Android home screen. It tracks your pantry status, protein rotation, and shopping trip history — and lets you ask Claude AI for a pre-shop brief anytime.

---

## Deploy to Vercel (takes ~10 minutes)

### Step 1 — Get your Anthropic API key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up or log in
3. Go to **API Keys** → **Create Key**
4. Copy the key — you'll need it in Step 4

### Step 2 — Put this code on GitHub
1. Go to [github.com](https://github.com) and create a free account if you don't have one
2. Click **New repository** → name it `pantry-app` → **Create repository**
3. Upload all files from this folder to the repository (drag and drop works)

### Step 3 — Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **Add New Project**
3. Import your `pantry-app` repository
4. Click **Deploy** — Vercel auto-detects the settings

### Step 4 — Add your API key
1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your key from Step 1
3. Click **Save** → go to **Deployments** → **Redeploy**

### Step 5 — Add to your phone home screen
1. Open your Vercel URL on your iPhone (e.g. `pantry-app.vercel.app`)
2. Tap the **Share** button (box with arrow) → **Add to Home Screen**
3. Tap **Add**

Your pantry app now lives on your home screen like a native app.

---

## How to use it

**Before every grocery trip:**
1. Open the app → tap **Ask Claude**
2. Tap **Pre-shop brief**
3. Claude reads your pantry status and rotation history and tells you exactly what to buy

**After each trip:**
1. Tap **Trips** → log what you bought and the cost
2. Tap **Rotation** → update the weekly log

**Updating pantry status:**
- Tap **Pantry** → tap ✅ / ⚠️ / ❌ on any item

---

## Cost
- Vercel: **free**
- Anthropic API: **~$0.01–0.05 per conversation** (fractions of a cent per pre-shop brief)

---

## Files in this project
```
pantry-app/
├── api/
│   └── chat.js          ← Claude AI endpoint (serverless function)
├── public/
│   ├── index.html       ← The full app
│   ├── manifest.json    ← PWA config
│   └── sw.js            ← Service worker (offline support)
├── package.json
├── vercel.json          ← Routing config
└── README.md
```

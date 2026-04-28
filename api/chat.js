import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a smart grocery assistant for a 2-person household in Cleveland, OH following the Salt Fat Acid Heat framework by Samin Nosrat. 

You have deep knowledge of their meal plan:
- Fixed pantry staples (kosher salt, olive oil, butter, soy sauce, canned tomatoes, pasta, rice, chickpeas, lentils, stock, vinegars)
- Weekly protein rotation: Chicken thighs → Salmon → Ground beef/turkey → Pantry week (eggs + legumes)
- Acid/dairy rotation: Parmesan+lemons → Yogurt+capers → Feta+red wine vinegar → Lemons only
- Always buy fresh each trip: garlic (2 heads), yellow onions (3-4), lemons (6-8), carrots, celery
- Spring produce in Cleveland: spinach, arugula, Swiss chard, kale, pea shoots
- Budget: ~$150/week for 2 people. Pantry weeks run ~$40-50.

The four SFAH pillars: Salt (enhances flavor), Fat (carries flavor, richness), Acid (brightens, balances), Heat (technique)

Key cooking tips:
- Chicken thighs: 425°F, skin-side up, 35-40 min, don't touch them
- Salmon: don't move once it hits the pan, flip once after ~4 min
- Ground meat: brown in batches, don't crowd, add vinegar at end
- Lentil soup: lemon right before serving is non-negotiable
- Frittata: set edges stovetop, finish at 375°F 10-12 min

Money-saving rules: buy whole not pre-cut, pantry first, acid is the secret, season in layers.

When given pantry status and rotation history, provide:
1. Clear shopping list organized by category
2. Which protein to buy this week and why (based on rotation)
3. What meals they can cook with this week's haul
4. Any pantry items to restock
5. Estimated total cost

Be specific, practical, and ingredient-driven. Never recipe-driven. Keep it conversational and concise.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { message, pantryStatus, rotationHistory, tripHistory } = req.body;

    const contextMessage = `
Current pantry status:
${JSON.stringify(pantryStatus, null, 2)}

Protein rotation history (last 8 weeks):
${JSON.stringify(rotationHistory, null, 2)}

Recent shopping trips:
${JSON.stringify(tripHistory?.slice(-3), null, 2)}

User message: ${message}`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: contextMessage }],
    });

    res.status(200).json({ reply: response.content[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Claude API error: " + err.message });
  }
}

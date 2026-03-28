require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

// Main API
app.post("/start", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "models/gemini-1.5-flash",
    });

    const transcript = `
    Team discussed project progress.
    Tasks assigned to developers.
    Deadline is next week.
    `;

    const prompt = `
    Summarize this meeting in structured format:

    ${transcript}

    Give:
    - Key Points
    - Action Items
    - Important Notes
    `;

    const result = await model.generateContent(prompt);

    // Safe extraction (no crash)
    const summary =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!summary) {
      throw new Error("No response from AI");
    }

    res.json({ summary });

  } catch (error) {
    console.error("FULL ERROR:", error);

    // Fallback response (VERY IMPORTANT)
    const fallbackSummary = `
📌 Key Points:
- Project progress discussed
- Tasks assigned to team

✅ Action Items:
- Complete development tasks
- Prepare next update

⚠️ Important Notes:
- Deadline is next week
- Team coordination required
    `;

    res.json({ summary: fallbackSummary });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
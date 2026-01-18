export const aiService = {
    /**
     * Generates a mystical insight about a specific tarot history topic.
     * @param {string} topic - The specific historical topic (e.g., "Visconti-Sforza").
     * @param {string} era - The time period (e.g., "15th Century").
     * @param {string} apiKey - The user's OpenAI API key.
     * @returns {Promise<string>} - The AI generated text.
     */
    generateTarotHistoryInsight: async (topic, era, apiKey) => {
        if (!apiKey) throw new Error("API Key is missing");

        const prompt = `
      You are the 'Spirit of the Tarot', an ancient, mystical, and wise entity that has observed the cards for centuries.
      
      User asks about: "${topic}" in the "${era}".
      
      Please provide a fascinating, slightly esoteric, yet historically grounded insight about this specific topic. 
      Reveal hidden symbolism, cultural context, or a short interesting anecdote that is not commonly known.
      
      Tone: Mystical, elegant, storytelling, but accurate.
      Format: Keep it under 300 characters. Use Korean language.
      Do not start with "Hello" or generic intros. Dive straight into the wisdom.
    `;

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo", // Cost-effective model for this feature
                    messages: [
                        { role: "system", content: "You are a mystical Tarot Historian." },
                        { role: "user", content: prompt }
                    ],
                    max_tokens: 250,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("INVALID_KEY");
                }
                throw new Error("API_ERROR");
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error("AI Service Error:", error);
            throw error;
        }
    },

    /**
     * Generates a comprehensive tarot reading including scores, deep insights, and a mantra.
     * @param {Array} cards - Array of card objects { name_ko, name_en, keywords }.
     * @param {string} question - The user's question.
     * @param {string} apiKey - The user's OpenAI API key.
     * @returns {Promise<Object>} - The structured AI response.
     */
    generateTarotReading: async (cards, question, apiKey) => {
        if (!apiKey) throw new Error("API Key is missing");

        const cardDescriptions = cards.map((c, i) =>
            `${i + 1}. ${c.name_en} (${c.name_ko})`
        ).join("\n");

        const prompt = `
        const prompt = `
      You are a World - class Grand Tarot Master(Grand Master) conducting a private consultation.
      The user asked: "${question}".
      The cards drawn are:
        ${ cardDescriptions }

      ** Your Goal:** Provide a deeply personal, insightful, and unconstrained reading. 
      Do NOT start with "The cards are..." or generic intros.Start directly with the core message.
      Talk to the user like a wise human mentor.Use a warm, authoritative, yet mystical tone.

      ** Content Requirements:**
    1. ** Answer the specific question **: If they asked about love, talk purely about love.If money, talk money.Don't be generic.
2. ** Weave a Story **: Connect the cards together into a single narrative arc.How does Card A influence Card B ?
    3. ** Visual & Symbolic Detail **: Mention specific details in the artwork(e.g., "The red cloak signifies...") to prove you are 'looking' at the cards.
      4. ** Concrete Actions **: Embed advice naturally into the flow, not just as a list at the end.

      ** Format **:
      Return strictly valid JSON with this structure:
{
    "full_reading": "A long, comprehensive assay (markdown supported). Use bolding (**text**) for emphasis. Divide into paragraphs with \\n\\n. Minimum 600 characters, no maximum limit. Make it feel like a real conversation.",
        "scores": {
        "money": 0 - 100,
            "love": 0 - 100,
                "health": 0 - 100,
                    "work": 0 - 100
    },
    "mantra": "A profound, soul-shaking sentence that summarizes the reading. (Korean)"
}

IMPORTANT: Return ONLY the JSON.Do not use markdown backticks.
    `;

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ apiKey } `
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "You are a JSON-speaking Tarot Oracle. Output only valid JSON." },
                        { role: "user", content: prompt }
                    ],
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error("INVALID_KEY");
                const errData = await response.json().catch(() => ({}));
                console.error("OpenAI API Error:", response.status, errData);
                throw new Error(`API_ERROR: ${ response.status } `);
            }

            const data = await response.json();
            const content = data.choices[0].message.content.trim();

            // Robust JSON extraction
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            const jsonString = jsonMatch ? jsonMatch[0] : content;

            return JSON.parse(jsonString);
        } catch (error) {
            console.error("AI Readings Error:", error);
            throw error;
        }
    }
};

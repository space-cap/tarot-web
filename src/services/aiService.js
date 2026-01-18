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
    }
};

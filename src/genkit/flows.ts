import { z } from "genkit";
import { ai } from "./index"

export const menuSuggestionFlow = ai.defineFlow(
    {
      name: "menuSuggestionFlow",
      inputSchema: z.object({ theme: z.string() }),
      outputSchema: z.object({ menuItem: z.string() }),
    },
    async ({ theme }) => {
      const { text } = await ai.generate({
        prompt: `Invent a menu item for a ${theme} themed restaurant`,
      })
  
      return { menuItem: text }
    }
)
  

export const randomMealInstructionsQuestionFlow = ai.defineFlow({
    name: 'mealQuestionFlow',
    inputSchema: z.object({ question: z.string() }),
    outputSchema: z.object({ answer: z.string() }),
  },
  async ({ question }): Promise<{ answer: string }> => {
    const menu = await ai.run('retrieve-daily-menu', async (): Promise<string> => {
      const randomMeal = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      if (randomMeal == null) return "Error fetching instructions"
      const randomMealInstructions = (await randomMeal.json()).meals[0].strInstructions

      return randomMealInstructions;
    });

    const { text } = await ai.generate({
      system: "Help the user answer questions about today's meal.",
      prompt: question,
      docs: [{ content: [{ text: menu }] }],
    });

    return { answer: text };
  },
);
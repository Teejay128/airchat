import {genkit} from "genkit"
import {googleAI, gemini20Flash} from "@genkit-ai/googleai"
import { startFlowServer } from "@genkit-ai/express"
import { menuSuggestionFlow } from "./flows"

import dotenv from "dotenv"
dotenv.config()

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY }),
  ],
  model: gemini20Flash
});

startFlowServer({
  flows: [menuSuggestionFlow as any],
  // pathPrefix: "/flow" // Experiment with
})

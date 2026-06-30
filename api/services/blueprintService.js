import { executeModelWithFallback } from "../config/gemini.js";

import marketingPrompt from "./prompts/marketingPrompt.js";
import operationsPrompt from "./prompts/operationsPrompt.js";
import financePrompt from "./prompts/financePrompt.js";
import strategyPrompt from "./prompts/strategyPrompt.js";

export const generateBusinessBlueprint = async (prompt) => {

  console.log("[Blueprint Service] Launching AI business consultants...");

  // Run all AI consultants simultaneously
  const [
    marketing,
    operations,
    finance,
    strategy
  ] = await Promise.all([

    executeModelWithFallback(marketingPrompt, prompt),

    executeModelWithFallback(operationsPrompt, prompt),

    executeModelWithFallback(financePrompt, prompt),

    executeModelWithFallback(strategyPrompt, prompt)

  ]);

  console.log("[Blueprint Service] All consultants completed successfully.");

  // Return one unified business blueprint
  return {
    marketing,
    operations,
    finance,
    strategy,
  };
};
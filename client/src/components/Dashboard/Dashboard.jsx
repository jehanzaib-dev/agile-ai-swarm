import { useState } from "react";
import { generateAgilePlanCall } from "../../apiCalls/apiCalls.js";
import "./Dashboard.css";

export default function Dashboard({ setSwarmData, isGenerating, setIsGenerating }) {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please describe your feature requirement or sprint concept.");
      return;
    }

    try {
      setError(null);
      setIsGenerating(true);
      setSwarmData(null); // Clear previous sprint workspace data during refresh

      // Trigger the backend multi-agent pipeline
      const data = await generateAgilePlanCall(prompt);
      setSwarmData(data);

    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        "The AI swarm encountered synchronization latency. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="dashboardContainer">
      <form onSubmit={handleSubmit} className="promptForm">
        <div className="inputGroup">
          <textarea
            placeholder="Describe your business vision or startup idea (e.g., 'Open a cozy specialty coffee shop with a small book-reading nook in Lahore' or 'Launch a boutique digital marketing agency specializing in local e-commerce growth')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
            className="promptTextarea"
            rows={3}
          />
        </div>

        <button 
  type="submit" 
  disabled={isGenerating} 
  className={`submitBtn ${isGenerating ? "processing" : ""}`}
>
  {isGenerating ? (
    <div className="loaderWrapper">
      <span className="syncSpinner"></span>
      <span>Generating Business Blueprint...</span>
    </div>
  ) : (
    "Generate Startup Blueprint"
  )}
</button>
      </form>

      {error && (
        <div className="errorNotice">
          <span className="errorIcon">⚠️</span>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
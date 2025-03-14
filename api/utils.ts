import { apiKeys } from "./keys";

export const checkCommentOPENAI = async (comment: string) => {
    const API_KEY = apiKeys.OPENAI_KEY;
    const response = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ input: comment }),
    });
  
    const result = await response.json();
    const categories = result.results[0].categories;
    const scores = result.results[0].category_scores; 

    
    const threshold = 1;  
    const flagged = Object.values(scores).some((score) => score*1000 >= threshold);
    console.log(flagged, scores);
    
    return !flagged
  };

export const analyzeTextAZURE = async (text: string) => {
    const endpoint = "https://icerikkontrol.cognitiveservices.azure.com/contentsafety/text:analyze?api-version=2024-09-15-preview";
    const apiKey = apiKeys.AZURE_KEY; 
  
    const requestBody = {
      text: text,
      categories: ["Hate", "Sexual", "Violence", "SelfHarm"],
      outputType: "FourSeverityLevels" // 0-2-4-6 seviye skalası
    };
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      const result = await response.json();
      console.log("Analiz Sonucu:", response);
      return result;
    } catch (error) {
      console.error("Hata:", error);
    }
  };

export const googlePerspectiveAPI = async(text: string) => {
    const API_KEY = apiKeys.GOOGLE_KEY; 

    const body = {
        comment: { text: text },
        languages: ["en"], 
        requestedAttributes: { TOXICITY: {} }
    };

    fetch(`https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => console.log("google",JSON.stringify(data, null, 2)))
    .catch(error => console.error("Hata:", error));
}
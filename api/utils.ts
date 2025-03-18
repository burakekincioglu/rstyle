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
      console.log("Analiz Sonucu:", result);
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
    .then(data => {      
      const value = data.attributeScores.TOXICITY.summaryScore.value * 1000
      console.log("google",value)
    }
      
    )
    .catch(error => console.error("Hata:", error));
}

export const moderateGROQapi = async (inputText: string) => {
  const apiKey = apiKeys.GROQ
  const url = 'https://api.groq.com/openai/v1/chat/completions';

  const payload = {
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'system',
        content: `Kurumsal şirket içi bir uygulamada paylaşılan gönderilere yapılan kullanıcı yorumlarını değerlendiren bir içerik denetleme uzmanısın. Gönderilere gelen yorumları aşağıdaki kurallara göre kategorize etmelisin:

                🚫 "BLOCK" kategorisi kuralları :
                1) Hakaret, aşağılama, küçümseme veya kişisel saldırı içeren yorumlar  
                2) Alay, kötü niyetli eleştiri 
                3) Cinsellik, müstehcen içerik veya uygunsuz ifadeler  
                4) Irk, din, cinsiyet, engellilik veya diğer kimlik temelli nefret söylemleri  
                5) Şirket politikalarına veya çalışma ortamına zarar verebilecek ifadeler  
                6) Spam, reklam veya alakasız içerikler  

                ✅ "ALLOW" kategorisi kuralları:  
                1) Saygılı ve yapıcı geri bildirimler  
                2) Çalışma süreçleri, projeler veya iş akışı hakkında yapıcı tartışmalar  
                3) Motivasyon verici, destekleyici veya bilgilendirici yorumlar  
                4) Küçük çaplı espriler veya hafif mizah, ancak hakaret veya aşağılama içermemeli   

                İlk olarak, yorumun içerdiği potansiyel sorunlu ifadeleri belirle ve bu ifadelerin engellenmesi gerekip gerekmediğini değerlendir.  
                Yorumun ifade ettiği anlamın "BLOCK" veya "ALLOW" olduğunu düşün ve tespit et. Düşünürken ve karşılaştırma yaparken bu başlıkların yukarıda verilen tanımlarını esas al. 
                Hangi maddeye yakın bulduğunu 1-10 arası puanla. 1 puan pek yakın değil anlamına geliyor, 10 puan ise kesinlikle bu maddedeki anlam ağır basıyor anlamına geliyor. 
                Vereceğin örnek cevap şöyle olmalı: BLOCK madde-6 puan: 10
                  `,
      },
      {
        role: 'user',
        content: `yorum: ${inputText}`,
      },
    ],
    temperature: 0.1, 
    max_tokens: 10,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const moderationResult = data.choices[0].message.content;
    console.log('Moderation Result:', moderationResult);
    return moderationResult
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return undefined
  }
};
// translate.js

const OXFORD_API_ID = "6f82e505"; // 請替換成你的 API ID
const OXFORD_API_KEY = "3513f2d669460c74b8aba960be631ec9"; // 請替換成你的 API Key

async function fetchOxfordTranslation(word) {
    const url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-us/${word.toLowerCase()}`;
    
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "app_id": OXFORD_API_ID,
            "app_key": OXFORD_API_KEY
        }
    });
    
    if (!response.ok) {
        console.error("Oxford API 回應錯誤", response.statusText);
        return null;
    }
    
    const data = await response.json();
    return parseOxfordResponse(data);
}

function parseOxfordResponse(data) {
    try {
        const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        return definition;
    } catch (error) {
        console.error("解析 Oxford API 回應失敗", error);
        return "無翻譯結果";
    }
}

// 讓 content.js 呼叫這個函數來翻譯單字
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate" && request.word) {
        fetchOxfordTranslation(request.word).then(translation => {
            sendResponse({ translation });
        });
        return true; // 讓 Chrome 延遲回應，等待 API 結果
    }
});

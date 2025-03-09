// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate" && request.word) {
        fetchOxfordTranslation(request.word).then(translation => {
            sendResponse({ translation });
        });
        return true; // 讓 Chrome 延遲回應，等待 API 結果
    }
});

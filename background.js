// background.js

console.log("🚀 Background script is running!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate" && request.word) {
        fetchOxfordTranslation(request.word).then(translation => {
            sendResponse({ translation });
        });
        return true; // 讓 Chrome 延遲回應，等待 API 結果
    }

    if (request.action === "getPageInfo") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let activeTab = tabs[0];
            sendResponse({
                title: activeTab.title,
                url: activeTab.url
            });
        });
        return true; // 讓 Chrome 等待 sendResponse 回應
    }
});

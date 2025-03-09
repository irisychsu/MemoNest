// background.js


console.log("🚀 Background script has started!");
console.log("📡 擴充功能 ID:", chrome.runtime.id);


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("📩 收到訊息：", request);

    if (request.action === "translate" && request.word) {
        fetchOxfordTranslation(request.word).then(translation => {
            sendResponse({ translation });
        });
        return true; // 讓 Chrome 延遲回應，等待 API 結果
    }

    if (request.action === "getPageInfo") {
        console.log("📌 正在取得頁面資訊...");
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            console.log("🔍 tabs 查詢結果：", tabs);
            if (tabs.length === 0) {
                console.error("❌ 沒有找到任何開啟的分頁！");
                sendResponse({ title: "未知", url: "未知" });
                return;
            }
            let activeTab = tabs[0];
            console.log("✅ 取得的頁面資訊：", activeTab.title, activeTab.url);
            sendResponse({
                title: activeTab.title,
                url: activeTab.url
            });
        });
        return true; // 讓 Chrome 等待 sendResponse 回應
    }
});
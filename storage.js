// content.js

document.addEventListener("mouseup", () => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        console.log("使用者選取的文字：", selectedText);
        
        // 取得當前頁面的標題與網址
        let pageTitle = document.title;
        let pageUrl = window.location.href;
        let contextSentence = getContextSentence(selectedText);
        
        // 向 background script 發送翻譯請求
        chrome.runtime.sendMessage({ action: "translate", word: selectedText }, (response) => {
            if (response && response.translation) {
                console.log("翻譯結果：", response.translation);
                showTranslationPopup(selectedText, response.translation, contextSentence, pageTitle, pageUrl);
            }
        });
    }
});

function showTranslationPopup(word, translation, sentence, title, url) {
    let popup = document.createElement("div");
    popup.innerHTML = `<strong>${word}:</strong> ${translation}<br><button id='saveWord'>儲存</button>`;
    popup.style.position = "fixed";
    popup.style.background = "#fff";
    popup.style.border = "1px solid #000";
    popup.style.padding = "5px";
    popup.style.top = "10px";
    popup.style.right = "10px";
    popup.style.zIndex = "1000";
    document.body.appendChild(popup);
    
    document.getElementById("saveWord").addEventListener("click", () => {
        saveWordToStorage(word, translation, { sentence, title, url });
        popup.remove();
        alert("單字已儲存！");
    });
    
    setTimeout(() => {
        popup.remove();
    }, 5000);
}

function getContextSentence(word) {
    let paragraphs = document.getElementsByTagName("p");
    for (let para of paragraphs) {
        if (para.innerText.includes(word)) {
            return para.innerText;
        }
    }
    return "Context not found";
}

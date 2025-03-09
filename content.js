document.addEventListener("mouseup", () => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        console.log("使用者選取的文字：", selectedText);
    }
});

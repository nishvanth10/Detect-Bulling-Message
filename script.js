const bullyingWords = [
    "stupid", "idiot", "loser", "fat", "ugly", "dumb", "shut up", "kill yourself", "hate you"
];

const chatWindow = document.getElementById("chatWindow");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender = "user", isWarning = false) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message-bubble " +
        (sender === "user" ? "message-user" : "message-bot") +
        (isWarning ? " message-warning" : "");
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function detectBullying(text) {
    const lower = text.toLowerCase();
    const found = bullyingWords.filter(word => lower.includes(word));
    return found;
}

sendBtn.onclick = () => {
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    messageInput.value = "";

    const flagged = detectBullying(userMessage);
    setTimeout(() => {
        if (flagged.length > 0) {
            addMessage(
                `⚠️ Bullying detected: ${flagged.join(", ")}`,
                "bot",
                true
            );
        } else {
            addMessage("✅ Message is clean. No bullying detected.", "bot");
        }
    }, 500);
};

messageInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") sendBtn.onclick();
});

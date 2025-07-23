const bullyingWords = [
    "stupid", "idiot", "loser", "fat", "ugly", "dumb", "shut up", "kill yourself", "hate you"
];

const chatWindow = document.getElementById("chatWindow");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const typingIndicator = document.getElementById("typingIndicator");
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");
const themeBtn = document.getElementById("themeBtn");
const chatContainer = document.getElementById("chatContainer");

function addMessage(text, sender = "user", isWarning = false) {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message-bubble " +
        (sender === "user" ? "message-user" : "message-bot") +
        (isWarning ? " message-warning" : "");
    msgDiv.innerText = text;

    if (sender === "bot") {
        const reactions = document.createElement("div");
        reactions.className = "reaction-btns";
        ["👍", "❤️", "😢"].forEach(emoji => {
            const btn = document.createElement("span");
            btn.innerText = emoji;
            btn.style.cursor = "pointer";
            btn.onclick = () => alert(`You reacted with ${emoji}`);
            reactions.appendChild(btn);
        });
        msgDiv.appendChild(reactions);
    }

    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function detectBullying(text) {
    const lower = text.toLowerCase();
    return bullyingWords.filter(word => lower.includes(word));
}

sendBtn.onclick = () => {
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    messageInput.value = "";

    simulateBotResponse(userMessage);
};

function simulateBotResponse(message) {
    typingIndicator.style.display = "block";

    setTimeout(() => {
        typingIndicator.style.display = "none";
        const flagged = detectBullying(message);
        if (flagged.length > 0) {
            addMessage(`⚠️ Bullying detected: ${flagged.join(", ")}`, "bot", true);
        } else {
            addMessage("✅ Message is clean. No bullying detected.", "bot");
        }
    }, 800);
}

messageInput.addEventListener("keypress", e => {
    if (e.key === "Enter") sendBtn.click();
});


emojiBtn.onclick = () => {
    emojiPicker.style.display = emojiPicker.style.display === "none" ? "block" : "none";
};

emojiPicker.addEventListener("click", e => {
    if (e.target.innerText) {
        messageInput.value += e.target.innerText;
        emojiPicker.style.display = "none";
    }
});


function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file || !file.name.endsWith(".txt")) return alert("Please drop a .txt file");

    const reader = new FileReader();
    reader.onload = function (e) {
        const content = e.target.result;
        addMessage(content, "user");
        simulateBotResponse(content);
    };
    reader.readAsText(file);
}

// Theme switcher
themeBtn.onclick = () => {
    document.body.classList.toggle("dark-mode");
};

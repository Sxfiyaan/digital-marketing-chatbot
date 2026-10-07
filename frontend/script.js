const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");


function addMessage(message, sender) {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add(
        "message",
        sender === "user"
            ? "user-message"
            : "bot-message"
    );


    const avatar = document.createElement("div");

    avatar.classList.add("ai-avatar");

    avatar.textContent =
        sender === "user"
            ? "You"
            : "✦";


    const content = document.createElement("div");

    content.classList.add("message-content");

    content.textContent = message;


    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}


async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) {
        return;
    }


    addMessage(message, "user");

    userInput.value = "";

    sendButton.disabled = true;

    sendButton.textContent = "…";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })
            }
        );


        if (!response.ok) {
            throw new Error("Server error");
        }


        const data = await response.json();

        addMessage(data.response, "bot");


    } catch (error) {

        console.error(error);

        addMessage(
            "Sorry, I couldn't connect to the chatbot server.",
            "bot"
        );

    } finally {

        sendButton.disabled = false;

        sendButton.textContent = "↑";

        userInput.focus();
    }
}


function sendQuickMessage(message) {

    userInput.value = message;

    sendMessage();
}


sendButton.addEventListener(
    "click",
    sendMessage
);


userInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    }
);
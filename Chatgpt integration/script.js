const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Create WebSocket connection
const socket = new WebSocket('ws://localhost:3000');

// Connection opened
socket.addEventListener('open', function (event) {
    console.log('WebSocket connected');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    appendMessage(event.data, 'bot');
});

// Function to send user message to server
function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        appendMessage(message, 'user');
        socket.send(message);
        userInput.value = '';
    }
}

// Function to append message to chat box
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerText = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

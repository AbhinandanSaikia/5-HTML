let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 0.9;
    text_speak.pitch = 1.2;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

// Check if Speech Recognition is supported
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (speechRecognition) {
    let recognition = new speechRecognition();

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
        recognition.stop();
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        content.innerText = "Error: " + event.error;
    };

    btn.addEventListener("click", () => {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    });

} else {
    content.innerText = "Speech Recognition not supported in this browser.";
    console.error("Speech Recognition not supported in this browser.");
}

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello")) {
        speak("Hello, what can I help you with?");
    } else if (message.includes("open youtube and play")) {
        let song = message.replace("open youtube and play", "").trim();
        if (song.length > 0) {
            speak(`Playing ${song} on YouTube`);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(song)}+site:youtube.com&btnI`, "_blank");
        } else {
            speak("Please tell me the song name after saying open YouTube and play.");
        }
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open gpt")) {
        speak("Opening ChatGPT...");
        window.open("https://chat.openai.com/", "_blank");
    } else if (message.includes("who are you")) {
        speak("I am AI Assistant, created by Abhinandan Saikia.");
    } else if (message.includes("what is your name")) {
        speak("I'm your virtual assistant, here to help you with anything you need.");
    } else if (message.includes("thank you")) {
        speak("You're very welcome! I'm happy to help.");
    } else {
        speak(`This is what I found regarding ${message}`);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}

const taskList = document.getElementById('taskList');
const toggleBtn = document.getElementById('toggleBtn');

let recognition;
let isListening = false;

function addTask(text) {
  const li = document.createElement('li');
  li.textContent = text;
  li.onclick = () => li.classList.toggle('completed');
  taskList.appendChild(li);
}

function initRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    return null;
  }

  const recog = new SpeechRecognition();
  recog.lang = 'en-US';
  recog.interimResults = false;

  recog.onresult = (event) => {
    const text = event.results[0][0].transcript;
    addTask(text);
  };

  recog.onerror = (event) => {
    alert("Speech recognition error: " + event.error);
    stopRecognition();
  };

  recog.onend = () => {
    if (isListening) {
      stopRecognition(); // Reset if it ends unexpectedly
    }
  };

  return recog;
}

function startRecognition() {
  recognition = initRecognition();
  if (!recognition) return;

  isListening = true;
  recognition.start();
  toggleBtn.textContent = "🛑 Stop Listening";
}

function stopRecognition() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  isListening = false;
  toggleBtn.textContent = "🎙️ Start Listening";
}

toggleBtn.addEventListener('click', () => {
  if (isListening) {
    stopRecognition();
  } else {
    startRecognition();
  }
});

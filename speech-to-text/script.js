document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const transcript = document.getElementById("transcript");

  let mediaRecorder;
  let audioChunks = [];
  let audioStream; // To store the stream for cleanup

  startBtn.onclick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStream = stream; // Store for cleanup
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

        try {
          const response = await fetch("https://api.deepgram.com/v1/listen", {
            method: "POST",
            headers: {
              "Authorization": "TOKEN fbfd546da47b569f375852655afeb99e923e41e9", // Replace with your key (preferably from server)
              "Content-Type": "audio/webm" // Fixed typo here
            },
            body: audioBlob
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          const text = data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "No speech detected.";
          transcript.value = text;
        } catch (err) {
          console.error("API error:", err);
          transcript.value = "Error processing audio";
        }
        
        // Clean up
        audioStream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start(100); // Collect data every 100ms
      startBtn.disabled = true;
      stopBtn.disabled = false;
      transcript.value = "Recording... Speak now...";

    } catch (err) {
      alert("Microphone access is required!");
      console.error("Mic error:", err);
      transcript.value = "Error accessing microphone";
    }
  };

  stopBtn.onclick = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
      startBtn.disabled = false;
      stopBtn.disabled = true;
      transcript.value = "Processing...";
    }
  };
});
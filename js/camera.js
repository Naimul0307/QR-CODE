const openCameraBtn = document.getElementById("openCameraBtn");
const cameraContainer = document.getElementById("cameraContainer");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const timerElement = document.getElementById("timer");
let stream;

openCameraBtn.addEventListener("click", async () => {
    cameraContainer.style.display = "block";
    timerElement.style.display = "block";

    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        // Wait until the video metadata is loaded to sync sizes
        video.addEventListener("loadedmetadata", () => {
            syncVideoAndCanvasSize();
        });

        startCountdown(5, captureImage);
    } catch (err) {
        console.error("Error accessing the camera: ", err);
        alert("Could not access the camera. Please check your permissions.");
    }
});

function syncVideoAndCanvasSize() {
    const aspectRatio = video.videoWidth / video.videoHeight;

    // Match canvas size to video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Dynamically set the height of video and canvas to maintain aspect ratio
    video.style.height = `${video.offsetWidth / aspectRatio}px`;
    canvas.style.height = `${canvas.offsetWidth / aspectRatio}px`;
}

function startCountdown(seconds, callback) {
    let remainingTime = seconds;

    const interval = setInterval(() => {
        timerElement.textContent = remainingTime;
        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(interval);
            timerElement.style.display = "none";
            callback();
        }
    }, 1000);
}

function captureImage() {
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL("image/png");
    localStorage.setItem("capturedImage", imageDataURL);
    window.location.href = "preview.html";
}

function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    cameraContainer.style.display = "none";
}
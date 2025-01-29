// Retrieve the captured image from localStorage
const capturedImage = localStorage.getItem("capturedImage");

// Display the captured image
if (capturedImage) {
    document.getElementById("previewImage").src = capturedImage;
} else {
    alert("No image to preview!");
    window.location.href = "index.html"; // Redirect back if no image found
}

// Handle "I Like It" button click
document.getElementById("likeBtn").addEventListener("click", () => {
    window.location.href = "submit.html"; // Redirect to the submit page
});

// Handle "Try Again" button click
document.getElementById("retryBtn").addEventListener("click", () => {
    window.location.href = "camera.html"; // Redirect to the camera page
});
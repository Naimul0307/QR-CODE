const capturedImage = localStorage.getItem("capturedImage");

if (capturedImage) {
    document.getElementById("previewImage").src = capturedImage;
} else {
    alert("No image to submit!");
    window.location.href = "camera.html";
}

document.getElementById("uploadBtn").addEventListener("click", async () => {
    const progressBar = document.getElementById("progressBar");
    const progressContainer = document.querySelector(".progress-container");

    progressContainer.style.display = "block";
    progressBar.style.width = "0%";

    try {
        let progress = 0;
        const progressInterval = setInterval(() => {
            if (progress < 90) {
                progress += 10;
                progressBar.style.width = progress + "%";
            }
        }, 300);

        const response = await fetch("php/saveImage.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ image: capturedImage })
        });

        clearInterval(progressInterval);
        progressBar.style.width = "100%";

        if (response.ok) {
            localStorage.removeItem("capturedImage");
            setTimeout(() => {
                window.location.href = "thankyou.html";
            }, 500);
        } else {
            alert("Failed to upload image. Please try again.");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("An error occurred while uploading the image.");
    }
});

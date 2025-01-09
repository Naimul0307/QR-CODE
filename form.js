
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const successMessage = document.getElementById('successMessage');

// Check if there is a 'success' query parameter in the URL
const urlParams = new URLSearchParams(window.location.search);
const success = urlParams.get('success');

// Show the success message as a popup if 'success=1' is present
if (success === '1') {
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000); // Hide the message after 3 seconds
}

// Display the image preview once the user selects a file
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Show the image preview
        };

        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none'; // Hide the image preview if no file is selected
    }
});
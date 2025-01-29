const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const uploadForm = document.getElementById('uploadForm');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.querySelector('.progress-container');
const successMessage = document.getElementById('successMessage');

// Image preview function
imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
    }
});

// AJAX file upload with progress
uploadForm.addEventListener('submit', function(event) {
event.preventDefault();
const file = imageInput.files[0];

if (!file) {
    alert('Please select a file to upload.');
    return;
}

const formData = new FormData();
formData.append('image', file);

const xhr = new XMLHttpRequest();
xhr.open('POST', 'php/upload.php', true);

xhr.upload.onprogress = function(event) {
    if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        progressBar.style.width = percentComplete + '%';
    }
};

xhr.onloadstart = function() {
    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
};

xhr.onload = function() {
    if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (response.success) {
            progressBar.style.width = '100%';
            setTimeout(() => {
                window.location.href = 'thankyou.html'; // Redirect after success
            }, 1000); // Delay for effect
        } else {
            alert(response.message || 'Upload failed.');
        }
    } else {
        alert('Upload failed.');
    }
};

xhr.onerror = function() {
    alert('Upload error.');
};

xhr.send(formData);
});

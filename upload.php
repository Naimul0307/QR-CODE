<?php
if (isset($_POST['submit'])) {
    // Check if file was uploaded without errors
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $uploadedFile = $_FILES['image'];
        $uploadDirectory = 'images/'; // Use the existing 'images' folder
        $filePath = $uploadDirectory . basename($uploadedFile['name']);
        
        // Check if the 'images' folder exists
        if (!is_dir($uploadDirectory)) {
            echo 'The images folder does not exist.';
        } else {
            // Move the uploaded file to the images folder
            if (move_uploaded_file($uploadedFile['tmp_name'], $filePath)) {
                // Redirect to form.html with a success message
                header("Location: form.html?success=1");
                exit(); // Stop further script execution
            } else {
                echo 'Failed to upload image.';
            }
        }
    } else {
        echo 'No file uploaded or there was an error.';
    }
}
?>

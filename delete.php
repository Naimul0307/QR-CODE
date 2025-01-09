<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $image = $_POST['image'];

    // Check if the file exists
    if (file_exists($image)) {
        // Delete the file
        unlink($image);

        // Redirect back to the gallery with a success message
        header("Location: gallery.php?deleted=1");
        exit();
    } else {
        echo "Error: File does not exist.";
    }
}
?>

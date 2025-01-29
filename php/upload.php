<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $uploadedFile = $_FILES['image'];
        $uploadDirectory = '../images/'; // Make sure this folder exists
        $filePath = $uploadDirectory . basename($uploadedFile['name']);

        if (!is_dir($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
        }

        if (move_uploaded_file($uploadedFile['tmp_name'], $filePath)) {
            echo json_encode(['success' => true]);
            exit();
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to upload image.']);
            exit();
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded or there was an error.']);
        exit();
    }
}
?>

<?php
// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['image'])) {
    $imageData = $data['image'];

    // Decode the base64 image
    $imageData = explode(',', $imageData)[1]; // Remove the base64 header
    $imageData = base64_decode($imageData);

    // Generate a unique file name
    $fileName = uniqid('image_') . '.png';

    // Specify the folder to save the image
    $uploadDirectory = '../images/';
    $filePath = $uploadDirectory . $fileName;

    // Check if the 'images' folder exists
    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true); // Create the folder if it doesn't exist
    }

    // Save the image file
    if (file_put_contents($filePath, $imageData)) {
        http_response_code(200); // Success
        echo json_encode(['message' => 'Image uploaded successfully', 'fileName' => $fileName]);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['message' => 'Failed to save the image']);
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(['message' => 'No image data received']);
}
?>

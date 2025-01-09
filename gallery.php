<?php
$directory = 'images/'; // Path to the images folder
$images = glob($directory . '*'); // Get all files in the images directory
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <link rel="stylesheet" href="css/gallery.css">
</head>
<body>
    <div class="container">
        <div class="logo-container">
        <img src="background/logo.png" alt="Logo" class="logo">
        </div>
        <hr>
        <h1>Image Gallery</h1>
        <hr>
        <div class="gallery">
            <?php if (!empty($images)): ?>
                <?php foreach ($images as $image): ?>
                    <div class="image-card">
                        <img src="<?php echo $image; ?>" alt="Uploaded Image">
                        <div class="actions">
                            <a href="<?php echo $image; ?>" download class="btn">Download</a>
                            <form action="delete.php" method="POST" onsubmit="return confirm('Are you sure you want to delete this image?');">
                                <input type="hidden" name="image" value="<?php echo $image; ?>">
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php else: ?>
                <p>No images uploaded yet.</p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html> 
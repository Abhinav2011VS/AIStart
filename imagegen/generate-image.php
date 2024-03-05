<?php
// Load your pre-trained GAN model (or create your own)
// Example: Load BigGAN-deep generator for 256x256 images
// Replace this with your actual image generation logic
$generated_image_url = 'https://github.com/Abhinav2011VS/AIStart/imagegen/gen/' . generate_unique_filename() . '.png';

// Redirect back to the index page with the generated image URL
header("Location: index.html?image_url=$generated_image_url");
exit;

function generate_unique_filename() {
    // Create a unique filename based on timestamp and random string
    $timestamp = time();  // Current timestamp
    $random_string = bin2hex(random_bytes(4));  // Generate a random 8-character string
    return "image_$timestamp" . "_$random_string";
}
?>

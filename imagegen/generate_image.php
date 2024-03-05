<?php
// Load your DCGAN Python script (dcgan.py) using a system command
// Replace this with the actual command to run your Python script
exec('python dcgan/dcgan.py', $output);

// Get the generated image URL (assuming your Python script provides it)
$generated_image_url = trim($output[0]);  // Adjust the index if needed

// Redirect back to the index page with the generated image URL
header("Location: index.html?image_url=$generated_image_url");
exit;
?>

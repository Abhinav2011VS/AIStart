let model;
let modelLoaded = false;

async function loadModel() {
    try {
        // Show loading indicator
        const loadingIndicator = document.getElementById('imageGenerationStatus');
        loadingIndicator.textContent = 'Loading model...';
        loadingIndicator.style.display = 'block';

        // Load the pre-trained model
        model = await tf.loadGraphModel('model/model.json');
        modelLoaded = true;

        // Hide loading indicator
        loadingIndicator.style.display = 'none';
    } catch (error) {
        console.error('Failed to load model:', error);
        // Update loading indicator with error message
        loadingIndicator.textContent = 'Failed to load model';
    }
}

async function generateImage() {
    if (!modelLoaded) {
        console.error('Model not loaded yet.');
        return;
    }

    try {
        // Show processing indicator
        const processingIndicator = document.getElementById('imageGenerationStatus');
        processingIndicator.textContent = 'Generating image...';
        processingIndicator.style.display = 'block';

        const textInput = document.getElementById('textInput').value;
        const imageType = document.getElementById('imageType').value;

        // Generate image
        const canvas = document.createElement('canvas');
        canvas.width = (imageType === 'square') ? 512 : 1024;
        canvas.height = (imageType === 'square') ? 512 : 512;

        const stylizedImage = await model.predict(tf.browser.fromPixels(canvas));
        const imageData = await tf.browser.toPixels(stylizedImage);

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageData, 0, 0, canvas.width, canvas.height);

        const generatedCanvas = document.getElementById('generatedCanvas');
        generatedCanvas.width = canvas.width;
        generatedCanvas.height = canvas.height;
        const generatedCtx = generatedCanvas.getContext('2d');
        generatedCtx.drawImage(imageData, 0, 0);

        // Show download link
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = generatedCanvas.toDataURL();
        downloadLink.style.display = 'inline-block';

        // Hide processing indicator
        processingIndicator.style.display = 'none';

        // Clean up
        tf.dispose([stylizedImage, imageData]);
    } catch (error) {
        console.error('Failed to generate image:', error);
        // Update processing indicator with error message
        processingIndicator.textContent = 'Failed to generate image';
    }
}

// Load model when page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadModel();
});

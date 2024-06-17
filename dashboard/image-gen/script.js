let model;
let modelLoaded = false;

async function loadModel() {
    try {
        const loadingIndicator = document.getElementById('imageGenerationStatus');
        loadingIndicator.textContent = 'Loading model...';
        loadingIndicator.style.display = 'block';

        // Load the TensorFlow.js model
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
    try {
        if (!modelLoaded) {
            console.error('Model not loaded yet.');
            return;
        }

        const textInput = document.getElementById('textInput').value;
        const imageType = document.getElementById('imageType').value;

        // Validate input
        if (!textInput.trim()) {
            console.error('Text input is empty.');
            return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = (imageType === 'square') ? 512 : 1024;
        canvas.height = (imageType === 'square') ? 512 : 512;

        // Preprocess text if needed before passing to the model
        const processedText = preprocessText(textInput);

        // Generate image based on processed text
        const stylizedImage = await model.predict(tf.tensor(processedText));
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
        document.getElementById('imageGenerationStatus').style.display = 'none';

        // Clean up
        tf.dispose([stylizedImage, imageData]);
    } catch (error) {
        console.error('Failed to generate image:', error);
        // Update processing indicator with error message
        document.getElementById('imageGenerationStatus').textContent = 'Failed to generate image';
    }
}

function preprocessText(inputText) {
    // Example preprocessing if needed
    return inputText.toLowerCase(); // Convert text to lowercase as an example
}

// Load model when page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadModel();
});

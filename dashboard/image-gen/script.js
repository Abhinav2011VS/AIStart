let model;

async function loadModel() {
    // Show loading indicator
    document.getElementById('loadingIndicator').style.display = 'block';

    // Load the pre-trained model
    model = await tf.loadGraphModel('model/model.json');

    // Hide loading indicator
    document.getElementById('loadingIndicator').style.display = 'none';
}

async function generateImage() {
    const textInput = document.getElementById('textInput').value;
    const imageType = document.getElementById('imageType').value;

    if (!model) {
        console.error('Model not loaded yet.');
        return;
    }

    // Show processing indicator
    document.getElementById('processingIndicator').style.display = 'block';

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
    document.getElementById('processingIndicator').style.display = 'none';

    // Clean up
    tf.dispose([stylizedImage, imageData]);
}

// Load model when page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadModel();
});

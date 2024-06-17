async function generateImage() {
    const textInput = document.getElementById('textInput').value;
    const imageType = document.getElementById('imageType').value;

    // Load the pre-trained model
    const model = await tf.loadGraphModel('model/model.json');

    // Generate image
    const canvas = document.createElement('canvas');
    canvas.width = (imageType === 'square') ? 512 : 1024;
    canvas.height = (imageType === 'square') ? 512 : 512;

    const stylizedImage = await model.predict(tf.browser.fromPixels(canvas));
    const imageData = await tf.browser.toPixels(stylizedImage);

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageData, 0, 0, canvas.width, canvas.height);

    const generatedImage = document.getElementById('generatedImage');
    generatedImage.src = canvas.toDataURL();

    // Clean up
    tf.dispose([stylizedImage, imageData]);
}

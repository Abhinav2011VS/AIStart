document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const imageContainer = document.getElementById('imageContainer');

    generateBtn.addEventListener('click', function() {
        const width = 800; // Image width
        const height = 600; // Image height

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Generate random color
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        // Fill canvas with random color
        ctx.fillStyle = randomColor;
        ctx.fillRect(0, 0, width, height);

        const imageURL = canvas.toDataURL('image/png');

        const imageElement = document.createElement('img');
        imageElement.src = imageURL;

        imageContainer.innerHTML = '';
        imageContainer.appendChild(imageElement);
    });
});

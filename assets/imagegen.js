document.getElementById('image-gen-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const prompt = document.getElementById('prompt').value;
    const shape = document.getElementById('shape').value;
    const resolution = document.getElementById('resolution').value;

    // Here, you should call your image generation API with the provided details
    // For this example, I'll use a placeholder API call

    const apiUrl = `https://example.com/generate-image?prompt=${encodeURIComponent(prompt)}&shape=${shape}&resolution=${resolution}`;
    
    try {
        const response = await fetch(apiUrl);
        const result = await response.json();
        
        if (result.imageUrl) {
            document.getElementById('result').innerHTML = `<img src="${result.imageUrl}" alt="Generated Image">`;
        } else {
            document.getElementById('result').innerHTML = 'Failed to generate image.';
        }
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error generating image.';
    }
});

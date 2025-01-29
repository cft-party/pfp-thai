let validCredentials = [];

// Function to load credentials from a JSON URL
async function loadCredentials() {
    const url = 'https://script.google.com/macros/s/AKfycbzVdsx4Ws5AKkPjYArd0vnYisGAqSMK7xo2tuRWmGSxw1oWV3PUWmRI19-GF-h68ZbdpQ/exec';  // Replace with your JSON link
    try {
        const response = await fetch(url);
        const data = await response.json();
        validCredentials = data; // Assuming the JSON is an array of credentials
    } catch (error) {
        console.error("Error loading credentials:", error);
    }
}

// Call the function to load the credentials
loadCredentials();

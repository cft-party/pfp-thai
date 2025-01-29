let validCredentials = [];

// Function to load credentials from a JSON URL
async function loadCredentials() {
    const url = 'https://script.google.com/macros/s/AKfycbxwCelYgRw6uLL8LC0AO-n-OimyzkfaQiJp6wXgbR3fFGdZfK2mwzp7j-cFnCqSk3E1Aw/exec';  // Replace with your JSON link
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

// Get references to rain container and water
const rainContainer = document.querySelector('.rain-container');
const water = document.querySelector('.water');

// Function to create a raindrop
function createRaindrop() {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    const startX = Math.random() * 100; // Random horizontal position (in vw)
    raindrop.style.left = startX + 'vw';
    const duration = Math.random() * 1 + 0.5; // Random fall speed
    raindrop.style.animationDuration = duration + 's';

    rainContainer.appendChild(raindrop);

    // Check when raindrop hits the water level
    const checkCollision = setInterval(() => {
        const waterHeight = parseFloat(window.getComputedStyle(water).height);
        const raindropTop = raindrop.getBoundingClientRect().top;
        const raindropHeight = raindrop.getBoundingClientRect().height;

        if (raindropTop + raindropHeight >= window.innerHeight - waterHeight) {
            // Raindrop hits the water
            raindrop.remove();
            clearInterval(checkCollision); // Stop checking once the raindrop is removed
        }
    }, 50); // Check every 50ms

    // Remove raindrop after falling outside the screen (for safety)
    setTimeout(() => {
        if (document.body.contains(raindrop)) {
            raindrop.remove();
        }
    }, duration * 1000); // Based on fall duration
}

// Function to increase the water level
function increaseWaterLevel() {
    const currentHeight = parseFloat(window.getComputedStyle(water).height);
    const newHeight = currentHeight + 5; // Increase by 5px each time
    if (newHeight < window.innerHeight) {
        water.style.height = newHeight + 'px';
    }
}

// Function to decrease the water level (on mouse press)
function decreaseWaterLevel() {
    const currentHeight = parseFloat(window.getComputedStyle(water).height);
    const newHeight = currentHeight - 20; // Decrease by 20px each time
    if (newHeight >= 0) {
        water.style.height = newHeight + 'px';
    }
}

// Generate raindrops continuously
setInterval(createRaindrop, 100); // Create a new raindrop every 100ms

// Increase water level over time
setInterval(increaseWaterLevel, 1000); // Increase water level every 1 second

// Add event listener for mouse press to decrease water level
window.addEventListener('mousedown', decreaseWaterLevel);

let buttonVisible = false; // Track if the button is already visible

document.addEventListener('scroll', function() {
    let dinosaur = document.getElementById('dinosaur');
    let windowHeight = window.innerHeight;
    let scrollY = window.scrollY;
    let maxScroll = document.body.scrollHeight - windowHeight;
    
    // Move dinosaur from left to right based on scroll progress
    let progress = scrollY / maxScroll;
    dinosaur.style.left = (progress * 100) + '%';

    // Check if user has scrolled to the bottom
    if (window.scrollY + windowHeight >= document.body.scrollHeight && !buttonVisible) {
        document.getElementById('revealButton').classList.remove('hidden');
        buttonVisible = true; // Ensure the button is only shown once
    }
});

document.getElementById('revealButton').addEventListener('click', function() {
    // Remove all elements and replace with chicken scene
    document.body.innerHTML = `
        <div class="container">
            <h1>Because chickens didn’t exist yet.</h1>
            <div id="chicken"></div>
        </div>
    `;

    // Change the background image to chicken.jpg
    document.body.style.backgroundImage = "url('chicken.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
});

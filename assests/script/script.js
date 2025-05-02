//Startup Loader
window.addEventListener("load", () => {
    const loader = document.querySelector(".spinner");

    loader.classList.add("spinner-hidden");
});

const face = document.querySelector('.face');
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const leftPupil = leftEye.querySelector('.pupil');
const rightPupil = rightEye.querySelector('.pupil');

// Function to move the pupils based on mouse position
document.addEventListener('mousemove', (event) => {
    const { clientX: mouseX, clientY: mouseY } = event;

    // Get the center of the face
    const faceRect = face.getBoundingClientRect();
    const faceCenterX = faceRect.left + faceRect.width / 2;
    const faceCenterY = faceRect.top + faceRect.height / 2;

    // Calculate angle for face rotation
    const angle = Math.atan2(mouseY - faceCenterY, mouseX - faceCenterX) * 180 / Math.PI;
    face.style.transform = `rotate(${angle / 10}deg)`;

    // Move the pupils
    movePupil(leftEye, leftPupil, mouseX, mouseY);
    movePupil(rightEye, rightPupil, mouseX, mouseY);
});

function movePupil(eye, pupil, mouseX, mouseY) {
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
    const distance = Math.min(eyeRect.width / 4, eyeRect.height / 4);

    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;

    pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
}

// Blink effect - squint every 5 seconds
setInterval(() => {
    leftEye.classList.add('squint');
    rightEye.classList.add('squint');

    setTimeout(() => {
        leftEye.classList.remove('squint');
        rightEye.classList.remove('squint');
    }, 500);  // Squint for 0.5 seconds
}, 5000);  // Blink every 5 seconds

const iconTexts = [
    '{"}', '{"{"}', '</>', '#', 'console.log()', '/* comment */', 'function()', '</code>', 'let x = 10;', '{', '}'
];

const iconsContainer = document.querySelector('.icons-container');

function createFloatingIcons() {
    // Create a random number of icons (between 6 and 12)
    const numberOfIcons = Math.floor(Math.random() * 6) + 6;
    
    for (let i = 0; i < numberOfIcons; i++) {
        const icon = document.createElement('div');
        icon.classList.add('icon');
        
        // Assign a random icon from the `iconTexts` array
        const randomIcon = iconTexts[Math.floor(Math.random() * iconTexts.length)];
        icon.textContent = randomIcon;

        // Set a random size for each icon
        icon.style.fontSize = `${Math.random() * 30 + 20}px`; // Random size between 20px and 50px

        // Random delay to make animations more dynamic
        icon.style.animationDelay = `${Math.random() * 5}s`;

        // Append the icon to the container
        iconsContainer.appendChild(icon);
    }
}

// Call the function to create floating icons
createFloatingIcons();

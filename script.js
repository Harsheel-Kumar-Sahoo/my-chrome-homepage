
// ==========================================
// HARSHEEL'S PERSONAL CHROME HOMEPAGE
// ==========================================


// 1. LIVE CLOCK, DATE AND GREETING
// ==========================================

const clock = document.getElementById("clock");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");

function updateClock() {
    const now = new Date();

    // 24-hour clock
    clock.textContent = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    // Current date
    date.textContent = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).toUpperCase();

    // Dynamic greeting
    const hour = now.getHours();

    greeting.textContent =
        hour < 12 ? "A fresh start. Make it count." :
        hour < 17 ? "Make today count." :
        hour < 21 ? "Keep going. You're doing great." :
        "Take a breath. You've earned it.";
}

updateClock();
setInterval(updateClock, 1000);


// 2. RANDOM PHOTO SLIDESHOW
// ==========================================

// Total number of images: 103
// File names: image-1.jpg to image-103.jpg

const imageFiles = Array.from(
    { length: 103 },
    (_, i) => `images/image-${i + 1}.jpg`
);

const slideA = document.getElementById("slide-a");
const slideB = document.getElementById("slide-b");

let shuffledImages = [];
let currentIndex = 0;
let showingA = true;


// Shuffle images using Fisher-Yates algorithm
function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}


// Start a new randomized slideshow cycle
function startNewCycle() {
    shuffledImages = shuffle(imageFiles);
    currentIndex = 0;
}


// Display the first random image
function initializeSlideshow() {
    startNewCycle();

    slideA.src = shuffledImages[currentIndex];
    slideA.classList.add("visible");

    slideB.classList.remove("visible");
}


// Change to the next image
function changeSlide() {

    currentIndex++;

    // Reshuffle after all images have been displayed
    if (currentIndex >= shuffledImages.length) {
        startNewCycle();
    }

    const incoming = showingA ? slideB : slideA;
    const outgoing = showingA ? slideA : slideB;

    const nextImage = shuffledImages[currentIndex];

    // Remove previous image handlers
    incoming.onload = null;
    incoming.onerror = null;

    // Only transition after the next image loads
    incoming.onload = () => {
        incoming.classList.add("visible");
        outgoing.classList.remove("visible");

        showingA = !showingA;
    };

    // Skip an image if it cannot be loaded
    incoming.onerror = () => {
        incoming.onload = null;
        incoming.onerror = null;

        changeSlide();
    };

    incoming.src = nextImage;
}


// Initialize slideshow
initializeSlideshow();

// Change image every 7 seconds
setInterval(changeSlide, 7000);


// 3. COLLAPSIBLE SHORTCUT MENU
// ==========================================

const menuToggle = document.getElementById("menu-toggle");
const appDock = document.getElementById("app-dock");

if (menuToggle && appDock) {

    // Menu starts collapsed
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Show shortcuts");

    appDock.classList.remove("open");
    appDock.inert = true;

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        // Toggle menu state
        menuToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Show shortcuts" : "Hide shortcuts"
        );

        // Show or hide shortcuts
        appDock.classList.toggle("open", !isOpen);

        // Prevent interaction with hidden links
        appDock.inert = isOpen;
    });
}

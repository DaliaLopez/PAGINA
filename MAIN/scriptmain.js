let currentGroup = 0;
const track = document.querySelector(".carousel-track");
const groups = document.querySelectorAll(".carousel-group");
const totalGroups = groups.length;

function moveSlide(direction) {
    currentGroup += direction;

    if (currentGroup < 0) {
        currentGroup = totalGroups - 1; // Vuelve al último grupo
    } else if (currentGroup >= totalGroups) {
        currentGroup = 0; // Vuelve al primer grupo
    }

    updateCarousel();
}

function updateCarousel() {
    const newTransform = -currentGroup * 100 + "%"; // Mueve el track a la posición correcta
    track.style.transform = `translateX(${newTransform})`;
    track.style.transition = "transform 0.5s ease-in-out";
}
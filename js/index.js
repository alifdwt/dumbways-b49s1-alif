let isOpenHamburger = false;

function openHamburger() {
    let hamburgerMenu = document.getElementById("hamburger-menu");

    if (!isOpenHamburger) {
        hamburgerMenu.style.display = "block";
        isOpenHamburger = true;
    } else {
        hamburgerMenu.style.display = "none";
        isOpenHamburger = false;
    }
}
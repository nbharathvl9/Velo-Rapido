function toggleMenu() {
    const navOverlay = document.getElementById('navOverlay');
    const menuToggler = document.querySelector('.menu-toggler');

    navOverlay.classList.toggle('open'); // Toggle the class for the overlay
    menuToggler.classList.toggle('open');
}

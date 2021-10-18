function showMenu() {
    document.getElementById('overlay-menu').classList.remove('hide-menu');
    document.getElementById('overlay-menu').classList.add('show-menu');

}

function hideMenu() {
    document.getElementById('overlay-menu').classList.remove('show-menu');
    document.getElementById('overlay-menu').classList.add('hide-menu');
}

function openMenu() {
    navbar = document.getElementById('overlay-menu');

    if (navbar.classList.contains("hide-menu")) {
        showMenu();
    } else {
        hideMenu();
    }
}


function currentProfil() {
    let profilIcon = document.getElementById('profil-picture');
    profilIcon.src = currentUser[0].img;
}
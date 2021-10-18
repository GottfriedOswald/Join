function showMenu() {
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay-menu').classList.remove('hide-menu');
    document.getElementById('overlay-menu').classList.add('show-menu');

}

function hideMenu() {
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('overlay-menu').classList.remove('show-menu');
    document.getElementById('overlay-menu').classList.add('hide-menu');
}


function currentProfil() {
    let profilIcon = document.getElementById('profil-picture');
    profilIcon.src = currentUser[0].img;

    let profilIconOverlay = document.getElementById('profil-picture2');
    profilIconOverlay.src = currentUser[0].img;
}
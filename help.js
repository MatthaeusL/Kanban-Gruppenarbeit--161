/* --------------------------------------------------------Help Script----------------------------------------------- */
function showHelp() {
    let section = document.getElementById('description' + i);
    let chevron = document.getElementById('chevron' + i);
    if (notOpen(section)) {
        openHelp(chevron, section);
    } else {
        closeHelp(chevron, section);
    }
}

function openHelp() {
    let chevron = document.getElementById('chevron');
    setTimeout(() => {
        chevron.style.transform = 'rotate(180deg)'
    }, 10);
    document.getElementById('content').classList.remove('d-none');
}

function closeHelp() {
    let chevron = document.getElementById('chevron');
    setTimeout(() => {
        chevron.style.transform = 'rotate(180deg)'
    }, 10);
    document.getElementById('content').classList.add('d-none');
}

function notOpen(section) {
    return section.classList.contains('dNone');
}
/**
 * *******************************************************responsive script ******************************************
 */

function showMenu() {
    document.getElementById('menuBand').classList.add('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.remove('d-none');
}

function closeMenu() {
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');
}
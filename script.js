// -----------------------------------------------communication SERVER--------------------------------------------------------------------------

function addUser() {
    users.push('John');
    backend.setItem('users', JSON.stringify(users));
}

function sendToServer() {
    backend.setItem('kanbanArray', JSON.stringify(kanbanArray));
}
async function init() {
    await downloadFromServer();
    kanbanArray = JSON.parse(backend.getItem('kanbanArray')) || [];
    click_nav_board();
    renderBoard();
    backlogTasks();
}

function deleteServer() {
    backend.deleteItem('kanbanArray');
}

/**
 * *******************************************************navigation to divs ******************************************
 */

async function click_nav_board() {


    document.getElementById('nav_board').style = 'border-left : solid var(--bgWhite) .4rem;  color: var(--bgWhite);';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = '';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
    document.getElementById('impressum_container').style.display = 'none';
    document.getElementById('datenschutz_container').style.display = 'none';
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');
}

async function click_nav_backlog() {
    checkBacklogEmpty();
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = 'border-left : solid var(--bgWhite) .4rem; color: var(--bgWhite);';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = '';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
    document.getElementById('impressum_container').style.display = 'none';
    document.getElementById('datenschutz_container').style.display = 'none';
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');
}

function click_nav_addtask() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = 'border-left : solid var(--bgWhite) .4rem; color: var(--bgWhite);';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = '';
    document.getElementById('help_container').style.display = 'none';
    document.getElementById('impressum_container').style.display = 'none';
    document.getElementById('datenschutz_container').style.display = 'none';
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');
}

function click_help() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = 'border-left : solid var(--bgWhite) .4rem; color: var(--bgWhite);';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = '';
    document.getElementById('impressum_container').style.display = 'none';
    document.getElementById('datenschutz_container').style.display = 'none';
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');
}


/********************************************************Impressum*******************************************************/ 
function click_impressum() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
    document.getElementById('impressum_container').style.display = '';
    document.getElementById('datenschutz_container').style.display = 'none';
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');

    document.getElementById("impressumContent").innerHTML='<object class="impressum" type="text/html" data="impressum.html" ></object>';
}


/************************************************************Datenschutz**************************************************/

function click_datenschutz() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
    document.getElementById('impressum_container').style.display = 'none';
    document.getElementById('datenschutz_container').style.display = '';
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');

    document.getElementById("datenschutzContent").innerHTML='<object class="datenschutz" type="text/html" data="datenschutz.html" ></object>';
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


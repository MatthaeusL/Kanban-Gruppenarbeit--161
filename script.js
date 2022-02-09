// -----------------------------------------------communication SERVER--------------------------------------------------------------------------

/**
 * Saving the main JSON on Server as Text
 * 
 * @param {JSON} kanbanarray - main JSON
 * @param {} backend - pre finished variable from mini_backend.js
 */
function sendToServer() {
    backend.setItem('kanbanArray', JSON.stringify(kanbanArray));
}

/**
 * Onload body initializing, get main JSON from server, convert from text
 * Open Board page, redner Board resp. Kanban cards
 * Render and check Backlog entries
 */
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

/**
 * Show Navbar and hide other contens
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
    cancelEdit()
}

/**
 * Checking if Backlog is empty or filled, Show Backlog elements and hide other content
 */
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
    cancelEdit()
}

/**
 * Showing Add Task Page and hiding other content
 */
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
    cancelEdit()
}

/**
 * Showing Help Content and Hiding other content
 */
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
    cancelEdit()
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

    document.getElementById("impressumContent").innerHTML = '<object class="impressum" type="text/html" data="impressum.html" ></object>';
    cancelEdit()
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

    document.getElementById("datenschutzContent").innerHTML = '<object class="datenschutz" type="text/html" data="datenschutz.html" ></object>';
}



/**
 * *******************************************************responsive script ******************************************
 */

/**
 * Opening responsive Navbar and putting Overlayer over Content
 */
function showMenu() {
    document.getElementById('menuBand').classList.add('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.remove('d-none');
}

/**
 * Closing responsive Navbar and removing Overlayer over Content
 */
function closeMenu() {
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');
}
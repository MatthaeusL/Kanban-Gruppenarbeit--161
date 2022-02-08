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
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');
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

// function moveTo(status) {
//     kanbanArray[0]["tasks"][currentDragged]['status'] = status;
//     sendToServer();
//     renderBoard();
// }
// Get task Index by ID
function moveToByClick(status, id) {
    let index = getTaskID(id);
    kanbanArray[0]["tasks"][index]['status'] = status;
    sendToServer();
    renderBoard();
}

function showOptionsMoveTo(status, id) {
    document.getElementById('overlay' + id).classList.remove('d-none');

    if (status == 'todo') {
        document.getElementById(`moveTo0-${id}`).innerHTML = `<span onclick="moveToByClick('inprogress', ${id})"><b>IN PROGRESS</b><span>`;
        document.getElementById(`moveTo1-${id}`).innerHTML = `<span onclick="moveToByClick('testing', ${id})"><b>TESTING</b><span>`;
        document.getElementById(`moveTo2-${id}`).innerHTML = `<span onclick="moveToByClick('done', ${id})"><b>DONE</b><span>`;
    }
    else {
        if (status == 'inprogress') {
            document.getElementById(`moveTo0-${id}`).innerHTML = `<span onclick="moveToByClick('todo', ${id})"><b>TO DO</b><span>`;
            document.getElementById(`moveTo1-${id}`).innerHTML = `<span onclick="moveToByClick('testing', ${id})"><b>TESTING</b><span>`;
            document.getElementById(`moveTo2-${id}`).innerHTML = `<span onclick="moveToByClick('done', ${id})"><b>DONE</b><span>`;
        }
        else {
            if (status == 'testing') {
                document.getElementById(`moveTo0-${id}`).innerHTML = `<span onclick="moveToByClick('todo', ${id})"><b>TO DO</b><span>`;
                document.getElementById(`moveTo1-${id}`).innerHTML = `<span onclick="moveToByClick('inprogress', ${id})"><b>IN PROGRESS</b><span>`;
                document.getElementById(`moveTo2-${id}`).innerHTML = `<span onclick="moveToByClick('done', ${id})"><b>DONE</b><span>`;
            }
            else {
                if (status == 'done') {
                    document.getElementById(`moveTo0-${id}`).innerHTML = `<span onclick="moveToByClick('todo', ${id})">TO DO<span>`;
                    document.getElementById(`moveTo1-${id}`).innerHTML = `<span onclick="moveToByClick('testing', ${id})">TESTING<span>`;
                    document.getElementById(`moveTo2-${id}`).innerHTML = `<span onclick="moveToByClick('inprogress', ${id})">IN PROGRESS<span>`;
                }
            }
        }
    }
}

function closeOptionsMoveTo(id) {
    document.getElementById('overlay' + id).classList.add('d-none');
}
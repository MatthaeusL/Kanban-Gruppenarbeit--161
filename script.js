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


// -----------------------------------------------Board Script--------------------------------------------------------------------------

function renderBoard() {
    renderBoardTodo();
    renderBoardInprogress();
    renderBoardTesting();
    renderBoardDone();
}

function renderBoardTodo() {
    let filterStatusTodo = kanbanArray[0]["tasks"].filter((k) => k.status == 'todo');
    let boardTodo = document.getElementById('board_todo');
    boardTodo.innerHTML = "";
    for (let i = 0; i < filterStatusTodo.length; i++) {
        let status = filterStatusTodo[i];
        boardTodo.innerHTML += generateBoardHTML(status);
    }
}

function renderBoardInprogress() {
    let filterStatusInProgress = kanbanArray[0]["tasks"].filter((k) => k.status == 'inprogress');
    let boardInprogress = document.getElementById('board_inprogress');
    boardInprogress.innerHTML = "";
    for (let j = 0; j < filterStatusInProgress.length; j++) {
        let status = filterStatusInProgress[j];
        boardInprogress.innerHTML += generateBoardHTML(status);
    }
}

function renderBoardTesting() {
    let filterStatusTesting = kanbanArray[0]["tasks"].filter((k) => k.status == 'testing');
    let boardTesting = document.getElementById('board_testing');
    boardTesting.innerHTML = '';
    for (let k = 0; k < filterStatusTesting.length; k++) {
        let status = filterStatusTesting[k];
        boardTesting.innerHTML += generateBoardHTML(status);
    }
}

function renderBoardDone() {
    let filterStatusdone = kanbanArray[0]["tasks"].filter((k) => k.status == 'done');
    let boardDone = document.getElementById('board_done');
    boardDone.innerHTML = '';
    for (let m = 0; m < filterStatusdone.length; m++) {
        let status = filterStatusdone[m];
        boardDone.innerHTML += generateBoardHTML(status);
    }
}

// -----------------------------------------------Drag n´Drop functions--------------------------------------------------------------------------
let currentDragged;

function startDragging(taskid) {
    let currentID = kanbanArray[0]["tasks"].findIndex((id) => id.taskid == taskid); // Filter to find the index of current Taskid

    currentDragged = currentID;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    kanbanArray[0]["tasks"][currentDragged]['status'] = status;
    sendToServer()
    renderBoard()
}

function getProfilePic(currentUser) {
    for (let i = 0; i < kanbanArray[0]['users'].length; i++) {
        if (kanbanArray[0]['users'][i]['username'] == currentUser) {
            return i;

        }
    }

}

function highlight(id) {
    document.getElementById(id).classList.add('boardColumnHighlight');
}

function removehighlight(id) {
    document.getElementById(id).classList.remove('boardColumnHighlight');
}

/* ---------------------------------------------------------Board single Card------------------------------------- */

function generateBoardHTML(status) {
    let currentUserTest = status['assignedTo'];
    let profilePicID = getProfilePic(currentUserTest);
    return `
    <div class="singleCard" style="border-color: var(${status['urgencyColor']});" id="singleCard${status['taskid']}" draggable="true" ondragstart="startDragging(${status['taskid']})">
        <div>
            <div class="dateAndTrash">
                <span class="singleCardDate">${status['duedate']}</span> 
                <img onclick="deleteCard('${status['taskid']}')" class="trashImg" src="./logo/bin.png"
            </div>    
        </div>
        <div>
            <h3>${status['title']}</h3> 
            <span class="singleCardDescription">${status['description']}</span> 
        </div>    
        <div class="categoryAndImg">
            <span class="singleCardCategory" style="background-color: var(${status['categoryColor']})">${status['category']}</span>
            <img class="imgAvatar3" src="./img/${kanbanArray[0]["users"][profilePicID]['img']}" style="border-color: var(${kanbanArray[0]["users"][profilePicID]['color']})"></img>
        </div>      
    </div>`;
}

/**
 * Löscht ausgewählte Karte per Klick auf Mülleimer
 * 
 * @param {*} statusTaskid 
 */
function deleteCard(statusTaskid) {
    findIndex = kanbanArray[0]["tasks"].findIndex((id) => id.taskid == statusTaskid)
    kanbanArray[0]['tasks'].splice(findIndex, 1);
    sendToServer()
    renderBoard()
}

function getTaskID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['tasks'].length; i++) {
        if (kanbanArray[0]['tasks'][i]['taskid'] == currentUser) {
            return i;
        }
    }
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
 *  ***************User Einfügen*****************
 * Durch neue Funktion ersetzt
 */

/**----------------------------------------------------Backlog Script--------------------------------------------------------- */

let backlogEmpty;

async function backlogTasks() {
    let filterStatusBacklog = kanbanArray[0]["tasks"].filter((k) => k.status == 'backlog');
    backlogEmpty = filterStatusBacklog.length;
    let userContainer = document.getElementById('backlog_users');
    userContainer.innerHTML = '';
    for (let i = 0; i < filterStatusBacklog.length; i++) {
        let currentUser = filterStatusBacklog[i]['assignedTo'];
        let currentUserID = await getUserID(currentUser);
        userContainer.innerHTML += await generateBacklogHTML(i, currentUserID, filterStatusBacklog);
        document.getElementsByClassName('infoContainer')[i].style.borderLeftColor = `var(${kanbanArray[0]["users"][currentUserID]['color']})`;
    }
}

async function generateBacklogHTML(i, currentUserID, filterStatusBacklog) {
    return `
    <div id="backlog_user${i}" onclick="shiftToBoard(${filterStatusBacklog[i]['taskid']})"" >
        <div class="infoContainer">    
            <div class="imgContainer3">
                <img class="imgAvatar2" src="./img/${kanbanArray[0]["users"][currentUserID]['img']}">
                <div class="row">
                    <span>${kanbanArray[0]["users"][currentUserID]['username']}</span>
                    <a href="mailto:${kanbanArray[0]["users"][currentUserID]['email']}">${kanbanArray[0]["users"][currentUserID]['email']}</a>
                </div>
            </div>
            <div class="department">
                <span>${filterStatusBacklog[i]['category']}</span>
            </div>
            <div class="details">
                <span>${filterStatusBacklog[i]['description']}</span>
            </div>
        </div>
    </div>`;
}

function shiftToBoard(m) {
    let arrayIndex = kanbanArray[0]["tasks"].findIndex((id) => id.taskid == m); // Filter to find the index of current Taskid
    kanbanArray[0]["tasks"][arrayIndex]['status'] = 'todo';
    sendToServer()
    click_nav_board()
    backlogTasks()
    renderBoard()
}

async function getUserID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['users'].length; i++) {
        if (kanbanArray[0]['users'][i]['username'] == currentUser) {
            return i;
        }
    }
}

function checkBacklogEmpty() {
    backlogTasks();
    if (backlogEmpty == 0) {
        document.getElementById('emptyBacklog').style.display = '';
        document.getElementById('backlogTableHeader').style.display = 'none';

    } else {
        document.getElementById('emptyBacklog').style.display = 'none';
        document.getElementById('backlogTableHeader').style.display = '';
    }
}

// -----------------------------------------------Add Task Script--------------------------------------------------------------------------

async function addNewTask() {
    let arraylength = kanbanArray[0]["tasks"].length;
    let arrayTasksTaskid = kanbanArray[0]["tasks"][arraylength - 1]['taskid']
    let taskid = arrayTasksTaskid + 1;
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let duedate = document.getElementById('duedate').value;
    let urgency = document.getElementById('urgency').value;
    let assignedTo = "Laura Trautmann";
    let status = 'backlog';
    if (urgency == 'high') {
        urgencyColor = '--bgVeryImportant'
    }
    if (urgency == 'medium') {
        urgencyColor = '--bgIMportant'
    }
    if (urgency == 'low') {
        urgencyColor = '--bgNotSoImportant'
    }

    if (title.length == 0 || duedate.length == 0 || description.length == 0) {
        document.getElementById('title').classList.add('placeholderColor');
        document.getElementById('duedate').classList.add('datePlaceholderColor');
        document.getElementById('description').classList.add('placeholderColor');
        alert(' We need an infobox to fill the fields')
    } else {
        let newTask = {
            'taskid': taskid,
            'title': title,
            'category': category,
            'description': description,
            'duedate': duedate,
            'urgency': urgency,
            'assignedTo': assignedTo,
            'status': status,
            'urgencyColor': urgencyColor,
        }
        kanbanArray[0]["tasks"].push(newTask);
        document.getElementById('emptyBacklog').style.display = 'none';

        clearInput()
        click_nav_backlog();
        backlogTasks();


    }
    await sendToServer()


}

function clearInput() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('duedate').value = '';
    document.getElementById('title').classList.remove('placeholderColor');
    document.getElementById('duedate').classList.remove('datePlaceholderColor');
    document.getElementById('description').classList.remove('placeholderColor');

}


/**
 * Check the checkboxes from LoadUsers() and push the id to the assignedUser Array. Insert the User img.
 * 
 * @param {*} input 
 * @param {*} userIDArray 
 * @param {*} userIDArrayuserid 
 */
function handleChoise(input, userIDArrayimg, userIDArrayuserid) {
    if (input.checked) {
        assignedUser.push(userIDArrayuserid);
        addMembersImg(userIDArrayimg);
        console.log('addMemberImg hinzufügen');
    } else {
        let imgX = document.getElementById(userIDArrayimg);
        imgX.parentNode.removeChild(imgX);
        document.getElementById('userContainerHide').classList.add('d-none');
        console.log('addMemberImg löschen');
    }
}

/**
 * remove the hidding Class 
 * 
 */
function showUser() {
    document.getElementById('userContainerHide').classList.remove('d-none');
}

/**
 *  loads the List hided in the Browser 
 * 
 */
function loadUser() {
    let members = document.getElementById('userContainerHide');
    // members.classList.remove('d-none');
    members.innerHTML = '';
    for (let i = 0; i < kanbanArray[0]["users"].length; i++) {
        let userIDArray = kanbanArray[0]["users"][i];
        members.innerHTML += `
        <div class="userContainer">
            <label for="${userIDArray['userid']}">${userIDArray['username']}</label>
            <input onclick="handleChoise(this,'${userIDArray['img']}','${userIDArray['userid']}')" id="${userIDArray['userid']}" class="checkbox" type="checkbox">
        </div>`;
    }
}

/**
 * insert the User img in the Browser
 * 
 * @param {*} userIDArrayimg 
 */
function addMembersImg(userIDArrayimg) {
    let img = document.getElementById('imgMembers');
    img.innerHTML += `
    <img id="${userIDArrayimg}" class="imgAvatar2" style="cursor: pointer;" src="./img/${userIDArrayimg}">
    `;
    document.getElementById('userContainerHide').classList.add('d-none');
}

// showSelectedUser() {
//     for (let i = 0; i < assignedUser.length; i++) {
//     }
// }


/* --------------------------------------------------------Help Script----------------------------------------------- */
function showHelp() {
    let section = document.getElementById('description' + i);
    let chevron = document.getElementById('chevron' + i);
    if (notOpen(section)) {
        openHelp(chevron, section);
    }
    else {
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

 function showMenu(){
    document.getElementById('menuBand').classList.add('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.remove('d-none');
}

function closeMenu(){
    document.getElementById('menuBand').classList.remove('showMenuBand');
    document.getElementById('overlayerMenuBand').classList.add('d-none');
}

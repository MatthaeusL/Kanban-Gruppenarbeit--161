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
            <img class="arrowRight" src="img/arrowRight.png" onclick="showOptionsMoveTo('${status['status']}', ${status['taskid']})">
        </div>
            <div class="moveToOverlay d-none" id="overlay${status['taskid']}">
                 <div class="moveToOverlayClose" onclick="closeOptionsMoveTo(${status['taskid']})">X</div>
                 <span>Move To..</span>
                  <span id="moveTo0-${status['taskid']}">Container 0</span>
                  <span id="moveTo1-${status['taskid']}">Container 1</span>
                   <span id="moveTo2-${status['taskid']}">Container 2</span>
            </div>
    </div>`;
}

function getTaskID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['tasks'].length; i++) {
        if (kanbanArray[0]['tasks'][i]['taskid'] == currentUser) {
            return i;
        }
    }
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
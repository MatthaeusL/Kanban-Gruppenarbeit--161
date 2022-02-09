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
            <div class="avatarContainer">
                <img class="imgAvatarStack1" src="./img/${kanbanArray[0]["users"][profilePicID]['img']}" style="border-color: var(${kanbanArray[0]["users"][profilePicID]['color']})"></img>
                <img class="imgAvatarStack2" src="./img/${kanbanArray[0]["users"][profilePicID]['img']}" style="border-color: var(${kanbanArray[0]["users"][profilePicID]['color']})"></img>
                <img class="imgAvatarStack3" src="./img/${kanbanArray[0]["users"][profilePicID]['img']}" style="border-color: var(${kanbanArray[0]["users"][profilePicID]['color']})"></img>
            </div>      
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
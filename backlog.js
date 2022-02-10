let backlogEmpty;

/**
 * Rendering Backlog Entries by task status 'backlog'
 */
async function backlogTasks() {
    let filterStatusBacklog = kanbanArray[0]["tasks"].filter((k) => k.status == 'backlog');
    backlogEmpty = filterStatusBacklog.length;
    let userContainer = document.getElementById('backlog_users');
    userContainer.innerHTML = '';
    for (let i = 0; i < filterStatusBacklog.length; i++) {
        let currentUser = filterStatusBacklog[i]['assignedTo'][0];
        let currentUserID = currentUser;
        userContainer.innerHTML += await generateBacklogHTML(i, currentUserID, filterStatusBacklog);
        document.getElementsByClassName('infoContainer')[i].style.borderLeftColor = `var(${kanbanArray[0]["users"][currentUserID]['color']})`;
        generateUserImgs(i, filterStatusBacklog);
    }
}

/**
 * Generating HTML Backlog entries
 * @param {number} i -- Task ID
 * @param {number} currentUserID  -- Current USer ID, first User
 * @param {*} filterStatusBacklog  --     JSON with Backlog Tasks
 * @returns 
 */
async function generateBacklogHTML(i, currentUserID, filterStatusBacklog) {
    return `
    <div id="backlog_user${i}" >
        <div class="infoContainer">    
            <div class="imgContainer3">
                <div id="BLhiddenUserAssigned${i}" class="BLhiddenUserAssigned d-none"> 
                    <div class="closeUsersBL" onclick="closeUsersBL(${i})">X</div>
                </div>
                <div id="stackedImgBL${i}"  class="stackedImgBL">
                </div>
                <div class="row" onclick="shiftToBoard(${filterStatusBacklog[i]['taskid']})">
                <span>${kanbanArray[0]["users"][currentUserID]['username']}</span>
                    <a class="email" href="mailto:${kanbanArray[0]["users"][currentUserID]['email']}">${kanbanArray[0]["users"][currentUserID]['email']}</a>
                </div>
            </div>
            <div class="department" onclick="shiftToBoard(${filterStatusBacklog[i]['taskid']})">
                <span>${filterStatusBacklog[i]['category']}</span>
            </div>
            <div class="details" onclick="shiftToBoard(${filterStatusBacklog[i]['taskid']})">
                <span>${filterStatusBacklog[i]['description']}</span>
            </div>
        </div>
    </div>`;
}

/**
 * Rendering one or more Images of User
 * @param {*} i 
 * @param {*} filterStatusBacklog 
 */
function generateUserImgs(i, filterStatusBacklog) {
    let img = document.getElementById(`stackedImgBL${i}`);
    let amountUser = filterStatusBacklog[i]['assignedTo'].length;
    for (let j = 0; j < amountUser; j++) {
        let assignedUserIndex = filterStatusBacklog[i]['assignedTo'][j];

        img.innerHTML += `
            <img class="imgAvatar2 stackedImgBL${j}" onclick="showBLusers(${i})" src="./img/${kanbanArray[0]["users"][assignedUserIndex]['img']}">
            `;
        document.getElementById(`BLhiddenUserAssigned${i}`).innerHTML += `
            <img class="imgAvatar2 stackedImgBL${j}" onclick="showBLusers(${i})" src="./img/${kanbanArray[0]["users"][assignedUserIndex]['img']}">
            `;
    }
}

/**
 * Shows all Users assigned to Task, open separate Div
 * @param {number} id - Task ID
 */
function showBLusers(id) {
    document.getElementById(`BLhiddenUserAssigned${id}`).classList.remove('d-none');
}

/**
 * Hides above opened Div
 * @param {number} id  Task ID
 */
function closeUsersBL(id) {
    document.getElementById(`BLhiddenUserAssigned${id}`).classList.add('d-none');
}

/**
 * Moves clicked Entry to Board/To do
 * @param {number} m -- Task ID
 */
function shiftToBoard(m) {
    let arrayIndex = kanbanArray[0]["tasks"].findIndex((id) => id.taskid == m); // Filter to find the index of current Taskid
    kanbanArray[0]["tasks"][arrayIndex]['status'] = 'todo';
    sendToServer()
    click_nav_board()
    backlogTasks()
    renderBoard()
}

/**
 * Searches User ID by CurrentUser Parameter
 * @param {text} currentUser 
 * @returns Current User ID as number
 */
async function getUserID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['users'].length; i++) {
        if (kanbanArray[0]['users'][i]['username'] == currentUser) {
            return i;
        }
    }
}

/**
 * If there are no Tasks with Status'backlog', an extra Information is showed
 */
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
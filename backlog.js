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
                    <a class="email" href="mailto:${kanbanArray[0]["users"][currentUserID]['email']}">${kanbanArray[0]["users"][currentUserID]['email']}</a>
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
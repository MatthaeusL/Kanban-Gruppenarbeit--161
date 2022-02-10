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
    console.table(filterStatusBacklog);
    for (let i = 0; i < filterStatusBacklog.length; i++) {
        let currentUser = filterStatusBacklog[i]['assignedTo'][0];
        let currentUserID = currentUser;
        console.log('currentUser :', currentUser)
        console.log('currentUserID :', currentUserID)

        userContainer.innerHTML += await generateBacklogHTML(i, currentUserID, filterStatusBacklog);
        document.getElementsByClassName('infoContainer')[i].style.borderLeftColor = `var(${kanbanArray[0]["users"][currentUserID]['color']})`;
        generateUserImgs(i, filterStatusBacklog);
    }
}

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

function showBLusers(id) {
    document.getElementById(`BLhiddenUserAssigned${id}`).classList.remove('d-none');
}

function closeUsersBL(id) {
    document.getElementById(`BLhiddenUserAssigned${id}`).classList.add('d-none');
}


async function generateBacklogHTML(i, currentUserID, filterStatusBacklog) {

    return `
    <div id="backlog_user${i}" >
        <div class="infoContainer">    
            <div class="imgContainer3">

                <div id="BLhiddenUserAssigned${i}" class="BLhiddenUserAssigned "> 
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


//Das wurde oberhalb der EMail entfernt                     


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
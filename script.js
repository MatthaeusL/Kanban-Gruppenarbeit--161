let kanbanArray = [{
    'tasks': [{
            'taskid': 0,
            'title': 'Code some',
            'category': 'Development',
            'description': 'A Task for Inav: Code 10000 Rows',
            'duedate': '2022-02-24',
            'urgency': 'urgency',
            'assignedTo': 'Inav Bolski',
            'status': 'todo',
            'urgencyColor': '--bgVeryImportant',
            'categoryColor': '--bgDevelopment',

        },
        {
            'taskid': 1,
            'title': 'Check Data',
            'category': 'Management',
            'description': 'A task for Klaus. Check Business Data for next trades.',
            'duedate': '2022-02-24',
            'urgency': 'urgency',
            'assignedTo': 'Klaus Meier',
            'status': 'inprogress',
            'urgencyColor': ' --bgNotSoImportant',
            'categoryColor': '--bgManagment',
        },
        {
            'taskid': 2,
            'title': 'Party',
            'category': 'Inhouse',
            'description': 'A task for Laura: Organise a massive carnival Party',
            'duedate': '2022-02-24',
            'urgency': 'urgency',
            'assignedTo': 'Laura Trautmann',
            'status': 'backlog',
            'urgencyColor': '--bgVeryImportant',
            'categoryColor': '--bgInhouse',
        },
        {
            'taskid': 3,
            'title': 'Aquise',
            'category': 'Sales',
            'description': 'A Task for Tom: Get more clients by end of the day',
            'duedate': '2022-02-24',
            'urgency': 'urgency',
            'assignedTo': 'Tom Müller',
            'status': 'backlog',
            'urgencyColor': '--bgIMportant: yellow',
            'categoryColor': '--bgSale',
        },
        {
            'taskid': 4,
            'title': 'Hire people',
            'category': 'Human ressources',
            'description': 'A task for Karin: Hire some rocket scientists',
            'duedate': '2022-02-25',
            'urgency': 'urgency',
            'assignedTo': 'Karin Schneider',
            'status': 'backlog',
            'urgencyColor': ' --bgNotSoImportant',
            'categoryColor': '--bgHumanRessources',
        }
    ],
    'users': [{
            'userid': 0,
            'username': 'Klaus Meier',
            'email': 'Klaus_Meier@web.de',
            'key': 'key',
            'img': 'face1.jpg',
            'category': 'Marketing',
            'color': '--bgMarketing',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': 1,
            'username': 'Inav Bolski',
            'email': 'InavBolski@Yahoo.de',
            'key': 'key',
            'img': 'face3.jpg',
            'category': 'Sale',
            'color': '--bgSale',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': 2,
            'username': 'Laura Trautmann',
            'email': 'Laura-Trautmann@t-online.de',
            'key': 'key',
            'img': 'face5.jpg',
            'category': 'Design',
            'color': '--bgDesign',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': 3,
            'username': 'Tom Müller',
            'email': 'MüllerTom@GMX.de',
            'key': 'key',
            'img': 'face2.jpg',
            'category': 'Sale',
            'color': '--bgSale',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        },
        {
            'userid': 4,
            'username': 'Karin Schneider',
            'email': 'Schneider@web.de',
            'key': 'key',
            'img': 'face4.jpg',
            'category': 'Service',
            'color': '--bgService',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',
        }
    ]
}]


assignedUser = [];


let users = {
    'userid_1': 'userid_12',
    'username': 'username',
    'email': 'email',
    'key': 'key',
    'img': 'img',
    'category': 'category',
    'color': 'color',
};

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

function startDragging(id) {
    currentDragged = id;
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
    kanbanArray[0]['tasks'].splice(statusTaskid, 1);
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
    checkBacklogEmpty()

    document.getElementById('nav_board').style = 'border-left : solid var(--bgWhite) .4rem;  color: var(--bgWhite);';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = '';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
    // await renderBoard();
}

async function click_nav_backlog() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = 'border-left : solid var(--bgWhite) .4rem; color: var(--bgWhite);';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = '';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
    // await backlogTasks();
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
}


/**
 *  ***************User Einfügen*****************
 * Durch neue Funktion ersetzt
 */

/**----------------------------------------------------Backlog Script--------------------------------------------------------- */

// async function backlogUsers() {
//     let userContainer = document.getElementById('backlog_users');
//     userContainer.innerHTML = '';

//     for (let i = 0; i < usersInArray.length; i++) {
//         userContainer.innerHTML += `
//         <div id="backlog_user${i}" class="infoContainer">
//             <div class="imgContainer3">
//                 <img class="imgAvatar2" src="./img/${usersInArray[i]['img']}">
//                 <div class="row">
//                     <span>${usersInArray[i]['username']}</span>
//                     <a href="mailto:${usersInArray[i]['email']}">${usersInArray[i]['email']}</a>
//                 </div>
//             </div>

//             <div class="department">
//                 <span>${usersInArray[i]['category']}</span>
//             </div>

//             <div class="details">
//                 <span>${usersInArray[i]['detail']}</span>
//             </div>
//         </div>`;
//         document.getElementsByClassName('infoContainer')[i].style.borderLeftColor = `var(${usersInArray[i]['color']})`;
//     }
// }
let backlogEmpty = [];

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
    kanbanArray[0]["tasks"][m]['status'] = 'todo';
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
    backlogTasks()
    if (backlogEmpty == 0) {
        document.getElementById('emptyBacklog').style.display = '';
    } else {
        document.getElementById('emptyBacklog').style.display = 'none';
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


// function addMembers() {
//     let members = document.getElementById('userContainerHide');
//     members.classList.remove('d-none');
//     members.innerHTML = '';
//     for (let i = 0; i < usersInArray.length; i++) {
//         let userIDArray = usersInArray[i];
//         members.innerHTML += `
//         <div class="userContainer">
//             <label for="${userIDArray['userid']}">${usersInArray[i]['username']}</label>
//             <input onclick="addMembersImg('${userIDArray['img']}'); choosedUser('${userIDArray['userid']}')" id="${ userIDArray['userid']}" class="checkbox" type="checkbox">
//         </div>`;
//     }
// }

// function addMembersImg(userIDArrayimg) {
//     let img = document.getElementById('imgMembers');
//     img.innerHTML += `
//     <img class="imgAvatar2" style="cursor: pointer;" src="./img/${userIDArrayimg}">
//     `;
//     document.getElementById('userContainerHide').classList.add('d-none');
// }





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
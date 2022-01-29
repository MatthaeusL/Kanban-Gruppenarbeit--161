let kanbanArray = [{
    'tasks': [{
            'taskid': 0,
            'title': 'title',
            'category': 'category',
            'description': 'description',
            'duedate': 'duedate',
            'urgency': 'urgency',
            'assignedTo': 'use',
            'status': 'todo',

        },
        {
            'taskid': 1,
            'title': 'title',
            'category': 'category',
            'description': 'description',
            'duedate': 'duedate',
            'urgency': 'urgency',
            'assignedTo': 'assignedTo',
            'status': 'inprogress',

        },
        {
            'taskid': 2,
            'title': 'title',
            'category': 'category',
            'description': 'description',
            'duedate': 'duedate',
            'urgency': 'urgency',
            'assignedTo': 'assignedTo',
            'status': 'testing',

        },
        {
            'taskid': 3,
            'title': 'title',
            'category': 'category',
            'description': 'description',
            'duedate': 'duedate',
            'urgency': 'urgency',
            'assignedTo': 'assignedTo',
            'status': 'done',

        },
        {
            'taskid': 4,
            'title': 'title',
            'category': '',
            'description': 'description',
            'duedate': 'duedate',
            'urgency': 'urgency',
            'assignedTo': 'assignedTo',
            'status': 'todo',
        }
    ],
    'users': [{
            'userid': 'userid_0',
            'username': 'Klaus Meier',
            'email': 'Klaus_Meier@web.de',
            'key': 'key',
            'img': 'face1.jpg',
            'cathegory': 'Marketing',
            'color': '--bgMarketing',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',

        },
        {
            'userid': 'userid_1',
            'username': 'Inav Bolski',
            'email': 'InavBolski@Yahoo.de',
            'key': 'key',
            'img': 'face3.jpg',
            'cathegory': 'Sale',
            'color': '--bgSale',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',

        },
        {
            'userid': 'userid_2',
            'username': 'Laura Trautmann',
            'email': 'Laura-Trautmann@t-online.de',
            'key': 'key',
            'img': 'face5.jpg',
            'cathegory': 'Design',
            'color': '--bgDesign',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',

        },
        {
            'userid': 'userid_3',
            'username': 'Tom Müller',
            'email': 'MüllerTom@GMX.de',
            'key': 'key',
            'img': 'face2.jpg',
            'cathegory': 'Sale',
            'color': '--bgSale',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',

        },
        {
            'userid': 'userid_4',
            'username': 'Karin Schneider',
            'email': 'Schneider@web.de',
            'key': 'key',
            'img': 'face4.jpg',
            'cathegory': 'Service',
            'color': '--bgService',
            'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod.',

        }
    ]
}]


let users = {
    'userid_1': 'userid_12',
    'username': 'username',
    'email': 'email',
    'key': 'key',
    'img': 'img',
    'category': 'category',
    'color': 'color',

};

let usersInArray = kanbanArray[0]["users"];
let tasksInArray = kanbanArray[0]["tasks"];
let findUser = usersInArray.find((usersInArray) => usersInArray.userid = 'userid_1');
let filterUser = usersInArray.filter((usersInArray) => usersInArray.username == 'username');

let currentDragged;


function renderBoard() {
    let filterStatusTodo = tasksInArray.filter((tasksInArray) => tasksInArray.status == 'todo');
    let boardTodo = document.getElementById('board_todo');
    boardTodo.innerHTML = '';
    for (let i = 0; i < filterStatusTodo.length; i++) {
        let status = filterStatusTodo[i];
        boardTodo.innerHTML += generateHTML(status);

        console.table(status)
    }
    let filterStatusInProgress = tasksInArray.filter((tasksInArray) => tasksInArray.status == 'inprogress');
    let boardInprogress = document.getElementById('board_inprogress');
    boardInprogress.innerHTML = '';
    for (let j = 0; j < filterStatusInProgress.length; j++) {
        let status = filterStatusInProgress[j];

        boardInprogress.innerHTML += generateHTML(status);
        console.table(status);
    }
    let filterStatusTesting = tasksInArray.filter((tasksInArray) => tasksInArray.status == 'testing');
    let boardTesting = document.getElementById('board_testing');
    boardTesting.innerHTML = '';
    for (let k = 0; k < filterStatusTesting.length; k++) {
        let status = filterStatusTesting[k];

        boardTesting.innerHTML += generateHTML(status);
        console.table(status)
    }

    let filterStatusdone = tasksInArray.filter((tasksInArray) => tasksInArray.status == 'done');
    let boardDone = document.getElementById('board_done');
    boardDone.innerHTML = '';
    for (let m = 0; m < filterStatusdone.length; m++) {
        let status = filterStatusdone[m];
        boardDone.innerHTML += generateHTML(status);

        console.table(status)
    }
}

function startDragging(id) {
    currentDragged = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    tasksInArray[currentDragged]['status'] = status;
    renderBoard()
}

function generateHTML(status) {
    return `        
            <div class="task" draggable="true" ondragstart="startDragging(${status['taskid']})">
                taskid = ${status['taskid']} </br>
                status = ${status['status']}
            </div>       
        `;
}



// function addUser() {
//     users.push('John');
//     backend.setItem('users', JSON.stringify(users));
// }
/*async function addUser(name) {
    users.push(name);
    await backend.setItem('users', JSON.stringify(users));

}*/
async function init() {
    // await downloadFromServer();
    // users = JSON.parse(backend.getItem('users')) || [];
    // click_nav_board()
    // backlogUsers()
    renderBoard()
}

/*function deleteUser() {
    backend.deleteItem(kanbanArray);
}

/**
 * ************************ navigation to divs ******************************************
 */

function click_nav_board() {
    document.getElementById('nav_board').style = 'border-left : solid var(--bgWhite) .4rem;';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = '';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
}

function click_nav_backlog() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = 'border-left : solid var(--bgWhite) .4rem;';
    document.getElementById('nav_addtask').style = '';
    document.getElementById('nav_help').style = '';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = '';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = 'none';
}

function click_nav_addtask() {
    document.getElementById('nav_board').style = '';
    document.getElementById('nav_backlog').style = '';
    document.getElementById('nav_addtask').style = 'border-left : solid var(--bgWhite) .4rem;';
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
    document.getElementById('nav_help').style = 'border-left : solid var(--bgWhite) .4rem;';

    document.getElementById('board_container').style.display = 'none';
    document.getElementById('backlog_container').style.display = 'none';
    document.getElementById('addTask_container').style.display = 'none';
    document.getElementById('help_container').style.display = '';
}


/**
 *  ***************User Einfügen*****************
 * 
 */
async function backlogUsers() {
    let userContainer = document.getElementById('backlog_users');
    userContainer.innerHTML = '';
    for (let i = 0; i < usersInArray.length; i++) {

        userContainer.innerHTML += `
        <div id="backlog_user${i}" class="infoContainer">
            <div class="imgContainer3">
                <img class="imgAvatar2" src="./img/${usersInArray[i]['img']}">
                <div class="row">
                    <span>${usersInArray[i]['username']}</span>
                    <a href="mailto:${usersInArray[i]['email']}">${usersInArray[i]['email']}</a>
                </div>
            </div>
            
            <div class="department">
                <span>${usersInArray[i]['category']}</span>
            </div>

            <div class="details">
                <span>${usersInArray[i]['detail']}</span>
            </div>
        </div>`;
        document.getElementsByClassName('infoContainer')[i].style.borderLeftColor = `var(${usersInArray[i]['color']})`;
    }
}

/**
 * Adding a new Task. First: Get all input information, second: push in Kanbanarray
 */
function addNewTask() {
    // optional: check if all Information are made completely
    let taskid = 'taskid' + kanbanArray.length + 1;
    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let description = document.getElementById('description').value;
    let duedate = document.getElementById('duedate').value;
    let urgency = document.getElementById('urgency').value;
    let assignedTo = "Frau mit Brille";
    let status = 'todo';
    let newTask = {
        'taskid': taskid,
        'title': title,
        'category': category,
        'description': description,
        'duedate': duedate,
        'urgency': urgency,
        'assignedTo': assignedTo,
        'status': status,
    }
    kanbanArray[0]['tasks'].push(newTask);
    console.table(kanbanArray[0]['tasks'])
}
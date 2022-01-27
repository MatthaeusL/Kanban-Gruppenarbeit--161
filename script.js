let kanbanArray = [{
    'tasks': [{
        'taskid': 'taskid_0',
        'title': 'title',
        'cathegory': 'cathegory',
        'description': 'description',
        'duedate': 'duedate',
        'urgency': 'urgency',
        'assignedTo': 'assignedTo',
        'status': 'status',

    }],
    'users': [{
        'userid': 'userid_0',
        'username': 'Klaus Meier',
        'email': 'Klaus_Meier@web.de',
        'key': 'key',
        'img': 'face1.jpg',
        'cathegory': 'Marketing',
        'color': '--bgMarketing',
        'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod, placeat eius maxime quibusdam? Laudantium quam vel aperiam placeat.',

    }, {
        'userid': 'userid_1',
        'username': 'Inav Bolski',
        'email': 'InavBolski@Yahoo.de',
        'key': 'key',
        'img': 'face3.jpg',
        'cathegory': 'Sale',
        'color': '--bgSale',
        'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod, placeat eius maxime quibusdam? Laudantium quam vel aperiam placeat.',

    }, {
        'userid': 'userid_2',
        'username': 'Laura Trautmann',
        'email': 'Laura-Trautmann@t-online.de',
        'key': 'key',
        'img': 'face5.jpg',
        'cathegory': 'Design',
        'color': '--bgDesign',
        'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod, placeat eius maxime quibusdam? Laudantium quam vel aperiam placeat.',

    }, {
        'userid': 'userid_3',
        'username': 'Tom Müller',
        'email': 'MüllerTom@GMX.de',
        'key': 'key',
        'img': 'face2.jpg',
        'cathegory': 'Sale',
        'color': '--bgSale',
        'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod, placeat eius maxime quibusdam? Laudantium quam vel aperiam placeat.',

    }, {
        'userid': 'userid_4',
        'username': 'Karin Schneider',
        'email': 'Schneider@web.de',
        'key': 'key',
        'img': 'face4.jpg',
        'cathegory': 'Service',
        'color': '--bgService',
        'detail': 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora dolore culpa optio aut deleniti vitae quod, placeat eius maxime quibusdam? Laudantium quam vel aperiam placeat.',

    }]
}]


let users = {
    'userid_1': 'userid_12',
    'username': 'username',
    'email': 'email',
    'key': 'key',
    'img': 'img',
    'cathegory': 'cathegory',
    'color': 'color',

};

let usersInArray = kanbanArray[0]["users"];
let tasksInArray = kanbanArray[0]["tasks"];
let findUser = usersInArray.find((usersInArray) => usersInArray.userid = 'userid_1');
let filterUser = usersInArray.filter((usersInArray) => usersInArray.username = 'username');




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
    click_nav_board()
    backlogUsers()
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
                <span>${usersInArray[i]['cathegory']}</span>
            </div>

            <div class="details">
                <span>${usersInArray[i]['detail']}</span>
            </div>
        </div>`;
        document.getElementsByClassName('infoContainer')[i].style.borderLeftColor = `var(${usersInArray[i]['color']})`;
    }
}

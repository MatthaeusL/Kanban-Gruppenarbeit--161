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
        'username': 'username',
        'email': 'email',
        'key': 'key',
        'img': 'face2.jpg',

    }, {
        'userid': 'userid_1',
        'username': 'username',
        'email': 'email',
        'key': 'key',
        'img': 'face3.jpg',

    }, {
        'userid': 'userid_2',
        'username': 'username',
        'email': 'email',
        'key': 'key',
        'img': 'face5.jpg',

    }]
}]


let users = {
    'userid_1': 'userid_12',
    'username': 'username',
    'email': 'email',
    'key': 'key',

};

let usersInArray = kanbanArray[0]["users"];
let tasksInArray = kanbanArray[0]["tasks"];
let findUser = usersInArray.find((usersInArray) => usersInArray.userid = 'userid_1');
let filterUser = usersInArray.filter((usersInArray) => usersInArray.username = 'username');




// function addUser() {
//     users.push('John');
//     backend.setItem('users', JSON.stringify(users));
// }
async function addUser(name) {
    users.push(name);
    await backend.setItem('users', JSON.stringify(users));

}
async function init() {
    // await downloadFromServer();
    // users = JSON.parse(backend.getItem('users')) || [];
}

function deleteUser(name) {
    backend.deleteItem('users')
    users = [];
}

/**
 * 
 */

 function backlogUsers(i) {
    let userContainer = document.getElementById('backlog_users');
    userContainer.innerHTML = '';
    for (let x = 0; x < usersInArray.length; x++) {
        userContainer.innerHTML += `
        <div class="imgContainer3">
            <img class="imgAvatar2" src="./img/${usersInArray['img']}">
            <div style="padding-left: 1.5rem;">
                <span>${usersInArray['username']}</span>
                <a href="mailto:${usersInArray['email']}">${usersInArray['email']}}</a>
            </div>
        </div>

        <div class="department">
            <span>${i}</span>
        </div>

        <div class="details">
            <span>${i}</span>
        </div>`;
    }    
}
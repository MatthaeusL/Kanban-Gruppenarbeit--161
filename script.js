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

    }, {
        'userid': 'userid_1',
        'username': 'username',
        'email': 'email',
        'key': 'key',

    }, {
        'userid': 'userid_2',
        'username': 'username',
        'email': 'email',
        'key': 'key',

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
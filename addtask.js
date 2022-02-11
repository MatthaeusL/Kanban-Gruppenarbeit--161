/**
 * 
 */
function addNewTask() {
    let title = document.getElementById('title').value;
    let duedate = document.getElementById('duedate').value;
    let description = document.getElementById('description').value;
    if (title.length == 0 || duedate.length == 0 || description.length == 0 || assignedUser.length == 0 ) {
        highlightUnfilled();
    } else {
        setNewTask();
    }
}

function setNewTask() {
    checkUrgency();
    let arraylength = kanbanArray[0]["tasks"].length;
    let arrayTasksTaskid;
    if (arraylength==0) {
        arrayTasksTaskid = -1;
    }
    else {
        arrayTasksTaskid = kanbanArray[0]["tasks"][arraylength - 1]['taskid'];
    }
    let newTask = {
        'taskid': arrayTasksTaskid + 1,
        'title': document.getElementById('title').value,
        'category': document.getElementById('category').value,
        'description': document.getElementById('description').value,
        'duedate': document.getElementById('duedate').value,
        'urgency': document.getElementById('urgency').value,
        'status': 'backlog',
        'urgencyColor': urgencyColor,
        'assignedTo': assignedUser,

    }
    finishAddingNewTask(newTask);
}





function finishAddingNewTask(newTask) {
    kanbanArray[0]["tasks"].push(newTask);
    document.getElementById('emptyBacklog').style.display = 'none';
    clearInput();
    click_nav_backlog();
    backlogTasks();
    sendToServer();
    assignedUser = [];
}

function checkUrgency() {
    let urgency = document.getElementById('urgency').value;
    if (urgency == 'high') {
        return urgencyColor = '--bgVeryImportant'
    }
    if (urgency == 'medium') {
        return urgencyColor = '--bgIMportant'
    }
    if (urgency == 'low') {
        return urgencyColor = '--bgNotSoImportant'
    }
}

function highlightUnfilled() {
    document.getElementById('title').classList.add('placeholderColor');
    document.getElementById('duedate').classList.add('datePlaceholderColor');
    document.getElementById('description').classList.add('placeholderColor');
    document.getElementById('userContainerHide').classList.remove('d-none');
    document.getElementById('userContainerHide').classList.add('colorRed');

    alert('We need an infobox to fill the fields')
}

function clearInput() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('duedate').value = '';
    document.getElementById('title').classList.remove('placeholderColor');
    document.getElementById('duedate').classList.remove('datePlaceholderColor');
    document.getElementById('description').classList.remove('placeholderColor');
    document.getElementById('userContainerHide').innerHTML = '';
    document.getElementById('imgMembers').innerHTML = '';
    document.getElementById('userContainerHide').classList.add('d-none');
    document.getElementById('userContainerHide').classList.remove('colorRed');
    loadUser();
}


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
    } else {
        let imgX = document.getElementById(userIDArrayimg);
        imgX.parentNode.removeChild(imgX);
        // document.getElementById('userContainerHide').classList.add('d-none');
        console.log('addMemberImg löschen');
    }
    console.log(assignedUser);
}

/**
 * remove the hidding Class 
 * 
 */
function showUser() {
    let members = document.getElementById('userContainerHide');
    if (members.classList.contains('d-none')) {
        members.classList.remove('d-none');
    }
    else {
        members.classList.add('d-none');
    }
}

/**
 *  loads the List hided in the Browser 
 * 
 */
function loadUser() {
    let members = document.getElementById('userContainerHide');
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
    // document.getElementById('userContainerHide').classList.add('d-none');
}
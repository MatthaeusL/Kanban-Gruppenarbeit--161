// -----------------------------------------------Add Task Script--------------------------------------------------------------------------
function addNewTask() {
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
    sendToServer()
}

function clearInput() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('duedate').value = '';
    document.getElementById('title').classList.remove('placeholderColor');
    document.getElementById('duedate').classList.remove('datePlaceholderColor');
    document.getElementById('description').classList.remove('placeholderColor');
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
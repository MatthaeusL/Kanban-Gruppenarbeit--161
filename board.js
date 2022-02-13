/**
 * Rendering each Column of Board
 */
function renderBoard() {
    renderBoardTodo();
    renderBoardInprogress();
    renderBoardTesting();
    renderBoardDone();
}

/**
 * Rendering to do column 
 */
function renderBoardTodo() {
    let filterStatusTodo = kanbanArray[0]["tasks"].filter((k) => k.status == 'todo');
    let boardTodo = document.getElementById('board_todo');
    boardTodo.innerHTML = "";
    for (let i = 0; i < filterStatusTodo.length; i++) {
        let status = filterStatusTodo[i];
        boardTodo.innerHTML += generateBoardHTML(status);
        renderUserImgsInCard(status);
    }
}

/**
 * Rendering in progress column 
 */
function renderBoardInprogress() {
    let filterStatusInProgress = kanbanArray[0]["tasks"].filter((k) => k.status == 'inprogress');
    let boardInprogress = document.getElementById('board_inprogress');
    boardInprogress.innerHTML = "";
    for (let j = 0; j < filterStatusInProgress.length; j++) {
        let status = filterStatusInProgress[j];
        boardInprogress.innerHTML += generateBoardHTML(status);
        renderUserImgsInCard(status);
    }
}

/**
 * Rendering testing column 
 */
function renderBoardTesting() {
    let filterStatusTesting = kanbanArray[0]["tasks"].filter((k) => k.status == 'testing');
    let boardTesting = document.getElementById('board_testing');
    boardTesting.innerHTML = '';
    for (let k = 0; k < filterStatusTesting.length; k++) {
        let status = filterStatusTesting[k];
        boardTesting.innerHTML += generateBoardHTML(status);
        renderUserImgsInCard(status);
    }
}

/**
 * Rendering done column 
 */
function renderBoardDone() {
    let filterStatusdone = kanbanArray[0]["tasks"].filter((k) => k.status == 'done');
    let boardDone = document.getElementById('board_done');
    boardDone.innerHTML = '';
    for (let m = 0; m < filterStatusdone.length; m++) {
        let status = filterStatusdone[m];
        boardDone.innerHTML += generateBoardHTML(status);
        renderUserImgsInCard(status);
    }
}

// -----------------------------------------------Drag n´Drop functions--------------------------------------------------------------------------

let currentDragged;

/**
 * Defining the Object to drag
 * @param {number} taskid  
 */
function startDragging(taskid) {
    let currentID = kanbanArray[0]["tasks"].findIndex((id) => id.taskid == taskid); // Filter to find the index of current Taskid
    currentDragged = currentID;
}

/**
 * Allow to drop Element in the receiving container
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Changed the Status of the Dropped element to the destination Column
 * @param {string} status of destination column
 */
function moveTo(status) {
    kanbanArray[0]["tasks"][currentDragged]['status'] = status;
    sendToServer()
    renderBoard()
}

// Probably not used
// function getProfilePic(currentUser) {
//     for (let i = 0; i < kanbanArray[0]['users'].length; i++) {
//         if (kanbanArray[0]['users'][i]['username'] == currentUser) {
//             return i;
//         }
//     }
// }

/**
 * Hover Effect the dragged Element above new column
 * @param {*} id 
 */
function highlight(id) {
    document.getElementById(id).classList.add('boardColumnHighlight');
}

/**
 * End of above mentioned Hover Effect
 * @param {*} id 
 */
function removehighlight(id) {
    document.getElementById(id).classList.remove('boardColumnHighlight');
}
/* ---------------------------------------------------------Board single Card------------------------------------- */

/**
 * Generate HTML of one Kanban Card
 * @param {JSON} status JSON of one task
 * @returns HTML one Kanban Card
 */
function generateBoardHTML(status) {
    return `
    <div class="singleCard" ondblclick = "editTask(${status['taskid']})" style="border-color: var(${status['urgencyColor']});" id="singleCard${status['taskid']}" draggable="true" ondragstart="startDragging(${status['taskid']})">
        <div>
            <div class="dateAndTrash">
                <span class="singleCardDate">${status['duedate']}</span> 
                <div class="editAndTrash">
                    <img onclick="deleteCard('${status['taskid']}')" class="trashImg" src="./logo/bin.png">
                    <img onclick="editTask(${status['taskid']})" class="trashImg" src="./img/editPen.png">
                </div>    
            </div>    
        </div>
        <div>
            <h3>${status['title']}</h3> 
            <span class="singleCardDescription">${status['description']}</span> 
        </div>    
        <div class="categoryAndImg">
            <span class="singleCardCategory" style="background-color: var(${status['categoryColor']})">${status['category']}</span>
            <div id="singleCardImgs${status['taskid']}" class="singleCardImgs">
                <div id="BoardhiddenUserAssigned${status['taskid']}" class="BoardhiddenUserAssigned d-none ">   
                    <div class="closeUsersBoard" onclick="closeUsersBoard(${status['taskid']})">X</div>
                </div>
            <div id="stackedImgBoard${status['taskid']}"  class=""> </div>
            </div>
            <img class="arrowRight" src="img/arrowRight.png" onclick="showOptionsMoveTo('${status['status']}', ${status['taskid']})">
            <div class="moveToOverlay d-none" id="overlay${status['taskid']}">
                 <div class="moveToOverlayClose" onclick="closeOptionsMoveTo(${status['taskid']})">X</div>
                 <span>Move To..</span>
                  <span id="moveTo0-${status['taskid']}">Container 0</span>
                  <span id="moveTo1-${status['taskid']}">Container 1</span>
                   <span id="moveTo2-${status['taskid']}">Container 2</span>
            </div>
    </div>`;
}

/**
 * Puts one or morge images of User in Kanban Card
 * @param {JSON} status 
 */
function renderUserImgsInCard(status) {
    let Id = status['taskid'];
    let amountUser = kanbanArray[0]["tasks"][Id]['assignedTo'].length;
    for (let i = 0; i < amountUser; i++) {
        let profilePicID = kanbanArray[0]["tasks"][Id]['assignedTo'][i];
        document.getElementById(`singleCardImgs${Id}`).innerHTML += `
            <img class="imgAvatar3 stackedImgBoard${i}" onclick="showBoardusers(${Id})"  src="./img/${kanbanArray[0]["users"][profilePicID]['img']}" style="border-color: var(${kanbanArray[0]["users"][profilePicID]['color']})">
            `;
        document.getElementById(`BoardhiddenUserAssigned${Id}`).innerHTML += `
            <img class="imgAvatar2 stackedImgBoard${Id}" onclick="showBoardusers(${Id})" src="./img/${kanbanArray[0]["users"][profilePicID]['img']}" style="border-color: var(${kanbanArray[0]["users"][profilePicID]['color']})">
             `;
    }
}

/**
 * Shows hidden Users
 * @param {number} id  TaskID
 */
function showBoardusers(id) {
    document.getElementById(`BoardhiddenUserAssigned${id}`).classList.remove('d-none');
}

/**
 * Removes hidden Users
 * @param {number} id  TaskID
 */
function closeUsersBoard(id) {
    document.getElementById(`BoardhiddenUserAssigned${id}`).classList.add('d-none');
}


/**
 * Löscht ausgewählte Karte per Klick auf Mülleimer
 * 
 * @param {*} statusTaskid 
 */
function deleteCard(statusTaskid) {
    findIndex = kanbanArray[0]["tasks"].findIndex((id) => id.taskid == statusTaskid)
    kanbanArray[0]['tasks'].splice(findIndex, 1);
    sendToServer()
    renderBoard()
}

/**
 * Probably not used
 * @param {*} currentUser 
 * @returns 
 */
function getTaskID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['tasks'].length; i++) {
        if (kanbanArray[0]['tasks'][i]['taskid'] == currentUser) {
            return i;
        }
    }
}

/**
 * Changes Card status and renders board again
 * @param {string} status  new status of card
 * @param {number} id  TaskID
 */
function moveToByClick(status, id) {
    let index = getTaskID(id);
    kanbanArray[0]["tasks"][index]['status'] = status;
    sendToServer();
    renderBoard();
}

/**
 * opens options for moving card
 * @param {string} status actual status of card
 * @param {number} id taskid
 */
function showOptionsMoveTo(status, id) {
    document.getElementById('overlay' + id).classList.remove('d-none');

    if (status == 'todo') {
        document.getElementById(`moveTo0-${id}`).innerHTML = `<span onclick="moveToByClick('inprogress', ${id})"><b>IN PROGRESS</b><span>`;
        document.getElementById(`moveTo1-${id}`).innerHTML = `<span onclick="moveToByClick('testing', ${id})"><b>TESTING</b><span>`;
        document.getElementById(`moveTo2-${id}`).innerHTML = `<span onclick="moveToByClick('done', ${id})"><b>DONE</b><span>`;
    } else {
        if (status == 'inprogress') {
            document.getElementById(`moveTo0-${id}`).innerHTML = `<span onclick="moveToByClick('todo', ${id})"><b>TO DO</b><span>`;
            document.getElementById(`moveTo1-${id}`).innerHTML = `<span onclick="moveToByClick('testing', ${id})"><b>TESTING</b><span>`;
            document.getElementById(`moveTo2-${id}`).innerHTML = `<span onclick="moveToByClick('done', ${id})"><b>DONE</b><span>`;
        } else {
            if (status == 'testing') {
                document.getElementById(`moveTo0-${id}`).innerHTML = `<span onclick="moveToByClick('todo', ${id})"><b>TO DO</b><span>`;
                document.getElementById(`moveTo1-${id}`).innerHTML = `<span onclick="moveToByClick('inprogress', ${id})"><b>IN PROGRESS</b><span>`;
                document.getElementById(`moveTo2-${id}`).innerHTML = `<span onclick="moveToByClick('done', ${id})"><b>DONE</b><span>`;
            } else {
                if (status == 'done') {
                    document.getElementById(`moveTo0-${id}`).innerHTML = `<span onclick="moveToByClick('todo', ${id})">TO DO<span>`;
                    document.getElementById(`moveTo1-${id}`).innerHTML = `<span onclick="moveToByClick('testing', ${id})">TESTING<span>`;
                    document.getElementById(`moveTo2-${id}`).innerHTML = `<span onclick="moveToByClick('inprogress', ${id})">IN PROGRESS<span>`;
                }
            }
        }
    }
}

/**
 * Closes above opened options
 * @param {number} id TASKID 
 */
function closeOptionsMoveTo(id) {
    document.getElementById('overlay' + id).classList.add('d-none');
}


/* --------------------------------------------------------- edit task in board------------------------------------- */

function editTask(taskid) {
    document.getElementById('editwindow').classList.remove('d-none');
    console.log(taskid);
    let currentID = kanbanArray[0]["tasks"].findIndex((id) => id.taskid == taskid); // Filter to find the index of current Taskid
    console.log('taskid', currentID);
    filterSelectCathegory(currentID);
    filterSelecturgency(currentID);


    document.getElementById('editwindow').innerHTML = generateEditHtml(currentID);
    document.getElementById('categoryEdit').selectedIndex = selectIndexCathegory;
    document.getElementById('urgencyEdit').selectedIndex = selectIndexUrgency;


}

function generateEditHtml(currentID) {
    return `
    <div class="contentWrapper contentwrappeerEdit">
                <h1 class="editheadder"> edit task </h1>
                <div class="content contentEdit">
                    <div class="left " style="margin-right: 3rem; ">
                        <div>
                            <h4 class="span marginTop ptSansBold ">TITLE</h4>
                            <input class="borderRadius borderGrey inputDimensions" autocomplete="off"  placeholder="Add a Titel" type="text " id="titleEdit" value="${kanbanArray[0]["tasks"][currentID]['title']}">
                        </div>

                        <div>
                            <h4 class="span ptSansBold ">CATEGORY</h4>
                            <select class="drpDown borderRadius borderGrey inputDimensions" id="categoryEdit" selectedindex="2">
                                <option value="development">development</option>
                                <option value="marketing">marketing</option>
                                <option value="management">management</option>
                                <option value="inhouse">inhouse</option>
                                <option value="sales">sales</option>
                                <option value="design">design</option>
                                <option value="human_res">human ressources</option>
                                <option value="service">service</option>
                            </select>
                        </div>

                        <div>
                            <h4 class="span ptSansBold ">DESCRIPTION</h4>
                            <textarea name="" class="textarea borderRadius borderGrey" placeholder="Add a Description" id="descriptionEdit"  cols="42" rows="8">${kanbanArray[0]["tasks"][currentID]['description']}</textarea>

                        </div>

                    </div>

                    <div class="right ">
                        <div>
                            <h4 class="span marginTop ptSansBold ">DUE DATE</h4>
                            <div style="display: flex; ">
                                <input type="date" value="${kanbanArray[0]["tasks"][currentID]['duedate']}" class="hideDateIcon borderRadius borderGrey inputDimensions calendar" style="padding-left: 1rem;" id="duedateEdit" tValue="2022-01-24">
                            </div>

                            <div>
                                <h4 class="span ptSansBold ">URGENCY</h4>
                                <select class="drpDown borderRadius borderGrey " id="urgencyEdit">
                                    <option value="high">high</option>
                                    <option value="medium">medium</option>
                                    <option value="low">low</option>
                                </select>

                                <div>
                                    <h4 style="margin-bottom: 2.5rem; " style="border-color: blue;" class="span ptSansBold">
                                        ASSIGNED TO
                                    </h4>
                                    <div id="imgContainer2" class="imgContainer2">
                                        <img onload="loadUserEDIT(),  setcheckbox(${currentID})" onclick="showUserEDIT()" class="logo" src="./logo/icon plus.png ">
                                        <div id="imgMembersEdit">

                                        </div>
                                    </div>
                                </div>

                                <div class="memberBtnContainer">
                                    <div class="chooseMember">
                                        <div id="userContainerHideEdit" class="d-none"></div>
                                    </div>
                                    <div class="btnContainer ">
                                        <button class="btn" onclick="cancelEdit()">CANCEL</button>
                                        <button onclick="saveEditTask(${currentID})" class="btn ">SAVE CHANGES</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function saveEditTask(currentID) {
    if (assignedUserEdit.length == 0) {
        document.getElementById('userContainerHideEdit').classList.remove('d-none');
        document.getElementById('userContainerHideEdit').classList.add('colorRed');
        console.log('checked');
    } else {
        colorUrgencyEdit()
        colorCathegoryEdit()


        kanbanArray[0]["tasks"][currentID]['title'] = document.getElementById('titleEdit').value;
        kanbanArray[0]["tasks"][currentID]['category'] = document.getElementById('categoryEdit').value;
        kanbanArray[0]["tasks"][currentID]['description'] = document.getElementById('descriptionEdit').value;
        kanbanArray[0]["tasks"][currentID]['duedate'] = document.getElementById('duedateEdit').value;
        kanbanArray[0]["tasks"][currentID]['urgency'] = document.getElementById('urgencyEdit').value;
        kanbanArray[0]["tasks"][currentID]['urgencyColor'] = urgencyColors;
        kanbanArray[0]["tasks"][currentID]['categoryColor'] = cathegoryColors;
        kanbanArray[0]["tasks"][currentID]['assignedTo'] = assignedUserEdit;
        assignedUserEdit = [];
        document.getElementById('editwindow').classList.add('d-none');
        renderBoard();
        sendToServer();
    }
}

function cancelEdit() {
    document.getElementById('editwindow').classList.add('d-none');
    assignedUserEdit = [];

}
let selectIndexCathegory;
let cathegoryArr = ['development', 'marketing', 'management', 'inhouse', 'sales', 'design', 'human_res', 'service']

function filterSelectCathegory(currentID) {

    for (let index = 0; index < cathegoryArr.length; index++) {
        let cathegoryindex = cathegoryArr[index];
        if (kanbanArray[0]["tasks"][currentID]['category'] == cathegoryindex) {
            selectIndexCathegory = index;
        }
    }
}

let selectIndexUrgency;
let urgencyArr = ['high', 'medium', 'low']

function filterSelecturgency(currentID) {

    for (let index = 0; index < urgencyArr.length; index++) {
        let urgencyindex = urgencyArr[index];
        if (kanbanArray[0]["tasks"][currentID]['urgency'] == urgencyindex) {
            selectIndexUrgency = index;
        }
    }
}
let urgencyColors;

function colorUrgencyEdit() {
    let urgency = document.getElementById('urgencyEdit').value;
    if (urgency == 'high') {
        urgencyColors = '--bgVeryImportant';
    }
    if (urgency == 'medium') {
        urgencyColors = '--bgIMportant';
    }
    if (urgency == 'low') {
        urgencyColors = '--bgNotSoImportant';
    }
}
let cathegoryColors;

function colorCathegoryEdit() {
    let cathegory = document.getElementById('categoryEdit').value;
    if (cathegory == 'marketing') {
        cathegoryColors = '--bgMarketing';
    }
    if (cathegory == 'sales') {
        cathegoryColors = '--bgSale';
    }
    if (cathegory == 'service') {
        cathegoryColors = '--bgService';
    }
    if (cathegory == 'design') {
        cathegoryColors = '--bgDesign';
    }
    if (cathegory == 'management') {
        cathegoryColors = '--bgManagment';
    }
    if (cathegory == 'inhouse') {
        cathegoryColors = '--bgInhouse';
    }
    if (cathegory == 'development') {
        cathegoryColors = '--bgDevelopment';
    }
    if (cathegory == 'human_res') {
        cathegoryColors = '--bgHumanRessources';
    }
}

function setcheckbox(currentID) {
    showUserEDIT()
    asignedToEdit = kanbanArray[0]["tasks"][currentID]['assignedTo'];
    for (let i = 0; i < asignedToEdit.length; i++) {
        let asignedToindex = asignedToEdit[i];
        document.getElementById(asignedToindex).click();
    }
    showUserEDIT()

}

/**
 * Check the checkboxes from LoadUsers() and push the id to the assignedUser Array. Insert the User img.
 * 
 * @param {*} input 
 * @param {*} userIDArray 
 * @param {*} userIDArrayuserid 
 */
let assignedUserEdit = [];

function handleChoiseEDIT(input, userIDArrayimg, userIDArrayuserid) {
    if (input.checked) {
        assignedUserEdit.push(userIDArrayuserid);
        addMembersImgEDIT(userIDArrayimg);
    } else {
        let imgX = document.getElementById(userIDArrayimg);
        imgX.parentNode.removeChild(imgX);
        // document.getElementById('userContainerHideEdit').classList.add('d-none');
        assignedUserEdit = assignedUserEdit.filter(function(f) { return f !== userIDArrayuserid })
        console.log('addMemberImg löschen');
    }
    console.log('assignedUserEdit', assignedUserEdit);
}

/**
 * remove the hidding Class 
 * 
 */
function showUserEDIT() {
    let members = document.getElementById('userContainerHideEdit');
    if (members.classList.contains('d-none')) {
        members.classList.remove('d-none');
    } else {
        members.classList.add('d-none');
    }
}

/**
 *  loads the List hided in the Browser 
 * 
 */
function loadUserEDIT() {
    let members = document.getElementById('userContainerHideEdit');
    members.innerHTML = '';
    for (let i = 0; i < kanbanArray[0]["users"].length; i++) {
        let userIDArray = kanbanArray[0]["users"][i];
        members.innerHTML += `
    <div class="userContainer">
        <label for="${userIDArray['userid']}">${userIDArray['username']}</label>
        <input onclick="handleChoiseEDIT(this,'${userIDArray['img']}','${userIDArray['userid']}')" id="${userIDArray['userid']}" class="checkbox" type="checkbox">
    </div>`;
    }
}
/**
 * insert the User img in the Browser
 * 
 * @param {*} userIDArrayimg 
 */
function addMembersImgEDIT(userIDArrayimg) {
    let img = document.getElementById('imgMembersEdit');
    img.innerHTML += `
    <img id="${userIDArrayimg}" class="imgAvatar2" style="cursor: pointer;" src="./img/${userIDArrayimg}">
    `;
    // document.getElementById('userContainerHideEdit').classList.add('d-none');
}
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
        renderUserImgsInCard(status);
    }
}

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

function startDragging(taskid) {
    let currentID = kanbanArray[0]["tasks"].findIndex((id) => id.taskid == taskid); // Filter to find the index of current Taskid
    currentDragged = currentID;
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
   return `
    <div class="singleCard" ondblclick = "editTask(${status['taskid']})" style="border-color: var(${status['urgencyColor']});" id="singleCard${status['taskid']}" draggable="true" ondragstart="startDragging(${status['taskid']})">
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
            <div id="singleCardImgs${status['taskid']}">
            
            </div>     
            <img class="arrowRight" src="img/arrowRight.png" onclick="showOptionsMoveTo('${status['status']}', ${status['taskid']})">
        </div>
            <div class="moveToOverlay d-none" id="overlay${status['taskid']}">
                 <div class="moveToOverlayClose" onclick="closeOptionsMoveTo(${status['taskid']})">X</div>
                 <span>Move To..</span>
                  <span id="moveTo0-${status['taskid']}">Container 0</span>
                  <span id="moveTo1-${status['taskid']}">Container 1</span>
                   <span id="moveTo2-${status['taskid']}">Container 2</span>
            </div>
    </div>`;

}

function renderUserImgsInCard(status) {
    let Id = status['taskid'];
    console.log('renderUserImgsInCard ', Id);
    document.getElementById(`singleCardImgs${Id}`).innerHTML = "";
    let amountUser = kanbanArray[0]["tasks"][Id]['assignedTo'].length;
    console.log('amountUser ', amountUser);
    for (let i = 0; i < amountUser; i++) {
        let profilePicID = kanbanArray[0]["tasks"][Id]['assignedTo'][i];
        document.getElementById(`singleCardImgs${Id}`).innerHTML += `
    <img class="imgAvatar3" src="./img/${kanbanArray[0]["users"][profilePicID]['img']}" style="border-color: var(${kanbanArray[0]["users"][profilePicID]['color']})">
    `;

    }

}

function getTaskID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['tasks'].length; i++) {
        if (kanbanArray[0]['tasks'][i]['taskid'] == currentUser) {
            return i;
        }
    }
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

function getTaskID(currentUser) {
    for (let i = 0; i < kanbanArray[0]['tasks'].length; i++) {
        if (kanbanArray[0]['tasks'][i]['taskid'] == currentUser) {
            return i;
        }
    }
}

function moveToByClick(status, id) {
    let index = getTaskID(id);
    kanbanArray[0]["tasks"][index]['status'] = status;
    sendToServer();
    renderBoard();
}

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

    document.getElementById('editwindow').innerHTML = `
    <div class="contentWrapper">
                <div class="content ">
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
                                        <img onload="loadUser()" onclick="showUser()" class="logo" src="./logo/icon plus.png ">
                                        <div id="imgMembers">

                                        </div>
                                    </div>
                                </div>

                                <div class="memberBtnContainer">
                                    <div class="chooseMember">
                                        <div id="userContainerHide" class="d-none"></div>
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
    document.getElementById('categoryEdit').selectedIndex = selectIndexCathegory;
    document.getElementById('urgencyEdit').selectedIndex = selectIndexUrgency;

}

function saveEditTask(currentID) {
    colorUrgencyEdit()
    colorCathegoryEdit()

    kanbanArray[0]["tasks"][currentID]['title'] = document.getElementById('titleEdit').value;
    kanbanArray[0]["tasks"][currentID]['category'] = document.getElementById('categoryEdit').value;
    kanbanArray[0]["tasks"][currentID]['description'] = document.getElementById('descriptionEdit').value;
    kanbanArray[0]["tasks"][currentID]['duedate'] = document.getElementById('duedateEdit').value;
    kanbanArray[0]["tasks"][currentID]['urgency'] = document.getElementById('urgencyEdit').value;
    kanbanArray[0]["tasks"][currentID]['urgencyColor'] = urgencyColors;
    kanbanArray[0]["tasks"][currentID]['categoryColor'] = cathegoryColors;
    document.getElementById('editwindow').classList.add('d-none');
    renderBoard();
    sendToServer();
}

function cancelEdit() {
    document.getElementById('editwindow').classList.add('d-none');
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


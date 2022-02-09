/* --------------------------------------------------------Help Script----------------------------------------------- */
function showHelp(i) {
    let chevron = document.getElementById('chevron' + i);
    let content = document.getElementById('content' + i);
    if (notOpen(content)) {
        openHelp(chevron, content);
    } else {
        closeHelp(chevron, content);
    }
}


/**
  * Open the window of the description and rotate the chevron
  * @param {Element} chevron img of the chevron
  * @param {Element} section description + i
  */
function openHelp(chevron, content) {
    content.classList.toggle('d-none');
    setTimeout(() => {
        chevron.style.transform = 'rotate(180deg)'
    }, 10);
}


/**
  * Close the descrition window and rotate the chevron back
  * @param {Element} chevron img of the chevron
  * @param {Element} section description + i
  */
function closeHelp(chevron, content) {   
    setTimeout(() => {
        chevron.style.transform = 'unset'
    }, 10);
    content.classList.toggle('d-none');
}


 /**
  * check if the class list contains dNone
  * @param {Element} section description + i
  * @returns true or false
  */
function notOpen(content) {
    return content.classList.contains('d-none');
}


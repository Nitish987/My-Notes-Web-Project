let titleText = document.getElementById('text-title');
let textArea = document.getElementById('text-note');
let addButton = document.getElementById('add-note-btn');

addButton.addEventListener('click', function (event) {
    let data = localStorage.getItem('title');

    let titleData, textData;
    if (data == null) {
        titleData = [];
        textData = [];
    }
    else {
        titleData = JSON.parse(localStorage.getItem('title'));
        textData = JSON.parse(localStorage.getItem('text'));
    }
    if (titleText.value != "" || textArea.value != "") {
        titleData.push(titleText.value);
        textData.push(textArea.value);

        localStorage.setItem('title', JSON.stringify(titleData));
        localStorage.setItem('text', JSON.stringify(textData));

        titleText.value = null;
        textArea.value = null;

        showNotes();
    }else {
        alert('Please, Enter the title or note.');
    }
});

function showNotes(){
    let titleData = JSON.parse(localStorage.getItem('title'));
    let textData = JSON.parse(localStorage.getItem('text'));

    let html = ``;

    let showNoteContainer = document.getElementById('shownote-container');
    titleData.forEach(function(element, index) {
        html += `
        <div id="${index}" class="added-notes">
            <h5 class="note-h">${element}</h5>
            <p class="note-t">${textData[index]}</p>
            <button id="${index}" onclick="deleteButtonAction(this.id)" class="delete-note-btn">Delete</button>
        </div>
        `;
    });
    showNoteContainer.innerHTML = html;
}

function deleteButtonAction(index){
    let titleData = JSON.parse(localStorage.getItem('title'));
    let textData = JSON.parse(localStorage.getItem('text'));

    titleData.splice(index, 1);
    textData.splice(index, 1);

    localStorage.setItem('title', JSON.stringify(titleData));
    localStorage.setItem('text', JSON.stringify(textData));

    showNotes();
    checkSituation();
}

function checkSituation(){
    if (localStorage.getItem('title') != null && localStorage.getItem('title').localeCompare("[]")){
        showNotes();
    }
    else {
        let showNoteContainer = document.getElementById('shownote-container');
        showNoteContainer.innerHTML = `No Notes to show You.`;
    }
}

checkSituation();
const taskInput = document.getElementById("taskInput");
const warningMessage = document.getElementById("warningMessage");
const taskCard = document.querySelector(".taskCard");
//const deleteBtn = document.querySelectorAll(".delete");


// Adding a task
function addTask() {
    const taskText = taskInput.value.trim();
    if(taskText === "") {
        warningMessage.style.display = "block";
        return;
    } else {
        warningMessage.style.display = "none";
    }
    
    const taskHTML = `
        <div id="taskRow">
            <p class="taskText">${taskText}</p>
            <button class="edit"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="done"><i class="fa-regular fa-circle-check"></i></button>
            <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
        </div>
        `;
    
    taskItem.innerHTML += taskHTML;
    taskCard.style.visibility = "visible";
    taskInput.value = "";
}

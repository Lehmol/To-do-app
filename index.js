const inputBox = document.getElementById("taskInput");
const taskContainer = document.getElementById("taskContainer");
const deletedContainer = document.getElementById("deletedContainer");
const doneContainer = document.getElementById("doneContainer");
const warningTxt = document.getElementById("warningMessage");

function addTask() {
    const task = inputBox.value.trim();
    if(!task) {
        warningTxt.style.display = "block";
    }else {
        warningTxt.style.display = "none";
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <div id="taskRow">
            <p>${task}</p>
            <span class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></span>
            <span class="delete-btn"><i class="fa-solid fa-trash-can"></i></span>
            <span class="complete-btn"><i class="fa-regular fa-circle-check"></i></span>
        </div>`;
    taskContainer.appendChild(li);
    inputBox.value = "";

    const editBtn = li.querySelector(".edit-btn");
    const taskParagraph = li.querySelector("p");
    const deleteBtn = li.querySelector(".delete-btn");
    const completeBtn = li.querySelector(".complete-btn");

    editBtn.addEventListener("click", function () {
        const update = prompt("Edit task:", taskParagraph.textContent);
        if(update !== null) {
            taskParagraph.textContent = update;
        }
    })
    completeBtn.addEventListener("click", function() {
        const doneTask = document.createElement("li");
        doneTask.innerHTML = `
            <div id="taskRow">
            <p>${task}</p>
            <span class="edit-btn"><i class="fa-regular fa-pen-to-square"></i></span>
            <span class="delete-btn"><i class="fa-solid fa-trash-can"></i></span>
        </div>`;
        doneContainer.appendChild(doneTask);
    })

    deleteBtn.addEventListener("click", function() {
        const deleteTask = document.createElement("li");
        deleteTask.innerHTML = `
            <div id="taskRow">
                <p>${task}</p>
            </div>`;
        deletedContainer.appendChild(deleteTask);
    })
}
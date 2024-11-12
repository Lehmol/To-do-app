const inputBox = document.getElementById("taskInput");
const taskContainer = document.getElementById("taskContainer");
const deletedContainer = document.getElementById("deletedContainer");
const doneContainer = document.getElementById("doneContainer");
const warningTxt = document.getElementById("warningMessage");
const doneCard = document.getElementsByClassName("doneCard");

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
        doneContainer.appendChild(li);
        completeBtn.style.display = "none";

    })

    deleteBtn.addEventListener("click", function() {
        deletedContainer.appendChild(li);
        deleteBtn.style.display = "none";
        editBtn.style.display ="none";
        completeBtn.style.display ="none";
    })
}
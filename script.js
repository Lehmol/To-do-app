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
        const input = document.createElement("input");
        input.type = "text";
        input.value = taskParagraph.textContent;

        taskParagraph.replaceWith(input);
        input.focus();

        editBtn.innerHTML = `<i class="fa-regular fa-square-check"></i>`;

        function saveEdit() {
            taskParagraph.textContent = input.value;
            input.replaceWith(taskParagraph);
            editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`;
        }
        input.addEventListener("blur", saveEdit);

        input.addEventListener("keypress", function(event) {
            if(event.key === "Enter") {
                saveEdit();
            }
        })
    })

    
    completeBtn.addEventListener("click", function() {
        doneContainer.appendChild(li);
        completeBtn.style.display = "none";

        const doneCard = document.getElementsByClassName("doneCard");
        for(let i = 0; i < doneCard.length; i++) {
            doneCard[i].style.display = "block";
        }
    })

    deleteBtn.addEventListener("click", function() {
        deletedContainer.appendChild(li);
        deleteBtn.style.display = "none";
        editBtn.style.display ="none";
        completeBtn.style.display ="none";

        const delCard = document.getElementsByClassName("deletedCard");
        for(let i = 0; i < delCard.length; i++) {
            delCard[i].style.display = "block";
        }
    })
}
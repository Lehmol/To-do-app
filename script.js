// Komplett JavaScript för Todo App
document.addEventListener("DOMContentLoaded", function () {
  // DOM element referenser
  const itemsContainer = document.getElementById("items-container");
  const completedSection = document.getElementById("completed-section");
  const completedContainer = document.getElementById("completed-container");
  const newItemInput = document.getElementById("new-item-input");
  const addNoteBtn = document.getElementById("add-note-btn");
  const addTaskBtn = document.getElementById("add-task-btn");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Event listeners för add-knappar
  addNoteBtn.addEventListener("click", handleAddNote);
  addTaskBtn.addEventListener("click", handleAddTask);

  // Event listeners för filter-knappar
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", handleFilter);
  });

  // Event listeners för item-knappar (event delegation)
  itemsContainer.addEventListener("click", handleItemButtons);
  completedContainer.addEventListener("click", handleCompletedButtons);

  // === ADD FUNKTIONER ===

  function handleAddNote() {
    const text = newItemInput.value.trim();
    if (text) {
      createNote("Note", text);
      newItemInput.value = "";
    }
  }

  function handleAddTask() {
    const text = newItemInput.value.trim();
    if (text) {
      createTask(text);
      newItemInput.value = "";
    }
  }

  function createNote(title, text) {
    const noteHTML = `
            <div class="item note" data-type="note">
                <div class="item-content">
                    <h3 class="note-title" contenteditable="false">${title}</h3>
                    <p class="note-text" contenteditable="false">${text}</p>
                </div>
                <div class="item-buttons">
                    <button class="btn-edit">Edit</button>
                    <button class="btn-delete">Delete</button>
                </div>
            </div>
        `;
    itemsContainer.insertAdjacentHTML("beforeend", noteHTML);
  }

  function createTask(text) {
    const taskHTML = `
            <div class="item task" data-type="task">
                <div class="item-content">
                    <input type="checkbox" class="task-checkbox">
                    <span class="task-text" contenteditable="false">${text}</span>
                </div>
                <div class="item-buttons">
                    <button class="btn-edit">Edit</button>
                    <button class="btn-done">Done</button>
                    <button class="btn-delete">Delete</button>
                </div>
            </div>
        `;
    itemsContainer.insertAdjacentHTML("beforeend", taskHTML);
  }

  // === ITEM BUTTON HANDLERS ===

  function handleItemButtons(event) {
    const button = event.target;
    const item = button.closest(".item");

    if (button.classList.contains("btn-edit")) {
      toggleEdit(item);
    } else if (button.classList.contains("btn-delete")) {
      deleteItem(item);
    } else if (button.classList.contains("btn-done")) {
      markAsDone(item);
    }
  }

  function handleCompletedButtons(event) {
    const button = event.target;
    const item = button.closest(".item");

    if (button.classList.contains("btn-delete")) {
      deleteItem(item);
    }
  }

  // === EDIT FUNKTIONER ===

  function toggleEdit(item) {
    const editBtn = item.querySelector(".btn-edit");
    const isEditing = editBtn.textContent === "Save";

    if (isEditing) {
      saveEdit(item);
      editBtn.textContent = "Edit";
    } else {
      startEdit(item);
      editBtn.textContent = "Save";
    }
  }

  function startEdit(item) {
    if (item.classList.contains("note")) {
      const title = item.querySelector(".note-title");
      const text = item.querySelector(".note-text");
      title.contentEditable = "true";
      text.contentEditable = "true";
      title.focus();
    } else if (item.classList.contains("task")) {
      const taskText = item.querySelector(".task-text");
      taskText.contentEditable = "true";
      taskText.focus();
    }
  }

  function saveEdit(item) {
    if (item.classList.contains("note")) {
      const title = item.querySelector(".note-title");
      const text = item.querySelector(".note-text");
      title.contentEditable = "false";
      text.contentEditable = "false";
    } else if (item.classList.contains("task")) {
      const taskText = item.querySelector(".task-text");
      taskText.contentEditable = "false";
    }
  }

  // === DELETE & DONE FUNKTIONER ===

  function deleteItem(item) {
    if (confirm("Are you sure you want to delete this item?")) {
      item.remove();
      updateCompletedSectionVisibility();
    }
  }

  function markAsDone(item) {
    // Ta bort "Done" knappen
    const doneBtn = item.querySelector(".btn-done");
    doneBtn.remove();

    // Lägg till completed-klass
    item.classList.add("completed");

    // Flytta till completed container
    completedContainer.appendChild(item);
    updateCompletedSectionVisibility();
  }

  function updateCompletedSectionVisibility() {
    const hasCompletedItems = completedContainer.children.length > 0;

    if (hasCompletedItems) {
      completedSection.classList.remove("hidden");
    } else {
      completedSection.classList.add("hidden");
    }
  }

  // === FILTER FUNKTIONER ===

  function handleFilter(event) {
    const clickedBtn = event.target;
    const filter = clickedBtn.dataset.filter;

    // Uppdatera aktiv knapp
    filterBtns.forEach((btn) => btn.classList.remove("active"));
    clickedBtn.classList.add("active");

    // Filtrera items
    applyFilter(filter);
  }

  function applyFilter(filter) {
    const allItems = document.querySelectorAll("#items-container .item");

    allItems.forEach((item) => {
      const itemType = item.dataset.type;

      if (filter === "all") {
        item.style.display = "flex";
      } else if (filter === "notes" && itemType === "note") {
        item.style.display = "flex";
      } else if (filter === "tasks" && itemType === "task") {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  updateCompletedSectionVisibility();

  applyFilter("all");

  console.log("Todo App initialized successfully!");
});

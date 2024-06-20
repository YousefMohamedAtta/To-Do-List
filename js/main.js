// NavBarr Functions
function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = "flex"
}
function  hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = "none"
}

// form Functions
const inputs = document.querySelectorAll('.input')
const form = document.querySelector("form")
const userName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");



function focusFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.add("focus");
    }
}
function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}
inputs.forEach((inputt)  => {
    inputt.addEventListener("focus", focusFunc)
    inputt.addEventListener("blur", blurFunc);
})
function sendEmail() {
    const bodyMessage =`Full Name : ${userName.value} <br> 
    Email : ${email.value} <br> Phone Number : ${phone.value} <br>
    Subject : ${subject.value} <br> Message : ${message.value} <br>`
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "yousefmohamedatta58@gmail.com",
        Password : "8793D75D46B6134EB9C53CE32E8ED6EBDC49",
        To : 'yousefmohamedatta58@gmail.com',
        From : 'yousefmohamedatta58@gmail.com',
        Subject : subject.value,
        Body : bodyMessage
    }).then(
        message => { if( message == "OK") {
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            });
        }
});
}
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    sendEmail();
})



// TODO Funcaion

const data = new Date();
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoDesc = document.querySelector("#todo-desc");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const editInputDesc = document.querySelector("#edit-inputDesc");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const deleteAllButton = document.querySelector("#delete-all");
const filterCompleted = document.querySelector("#filter-completed");
const filterPending = document.querySelector("#filter-pending");
const filterAll = document.querySelector("#filterAll");


const todos = document.getElementsByClassName("todo");

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.getElementById("date").innerHTML = today.toDateString();

function time() {
    const data = new Date();
    let h = data.getHours();
    let m = data.getMinutes();
    let s = data.getSeconds();

    if (h < 10) h = "0" + h;
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    document.getElementById("hour").innerHTML = `${h} : ${m} : ${s}`;
    setTimeout(time, 500);
}

function saveTodo() {
    const text = todoInput.value;
    const desc = todoDesc.value;

    if (text && desc) {
        const todo = document.createElement("div");
        todo.classList.add("todo");

        const todoTitle = document.createElement("h3");
        todoTitle.innerText = text;
        todo.appendChild(todoTitle);

        const todoDesc = document.createElement("p");
        todoDesc.innerText = desc;
        todo.appendChild(todoDesc);

        const doneBtn = document.createElement("button");
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        todo.appendChild(doneBtn);
        
        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-todo");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        todo.appendChild(editBtn);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-todo");
        removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        todo.appendChild(removeBtn);

        todoList.appendChild(todo);

        todoInput.value = "";
        todoDesc.value = "";

    // Add event listeners to the newly created todo
        doneBtn.addEventListener("click", completeTodo);
        editBtn.addEventListener("click", editTodo);
        removeBtn.addEventListener("click", removeTodo);
    }
}

function completeTodo() {
    const todoItem = this.parentNode;
    todoItem.classList.toggle("completed");
}

function editTodo() {
    const todoItem = this.parentNode;
    if (!todoItem.classList.contains("completed")) {
        const todoTitle = todoItem.querySelector("h3");
        const todoDesc = todoItem.querySelector("p");

        oldInputValue = todoTitle.innerText;
        oldInputDescValue = todoDesc.innerText;

        editInput.value = oldInputValue;
        editInputDesc.value = oldInputDescValue;

        todoItem.classList.add("editing");
        toggleForms();
        const editIcon = todoItem.querySelector(".edit-icon");
        editIcon.style.display = "none";
    }
}


function removeTodo() {
    const todoItem = this.parentNode;
    todoItem.remove();
}

function updateTodo() {
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3");
    const todoDesc = todo.querySelector("p");
    if (todo.classList.contains("editing")) {
        todoTitle.innerText = editInput.value;
        todoDesc.innerText = editInputDesc.value;
    }
    });
    toggleForms();
}

function toggleForms() {
    todoForm.classList.toggle("hide");
    editForm.classList.toggle("hide");
    todoInput.value = "";
    todoDesc.value = "";
}

function filterTodos(filter) {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        switch (filter) {
            case "completed":
            if (todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
            case "pending":
            if (!todo.classList.contains("completed")) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
            break;
            case "all":
            todo.style.display = "flex";
            break;
        }
    });
}

function deleteAllTodos() {
    todoList.innerHTML = "";
}

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    saveTodo();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    updateTodo();
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

filterAll.addEventListener("click", () => {
    filterTodos("all");
});

filterCompleted.addEventListener("click", () => {
    filterTodos("completed");
});

filterPending.addEventListener("click", () => {
    filterTodos("pending");
});

deleteAllButton.addEventListener("click", () => {
    deleteAllTodos();
});
function updateTaskCount() {
    const todos = document.querySelectorAll(".todo");
    const countElement = document.getElementById("task-count");
    if (filter === "completed") {
        const completedTodos = document.querySelectorAll(".completed");
        countElement.innerText = ` ${completedTodos.length} items total`;
    } else if (filter === "pending") {
        const pendingTodos = document.querySelectorAll(".pending");
        countElement.innerText = `  ${pendingTodos.length} items total`;
    } else {
        countElement.innerText = `${todos.length} items total `;
    }
}
updateTaskCount();

// Start the time display
time();
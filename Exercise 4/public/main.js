const todoForm = document.getElementById("todoForm");
const searchForm = document.getElementById("searchForm");
const message = document.getElementById("message");
const todoList = document.getElementById("todoList");
const deleteUser = document.getElementById("deleteUser");

let currentUser = "";

// 1. Send new todo to the server
todoForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("userInput").value;
    const todo = document.getElementById("todoInput").value;

    const response = await fetch("/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, todo })
    });

    const result = await response.json();
    message.textContent = result.message;
    todoForm.reset();
});

// 2. Search for a user's todos
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("searchInput").value;
    const response = await fetch(`/todos/${name}`);
    const result = await response.json();

    todoList.innerHTML = "";
    currentUser = name;

    if (result.message) {
        message.textContent = result.message;
        deleteUser.hidden = true;
        return;
    }

    message.textContent = "";
    deleteUser.hidden = false;

    // 4. Shows all todos and allows deletion
    result.forEach(todo => {

        const li = document.createElement("li");
        const link = document.createElement("a");

        link.textContent = todo;
        link.href = "#";
        link.className = "delete-task";

        link.addEventListener("click", async (event) => {

            event.preventDefault();

            const response = await fetch("/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: currentUser,
                    todo: todo
                })
            });

            const result = await response.json();

            message.textContent = result.message;

            link.parentElement.remove();

        });

        li.appendChild(link);
        todoList.appendChild(li);

    });
});

// 3. Delete a user (and their todos)
deleteUser.addEventListener("click", async () => {

    const response = await fetch("/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: currentUser
        })
    });

    const result = await response.json();
    message.textContent = result.message;
    todoList.innerHTML = "";
    deleteUser.hidden = true;
});
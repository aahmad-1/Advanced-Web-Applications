const todoForm = document.getElementById("todoForm");
const searchForm = document.getElementById("searchForm");
const message = document.getElementById("message");
const todoList = document.getElementById("todoList");
const deleteUser = document.getElementById("deleteUser");

let currentUser = "";

// 1. Add a new todo
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

// 2. Search for a user & display their todos
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("searchInput").value;

    const response = await fetch(`/todos/${name}`);
    const result = await response.json();

    todoList.innerHTML = "";
    currentUser = name;

    if (result.message) {
        message.textContent = result.message;
        deleteUser.style.display = "none";
        return;
    }

    message.textContent = "";
    deleteUser.style.display = "inline-block";

    result.forEach(item => {

        const li = document.createElement("li");
        const label = document.createElement("label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "myCheckbox";
        checkbox.className = "checkBoxes";
        checkbox.checked = item.checked;

        const span = document.createElement("span");

        const link = document.createElement("a");
        link.href = "#";
        link.className = "delete-task";
        link.textContent = item.todo;

        // 4. Update checkbox status
        checkbox.addEventListener("change", async () => {

            const response = await fetch("/updateTodo", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: currentUser,
                    todo: item.todo,
                    checked: checkbox.checked
                })
            });

            const result = await response.json();
            message.textContent = result.message;

        });

        // 3. Delete a todo
        link.addEventListener("click", async (event) => {
            event.preventDefault();

            const response = await fetch("/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: currentUser,
                    todo: item.todo
                })
            });

            const result = await response.json();
            message.textContent = result.message;
            li.remove();

        });

        label.appendChild(checkbox);
        span.appendChild(link);
        label.appendChild(span);
        li.appendChild(label);
        todoList.appendChild(li);

    });
});

// Delete a user
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
    deleteUser.style.display = "none";

});

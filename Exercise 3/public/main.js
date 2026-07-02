const userForm = document.getElementById("userForm");

// 4. front-end communication
userForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const response = await fetch("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
    });

    const result = await response.json();

    alert(result.message);

    userForm.reset();
});

const getUsers = document.getElementById("getUsers");
const userList = document.getElementById("userList");

// 5. front-end communication
getUsers.addEventListener("click", async () => {
    const response = await fetch("/users");
    const users = await response.json();

    userList.innerHTML = "";

    users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(listItem);
    });
});
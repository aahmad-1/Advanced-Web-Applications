const loginForm = document.getElementById("loginForm")
const registerButton = document.getElementById("registerButton")
const loginButton = document.getElementById("loginButton");
const userDisplay = document.getElementById("userDisplay");
loginForm.addEventListener("submit", loginUser)

function getPayload() {
    const token = localStorage.getItem("token")
    if (!token) {
        return null
    }

    return JSON.parse(atob(token.split(".")[1]))
}

function updateNav() {
    const payload = getPayload();

    if (!payload) {
        const emailField = document.getElementById("email")
        const passwordField = document.getElementById("password")

        userDisplay.style.display = "none"
        emailField.style.display = ""
        passwordField.style.display = ""
        loginButton.style.display = ""

        registerButton.textContent = "Register"
        registerButton.onclick = () => {
            window.location.href = "register.html"
        }

        return;
    }
    const emailField = document.getElementById("email")
    const passwordField = document.getElementById("password")

    userDisplay.style.display = ""
    userDisplay.textContent = payload.username
    emailField.style.display = "none"
    passwordField.style.display = "none"
    loginButton.style.display = "none"
    registerButton.textContent = "Logout"
    registerButton.onclick = logout
}

async function loginUser(event) {
    event.preventDefault()

    const formData = {
        email: event.target.email.value,
        password: event.target.password.value
    }

    try {
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            alert("Login failed.")
            return
        }

        const data = await response.json();
        localStorage.setItem("token", data.token)
        // console.log("JWT stored:", data.token)
        updateNav()

        createTopicForm()
        loadTopics()

    } catch (error) {
        console.error(error)
    }
}

// not needed  updateNavbar does it
// registerButton.addEventListener("click", () => {
//     window.location.href = "register.html"
// })

// create a topic
function createTopicForm() {
    const topicForm = document.getElementById("topicForm")
    topicForm.innerHTML = "";
    topicForm.innerHTML = `
        <form id="newTopicForm">
            <input type="text" id="topicTitle" placeholder="Title" required>
            <textarea id="topicText" class="materialize-textarea" placeholder="Write something here" required></textarea>
            <button type="submit" id="postTopic" class="btn waves-effect waves-light">Post Topic</button>
        </form>`;

    const newTopicForm = document.getElementById("newTopicForm")
    newTopicForm.addEventListener("submit", postTopic)
}

// post a topic
async function postTopic(event) {
    event.preventDefault()

    const token = localStorage.getItem("token")

    const formData = {
        title: document.getElementById("topicTitle").value,
        content: document.getElementById("topicText").value
    };

    try {
        // console.log(formData)
        const response = await fetch("/api/topic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            alert("Failed to create topic.")
            return;
        }

        loadTopics();
        event.target.reset()

    } catch (error) {
        console.error(error)
    }
}

// load all topics
async function loadTopics() {
    try {
        const response = await fetch("/api/topics")
        const topics = await response.json()
        // console.log("topics loaded:", topics)
        renderTopics(topics)

    } catch (error) {
        console.error(error)
    }
}

// render topics
function renderTopics(topics) {
    const container = document.getElementById("topics")
    container.innerHTML = ""
    topics.forEach(topic => {

        container.innerHTML += `
        <div class="card z-depth-2 hoverable grey lighten-2">
            <div class="card-content">
                <span class="card-title">${topic.title}</span>
                <p>${topic.content}</p>
                <p class="grey-text text-darken-2">
                    Posted by ${topic.username} at ${new Date(topic.createdAt).toLocaleString([], {hour12: false})}
                </p>
            </div>
            <div class="card-action">
                <button id="deleteTopic" class="btn waves-effect waves-light" onclick="deleteTopic('${topic._id}')">Delete</button>
            </div>
        </div>`
    })
}

// delete a topic
async function deleteTopic(id) {
    const token = localStorage.getItem("token")
    // console.log("Deleting topic:", id);
    try {
        const response = await fetch(`/api/topic/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json()

        if (!response.ok) {
            alert(data.message)
            return
        }

        loadTopics();

    } catch (error) {
        console.error(error)
    }
}

function logout() {
    localStorage.removeItem("token");
    location.reload()
}

loadTopics()
updateNav()

if (localStorage.getItem("token")) {
    createTopicForm()
}
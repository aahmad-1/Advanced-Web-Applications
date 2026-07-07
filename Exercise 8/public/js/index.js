const loginForm = document.getElementById("loginForm")
const registerButton = document.getElementById("registerButton")

loginForm.addEventListener("submit", loginUser)

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
        createTopicForm()
        loadTopics()

    } catch (error) {
        console.error(error)
    }
}

// redirect
registerButton.addEventListener("click", () => {
    window.location.href = "register.html"
})

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
    event.preventDefault();

    const token = localStorage.getItem("token");

    const formData = {
        title: document.getElementById("topicTitle").value,
        content: document.getElementById("topicText").value
    };

    try {
        const response = await fetch("/api/topic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            alert("Failed to create topic.");
            return;
        }

        loadTopics();
        event.target.reset();

    } catch (error) {
        console.error(error);
    }
}

// load all topics
async function loadTopics() {
    try {
        const response = await fetch("/api/topics");
        const topics = await response.json();
        renderTopics(topics);

    } catch (error) {
        console.error(error);
    }
}

// render topics
function renderTopics(topics) {
    const container = document.getElementById("topics");
    container.innerHTML = "";
    topics.forEach(topic => {

        container.innerHTML += `
        <div class="card z-depth-2 hoverable grey lighten-2">
            <div class="card-content">
                <span class="card-title">
                    ${topic.title}
                </span>
                <p>
                    ${topic.content}
                </p>
                <p class="grey-text text-darken-2">
                    ${topic.username}
                    <br>
                    ${new Date(topic.createdAt).toLocaleString()}
                </p>
            </div>
            <div class="card-action">
                <button
                    class="btn waves-effect waves-light"
                    id="deleteTopic"
                    onclick="deleteTopic('${topic._id}')">
                    Delete
                </button>
            </div>
        </div>`
    })
}

// delete a topic
async function deleteTopic(id) {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`/api/topic/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        loadTopics();

    } catch (error) {
        console.error(error);
    }
}

loadTopics();

if (localStorage.getItem("token")) {
    createTopicForm();
}
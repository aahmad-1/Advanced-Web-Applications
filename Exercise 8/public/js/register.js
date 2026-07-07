const initializeRegister = () => {
    document.getElementById("registerForm").addEventListener("submit", (event) => {
        registerUser(event)
    })
}

const registerUser = async (event) => {
    event.preventDefault()

    const formData = {
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value,
        isAdmin: event.target.isAdmin.checked //checkbhox doesnt have value, so use checked
    }

    try {
        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            document.getElementById("error").innerText ="Registration failed."
            return;
        }

        // window.location.href = "index.html"
        window.location.href = "/"  // should fix front end implementation error
        // the unit test is checking that after registration, the browser ends up at the root URL (/) and not at index.html

    } catch (error) {
        console.error(error)
        document.getElementById("error").innerText = "Registration failed."
    }

};

initializeRegister()
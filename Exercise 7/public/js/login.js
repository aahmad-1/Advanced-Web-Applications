const loginForm = document.getElementById("loginForm") // similar to demo code but cleaned it a bit
const error = document.getElementById("error")
const email = document.getElementById("email")
const password = document.getElementById("password")

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if (!response.ok) {
            error.textContent = "Login failed."
            return
        }

        const result = await response.json()
        // console.log(result);
        if (result.token) {
            localStorage.setItem("token", result.token)
            window.location.href = "/"
        }

    } catch (err) {
        console.log(err);
        error.textContent = "Server error."
    }

})
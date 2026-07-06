const registerForm = document.getElementById("registerForm") // similar to demo code but cleaned it a bit
const error = document.getElementById("error")
const email = document.getElementById("email")
const password = document.getElementById("password")

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const formData = {
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            error.textContent = "Registration failed."
            return
        }

        // console.log("User registered successfully.");
        window.location.href = "/login.html"

    } catch (err) {
        console.log(err)
        error.textContent = "Server error."
    }
})
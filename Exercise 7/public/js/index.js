const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}

const message = document.getElementById("message");
const logout = document.getElementById("logout");

const checkAuthentication = async () => {
    try {
        const response = await fetch("/api/private", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "/login.html";
            return;
        }

        const result = await response.json();
        // console.log(result);
        message.textContent = result.message;

    } catch (err) {
        console.log(err);
    }
};

checkAuthentication();

logout.addEventListener("click", () => {
    localStorage.removeItem("token");
    // console.log("User logged out.");
    window.location.href = "/login.html";
});
const form = document.getElementById("adminLoginForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("admin", "true");

        window.location.href = "admin.html";

    } else {

        document.getElementById("message").innerHTML = `
            <div class="alert alert-danger">
                Invalid Username or Password
            </div>
        `;

    }

});
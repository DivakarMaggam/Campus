const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const user = {

        fullName: document.getElementById("fullName").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        phone: document.getElementById("phone").value

    };

    try {

        const response = await fetch("http://localhost:8080/api/users/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(user)

        });

        const message = await response.text();

        document.getElementById("message").innerHTML =

            `<div class="alert alert-info">${message}</div>`;

        if (message === "User Registered Successfully!") {

            form.reset();

        }

    } catch (error) {

        document.getElementById("message").innerHTML =

            `<div class="alert alert-danger">
                Unable to connect to server.
             </div>`;

    }

});
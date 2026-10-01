const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const loginData = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    const response = await fetch("http://localhost:8080/api/users/login", {

        method: "POST",

        headers: {

            "Content-Type":"application/json"

        },

        body: JSON.stringify(loginData)

    });

    const message = await response.text();

    document.getElementById("message").innerHTML =
    `<div class="alert alert-info">${message}</div>`;

    if(message==="Login Successful!"){

        localStorage.setItem("userEmail",loginData.email);

        window.location.href="dashboard.html";

    }

});
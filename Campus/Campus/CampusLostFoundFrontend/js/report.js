const form = document.getElementById("itemForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const formData = new FormData();

    // Category
    let category = document.getElementById("category").value;

    if (category === "Other") {
        category = document.getElementById("otherCategory").value;
    }

    // Basic Details
    formData.append("itemName", document.getElementById("itemName").value);
    formData.append("category", category);
    formData.append("location", document.getElementById("location").value);
    formData.append("date", document.getElementById("date").value);

    // Verification Questions
    formData.append("question1", document.getElementById("question1").value);
    formData.append("answer1", document.getElementById("answer1").value);

    formData.append("question2", document.getElementById("question2").value);
    formData.append("answer2", document.getElementById("answer2").value);

    formData.append("question3", document.getElementById("question3").value);
    formData.append("answer3", document.getElementById("answer3").value);

    // Admin Details
    formData.append("givenToAdmin", document.getElementById("givenToAdmin").value);
    formData.append("givenDate", document.getElementById("givenDate").value);
    formData.append("givenTime", document.getElementById("givenTime").value);

    // Automatically Set Status
    formData.append("status", "FOUND");

    // User Email
    formData.append("reportedBy", localStorage.getItem("userEmail"));

    const response = await fetch("http://localhost:8080/api/items/report", {

        method: "POST",

        body: formData

    });

    const message = await response.text();

    document.getElementById("message").innerHTML =
        `<div class="alert alert-success">${message}</div>`;

    form.reset();

});
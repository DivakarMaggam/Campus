const params = new URLSearchParams(window.location.search);

const itemId = params.get("id");

// Load Item Questions
async function loadItem() {

    const response = await fetch("http://localhost:8080/api/items");

    const items = await response.json();

    const item = items.find(i => i.id == itemId);

    if (!item) {
        alert("Item not found");
        return;
    }
    if (item.status === "CLAIMED") {

    alert("This item has already been claimed.");

    window.location.href = "search-item.html";   // Change this if your search page has a different name

    return;
}
    document.getElementById("q1").innerText = item.question1;
    document.getElementById("q2").innerText = item.question2;
    document.getElementById("q3").innerText = item.question3;
}

loadItem();

// Submit Claim
document.getElementById("claimForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const formData = new FormData();

    formData.append("itemId", itemId);

    formData.append("userEmail", localStorage.getItem("userEmail"));

    formData.append("answer1", document.getElementById("answer1").value);

    formData.append("answer2", document.getElementById("answer2").value);

    formData.append("answer3", document.getElementById("answer3").value);

    const file = document.getElementById("proofImage").files[0];

    if (!file) {
        alert("Please upload a proof image.");
        return;
    }

    formData.append("proofImage", file);

    const response = await fetch("http://localhost:8080/api/claims/submit", {
        method: "POST",
        body: formData
    });

    const message = await response.text();

    document.getElementById("message").innerHTML =
        `<div class="alert alert-success">${message}</div>`;

    document.getElementById("claimForm").reset();

});

if(localStorage.getItem("admin") !== "true"){

    alert("Please login as Admin.");
    window.location.href="admin-login.html";

}

async function loadClaims(){

    const response=await fetch("http://localhost:8080/api/claims");

    const claims=await response.json();

    const table=document.getElementById("claimTable");

    table.innerHTML="";

    claims.forEach(c=>{

        table.innerHTML+=`

<tr>

<td>${c.id}</td>

<td>${c.itemId}</td>

<td>${c.userEmail}</td>

<td>

<b>${c.question1}</b><br>
Correct : ${c.correctAnswer1}<br>
Claimant : ${c.answer1}<br><br>

<b>${c.question2}</b><br>
Correct : ${c.correctAnswer2}<br>
Claimant : ${c.answer2}<br><br>

<b>${c.question3}</b><br>
Correct : ${c.correctAnswer3}<br>
Claimant : ${c.answer3}<br><br>

<b style="color:${c.matched ? 'green' : 'red'}">
${c.matched ? '✔ Answers Matched' : '✘ Answers Mismatched'}
</b>

</td>

<td>
${c.holder}
</td>

<td>

${
c.proofImage
?
`<img
src="http://localhost:8080/uploads/${encodeURIComponent(c.proofImage)}"
width="120"
height="120"
style="object-fit:cover;border-radius:8px;">`
:
"No Image"
}

</td>

<td>${c.status}</td>

<td>

<button
class="btn btn-success btn-sm"
onclick="approve(${c.id})">

Approve

</button>

<button
class="btn btn-danger btn-sm ms-2"
onclick="reject(${c.id})">

Reject

</button>

</td>

</tr>

`;

    });

}

async function approve(id){

    await fetch(
        `http://localhost:8080/api/claims/approve/${id}`,
        {
            method:"PUT"
        });

    loadClaims();

}

async function reject(id){

    await fetch(
        `http://localhost:8080/api/claims/reject/${id}`,
        {
            method:"PUT"
        });

    loadClaims();

}

loadClaims();

function logout(){

    localStorage.removeItem("admin");

    window.location.href="admin-login.html";

}
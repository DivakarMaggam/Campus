let allItems = [];

// Load all items when page opens
async function loadItems() {

    const response = await fetch("http://localhost:8080/api/items");

    allItems = await response.json();

    displayItems(allItems);

}

// Display items in table
function displayItems(items) {

    const table = document.getElementById("itemTable");

    table.innerHTML = "";

    if (items.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    No Items Found
                </td>
            </tr>
        `;

        return;
    }

    items.forEach(item => {

        let button;

        if (item.status === "CLAIMED") {

            button = `
                <button class="btn btn-secondary btn-sm" disabled>
                    Already Claimed
                </button>
            `;

        } else {

            button = `
                <a href="claim.html?id=${item.id}"
                   class="btn btn-success btn-sm">
                    Claim
                </a>
            `;

        }

        table.innerHTML += `

        <tr>

            <td>${item.itemName}</td>

            <td>${item.category}</td>

            <td>${item.location}</td>

            <td>${item.date}</td>

            <td>${item.status}</td>

            <td>
                ${button}
            </td>

        </tr>

        `;

    });

}

// Search Items
function searchItems() {

    const keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    const filtered = allItems.filter(item =>

        item.itemName.toLowerCase().includes(keyword) ||

        item.category.toLowerCase().includes(keyword) ||

        item.location.toLowerCase().includes(keyword)

    );

    displayItems(filtered);

}

// Load data
loadItems();
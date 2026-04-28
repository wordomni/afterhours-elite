function goSearch() {
  const query = document.getElementById("search").value;
  localStorage.setItem("query", query);
  window.location.href = "city.html";
}

// CITY PAGE LOGIC
if (window.location.pathname.includes("city.html")) {
  const query = localStorage.getItem("query")?.toLowerCase() || "";

  document.getElementById("cityTitle").innerText =
    "Results for: " + query;

  const results = businesses.filter(b =>
    b.city.includes(query) || b.category.includes(query)
  );

  document.getElementById("results").innerHTML =
    results.map(b => `
      <div class="item">
        <h3>${b.name}</h3>
        <p>${b.description}</p>
        <p><b>Open:</b> ${b.open}</p>
        <button onclick="viewListing(${b.id})">View</button>
      </div>
    `).join("");
}

// LISTING PAGE LOGIC
function viewListing(id) {
  localStorage.setItem("listingId", id);
  window.location.href = "listing.html";
}

if (window.location.pathname.includes("listing.html")) {
  const id = localStorage.getItem("listingId");

  const biz = businesses.find(b => b.id == id);

  document.getElementById("business").innerHTML = `
    <h1>${biz.name}</h1>
    <p>${biz.description}</p>
    <p><b>Open:</b> ${biz.open}</p>
    <p><b>Call:</b> ${biz.phone}</p>
  `;
}
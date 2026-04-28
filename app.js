/* =========================
   AFTERHOURS ELITE USA - SAFE ENGINE
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const page = window.location.pathname;

  /* =========================
     HOMEPAGE LOGIC
  ========================= */
  const searchInput = document.getElementById("search");

  if (searchInput) {
    window.goSearch = function () {
      const query = searchInput.value.trim().toLowerCase();

      if (!query) return;

      localStorage.setItem("query", query);

      window.location.href = "city.html";
    };

    window.openCity = function (city) {
      localStorage.setItem("query", city.toLowerCase());
      window.location.href = "city.html";
    };
  }

  /* =========================
     CITY PAGE LOGIC
  ========================= */
  const resultsContainer = document.getElementById("results");
  const cityTitle = document.getElementById("cityTitle");

  if (resultsContainer) {

    const query = localStorage.getItem("query") || "usa";

    if (cityTitle) {
      cityTitle.innerText = `Results for: ${query.replace("-", " ")}`;
    }

    const results = generateMockResults(query);

    resultsContainer.innerHTML = results.map(b => `
      <div class="item">
        <h3>${b.name}</h3>
        <p>${b.description}</p>
        <p><b>Open:</b> ${b.open}</p>
        <button onclick="viewListing(${b.id})">View</button>
      </div>
    `).join("");
  }

  /* =========================
     LISTING PAGE LOGIC
  ========================= */
  const businessContainer = document.getElementById("business");

  if (businessContainer) {

    const id = localStorage.getItem("listingId");

    const business = getBusinessById(id);

    businessContainer.innerHTML = `
      <h1>${business.name}</h1>
      <p>${business.description}</p>
      <p><b>Status:</b> ${business.open}</p>
    `;
  }

});

/* =========================
   GLOBAL FUNCTIONS (SAFE)
========================= */

function viewListing(id) {
  localStorage.setItem("listingId", id);
  window.location.href = "listing.html";
}

/* =========================
   MOCK DATA (replace later with real DB)
========================= */

function generateMockResults(city) {
  return [
    {
      id: 1,
      name: `Emergency Plumber ${city}`,
      description: `Fast-response plumbing in ${city}`,
      open: "24/7"
    },
    {
      id: 2,
      name: `Late Night Food ${city}`,
      description: `Best food open late in ${city}`,
      open: "Until 3AM"
    },
    {
      id: 3,
      name: `24 Hour Electrician ${city}`,
      description: `Emergency electrical services in ${city}`,
      open: "24/7"
    }
  ];
}

function getBusinessById(id) {
  return {
    id: id,
    name: "Premium USA Service Provider",
    description: "Verified urgent local service provider.",
    open: "24/7"
  };
}

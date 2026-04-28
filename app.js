/* =========================
   AFTERHOURS ELITE USA CORE ENGINE
   Static directory logic (GitHub Pages ready)
========================= */

/* ---------- SEARCH FROM HOMEPAGE ---------- */
function goSearch() {
  const query = document.getElementById("search").value.trim().toLowerCase();

  if (!query) return;

  // Save search globally
  localStorage.setItem("query", query);

  // Smart routing logic (USA intent handling)
  if (isCity(query)) {
    window.location.href = `city.html?city=${query}`;
  } else {
    window.location.href = `city.html?query=${encodeURIComponent(query)}`;
  }
}

/* ---------- CITY CLICK FROM HOMEPAGE ---------- */
function openCity(city) {
  localStorage.setItem("query", city.toLowerCase());
  window.location.href = `city.html?city=${city.toLowerCase()}`;
}

/* ---------- DETECT IF INPUT IS A CITY ---------- */
function isCity(query) {
  const knownCities = [
    "new-york-city",
    "los-angeles",
    "chicago",
    "miami",
    "dallas",
    "houston",
    "san-francisco",
    "seattle",
    "boston",
    "atlanta"
  ];

  return knownCities.includes(query);
}

/* =========================
   CITY PAGE LOGIC (city.html)
========================= */
if (window.location.pathname.includes("city.html")) {

  const params = new URLSearchParams(window.location.search);
  const cityParam = params.get("city");
  const queryParam = params.get("query");

  const city = cityParam || queryParam || localStorage.getItem("query") || "usa";

  const title = document.getElementById("cityTitle");
  const resultsContainer = document.getElementById("results");

  if (title) {
    title.innerText = `Results for: ${city.replace("-", " ")}`;
  }

  // Simulated directory results (replace later with real DB)
  const results = generateMockResults(city);

  if (resultsContainer) {
    resultsContainer.innerHTML = results.map(business => `
      <div class="item">
        <h3>${business.name}</h3>
        <p>${business.description}</p>
        <p><b>Open:</b> ${business.open}</p>
        <button onclick="viewListing(${business.id})">View Details</button>
      </div>
    `).join("");
  }
}

/* ---------- MOCK DATA GENERATOR (USA SCALE READY) ---------- */
function generateMockResults(city) {
  return [
    {
      id: 1,
      name: `Emergency Plumber ${city}`,
      description: `Fast-response plumbing services in ${city}`,
      open: "24/7"
    },
    {
      id: 2,
      name: `Late Night Food ${city}`,
      description: `Top-rated food open late in ${city}`,
      open: "Until 3AM"
    },
    {
      id: 3,
      name: `24 Hour Electrician ${city}`,
      description: `Emergency electrical repairs in ${city}`,
      open: "24/7"
    }
  ];
}

/* =========================
   LISTING PAGE LOGIC (listing.html)
========================= */
function viewListing(id) {
  localStorage.setItem("listingId", id);
  window.location.href = "listing.html";
}

if (window.location.pathname.includes("listing.html")) {

  const id = localStorage.getItem("listingId");

  const listingContainer = document.getElementById("business");

  const business = getBusinessById(id);

  if (listingContainer && business) {
    listingContainer.innerHTML = `
      <div class="listing-card">
        <h1>${business.name}</h1>
        <p>${business.description}</p>
        <p><b>Status:</b> ${business.open}</p>

        <button>Call Now</button>
        <button>Request Quote</button>
      </div>
    `;
  }
}

/* ---------- MOCK SINGLE BUSINESS ---------- */
function getBusinessById(id) {
  return {
    id: id,
    name: "Premium USA Service Provider",
    description: "Verified local emergency service provider.",
    open: "24/7"
  };
}

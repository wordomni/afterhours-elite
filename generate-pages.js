const fs = require("fs");

const USA = require("./data.js").USA;
const categories = require("./data.js").categories;

function buildPage(state, city, category) {

  const title = `${category.replace("-", " ")} in ${city} ${state}`;
  const description = `Find trusted ${category.replace("-", " ")} in ${city}, ${state}. Open now, verified and fast response.`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <meta name="description" content="${description}">
</head>
<body>

<h1>${category.replace("-", " ")} in ${city}</h1>

<p>Fast response businesses available in ${city}, ${state}</p>

<div>
  <div class="card">Example Business 1</div>
  <div class="card">Example Business 2</div>
</div>

</body>
</html>
`;

  const folder = `./output/${state}/${city}/`;
  fs.mkdirSync(folder, { recursive: true });

  fs.writeFileSync(`${folder}${category}.html`, html);
}

// Generate everything
USA.forEach(region => {
  region.cities.forEach(city => {
    categories.forEach(cat => {
      buildPage(region.state, city, cat);
    });
  });
});

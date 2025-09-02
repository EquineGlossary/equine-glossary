async function loadBrands() {
  const res = await fetch("products.json");
  const products = await res.json();

  const brandList = document.getElementById("brandList");

  const brands = [...new Set(products.map(p => p.brand))];

  brands.forEach(brand => {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${brand}</h2>`;

    const items = products.filter(p => p.brand === brand);
    items.forEach(p => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <h3>${p.name}</h3>
        <p><strong>Category:</strong> ${p.category} – ${p.subcategory}</p>
        <p>${p.description}</p>
        <a href="${p.url}" target="_blank">View Product</a>
      `;
      section.appendChild(div);
    });

    brandList.appendChild(section);
  });
}

loadBrands();

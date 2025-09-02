async function loadProducts() {
  const res = await fetch("products.json");
  const products = await res.json();
  return products;
}

function displayProducts(products) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  if (products.length === 0) {
    list.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h2>${p.name}</h2>
      <p><strong>Brand:</strong> ${p.brand}</p>
      <p><strong>Category:</strong> ${p.category}</p>
      <p>${p.description}</p>
      <a href="${p.url}" target="_blank">Visit brand site</a>
    `;

    list.appendChild(card);
  });
}

function setupFilters(products) {
  const searchBox = document.getElementById("searchBox");
  const categoryFilter = document.getElementById("categoryFilter");

  function applyFilters() {
    const search = searchBox.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = products.filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search);
      const matchesCategory =
        category === "all" || p.category === category;

      return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
  }

  searchBox.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);

  applyFilters(); // Initial render
}

loadProducts().then(products => {
  setupFilters(products);
});

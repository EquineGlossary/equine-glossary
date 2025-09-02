async function loadProducts() {
  const res = await fetch("products.json");
  const products = await res.json();

  const categoryFilter = document.getElementById("categoryFilter");
  const subcategoryFilter = document.getElementById("subcategoryFilter");
  const brandFilter = document.getElementById("brandFilter");
  const productList = document.getElementById("productList");

  // Populate filters dynamically
  const categories = [...new Set(products.map(p => p.category))];
  const subcategories = [...new Set(products.map(p => p.subcategory))];
  const brands = [...new Set(products.map(p => p.brand))];

  categories.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c; opt.textContent = c;
    categoryFilter.appendChild(opt);
  });

  subcategories.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    subcategoryFilter.appendChild(opt);
  });

  brands.forEach(b => {
    const opt = document.createElement("option");
    opt.value = b; opt.textContent = b;
    brandFilter.appendChild(opt);
  });

  function render() {
    const cat = categoryFilter.value;
    const subcat = subcategoryFilter.value;
    const brand = brandFilter.value;

    productList.innerHTML = "";

    products
      .filter(p => !cat || p.category === cat)
      .filter(p => !subcat || p.subcategory === subcat)
      .filter(p => !brand || p.brand === brand)
      .forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <h3>${p.name}</h3>
          <p><strong>Brand:</strong> ${p.brand}</p>
          <p><strong>Category:</strong> ${p.category} – ${p.subcategory}</p>
          <p>${p.description}</p>
          <a href="${p.url}" target="_blank">View Product</a>
        `;
        productList.appendChild(div);
      });
  }

  categoryFilter.addEventListener("change", render);
  subcategoryFilter.addEventListener("change", render);
  brandFilter.addEventListener("change", render);

  render();
}

loadProducts();

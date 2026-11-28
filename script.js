document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".product-card button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      alert("✅ Item added to cart!");
    });
  });
});
// UpAck Laptop Catalogue
document.addEventListener("DOMContentLoaded", () => {

  const category = document.body.dataset.category;

  if (category !== "laptops") return;

  const searchInput = document.getElementById("product-search");
  const brandFilter = document.getElementById("brand-filter");
  const priceSort = document.getElementById("price-sort");
  const productGrid = document.getElementById("product-grid");

  // Laptop inventory will be added here.
  const laptops = [];

  function displayLaptops() {

    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;
    const sortOrder = priceSort.value;

    let filteredLaptops = laptops.filter(laptop => {

      const matchesSearch =
        laptop.name.toLowerCase().includes(searchTerm) ||
        laptop.brand.toLowerCase().includes(searchTerm);

      const matchesBrand =
        selectedBrand === "" || laptop.brand === selectedBrand;

      return matchesSearch && matchesBrand;
    });

    if (sortOrder === "high-low") {
      filteredLaptops.sort((a, b) => b.price - a.price);
    }

    if (sortOrder === "low-high") {
      filteredLaptops.sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "newest") {
      filteredLaptops.sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
      );
    }

    productGrid.innerHTML = "";

    if (filteredLaptops.length === 0) {
      productGrid.innerHTML =
        "<p id='catalogue-message'>No laptops available yet. Please check back soon.</p>";
      return;
    }

    filteredLaptops.forEach(laptop => {

      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${laptop.image}" alt="${laptop.name}">
        <h3>${laptop.name}</h3>
        <p>${laptop.description}</p>
        <p><strong>Price:</strong> GH₵ ${laptop.price}</p>
        <button type="button">View Details</button>
      `;

      productGrid.appendChild(card);
    });
  }

  searchInput.addEventListener("input", displayLaptops);
  brandFilter.addEventListener("change", displayLaptops);
  processorFilter.addEventListener("change", displayLaptops);
  priceSort.addEventListener("change", displayLaptops);

  displayLaptops();

});

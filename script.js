document.addEventListener("DOMContentLoaded", () => {
  // Language toggle
  const langToggle = document.getElementById("langToggle");
  let currentLang = "en";

  if (langToggle) {
    langToggle.addEventListener("click", () => {
      currentLang = currentLang === "en" ? "jp" : "en";

      // Switch visible text
      document.querySelectorAll("[data-en]").forEach(el => {
        const next = el.getAttribute(`data-${currentLang}`);
        if (next) el.textContent = next;
      });

      // Switch placeholders
      document.querySelectorAll("[data-en-placeholder]").forEach(el => {
        const next = el.getAttribute(`data-${currentLang}-placeholder`);
        if (next) el.placeholder = next;
      });

      // Toggle button label
      langToggle.textContent = currentLang === "en" ? "日本語" : "English";

      // Update sort select option labels
      const sortSelect = document.getElementById("sortSelect");
      if (sortSelect) {
        [...sortSelect.options].forEach(opt => {
          const txt = opt.getAttribute(`data-${currentLang}`);
          if (txt) opt.textContent = txt;
        });
      }
    });
  }

  // Sorting
  const sortSelect = document.getElementById("sortSelect");
  const grid = document.getElementById("stockGrid");

  if (sortSelect && grid) {
    sortSelect.addEventListener("change", () => {
      const cards = Array.from(grid.querySelectorAll(".car-card"));

      cards.sort((a, b) => {
        const type = sortSelect.value;
        const pa = +a.dataset.price, pb = +b.dataset.price;
        const ya = +a.dataset.year,  yb = +b.dataset.year;
        const ma = +a.dataset.mileage, mb = +b.dataset.mileage;

        if (type === "priceAsc")  return pa - pb;
        if (type === "priceDesc") return pb - pa;
        if (type === "yearAsc")   return ya - yb;
        if (type === "yearDesc")  return yb - ya;
        if (type === "mileageAsc")  return ma - mb;
        if (type === "mileageDesc") return mb - ma;
        return 0;
      });

      grid.style.opacity = "0";
      setTimeout(() => {
        grid.innerHTML = "";
        cards.forEach(c => grid.appendChild(c));
        grid.style.opacity = "1";
      }, 200);
    });
  }

  // Filtering
  const filterForm = document.getElementById("filterForm");

  if (filterForm && grid) {
    filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(filterForm);
      const filters = {};
      formData.forEach((value, key) => {
        filters[key] = value.trim().toLowerCase();
      });

      grid.querySelectorAll(".car-card").forEach(card => {
        let show = true;

        // Make / Model
        if (filters.make && card.dataset.make.toLowerCase() !== filters.make) show = false;
        if (filters.model && !card.dataset.model.toLowerCase().includes(filters.model)) show = false;

        // Year range
        if (filters.yearFrom && +card.dataset.year < +filters.yearFrom) show = false;
        if (filters.yearTo && +card.dataset.year > +filters.yearTo) show = false;

        // Price range
        if (filters.priceMin && +card.dataset.price < +filters.priceMin) show = false;
        if (filters.priceMax && +card.dataset.price > +filters.priceMax) show = false;

        // Mileage
        if (filters.mileageMax && +card.dataset.mileage > +filters.mileageMax) show = false;

        // Transmission
        if (filters.transmission && card.dataset.transmission.toLowerCase() !== filters.transmission) show = false;

        // Fuel
        if (filters.fuel && card.dataset.fuel.toLowerCase() !== filters.fuel) show = false;

        card.style.display = show ? "block" : "none";
      });
    });
  }
});

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

      // If on the stock page, also update <option> text for the select
      const sortSelect = document.getElementById("sortSelect");
      if (sortSelect) {
        [...sortSelect.options].forEach(opt => {
          const txt = opt.getAttribute(`data-${currentLang}`);
          if (txt) opt.textContent = txt;
        });
      }
    });
  }

  // Sorting (Stock page)
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

      // simple fade-out / in effect
      grid.style.opacity = "0";
      setTimeout(() => {
        grid.innerHTML = "";
        cards.forEach(c => grid.appendChild(c));
        grid.style.opacity = "1";
      }, 200);
    });
  }
});

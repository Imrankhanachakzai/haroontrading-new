document.addEventListener("DOMContentLoaded", () => {
    const langToggle = document.getElementById("langToggle");
    let currentLang = "en";

    langToggle.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "jp" : "en";
        document.querySelectorAll("[data-en]").forEach(el => {
            el.textContent = el.getAttribute(`data-${currentLang}`);
        });
        document.querySelectorAll("[data-en-placeholder]").forEach(el => {
            el.placeholder = el.getAttribute(`data-${currentLang}-placeholder`);
        });
        langToggle.textContent = currentLang === "en" ? "日本語" : "English";
    });
});

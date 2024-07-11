function toggleDarkMode() {
  const elements = [
    document.body,
    document.querySelector("section#main-section"),
    document.querySelector("#image-gallery-section"),
    document.querySelector("#lotto-section"),
    document.querySelector("#faq-section"),
    document.querySelector("#cardMain"),
    document.querySelector(".footer"),
  ];

  const isDarkMode = elements.some((element) => element && element.getAttribute("data-theme") === "dark");

  elements.forEach((element) => {
    if (element) {
      if (isDarkMode) {
        element.removeAttribute("data-theme");
      } else {
        element.setAttribute("data-theme", "dark");
      }
    }
  });
}

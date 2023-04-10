// accordion js
const d = document;
const accordions = d.querySelectorAll(".accordion");
const accordion_sections = d.querySelectorAll(".accordion_section");
const accordion_headers = d.querySelectorAll(".accordion_head");
let accordion_active_sections = d.querySelectorAll(".accordion_section.active");

const accordion_set_section_height = (section) => {
  const section_body = section.querySelector(".accordion_body");
  const height = `${section_body.offsetHeight}px`;
  section.querySelector(".accordion_body_container").style.maxHeight = height;
};

accordion_active_sections.forEach((section) =>
  accordion_set_section_height(section)
);

window.addEventListener("resize", () => {
  accordion_active_sections = d.querySelectorAll(".accordion_section.active");
  accordion_active_sections.forEach((section) =>
    accordion_set_section_height(section)
  );
});

const accordion_toggle_active = (clicked_section) => {
  const body_container = clicked_section.querySelector(
    ".accordion_body_container"
  );
  if (clicked_section.classList.contains("active")) {
    clicked_section.classList.remove("active");
    body_container.style.removeProperty("max-height");
  } else {
    accordion_set_section_height(clicked_section);
    clicked_section.classList.add("active");
  }
};

accordion_headers.forEach((header) => {
  header.addEventListener("click", (e) => {
    // get clicked accordion section
    const this_accordion = header.closest(".accordion");
    console.log(this_accordion);
    const this_accordion_sections =
      this_accordion.querySelectorAll(".accordion_section");
    const behavior = this_accordion.getAttribute("data-behavior");
    const toggle = this_accordion.getAttribute("data-toggle-open");

    const clicked_section = header.closest(".accordion_section");

    if (behavior === "stay-open") {
      accordion_toggle_active(clicked_section);
    } else {
      for (const section of this_accordion_sections) {
        // check to see if the section clicked on
        if (section !== clicked_section) {
          section
            .querySelector(".accordion_body_container")
            .style.removeProperty("max-height");
          section.classList.remove("active");
        } else {
          if (toggle) {
            accordion_toggle_active(clicked_section);
          } else {
            accordion_set_section_height(section);
            section.classList.add("active");
          }
        }
      }
    }
  });
});

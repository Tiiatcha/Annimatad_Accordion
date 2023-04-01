const d = document;
const accordions = d.querySelectorAll(".accordion_container");
const accordion_sections = d.querySelectorAll(".accordion_section");
const accordion_headers = d.querySelectorAll(".accordion_head");

accordion_sections.forEach((section) => {
  if (section.classList.contains("active")) {
    const section_body = section.querySelector(".accordion_body");
    const section_body_height = section_body.offsetHeight;
    section.querySelector(".accordion_body_container").style.maxHeight =
      section_body_height;
  }
});

accordion_headers.forEach((header) => {
  header.addEventListener("click", (e) => {
    // get clicked accordion section
    const accordion = header.closest(".accordion_container");
    const behavior = accordion.getAttribute("data-behavior");
    console.log(behavior);
    const clicked_section = header.closest(".accordion_section");
    const clicked_body = clicked_section.querySelector(".accordion_body");
    const clicked_body_height = clicked_body.offsetHeight;

    // if the clicked section is not the current active section
    if (behavior !== "stay-open" && !clicked_section.hasAttribute("active")) {
      // select the accordion container that was clicked within
      const accordion = e.target.closest(".accordion_container");
      // get all accordion sections within the selected accordion
      const sections = accordion.querySelectorAll(".accordion_section");
      clicked_section.querySelector(
        ".accordion_body_container"
      ).style.maxHeight = clicked_body_height;
      clicked_section.classList.add("active");
      // for each section
      for (const section of sections) {
        // check to see if the section clicked on
        if (section !== clicked_section) {
          section.classList.remove("active");
          section
            .querySelector(".accordion_body_container")
            .style.removeProperty("max-height");
        }
      }
    } else {
      if (clicked_section.classList.contains("active")) {
        clicked_section.classList.remove("active");
        clicked_section
          .querySelector(".accordion_body_container")
          .style.removeProperty("max-height");
      } else {
        clicked_section.querySelector(
          ".accordion_body_container"
        ).style.maxHeight = clicked_body_height;
        clicked_section.classList.add("active");
      }
    }
  });
});

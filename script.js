/* =========================================
   TAMSE BUILDERS
   Main JavaScript
========================================= */


/* =========================================
   GOOGLE APPS SCRIPT URL
========================================= */

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyWYs4zf29DBoG06_U9xpIAEVWGSUAtWrAKA8zuflaz-fhhKa36jOoLxB3ufb3kPxu-/exec";


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {

  menuToggle.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

}


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav a").forEach((link) => {

  link.addEventListener("click", () => {

    if (nav) {
      nav.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }

  });

});


/* =========================================
   PROJECT FILTER
========================================= */

const filterButtons =
  document.querySelectorAll(".filter");

const projectCards =
  document.querySelectorAll(".project-card");


filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    /* Remove active state */

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    /* Add active state */

    button.classList.add("active");

    const selectedCategory =
      button.dataset.filter;


    /* Show / hide projects */

    projectCards.forEach((card) => {

      const category =
        card.dataset.category;

      if (
        selectedCategory === "all" ||
        category === selectedCategory
      ) {

        card.classList.remove("is-hidden");

      } else {

        card.classList.add("is-hidden");

      }

    });

  });

});


/* =========================================
   ENQUIRY FORM
========================================= */

const enquiryForm =
  document.getElementById("enquiryForm");

const formStatus =
  document.getElementById("formStatus");

const submitButton =
  enquiryForm
    ? enquiryForm.querySelector(".submit-btn")
    : null;


if (enquiryForm) {

  enquiryForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      /* Browser validation */

      if (!enquiryForm.checkValidity()) {

        enquiryForm.reportValidity();

        return;

      }


      /* Disable button */

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.innerHTML =
          "SENDING...";

      }


      if (formStatus) {

        formStatus.textContent =
          "Sending your enquiry...";

      }


      /* Collect form data */

      const formData =
        new FormData(enquiryForm);


      /*
        Add additional information
        to the Google Sheet.
      */

      formData.append(
        "submittedAt",
        new Date().toISOString()
      );

      formData.append(
        "source",
        "TAMSE Builders Website"
      );


      try {

        /*
          Send data to Google Apps Script.

          no-cors is used because this is a
          static frontend communicating with
          a Google Apps Script Web App.
        */

        await fetch(
          SCRIPT_URL,
          {
            method: "POST",

            mode: "no-cors",

            body: new URLSearchParams(formData)
          }
        );


        /*
          With no-cors the browser cannot
          read the response from Apps Script.

          A successful fetch means the
          request was sent.
        */

        enquiryForm.reset();


        if (formStatus) {

          formStatus.textContent =
            "Thank you. Your project enquiry has been submitted.";

        }


      } catch (error) {

        console.error(
          "Form submission error:",
          error
        );


        if (formStatus) {

          formStatus.textContent =
            "We couldn't send your enquiry. Please try again.";

        }

      } finally {

        /* Enable button again */

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.innerHTML =
            'SEND ENQUIRY <span>↗</span>';

        }

      }

    }
  );

}


/* =========================================
   CURRENT YEAR
========================================= */

const yearElement =
  document.getElementById("year");

if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}

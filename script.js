/* ==========================================
   TAMSE BUILDERS — SCRIPT.JS
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. HEADER
    ========================================== */

    const header = document.querySelector(".site-header");

    window.addEventListener("scroll", () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });


    /* ==========================================
       2. NAVIGATION
    ========================================== */

    const navLinks = document.querySelectorAll(
        ".main-nav a"
    );

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ==========================================
       3. ACTIVE NAVIGATION ON SCROLL
    ========================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );


    function updateActiveNavigation() {

        let currentSection = "";

        const headerHeight =
            header ? header.offsetHeight : 0;

        const scrollPosition =
            window.scrollY + headerHeight + 100;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const sectionName =
                link.getAttribute("data-section");

            if (
                sectionName === currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* ==========================================
   4. PROJECT FILTER
========================================== */

const filterButtons = document.querySelectorAll(
    ".project-filter-btn"
);

const projectCards = document.querySelectorAll(
    ".project-card"
);


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;


        /* Remove active from all buttons */

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        /* Add active to clicked button */

        button.classList.add("active");


        /* Filter projects */

        projectCards.forEach(card => {

            const status = card.dataset.status;


            if (
                filter === "all" ||
                status === filter
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* ==========================================
   5. PROJECT MODAL
========================================== */

const projectModal = document.getElementById(
    "projectModal"
);

const modalProjectImage = document.getElementById(
    "modalProjectImage"
);

const modalProjectTitle = document.getElementById(
    "modalProjectTitle"
);

const modalClose = document.querySelector(
    ".project-modal-close"
);

const modalPrev = document.querySelector(
    ".project-modal-arrow.prev"
);

const modalNext = document.querySelector(
    ".project-modal-arrow.next"
);

const viewProjectButtons = document.querySelectorAll(
    ".view-project-btn"
);


/* Current project images */

let currentProjectImages = [];

let currentImageIndex = 0;


/* ==========================================
   6. UPDATE ARROW VISIBILITY
========================================== */

function updateModalArrows() {

    if (!modalPrev || !modalNext) {
        return;
    }


    /* FIRST IMAGE */

    if (currentImageIndex === 0) {

        modalPrev.classList.add("hidden");

    } else {

        modalPrev.classList.remove("hidden");

    }


    /* LAST IMAGE */

    if (
        currentImageIndex ===
        currentProjectImages.length - 1
    ) {

        modalNext.classList.add("hidden");

    } else {

        modalNext.classList.remove("hidden");

    }

}


/* ==========================================
   7. SHOW CURRENT IMAGE
========================================== */

function showProjectImage() {

    if (
        !currentProjectImages.length ||
        !modalProjectImage
    ) {
        return;
    }


    modalProjectImage.src =
        currentProjectImages[currentImageIndex];


    modalProjectImage.alt =
        "TAMSE Builders project image " +
        (currentImageIndex + 1);


    updateModalArrows();

}


/* ==========================================
   8. OPEN PROJECT MODAL
========================================== */

viewProjectButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (!projectModal) {
            return;
        }


        /* Get images from data-images */

        const imageData =
            button.dataset.images || "";


        currentProjectImages =
            imageData
                .split("|")
                .map(image => image.trim())
                .filter(Boolean);


        /* Start from first image */

        currentImageIndex = 0;


        /* Project title */

        const title =
            button.dataset.title ||
            "TAMSE Builders Project";


        if (modalProjectTitle) {

            modalProjectTitle.textContent =
                title;

        }


        /* Show first image */

        showProjectImage();


        /* Open modal */

        projectModal.classList.add("show");

        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    });

});


/* ==========================================
   9. NEXT IMAGE
========================================== */

if (modalNext) {

    modalNext.addEventListener("click", () => {

        if (
            currentImageIndex <
            currentProjectImages.length - 1
        ) {

            currentImageIndex++;

            showProjectImage();

        }

    });

}


/* ==========================================
   10. PREVIOUS IMAGE
========================================== */

if (modalPrev) {

    modalPrev.addEventListener("click", () => {

        if (currentImageIndex > 0) {

            currentImageIndex--;

            showProjectImage();

        }

    });

}


/* ==========================================
   11. CLOSE MODAL
========================================== */

function closeProjectModal() {

    if (!projectModal) {
        return;
    }


    projectModal.classList.remove("show");

    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow = "";


    if (modalProjectImage) {

        modalProjectImage.src = "";

    }


    currentProjectImages = [];

    currentImageIndex = 0;

}


/* Close button */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


/* ==========================================
   12. CLOSE WHEN CLICKING BACKDROP
========================================== */

if (projectModal) {

    projectModal.addEventListener(
        "click",
        event => {

            if (
                event.target === projectModal
            ) {

                closeProjectModal();

            }

        }
    );

}


/* ==========================================
   13. ESCAPE KEY
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            projectModal &&
            projectModal.classList.contains("show")
        ) {

            closeProjectModal();

        }

    }
);


/* ==========================================
   14. KEYBOARD IMAGE NAVIGATION
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !projectModal ||
            !projectModal.classList.contains("show")
        ) {
            return;
        }


        /* Arrow Right */

        if (
            event.key === "ArrowRight" &&
            currentImageIndex <
            currentProjectImages.length - 1
        ) {

            currentImageIndex++;

            showProjectImage();

        }


        /* Arrow Left */

        if (
            event.key === "ArrowLeft" &&
            currentImageIndex > 0
        ) {

            currentImageIndex--;

            showProjectImage();

        }

    }
);
/* ==========================================
   VALUES CARD — MOBILE TAP FLIP
========================================== */

const valueCards = document.querySelectorAll(".value-card");

valueCards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("is-flipped");
    });
});
// ========================================
// NAME + PHONE + LOCATION INPUT RESTRICTIONS
// ========================================

const nameInput = document.querySelector("#fullName");
const phoneInput = document.querySelector("#phone");
const locationInput = document.querySelector("#location");

// Name → letters and spaces only
if (nameInput) {
    nameInput.addEventListener("input", () => {
        nameInput.value = nameInput.value.replace(/[^A-Za-z ]/g, "");
    });
}

// Phone → numbers only, maximum 10 digits
if (phoneInput) {
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value
            .replace(/\D/g, "")
            .slice(0, 10);
    });
}

// Project Location → letters and spaces only
if (locationInput) {
    locationInput.addEventListener("input", () => {
        locationInput.value =
            locationInput.value.replace(/[^A-Za-z ]/g, "");
    });
}
if (!/^[A-Za-z ]+$/.test(fullName)) {
    formMessage.textContent =
        "Please enter letters only in the name field.";
    formMessage.className = "form-message error";
    return;
}
    /* ==========================================
   15. CONTACT FORM / ENQUIRY
========================================== */

const enquiryForm = document.querySelector("#contactForm");
const submitButton = document.querySelector("#contactSubmit");
const formMessage = document.querySelector("#formMessage");


if (enquiryForm) {

    enquiryForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        /* ==========================================
           GET FORM VALUES
        ========================================== */

        const fullName =
            document.querySelector("#fullName").value.trim();

        const phone =
            document.querySelector("#phone").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const projectType =
            document.querySelector("#projectType").value;

        const budget =
            document.querySelector("#budget").value;

        const location =
            document.querySelector("#location").value.trim();

        const message =
            document.querySelector("#message").value.trim();


        /* ==========================================
           BASIC VALIDATION
        ========================================== */

        if (!fullName || !phone || !email) {

            formMessage.textContent =
                "Please fill in all required fields.";

            formMessage.className =
                "form-message error";

            return;
        }
        // ========================================
// NAME + PHONE INPUT RESTRICTIONS
// ========================================

const nameInput = document.querySelector("#fullName");
const phoneInput = document.querySelector("#phone");


// Name → letters and spaces only
if (nameInput) {

    nameInput.addEventListener("input", () => {

        nameInput.value =
            nameInput.value.replace(/[^A-Za-z ]/g, "");

    });

}


// Phone → numbers only, maximum 10 digits
if (phoneInput) {

    phoneInput.addEventListener("input", () => {

        phoneInput.value =
            phoneInput.value.replace(/\D/g, "").slice(0, 10);

    });

}


        /* ==========================================
           EMAIL VALIDATION
        ========================================== */

        const emailPattern =
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.className =
                "form-message error";

            return;
        }


        /* ==========================================
           PHONE VALIDATION
        ========================================== */

        const phoneDigits =
            phone.replace(/\D/g, "");

        if (phoneDigits.length < 10) {

            formMessage.textContent =
                "Please enter a valid phone number.";

            formMessage.className =
                "form-message error";

            return;
        }


        /* ==========================================
           ENQUIRY DATA
        ========================================== */

        const enquiryData = {

            fullName: fullName,

            email: email,

            phone: phone,

            projectType: projectType,

            budget: budget,

            location: location,

            message: message

        };


        /* ==========================================
           RENDER BACKEND API
        ========================================== */

        const CONTACT_API_URL =
             "https://tamse-builders-api-prod.onrender.com/api/enquiry";

        /* ==========================================
           BUTTON - SENDING STATE
        ========================================== */

        const originalButtonText =
            submitButton
                ? submitButton.innerHTML
                : "Send Enquiry";


        if (submitButton) {

            submitButton.disabled = true;

            submitButton.innerHTML =
                "Sending...";
        }


        /* Clear previous message */

        if (formMessage) {

            formMessage.textContent = "";

            formMessage.className =
                "form-message";
        }


        /* ==========================================
           SEND DATA TO BACKEND
        ========================================== */

        try {

            const response =
                await fetch(
                    CONTACT_API_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                enquiryData
                            )
                    }
                );


            /* ==========================================
               READ SERVER RESPONSE
            ========================================== */

            let result = {};

            try {

                result =
                    await response.json();

            } catch (jsonError) {

                result = {};
            }


            /* ==========================================
               ERROR RESPONSE
            ========================================== */

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Failed to send enquiry."
                );
            }


            /* ==========================================
               SUCCESS
            ========================================== */

            if (formMessage) {

                formMessage.textContent =
                    "Thank you! Your enquiry has been submitted successfully. We will contact you soon.";

                formMessage.className =
                    "form-message success";
            }


            /* Clear form */

            enquiryForm.reset();


        } catch (error) {

            console.error(
                "Enquiry Error:",
                error
            );


            /* ==========================================
               ERROR MESSAGE
            ========================================== */

            if (formMessage) {

                formMessage.textContent =
                    "Sorry, we could not send your enquiry. Please try again later.";

                formMessage.className =
                    "form-message error";
            }

        } finally {

            /* ==========================================
               RESTORE BUTTON
            ========================================== */

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalButtonText;
            }

        }

    });

}

    /* ==========================================
   16.FOOTER CURRENT YEAR
========================================== */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


    /* ==========================================
       11. HEADER CTA
    ========================================== */

    const headerCTA =
        document.querySelector(
            ".header-cta"
        );


    if (headerCTA) {

        headerCTA.addEventListener(
            "click",
            event => {

                const targetId =
                    headerCTA.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* ==========================================
       12. UPDATE ACTIVE NAV AFTER CTA CLICK
    ========================================== */

    window.addEventListener(
        "hashchange",
        updateActiveNavigation
    );


    /* ==========================================
       13. PREVENT BROKEN IMAGE DISPLAY
    ========================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image failed to load:",
                        image.src
                    );

                }
            );

        });


    /* ==========================================
       14. PAGE READY
    ========================================== */

    console.log(
        "TAMSE Builders website loaded successfully."
    );

});
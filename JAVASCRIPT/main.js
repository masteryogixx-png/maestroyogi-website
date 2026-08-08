// ==========================================
// JAVASCRIPT/main.js
// ==========================================

// STICKY NAVBAR

const header = document.getElementById("header");

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


// MOBILE MENU

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}


if (navLinks) {

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}


// SCROLL REVEAL

const reveals = document.querySelectorAll("section");

function revealSections() {

    reveals.forEach(section => {

        const windowHeight = window.innerHeight;

        const revealTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            section.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();


// BACK TO TOP

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.id = "backToTop";

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        backToTop.style.display = "flex";

    } else {

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// FAQ ACCORDION

const questions = document.querySelectorAll(".faq-question");

questions.forEach(question => {

    question.addEventListener("click", () => {

        const answer = question.nextElementSibling;

        if (!answer) return;

        if (answer.style.maxHeight) {

            answer.style.maxHeight = null;

            const span = question.querySelector("span");

            if (span) {

                span.innerHTML = "+";

            }

        } else {

            answer.style.maxHeight = answer.scrollHeight + "px";

            const span = question.querySelector("span");

            if (span) {

                span.innerHTML = "-";

            }

        }

    });

});


// TESTIMONIAL SLIDER

const testimonials = document.querySelectorAll(".testimonial");

let testimonialIndex = 0;

function showTestimonials() {

    if (!testimonials.length) return;

    testimonials.forEach(item => {

        item.classList.remove("active");

    });

    testimonialIndex++;

    if (testimonialIndex > testimonials.length) {

        testimonialIndex = 1;

    }

    testimonials[testimonialIndex - 1].classList.add("active");

}

if (testimonials.length) {

    showTestimonials();

    setInterval(showTestimonials, 4000);

}

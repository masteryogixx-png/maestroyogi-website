// ===============================
// MAESTROYOGI JAVASCRIPT
// ===============================

// Sticky Navbar
const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

// ===============================
// Mobile Menu
// ===============================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// Close menu after clicking

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});

// ===============================
// Scroll Reveal Animation
// ===============================

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

// ===============================
// Back To Top Button
// ===============================

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

// ===============================
// GALLERY LIGHTBOX
// ===============================

const galleryImages = document.querySelectorAll(".gallery-image");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

galleryImages.forEach(image=>{

    image.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImage.src=image.src;

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});


// ===============================
// FAQ ACCORDION
// ===============================

const questions = document.querySelectorAll(".faq-question");

questions.forEach(question=>{

    question.addEventListener("click",()=>{

        const answer = question.nextElementSibling;

        if(answer.style.maxHeight){

            answer.style.maxHeight = null;

            question.querySelector("span").innerHTML = "+";

        }

        else{

            answer.style.maxHeight = answer.scrollHeight + "px";

            question.querySelector("span").innerHTML = "-";

        }

    });

});

// ===============================
// TESTIMONIAL SLIDER
// ===============================

const testimonials = document.querySelectorAll(".testimonial");

let testimonialIndex = 0;

function showTestimonials(){

    testimonials.forEach(item=>{

        item.classList.remove("active");

    });

    testimonialIndex++;

    if(testimonialIndex > testimonials.length){

        testimonialIndex = 1;

    }

    testimonials[testimonialIndex - 1].classList.add("active");

}

setInterval(showTestimonials,4000);

showTestimonials();

// ===============================
// CONTACT FORM VALIDATION
// ===============================

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        if(name === "" || email === "" || subject === "" || message === ""){

            alert("Please fill in all fields.");

            return;

        }

        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

        if(!emailPattern.test(email)){

            alert("Please enter a valid email address.");

            return;

        }

        alert("Message sent successfully!");

        contactForm.reset();

    });

}


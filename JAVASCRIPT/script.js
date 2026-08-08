// ===============================
// MAESTROYOGI JAVASCRIPT
// ===============================


const SUPABASE_URL = "https://vrqqcynfigempqrinnxo.supabase.co";

const SUPABASE_ANON_KEY = "sb_publishable_pli3ubwxWBmRCeyMs44gvQ_Gp_VqXxU";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


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



const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function(e){

        e.preventDefault();

        const inputs = registerForm.querySelectorAll("input, select");

        const full_name = inputs[0].value;

        const phone = inputs[1].value;

        const email = inputs[2].value;

        const course = inputs[3].value;

        const password = inputs[4].value;

        const { error: authError } = await supabase.auth.signUp({

            email: email,

            password: password

        });

        if(authError){

            alert(authError.message);

            return;

        }

        const { error } = await supabase

        .from("students")

        .insert([{

            full_name,

            phone,

            email,

            course

        }]);

        if(error){

            alert("Student information could not be saved.");

            console.log(error);

        }

        else{

            alert("Registration Successful.");

            registerForm.reset();

        }

    });

}

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function(e) {

        e.preventDefault();

        const name = document.getElementById("name").value;

        const email = document.getElementById("email").value;

        const phone = document.getElementById("phone").value;

        const subject = document.getElementById("subject").value;

        const message = document.getElementById("message").value;

        const { error } = await supabase

        .from("contact_messages")

        .insert([{

            name,

            email,

            phone,

            subject,

            message

        }]);

        if(error){

            alert("Message could not be sent.");

            console.log(error);

        }

        else{

            alert("Message sent successfully.");

            contactForm.reset();

        }

    });

}
// ================================
// LOGIN WITH SUPABASE AUTH
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.querySelector('input[type="email"]').value;

        const password = document.querySelector('input[type="password"]').value;

        const { data, error } = await supabase.auth.signInWithPassword({

            email: email,

            password: password

        });

        if (error) {

            alert("Invalid Email or Password");

            console.log(error);

            return;

        }

        alert("Login Successful");

        window.location.href = "admin.html";

    });

}
// ==========================================
// PROTECT ADMIN PAGE
// ==========================================

async function checkAdminLogin() {

    const {

        data: { session }

    } = await supabase.auth.getSession();

    if (!session) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;

    }

}

if (

    window.location.pathname.includes("admin.html") ||

    window.location.pathname.includes("manage-gallery.html") ||

    window.location.pathname.includes("manage-events.html") ||

    window.location.pathname.includes("manage-news.html") ||

    window.location.pathname.includes("manage-courses.html") ||

    window.location.pathname.includes("manage-students.html") ||

    window.location.pathname.includes("manage-messages.html") ||

    window.location.pathname.includes("settings.html") ||

    window.location.pathname.includes("profile.html") ||

    window.location.pathname.includes("activity.html") ||

    window.location.pathname.includes("analytics.html") ||

    window.location.pathname.includes("backup.html")

) {

    checkAdminLogin();

}

// ==========================================
// LOGOUT SYSTEM
// ==========================================

async function logoutAdmin() {

    const { error } = await supabase.auth.signOut();

    if (error) {

        alert("Logout Failed");

        return;

    }

    alert("Logged Out Successfully");

    window.location.href = "login.html";

}
// ==========================================
// GALLERY IMAGE UPLOAD TO SUPABASE STORAGE
// ==========================================

const galleryForm = document.getElementById("galleryForm");

if (galleryForm) {

    galleryForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const file = document.getElementById("galleryImage").files[0];

        const title = document.getElementById("galleryTitle").value;

        if (!file) {

            alert("Please select an image.");

            return;

        }

        const fileName = Date.now() + "_" + file.name;

        const { error: uploadError } = await supabase.storage

            .from("gallery")

            .upload(fileName, file);

        if (uploadError) {

            alert("Image upload failed.");

            console.log(uploadError);

            return;

        }

        const {

            data: { publicUrl }

        } = supabase.storage

            .from("gallery")

            .getPublicUrl(fileName);

        const { error: dbError } = await supabase

            .from("gallery")

            .insert([

                {

                    title: title,

                    image: publicUrl

                }

            ]);

        if (dbError) {

            alert("Database save failed.");

            console.log(dbError);

            return;

        }

        alert("Image Uploaded Successfully");

        galleryForm.reset();

    });

}
// ==========================================
// ADD EVENT TO SUPABASE
// ==========================================

const eventForm = document.getElementById("eventForm");

if (eventForm) {

    eventForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title = document.getElementById("eventTitle").value;

        const event_date = document.getElementById("eventDate").value;

        const location = document.getElementById("eventLocation").value;

        const description = document.getElementById("eventDescription").value;

        const { error } = await supabase

        .from("events")

        .insert([

            {

                title,

                event_date,

                location,

                description

            }

        ]);

        if (error) {

            alert("Failed to add event.");

            console.log(error);

            return;

        }

        alert("Event Added Successfully");

        eventForm.reset();

    });

}
// ==========================================
// ADD NEWS TO SUPABASE
// ==========================================

const newsForm = document.getElementById("newsForm");

if (newsForm) {

    newsForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title = document.getElementById("newsTitle").value;

        const description = document.getElementById("newsDescription").value;

        const { error } = await supabase

        .from("news")

        .insert([

            {

                title,

                description

            }

        ]);

        if (error) {

            alert("Failed to publish news.");

            console.log(error);

            return;

        }

        alert("News Published Successfully");

        newsForm.reset();

    });

}
// ==========================================
// ADD COURSE TO SUPABASE
// ==========================================

const courseForm = document.getElementById("courseForm");

if (courseForm) {

    courseForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title = document.getElementById("courseTitle").value;

        const duration = document.getElementById("courseDuration").value;

        const price = document.getElementById("coursePrice").value;

        const description = document.getElementById("courseDescription").value;

        const { error } = await supabase

        .from("courses")

        .insert([

            {

                title,

                duration,

                price,

                description

            }

        ]);

        if (error) {

            alert("Failed to add course.");

            console.log(error);

            return;

        }

        alert("Course Added Successfully");

        courseForm.reset();

    });

}

// ==========================================
// LOAD COURSES FROM SUPABASE
// ==========================================

async function loadCourses() {

    const courseContainer = document.getElementById("courseContainer");

    if (!courseContainer) return;

    const { data, error } = await supabase

        .from("courses")

        .select("*")

        .order("id", { ascending: false });

    if (error) {

        console.log(error);

        return;

    }

    courseContainer.innerHTML = "";

    data.forEach(course => {

        courseContainer.innerHTML += `

        <div class="course-card">

            <h2>${course.title}</h2>

            <h4>${course.duration}</h4>

            <h3>₹ ${course.price}</h3>

            <p>${course.description}</p>

            <a href="contact.html" class="btn">

                Enroll Now

            </a>

        </div>

        `;

    });

}

loadCourses();




// ==========================================
// JAVASCRIPT/contact.js
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name = document.getElementById("name")?.value.trim();

        const email = document.getElementById("email")?.value.trim();

        const phone = document.getElementById("phone")?.value.trim();

        const subject = document.getElementById("subject")?.value.trim();

        const message = document.getElementById("message")?.value.trim();

        if (!name || !email || !subject || !message) {

            alert("Please fill in all required fields.");

            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

       const { error } = await supabaseClient

            .from("contact_messages")

            .insert([{

                name: name,

                email: email,

                phone: phone,

                subject: subject,

                message: message

            }]);

        if (error) {

            console.error("Contact form error:", error);

            alert("Message could not be sent. Please try again.");

            return;

        }

        alert("Message sent successfully.");

        contactForm.reset();

    });

}


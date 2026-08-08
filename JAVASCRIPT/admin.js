// ==========================================
// JAVASCRIPT/admin.js
// ==========================================

// ==========================================
// ADD COURSE
// ==========================================

const courseForm = document.getElementById("courseForm");

if (courseForm) {

    courseForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title = document.getElementById("courseTitle")?.value.trim();

        const duration = document.getElementById("courseDuration")?.value.trim();

        const price = document.getElementById("coursePrice")?.value.trim();

        const description =
            document.getElementById("courseDescription")?.value.trim();

        if (!title || !duration || !price || !description) {

            alert("Please fill in all course fields.");

            return;

        }

        const { error } = await supabase
            .from("courses")
            .insert([{

                title: title,

                duration: duration,

                price: price,

                description: description

            }]);

        if (error) {

            console.error(error);

            alert("Failed to add course.");

            return;

        }

        alert("Course added successfully.");

        courseForm.reset();

    });

}


// ==========================================
// ADD EVENT
// ==========================================

const eventForm = document.getElementById("eventForm");

if (eventForm) {

    eventForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title = document.getElementById("eventTitle")?.value.trim();

        const event_date =
            document.getElementById("eventDate")?.value;

        const location =
            document.getElementById("eventLocation")?.value.trim();

        const description =
            document.getElementById("eventDescription")?.value.trim();

        if (!title || !event_date || !location || !description) {

            alert("Please fill in all event fields.");

            return;

        }

        const { error } = await supabase
            .from("events")
            .insert([{

                title: title,

                event_date: event_date,

                location: location,

                description: description

            }]);

        if (error) {

            console.error(error);

            alert("Failed to add event.");

            return;

        }

        alert("Event added successfully.");

        eventForm.reset();

    });

}


// ==========================================
// ADD NEWS
// ==========================================

const newsForm = document.getElementById("newsForm");

if (newsForm) {

    newsForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const title =
            document.getElementById("newsTitle")?.value.trim();

        const description =
            document.getElementById("newsDescription")?.value.trim();

        if (!title || !description) {

            alert("Please fill in all news fields.");

            return;

        }

        const { error } = await supabase
            .from("news")
            .insert([{

                title: title,

                description: description

            }]);

        if (error) {

            console.error(error);

            alert("Failed to publish news.");

            return;

        }

        alert("News published successfully.");

        newsForm.reset();

    });

}
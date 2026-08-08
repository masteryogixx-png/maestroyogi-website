// ==========================================
// JAVASCRIPT/auth.js
// ==========================================

// REGISTER

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const inputs = registerForm.querySelectorAll("input, select");

        const full_name = inputs[0]?.value.trim();
        const phone = inputs[1]?.value.trim();
        const email = inputs[2]?.value.trim();
        const course = inputs[3]?.value.trim();
        const password = inputs[4]?.value;

        if (!full_name || !phone || !email || !course || !password) {

            alert("Please fill in all fields.");

            return;

        }

        const { data, error: authError } =
            await supabase.auth.signUp({

                email: email,

                password: password

            });

        if (authError) {

            alert(authError.message);

            console.log(authError);

            return;

        }

        const { error: studentError } =
            await supabase
                .from("students")
                .insert([{

                    full_name: full_name,

                    phone: phone,

                    email: email,

                    course: course

                }]);

        if (studentError) {

            alert("Account created, but student information could not be saved.");

            console.log(studentError);

            return;

        }

        alert("Registration successful.");

        registerForm.reset();

        window.location.href = "login.html";

    });

}


// LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const emailInput =
            loginForm.querySelector('input[type="email"]');

        const passwordInput =
            loginForm.querySelector('input[type="password"]');

        const email = emailInput?.value.trim();

        const password = passwordInput?.value;

        if (!email || !password) {

            alert("Please enter your email and password.");

            return;

        }

        const { data, error } =
            await supabase.auth.signInWithPassword({

                email: email,

                password: password

            });

        if (error) {

            alert(error.message);

            console.log(error);

            return;

        }

        alert("Login successful.");

        window.location.href = "admin.html";

    });

}


// LOGOUT

async function logoutAdmin() {

    const { error } = await supabase.auth.signOut();

    if (error) {

        alert("Logout failed.");

        console.log(error);

        return;

    }

    window.location.href = "login.html";

}


// PROTECT ADMIN PAGES

async function checkAdminLogin() {

    const {

        data: { session }

    } = await supabase.auth.getSession();

    if (!session) {

        window.location.href = "login.html";

    }

}

const adminPages = [

    "admin.html",

    "manage-gallery.html",

    "manage-events.html",

    "manage-news.html",

    "manage-courses.html",

    "manage-students.html",

    "manage-messages.html",

    "settings.html",

    "profile.html",

    "activity.html",

    "analytics.html",

    "backup.html"

];

const currentPage =
    window.location.pathname.split("/").pop();

if (adminPages.includes(currentPage)) {

    checkAdminLogin();

}


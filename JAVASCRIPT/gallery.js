// ==========================================
// JAVASCRIPT/gallery.js
// ==========================================

// ==========================================
// GALLERY LIGHTBOX
// ==========================================

const galleryImages = document.querySelectorAll(".gallery-image");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const closeLightbox = document.getElementById("closeLightbox");

if (lightbox && lightboxImage && closeLightbox) {

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            lightbox.style.display = "flex";

            lightboxImage.src = image.src;

        });

    });

    closeLightbox.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}


// ==========================================
// GALLERY IMAGE UPLOAD
// ==========================================

const galleryForm = document.getElementById("galleryForm");

if (galleryForm) {

    galleryForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const fileInput =
            document.getElementById("galleryImage");

        const titleInput =
            document.getElementById("galleryTitle");

        const file = fileInput?.files[0];

        const title = titleInput?.value.trim();

        if (!file) {

            alert("Please select an image.");

            return;

        }

        if (!title) {

            alert("Please enter an image title.");

            return;

        }

        const fileName =
            Date.now() + "_" + file.name;

        const { error: uploadError } =
            await supabase.storage
                .from("gallery")
                .upload(fileName, file);

        if (uploadError) {

            console.error(uploadError);

            alert("Image upload failed.");

            return;

        }

        const { data } =
            supabase.storage
                .from("gallery")
                .getPublicUrl(fileName);

        const publicUrl = data.publicUrl;

        const { error: dbError } =
            await supabase
                .from("gallery")
                .insert([{

                    title: title,

                    image: publicUrl

                }]);

        if (dbError) {

            console.error(dbError);

            alert("Image uploaded, but database save failed.");

            return;

        }

        alert("Image uploaded successfully.");

        galleryForm.reset();

    });

}


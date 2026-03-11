document.addEventListener("DOMContentLoaded", () => {
  // Chỉ lấy ảnh trong phần nội dung chính
  const images = Array.from(document.querySelectorAll("section img"))
    // Bỏ ảnh avatar/logo ở đầu trang nếu có
    .filter(img => img.alt !== "Dang Van Bao");

  if (!images.length) return;

  const overlay = document.createElement("div");
  overlay.className = "image-lightbox";
  overlay.innerHTML = `
    <button class="image-lightbox__close" aria-label="Close image">&times;</button>
    <img class="image-lightbox__img" alt="">
  `;

  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector(".image-lightbox__img");
  const closeBtn = overlay.querySelector(".image-lightbox__close");

  function openLightbox(img) {
    overlayImg.src = img.currentSrc || img.src;
    overlayImg.alt = img.alt || "Project image";
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    overlay.classList.remove("is-open");
    overlayImg.src = "";
    document.body.style.overflow = "";
  }

  images.forEach(img => {
    img.classList.add("zoomable-project-image");
    img.setAttribute("tabindex", "0");
    img.setAttribute("role", "button");

    img.addEventListener("click", () => openLightbox(img));

    img.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      closeLightbox();
    }
  });
});

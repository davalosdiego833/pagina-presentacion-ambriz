// ==========================================================================
// AMBRIZ ASESORES — JS
// Animaciones con GSAP ScrollTrigger e interactividad general
// ==========================================================================

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

// Inicializar iconos Lucide
lucide.createIcons();

// ===== MENÚ MÓVIL TOGGLE =====
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav-menu');

if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenu.style.display = isOpen ? 'flex' : 'none';
        
        // Actualizar icono (menu a x)
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            if (isOpen) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        }
    });

    // Cerrar menú al hacer clic en un enlace
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            mobileMenu.style.display = 'none';
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        });
    });
}

// ===== HERO SCENE ANIMATION =====
// El logo gigante se encoge, se desvanece y el logo del header aparece
const heroTL = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero-scene",
        start: "top top",
        end: "bottom 55%",
        scrub: 1
    }
});

heroTL
    .to("#hero-logo", { scale: 0.38, opacity: 0, ease: "none" })
    .to(".hero-tagline", { opacity: 0, y: -15, ease: "none" }, "<")
    .to(".scroll-hint", { opacity: 0, y: -20, ease: "none" }, "<")
    .to("#nav-logo", { opacity: 1, scale: 1, ease: "power2.out" }, "-=0.25");


// ===== SLOGAN SCENE: Word-by-word reveal (degradado progresivo) =====
const sloganWords = gsap.utils.toArray("#slogan-main .rw");

if (sloganWords.length > 0) {
    gsap.timeline({
        scrollTrigger: {
            trigger: "#slogan-scene",
            start: "top 75%",
            end: "center center",
            scrub: 0.8
        }
    })
    .to(sloganWords, { opacity: 1, stagger: 0.12, ease: "none" })
    .to("#slogan-sub", { opacity: 1, y: 0, duration: 0.4 }, "-=0.1");
}


// ===== UNIVERSAL REVEAL: Aplica reveal de palabras a cualquier titular con .reveal-text =====
document.querySelectorAll(".reveal-text").forEach(el => {
    // Saltamos el slogan principal ya que tiene su línea de tiempo personalizada
    if (el.id === "slogan-main") return;
    
    const words = el.querySelectorAll(".rw");
    if (words.length > 0) {
        gsap.to(words, {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.6
            }
        });
    }
});


// ===== UNIVERSAL REVEAL-UP: Desvanecimiento hacia arriba para párrafos, grids, e iconos =====
document.querySelectorAll(".reveal-up").forEach(el => {
    gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });
});


// ===== CARRUSEL INTERACTIVO: Cultura y Estilo de Vida =====
const galleryButtons = document.querySelectorAll(".gallery-btn");
const gallerySlides = document.querySelectorAll(".gallery-slide");

if (galleryButtons.length > 0 && gallerySlides.length > 0) {
    galleryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remover estado activo de botones
            galleryButtons.forEach(b => b.classList.remove("active"));
            // Remover estado activo de slides
            gallerySlides.forEach(s => s.classList.remove("active"));
            
            // Activar botón actual
            btn.classList.add("active");
            
            // Activar slide correspondiente
            const idx = parseInt(btn.getAttribute("data-idx"));
            if (gallerySlides[idx]) {
                gallerySlides[idx].classList.add("active");
            }
        });
    });
}


// ===== FORMULARIO A WHATSAPP =====
const contactForm = document.getElementById("ambriz-contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Obtener valores de los inputs
        const name = document.getElementById("user-name").value.trim();
        const email = document.getElementById("user-email").value.trim();
        const why = document.getElementById("user-why").value.trim();
        
        // Formatear el mensaje de WhatsApp
        const phoneNumber = "523338471689"; // +52 33 3847 1689
        const baseText = `Hola Promotoría Ambriz Asesores,\n\nMe interesa postularme como Asesor Financiero. Aquí están mis datos:\n\n*Nombre completo:* ${name}\n*Correo:* ${email}\n*Mi motivación:* ${why}`;
        
        const encodedText = encodeURIComponent(baseText);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
        
        // Redirigir a WhatsApp en pestaña nueva
        window.open(whatsappUrl, "_blank");
    });
}

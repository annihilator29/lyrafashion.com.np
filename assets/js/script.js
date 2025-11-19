document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Mobile Menu Toggle
       ========================================= */
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');

            // Animate hamburger bars
            const bars = menuToggle.querySelectorAll('.bar');
            if (mainNav.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    const bars = menuToggle.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }

    /* =========================================
       Hero Carousel
       ========================================= */
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    /* =========================================
       Smooth Scroll for Anchor Links
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       Intersection Observer for Fade-in on Scroll
       ========================================= */
    // Optional: Add .reveal class to elements you want to animate on scroll
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to category items and product cards
    const revealElements = document.querySelectorAll('.category-item, .product-card, .section-title');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Add active class styles dynamically or rely on inline styles + class
    // Here we simply modify the style when active
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .category-item.active, .product-card.active, .section-title.active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);

    /* =========================================
       Scrollspy (Active Nav Link)
       ========================================= */
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = 100; // Synced with CSS

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - headerHeight)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });
});

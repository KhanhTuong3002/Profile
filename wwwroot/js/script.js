// JavaScript for Lendex Portfolio Interactions

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Video Modal Controls
    // ----------------------------------------------------
    const watchVideoBtn = document.getElementById('watchVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeModalInnerBtn = document.getElementById('closeModalInnerBtn');

    const openModal = () => {
        videoModal.classList.remove('pointer-events-none');
        videoModal.classList.add('opacity-100');
    };

    const closeModal = () => {
        videoModal.classList.add('pointer-events-none');
        videoModal.classList.remove('opacity-100');
    };

    if (watchVideoBtn && videoModal) {
        watchVideoBtn.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (closeModalInnerBtn) {
        closeModalInnerBtn.addEventListener('click', closeModal);
    }

    // Close modal on background click
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal && !videoModal.classList.contains('pointer-events-none')) {
            closeModal();
        }
    });

    // ----------------------------------------------------
    // 2. Scroll-to-Top Button Visibility Toggle
    // ----------------------------------------------------
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    const toggleScrollTopButton = () => {
        if (window.scrollY > 200) {
            scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
            scrollTopBtn.classList.add('opacity-100', 'scale-100');
        } else {
            scrollTopBtn.classList.remove('opacity-100', 'scale-100');
            scrollTopBtn.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
        }
    };

    if (scrollTopBtn) {
        scrollTopBtn.classList.add('opacity-0', 'pointer-events-none', 'transition-all', 'duration-300');
        window.addEventListener('scroll', toggleScrollTopButton);
        toggleScrollTopButton();
    }

    // ----------------------------------------------------
    // 3. Mouse Move Parallax (Premium micro-interaction)
    //    Move portrait and orbit lines subtly with mouse movement
    // ----------------------------------------------------
    const heroSection = document.getElementById('home');
    const portraitImage = document.querySelector('main img');
    const orbitContainer = document.getElementById('orbitLines');

    if (heroSection && portraitImage && orbitContainer) {
        heroSection.addEventListener('mousemove', (e) => {
            const { width, height, left, top } = heroSection.getBoundingClientRect();
            
            // Calculate mouse position relative to hero container center (-0.5 to 0.5)
            const mouseX = (e.clientX - left) / width - 0.5;
            const mouseY = (e.clientY - top) / height - 0.5;

            // Move the elements by different intensities (parallax)
            // Portrait moves slightly
            portraitImage.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
            
            // Orbit rings move slightly in opposite direction
            orbitContainer.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px) scale(1.05)`;
        });

        // Reset transforms on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            portraitImage.style.transform = 'translate(0px, 0px)';
            orbitContainer.style.transform = 'translate(0px, 0px) scale(1)';
            
            // Ensure transitional animations remain smooth after reset
            portraitImage.style.transition = 'transform 0.5s ease-out';
            orbitContainer.style.transition = 'transform 0.5s ease-out';
            
            setTimeout(() => {
                portraitImage.style.transition = '';
                orbitContainer.style.transition = '';
            }, 500);
        });
    }

    // ----------------------------------------------------
    // 4. Contact Form Submission Simulation
    // ----------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formResetBtn = document.getElementById('formResetBtn');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API call delay
            setTimeout(() => {
                formSuccess.classList.remove('pointer-events-none');
                formSuccess.classList.add('opacity-100');
            }, 400);
        });
    }

    if (formResetBtn && contactForm && formSuccess) {
        formResetBtn.addEventListener('click', () => {
            contactForm.reset();
            formSuccess.classList.add('pointer-events-none');
            formSuccess.classList.remove('opacity-100');
        });
    }

    // ----------------------------------------------------
    // 5. Active Navigation Link Highlighting on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section, main');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Highlight when section is centered in viewport
            if (window.scrollY >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-white', "after:content-['']", "after:absolute", "after:bottom-[-4px]", "after:left-0", "after:w-full", "after:h-[2px]", "after:bg-white", "after:rounded");
            link.classList.add('text-graytext');
            
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.remove('text-graytext');
                link.classList.add('text-white', "after:content-['']", "after:absolute", "after:bottom-[-4px]", "after:left-0", "after:w-full", "after:h-[2px]", "after:bg-white", "after:rounded");
            }
        });
    });
});

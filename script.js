
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.section-reveal').forEach(el => {
            observer.observe(el);
        });

        // Typing effect
        const phrases = ['Digital Marketing', 'Social Media Ads', 'SEO Services', 'Creative Design'];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        const typedElement = document.getElementById('typed-text');

        function typeEffect() {
            const current = phrases[currentPhrase];

            if (isDeleting) {
                typedElement.textContent = current.substring(0, currentChar - 1);
                currentChar--;
            } else {
                typedElement.textContent = current.substring(0, currentChar + 1);
                currentChar++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll to top
        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        window.onscroll = function () {
            const backToTopBtn = document.querySelector('.fixed.bottom-6.right-6 button');
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
                backToTopBtn.classList.remove('visible');
            }
        };

        // Modal
        function openModal() {
            document.getElementById('contactModal').classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }

        function closeModal() {
            document.getElementById('contactModal').classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }

        // Contact form submission (WhatsApp)
        document.getElementById('contactForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            const whatsappMessage = `Hello! I'm interested in your services.\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'Not provided'}\n*Service:* ${service}\n*Message:* ${message || 'No message provided'}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/918012626111?text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
            this.reset();
            closeModal();
        });

        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');

        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
            const isOpen = !mobileNav.classList.contains('hidden');
            mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times text-xl"></i>' : '<i class="fas fa-bars text-xl"></i>';
        });

        // Show specific design gallery
    function showDesignGallery(galleryId) {
    // Hide all galleries
    document.querySelectorAll('.design-gallery').forEach(gallery => {
        gallery.classList.add('hidden');
    });

    // Show selected gallery
    document.getElementById(`${galleryId}-gallery`).classList.remove('hidden');

    // Update active tab
    document.querySelectorAll('.design-tab').forEach(tab => {
        if (tab.dataset.tab === galleryId) {
            tab.classList.add('tab-active');
        } else {
            tab.classList.remove('tab-active');
        }
    });
}

        // Lightbox functions
        function openLightbox(imageSrc, caption) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-image');
            const lightboxCaption = document.getElementById('lightbox-caption');

            lightboxImg.src = imageSrc;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.classList.add('overflow-hidden');
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        }

        // Close lightbox when clicking outside image or pressing ESC
        document.addEventListener('click', function (e) {
            const lightbox = document.getElementById('lightbox');
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function (e) {
            const lightbox = document.getElementById('lightbox');
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Initialize with first tab active
        window.addEventListener('DOMContentLoaded', () => {
            showDesignGallery("product-design");
        });


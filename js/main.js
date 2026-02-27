document.addEventListener('DOMContentLoaded', () => {



    const loader = document.getElementById('loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1800);
    });

    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2500);



    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }



    const typedElement = document.getElementById('typed-text');
    const phrases = [
        'Ingeniero en Informática',
        'Desarrollador Full Stack',
        'Node.js · React · Angular',
        'PostgreSQL · MySQL · MongoDB',
        'Google Cloud Platform'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeText() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeText, typingSpeed);
    }

    setTimeout(typeText, 1000);



    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);



    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            }

            updateCounter();
        });
    }

    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
            countersStarted = true;
            setTimeout(animateCounters, 800);
        }
    }, { threshold: 0.5 });

    const heroSection = document.getElementById('hero');
    if (heroSection) heroObserver.observe(heroSection);



    const animatedElements = document.querySelectorAll('[data-animate]');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => scrollObserver.observe(el));



    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });



    function positionOrbitNodes() {
        document.querySelectorAll('.orbit-ring').forEach(ring => {
            const nodes = ring.querySelectorAll('.orbit-node');
            const w = ring.offsetWidth;
            const h = ring.offsetHeight;
            const radius = w / 2 - 20; // margen para que no se corten

            nodes.forEach(node => {
                const angleDeg = parseFloat(node.style.getPropertyValue('--angle'));
                const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 para empezar desde arriba
                const x = w / 2 + radius * Math.cos(angleRad) - node.offsetWidth / 2;
                const y = h / 2 + radius * Math.sin(angleRad) - node.offsetHeight / 2;
                node.style.left = `${x}px`;
                node.style.top = `${y}px`;
            });
        });
    }

    setTimeout(positionOrbitNodes, 100);
    window.addEventListener('resize', positionOrbitNodes);



    document.querySelectorAll('.project-gallery').forEach(gallery => {
        const card = gallery.closest('.project-card');
        const mainImg = card.querySelector('.project-photo');
        const thumbs = gallery.querySelectorAll('.gallery-thumb');

        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const newSrc = thumb.getAttribute('data-img');
                if (mainImg && newSrc) {
                    mainImg.style.opacity = '0';
                    setTimeout(() => {
                        mainImg.src = newSrc;
                        mainImg.style.opacity = '1';
                    }, 200);
                }
                thumbs.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
    });



    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    let lightboxImages = [];
    let lightboxIndex = 0;

    function openLightbox(images, startIndex) {
        lightboxImages = images;
        lightboxIndex = startIndex;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        lightboxImg.src = lightboxImages[lightboxIndex];
        lightboxCounter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
        lightboxPrev.style.display = lightboxImages.length > 1 ? 'flex' : 'none';
        lightboxNext.style.display = lightboxImages.length > 1 ? 'flex' : 'none';
    }

    function lightboxNavigate(dir) {
        lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
        lightboxImg.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.95)';
        setTimeout(() => {
            updateLightboxImage();
            lightboxImg.style.opacity = '1';
            lightboxImg.style.transform = 'scale(1)';
        }, 150);
    }

    document.querySelectorAll('.project-card').forEach(card => {
        const mainPhoto = card.querySelector('.project-photo');
        const imageContainer = card.querySelector('.project-image');
        const overlay = card.querySelector('.project-overlay');
        const gallery = card.querySelector('.project-gallery');
        
        if (mainPhoto && imageContainer) {

            let images = [];
            if (gallery) {
                gallery.querySelectorAll('.gallery-thumb').forEach(thumb => {
                    images.push(thumb.getAttribute('data-img'));
                });
            } else {
                const src = mainPhoto.getAttribute('src');
                if (src && !src.endsWith('.svg')) images.push(src);
            }

            if (images.length > 0) {

                mainPhoto.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openLightboxFromCard(mainPhoto, images);
                });

                if (overlay) {
                    overlay.addEventListener('click', (e) => {
                        if (e.target.closest('.project-link')) return;
                        e.stopPropagation();
                        openLightboxFromCard(mainPhoto, images);
                    });
                }
            }
        }
    });

    function openLightboxFromCard(mainPhoto, images) {
        const currentSrc = mainPhoto.src;
        let startIdx = 0;
        images.forEach((img, i) => {
            if (currentSrc.includes(img.replace(/ /g, '%20')) || currentSrc.endsWith(img)) {
                startIdx = i;
            }
        });
        openLightbox(images, startIdx);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); lightboxNavigate(-1); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); lightboxNavigate(1); });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxNavigate(-1);
        if (e.key === 'ArrowRight') lightboxNavigate(1);
    });



    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            const mailtoLink = `mailto:lu.arias@duocuc.cl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`)}`;
            
            window.open(mailtoLink);

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span>¡Abriendo correo!</span><i class="fas fa-check"></i>';
            btn.style.background = '#00d4aa';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }



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



    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroGlow = document.querySelector('.hero-glow');
            if (heroGlow) {
                heroGlow.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
            }
        });
    }



    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            if (next === 'light') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
            }
            localStorage.setItem('theme', next === 'light' ? '' : 'dark');
        });
    }



    const scrollBar = document.getElementById('scroll-progress-bar');
    const scrollKanjis = document.querySelectorAll('.scroll-kanji');
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollBar) {
            scrollBar.style.setProperty('--scroll-pct', `${scrollPct}%`);
        }

        let activeSection = 'hero';
        sectionIds.forEach(id => {
            const section = document.getElementById(id);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.4) {
                    activeSection = id;
                }
            }
        });

        scrollKanjis.forEach(k => {
            k.classList.toggle('active', k.getAttribute('data-section') === activeSection);
        });
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    scrollKanjis.forEach(k => {
        k.addEventListener('click', () => {
            const target = document.getElementById(k.getAttribute('data-section'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });



    const inkCanvas = document.getElementById('ink-canvas');
    if (inkCanvas && window.innerWidth > 768) {
        const ctx = inkCanvas.getContext('2d');
        let particles = [];
        let animFrame;

        function resizeCanvas() {
            const hero = inkCanvas.closest('.hero-bg');
            if (hero) {
                inkCanvas.width = hero.offsetWidth;
                inkCanvas.height = hero.offsetHeight;
            }
        }

        class InkParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * inkCanvas.width;
                this.y = Math.random() * inkCanvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.15 - 0.1;
                this.opacity = Math.random() * 0.4 + 0.05;
                this.fadeSpeed = Math.random() * 0.001 + 0.0005;
                this.life = 1;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.01;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotSpeed;
                this.life -= this.fadeSpeed;

                if (this.life <= 0 || this.y < -10 || this.x < -10 || this.x > inkCanvas.width + 10) {
                    this.reset();
                    this.y = inkCanvas.height + 10;
                    this.life = 1;
                }
            }

            draw() {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                const color = isDark ? '200, 196, 188' : '44, 44, 44';
                
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.globalAlpha = this.opacity * this.life;

                ctx.fillStyle = `rgba(${color}, 1)`;
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
                ctx.fill();

                if (this.size > 1.5) {
                    ctx.globalAlpha = this.opacity * this.life * 0.3;
                    ctx.beginPath();
                    ctx.arc(this.size * 1.2, -this.size * 0.5, this.size * 0.2, 0, Math.PI * 2);
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        function initParticles() {
            resizeCanvas();
            particles = [];
            const count = Math.min(40, Math.floor(inkCanvas.width * inkCanvas.height / 25000));
            for (let i = 0; i < count; i++) {
                particles.push(new InkParticle());
            }
        }

        function animateInk() {
            ctx.clearRect(0, 0, inkCanvas.width, inkCanvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animFrame = requestAnimationFrame(animateInk);
        }

        initParticles();
        animateInk();
        window.addEventListener('resize', initParticles);

        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animFrame) animateInk();
                } else {
                    cancelAnimationFrame(animFrame);
                    animFrame = null;
                }
            });
        }, { threshold: 0.1 });

        const heroSection = document.getElementById('hero');
        if (heroSection) heroObserver.observe(heroSection);
    }

});

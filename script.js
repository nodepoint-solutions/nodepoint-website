document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll reveal ──────────────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '';
                entry.target.style.transform = '';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        observer.observe(el);
    });

    // Stagger client rows
    document.querySelectorAll('.client-item').forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.07}s`;
    });

    // ── Navbar shadow on scroll ────────────────────────────────────
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.pageYOffset > 80
            ? '0 1px 24px rgba(28, 25, 20, 0.08)'
            : 'none';
    }, { passive: true });

    // ── Smooth scroll for nav links ────────────────────────────────
    const navH = document.querySelector('.navbar')?.offsetHeight ?? 72;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
            }
        });
    });

    // ── Active nav link on scroll ──────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        let activeId = null;

        sections.forEach(section => {
            if (scrollY >= section.offsetTop - navH - 40) {
                activeId = section.getAttribute('id');
            }
        });

        // When the page can't scroll far enough to cross the last section's threshold
        // (e.g. contact is near the bottom), activate it once we're at the page bottom
        if (maxScroll > 0 && maxScroll - scrollY < 5) {
            activeId = sections[sections.length - 1].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
        });
    }

    updateActiveNav();
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    // scrollend fires once animation fully settles — reliable final-state catch
    window.addEventListener('scrollend', updateActiveNav, { passive: true });

});

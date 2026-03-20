document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll reveal ──────────────────────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

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
        sections.forEach(section => {
            const top = section.offsetTop - navH - 40;
            if (scrollY >= top && scrollY < top + section.offsetHeight) {
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${section.getAttribute('id')}`;
                    link.style.color = isActive ? 'var(--ink)' : '';
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

});

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. DARK MODE COM LOCALSTORAGE
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });

    // ==========================================================================
    // 2. HEADER GLASSMORPHISM AO ROLAR
    // ==========================================================================
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 3. MENU MOBILE
    // ==========================================================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    // ==========================================================================
    // 4. INTERSECTION OBSERVER (ANIMAÇÕES DE SCROLL)
    // ==========================================================================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .service-card, .testimonial').forEach(el => {
        observer.observe(el);
    });

    // ==========================================================================
    // 5. FAQ ACCORDION
    // ==========================================================================
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const answer = button.nextElementSibling;
            if (button.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });

    // ==========================================================================
    // 6. RASTREAMENTO DE UTMS E INJEÇÃO NO WHATSAPP
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {};
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(param => {
        if (urlParams.has(param)) {
            utmData[param] = urlParams.get(param);
            localStorage.setItem(param, utmData[param]);
        } else {
            utmData[param] = localStorage.getItem(param) || 'organico';
        }
    });

    const utmText = `Olá! Vim pelo site (${utmData.utm_source} / ${utmData.utm_campaign}) e gostaria de um orçamento.`;
    const encodedUtmText = encodeURIComponent(utmText);
    const waNumber = '5511941104145';
    const waLink = `https://wa.me/${waNumber}?text=${encodedUtmText}`;

    // Atualiza todos os links do WhatsApp na página
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.href = waLink;
    });

    // ==========================================================================
    // 7. FORMULÁRIO INTELIGENTE COM FALLBACK
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.close-modal');

    if (contactForm) {
        // Rascunho automático no LocalStorage
        ['name', 'phone', 'message'].forEach(id => {
            const el = document.getElementById(id);
            el.value = localStorage.getItem(`draft_${id}`) || '';
            el.addEventListener('input', (e) => localStorage.setItem(`draft_${id}`, e.target.value));
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Limpa rascunho
            ['name', 'phone', 'message'].forEach(id => localStorage.removeItem(`draft_${id}`));

            // Dispara evento de conversão (se consentido)
            trackEvent('form_submit', { name, phone });

            // Monta mensagem para WhatsApp
            const waMsg = encodeURIComponent(`Olá, meu nome é ${name}.\nTelefone: ${phone}\nMensagem: ${message}\n(Origem: ${utmData.utm_source})`);
            window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');

            // Exibe modal
            successModal.classList.add('active');
            contactForm.reset();
        });
    }

    closeModal.addEventListener('click', () => successModal.classList.remove('active'));
    window.addEventListener('click', (e) => {
        if (e.target === successModal) successModal.classList.remove('active');
    });

    // ==========================================================================
    // 8. BANNER DE COOKIES LGPD
    // ==========================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const consent = localStorage.getItem('cookie_consent');

    if (!consent) {
        setTimeout(() => cookieBanner.classList.add('active'), 1000);
    } else if (consent === 'accepted') {
        enableMarketingScripts();
    }

    document.getElementById('cookie-accept').addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'accepted');
        cookieBanner.classList.remove('active');
        enableMarketingScripts();
        trackEvent('cookie_accept');
    });

    document.getElementById('cookie-reject').addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'rejected');
        cookieBanner.classList.remove('active');
    });

    document.getElementById('cookie-customize').addEventListener('click', () => {
        alert('Funcionalidade de personalização: Apenas cookies essenciais serão mantidos.');
        localStorage.setItem('cookie_consent', 'essential_only');
        cookieBanner.classList.remove('active');
    });

    // ==========================================================================
    // 9. FUNÇÃO DE RASTREAMENTO (Respeita Consentimento)
    // ==========================================================================
    window.trackEvent = function(eventName, params = {}) {
        const consent = localStorage.getItem('cookie_consent');
        if (consent === 'accepted' && typeof gtag !== 'undefined') {
            gtag('event', eventName, params);
            if (typeof fbq !== 'undefined') fbq('trackCustom', eventName, params);
        }
        console.log(`[Track] ${eventName}`, params);
    };

    function enableMarketingScripts() {
        // Aqui você pode injetar dinamicamente scripts de marketing se eles foram bloqueados no HTML inicial.
        // Como os scripts já estão no head com gtag, o consentimento controla o disparo via trackEvent.
        console.log('Marketing scripts enabled');
    }
});
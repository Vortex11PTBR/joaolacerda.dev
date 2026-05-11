/**
 * Gigabyte Soluções - Futuristic App Script
 */
const GigabyteApp = (() => {
    'use strict';

    const config = {
        focusClass: 'active',
        scrolledClass: 'scrolled',
        visibleClass: 'visible',
        openClass: 'open'
    };

    // ===================== HEADER SCROLL =====================
    const Header = {
        init() {
            const header = document.getElementById('header');
            if (!header) return;

            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        header.classList.toggle(config.scrolledClass, window.scrollY > 20);
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    };

    // ===================== MOBILE MENU =====================
    const MobileMenu = {
        init() {
            const hamburger = document.getElementById('hamburger');
            const navbar = document.getElementById('navbar');
            if (!hamburger || !navbar) return;

            const toggle = (open) => {
                const isOpen = typeof open === 'boolean' ? open : !navbar.classList.contains(config.openClass);
                hamburger.classList.toggle(config.focusClass, isOpen);
                navbar.classList.toggle(config.openClass, isOpen);
                hamburger.setAttribute('aria-expanded', String(isOpen));
            };

            hamburger.addEventListener('click', () => toggle());

            navbar.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => toggle(false));
            });

            document.addEventListener('click', (e) => {
                if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
                    toggle(false);
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navbar.classList.contains(config.openClass)) {
                    toggle(false);
                    hamburger.focus();
                }
            });
        }
    };

    // ===================== TAB MANAGEMENT =====================
    const TabManager = {
        init() {
            const tabLinks = document.querySelectorAll('.tab-link');
            tabLinks.forEach(link => {
                link.addEventListener('click', (e) => this.handleTabClick(e));
                link.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.handleTabClick(e);
                    }
                });
            });
        },

        handleTabClick(event) {
            event.preventDefault();
            const tabName = event.currentTarget.getAttribute('aria-controls') ||
                event.currentTarget.textContent.toLowerCase().trim();
            this.openTab(tabName, event.currentTarget);
        },

        openTab(tabName, tabLink) {
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove(config.focusClass);
            });

            document.querySelectorAll('.tab-link').forEach(link => {
                link.classList.remove(config.focusClass);
                link.setAttribute('aria-selected', 'false');
            });

            const target = document.getElementById(tabName);
            if (target) {
                target.classList.add(config.focusClass);
            }

            if (tabLink) {
                tabLink.classList.add(config.focusClass);
                tabLink.setAttribute('aria-selected', 'true');
            }
        }
    };

    // ===================== NAVIGATION =====================
    const Navigation = {
        init() {
            const currentPath = window.location.pathname;
            const fileName = currentPath.split('/').pop() || 'index.html';

            document.querySelectorAll('.nav-link').forEach(link => {
                const href = link.getAttribute('href').split('/').pop();
                const isActive = fileName === href ||
                    (fileName === '' && href === 'index.html') ||
                    (fileName === '' && href === '../index.html');

                link.classList.toggle(config.focusClass, isActive);
                link.setAttribute('aria-current', isActive ? 'page' : 'false');
            });
        }
    };

    // ===================== SCROLL REVEAL =====================
    const ScrollReveal = {
        init() {
            const reveals = document.querySelectorAll('.reveal');
            if (!reveals.length) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(config.visibleClass);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });

            reveals.forEach(el => observer.observe(el));
        }
    };

    // ===================== FORM MANAGEMENT =====================
    const FormManager = {
        init() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', (e) => this.handleSubmit(e, form));
            });
        },

        handleSubmit(event, form) {
            event.preventDefault();

            if (!this.validateForm(form)) {
                this.showValidationError(form);
                return;
            }

            this.submitForm(form);
        },

        validateForm(form) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                const hasError = !field.value.trim();
                field.classList.toggle('input-error', hasError);

                if (hasError) {
                    isValid = false;
                    field.setAttribute('aria-invalid', 'true');
                } else {
                    field.removeAttribute('aria-invalid');
                }
            });

            if (!isValid) {
                const firstError = form.querySelector('.input-error');
                if (firstError) firstError.focus();
            }

            return isValid;
        },

        showValidationError(form) {
            let errorMessage = form.querySelector('[role="alert"]');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.setAttribute('role', 'alert');
                errorMessage.className = 'form-alert form-alert-error';
                form.insertBefore(errorMessage, form.firstChild);
            }
            errorMessage.textContent = 'Por favor, preencha todos os campos obrigatórios';
        },

        submitForm(form) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.disabled = true;
            submitBtn.textContent = '⏳ Enviando...';

            setTimeout(() => {
                submitBtn.textContent = '✓ Enviado com Sucesso!';
                submitBtn.classList.add('btn-success');

                setTimeout(() => {
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                    const alert = form.querySelector('[role="alert"]');
                    if (alert) alert.remove();
                }, 2000);
            }, 500);
        }
    };

    // ===================== FAQ MANAGEMENT =====================
    const FAQManager = {
        init() {
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const header = item.querySelector('.faq-header');
                if (header) {
                    header.addEventListener('click', () => this.toggleFAQ(item));
                    header.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            this.toggleFAQ(item);
                        }
                    });
                }
            });
        },

        toggleFAQ(item) {
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove(config.focusClass);
                }
            });
            item.classList.toggle(config.focusClass);
        }
    };

    // ===================== SMOOTH SCROLL =====================
    const SmoothScroll = {
        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = e.currentTarget.getAttribute('href');
                    if (href === '#' || !document.querySelector(href)) return;
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            });
        }
    };

    // ===================== BACK TO TOP =====================
    const BackToTop = {
        init() {
            const btn = document.querySelector('.back-to-top');
            if (!btn) return;

            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        btn.classList.toggle(config.visibleClass, window.scrollY > 400);
                        ticking = false;
                    });
                    ticking = true;
                }
            });

            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    };

    // ===================== FOOTER YEAR =====================
    const FooterYear = {
        init() {
            const yearEls = document.querySelectorAll('.footer-year');
            const year = new Date().getFullYear();
            yearEls.forEach(el => { el.textContent = year; });
        }
    };

    // ===================== PUBLIC API =====================
    return {
        init() {
            Header.init();
            MobileMenu.init();
            TabManager.init();
            Navigation.init();
            ScrollReveal.init();
            FormManager.init();
            FAQManager.init();
            SmoothScroll.init();
            BackToTop.init();
            FooterYear.init();
        }
    };
})();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GigabyteApp.init());
} else {
    GigabyteApp.init();
}

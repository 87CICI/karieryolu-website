// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-text, .about-image, .contact-info, .contact-form');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', '').replace('%', ''));
        const suffix = counter.textContent.includes('+') ? '+' : 
                      counter.textContent.includes('%') ? '%' : '';
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Language switching functionality
const texts = {
    de: {
        home: "Home",
        services: "Services",
        pricing: "Preise",
        about: "Über uns",
        contact: "Kontakt",
        heroTitle: "Karriereberatung für Expats in Deutschland",
        heroSubtitle: "Professionelle CV- & LinkedIn-Optimierung für Ihren Traumjob",
        ctaPrimary: "Jetzt beraten lassen",
        ctaSecondary: "Unsere Services",
        servicesTitle: "Unsere Services",
        cvOptimization: "CV Optimierung",
        cvDescription: "Professionelle Optimierung Ihres Lebenslaufs für den deutschen Arbeitsmarkt",
        linkedinProfile: "LinkedIn Profil",
        linkedinDescription: "Optimierung Ihres LinkedIn-Profils für maximale Sichtbarkeit bei Recruitern",
        coaching: "Bewerbungscoaching",
        coachingDescription: "Persönliche Unterstützung bei Jobbewerbungen und Vorstellungsgesprächen",
        aboutTitle: "Über KarierYolu",
        aboutDescription: "Wir sind spezialisiert auf die Unterstützung von Expats und internationalen Fachkräften, die in Deutschland Fuß fassen möchten. Mit unserer Expertise in der deutschen Arbeitskultur und mehrsprachigen Karriereberatung helfen wir Ihnen dabei, Ihren Traumjob zu finden.",
        successfulApplications: "Erfolgreiche Bewerbungen",
        successRate: "Erfolgsquote",
        languages: "Sprachen",
        contactTitle: "Kontaktieren Sie uns",
        contactSubtitle: "Lassen Sie uns über Ihre Karriere sprechen",
        contactDescription: "Füllen Sie das Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.",
        name: "Ihr Name",
        email: "Ihre E-Mail",
        phone: "Telefon (optional)",
        serviceType: "Service auswählen",
        cvService: "CV Optimierung",
        linkedinService: "LinkedIn Profil",
        coachingService: "Bewerbungscoaching",
        packageService: "Komplettpaket",
        message: "Ihre Nachricht",
        sendMessage: "Nachricht senden",
        footerDescription: "Ihr Partner für eine erfolgreiche Karriere in Deutschland",
        footerServices: "Services",
        footerContact: "Kontakt",
        copyright: "© 2025 KarierYolu. Alle Rechte vorbehalten.",
        pricingTitle: "Unsere Preise",
        pricingSubtitle: "Transparente Preise für professionelle Karriereberatung",
        cvOptimization: "CV Optimierung",
        linkedinProfile: "LinkedIn Profil",
        coaching: "Bewerbungscoaching",
        once: "einmalig",
        perHour: "pro Stunde",
        bookNow: "Jetzt buchen",
        popular: "Beliebt",
        pricingNote: "Alle Preise verstehen sich inklusive MwSt. Individuelle Pakete auf Anfrage verfügbar."
    },
    en: {
        home: "Home",
        services: "Services",
        pricing: "Pricing",
        about: "About",
        contact: "Contact",
        heroTitle: "Career Consulting for Expats in Germany",
        heroSubtitle: "Professional CV & LinkedIn optimization for your dream job",
        ctaPrimary: "Get consultation now",
        ctaSecondary: "Our Services",
        servicesTitle: "Our Services",
        cvOptimization: "CV Optimization",
        cvDescription: "Professional optimization of your resume for the German job market",
        linkedinProfile: "LinkedIn Profile",
        linkedinDescription: "Optimization of your LinkedIn profile for maximum visibility with recruiters",
        coaching: "Application Coaching",
        coachingDescription: "Personal support with job applications and interviews",
        aboutTitle: "About KarierYolu",
        aboutDescription: "We specialize in supporting expats and international professionals who want to establish themselves in Germany. With our expertise in German work culture and multilingual career consulting, we help you find your dream job.",
        successfulApplications: "Successful Applications",
        successRate: "Success Rate",
        languages: "Languages",
        contactTitle: "Contact Us",
        contactSubtitle: "Let's talk about your career",
        contactDescription: "Fill out the form and we'll get back to you within 24 hours.",
        name: "Your Name",
        email: "Your Email",
        phone: "Phone (optional)",
        serviceType: "Select Service",
        cvService: "CV Optimization",
        linkedinService: "LinkedIn Profile",
        coachingService: "Application Coaching",
        packageService: "Complete Package",
        message: "Your Message",
        sendMessage: "Send Message",
        footerDescription: "Your partner for a successful career in Germany",
        footerServices: "Services",
        footerContact: "Contact",
        copyright: "© 2025 KarierYolu. All rights reserved.",
        pricingTitle: "Our Pricing",
        pricingSubtitle: "Transparent pricing for professional career consulting",
        cvOptimization: "CV Optimization",
        linkedinProfile: "LinkedIn Profile",
        coaching: "Application Coaching",
        once: "one-time",
        perHour: "per hour",
        bookNow: "Book Now",
        popular: "Popular",
        pricingNote: "All prices include VAT. Custom packages available upon request."
    },
    tr: {
        home: "Ana Sayfa",
        services: "Hizmetler",
        pricing: "Fiyatlar",
        about: "Hakkımızda",
        contact: "İletişim",
        heroTitle: "Almanya'da Yabancılar için Kariyer Danışmanlığı",
        heroSubtitle: "Hayalinizdeki iş için profesyonel CV & LinkedIn optimizasyonu",
        ctaPrimary: "Şimdi danışmanlık alın",
        ctaSecondary: "Hizmetlerimiz",
        servicesTitle: "Hizmetlerimiz",
        cvOptimization: "CV Optimizasyonu",
        cvDescription: "Alman iş pazarı için CV'nizin profesyonel optimizasyonu",
        linkedinProfile: "LinkedIn Profili",
        linkedinDescription: "İşe alım uzmanları arasında maksimum görünürlük için LinkedIn profilinizin optimizasyonu",
        coaching: "Başvuru Koçluğu",
        coachingDescription: "İş başvuruları ve mülakatlar için kişisel destek",
        aboutTitle: "KarierYolu Hakkında",
        aboutDescription: "Almanya'da kendini kanıtlamak isteyen yabancılar ve uluslararası profesyonellere destek konusunda uzmanız. Alman iş kültürü ve çok dilli kariyer danışmanlığı konusundaki uzmanlığımızla, hayalinizdeki işi bulmanıza yardımcı oluyoruz.",
        successfulApplications: "Başarılı Başvuru",
        successRate: "Başarı Oranı",
        languages: "Dil",
        contactTitle: "Bizimle İletişime Geçin",
        contactSubtitle: "Kariyeriniz hakkında konuşalım",
        contactDescription: "Formu doldurun ve 24 saat içinde size geri dönelim.",
        name: "Adınız",
        email: "E-posta Adresiniz",
        phone: "Telefon (isteğe bağlı)",
        serviceType: "Hizmet Seçin",
        cvService: "CV Optimizasyonu",
        linkedinService: "LinkedIn Profili",
        coachingService: "Başvuru Koçluğu",
        packageService: "Tam Paket",
        message: "Mesajınız",
        sendMessage: "Mesaj Gönder",
        footerDescription: "Almanya'da başarılı bir kariyer için partneriniz",
        footerServices: "Hizmetler",
        footerContact: "İletişim",
        copyright: "© 2025 KarierYolu. Tüm hakları saklıdır.",
        pricingTitle: "Fiyatlarımız",
        pricingSubtitle: "Profesyonel kariyer danışmanlığı için şeffaf fiyatlandırma",
        cvOptimization: "CV Optimizasyonu",
        linkedinProfile: "LinkedIn Profili",
        coaching: "Başvuru Koçluğu",
        once: "tek seferlik",
        perHour: "saatlik",
        bookNow: "Şimdi Rezervasyon Yap",
        popular: "Popüler",
        pricingNote: "Tüm fiyatlar KDV dahildir. Özel paketler talep üzerine mevcuttur."
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
    
    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function applyLanguage(lang) {
    const t = texts[lang];
    
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#home') link.textContent = t.home;
        if (href === '#services') link.textContent = t.services;
        if (href === '#pricing') link.textContent = t.pricing;
        if (href === '#about') link.textContent = t.about;
        if (href === '#contact') link.textContent = t.contact;
    });
    
    // Hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `<span class="text-gradient">${t.heroTitle.split(' für ')[0]}</span><br>${t.heroTitle.split(' für ')[1] || t.heroTitle}`;
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
    
    const ctaPrimary = document.querySelector('.btn-primary');
    if (ctaPrimary) ctaPrimary.textContent = t.ctaPrimary;
    
    const ctaSecondary = document.querySelector('.btn-secondary');
    if (ctaSecondary) ctaSecondary.textContent = t.ctaSecondary;
    
    // Services section
    const servicesTitle = document.querySelector('#services .section-title');
    if (servicesTitle) servicesTitle.textContent = t.servicesTitle;
    
    // Pricing section
    const pricingTitle = document.querySelector('#pricing .section-title');
    if (pricingTitle) pricingTitle.textContent = t.pricingTitle;
    
    const pricingSubtitle = document.querySelector('.pricing-subtitle');
    if (pricingSubtitle) pricingSubtitle.textContent = t.pricingSubtitle;
    
    // Update pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach((card, index) => {
        const title = card.querySelector('h3');
        const period = card.querySelector('.period');
        const bookBtn = card.querySelector('.btn');
        const badge = card.querySelector('.pricing-badge');
        
        if (index === 0 && title) title.textContent = t.cvOptimization;
        if (index === 1 && title) title.textContent = t.linkedinProfile;
        if (index === 2 && title) title.textContent = t.coaching;
        
        if (index === 0 && period) period.textContent = t.once;
        if (index === 1 && period) period.textContent = t.once;
        if (index === 2 && period) period.textContent = t.perHour;
        
        if (bookBtn) bookBtn.textContent = t.bookNow;
        if (badge) badge.textContent = t.popular;
    });
    
    const pricingNote = document.querySelector('.pricing-note p');
    if (pricingNote) {
        const icon = pricingNote.querySelector('i');
        pricingNote.innerHTML = '';
        if (icon) pricingNote.appendChild(icon);
        pricingNote.appendChild(document.createTextNode(' ' + t.pricingNote));
    }
    
    // About section
    const aboutTitle = document.querySelector('.about-text h2');
    if (aboutTitle) aboutTitle.textContent = t.aboutTitle;
    
    const aboutDescription = document.querySelector('.about-text p');
    if (aboutDescription) aboutDescription.textContent = t.aboutDescription;
    
    // Contact section
    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) contactTitle.textContent = t.contactTitle;
    
    const contactSubtitle = document.querySelector('.contact-info h3');
    if (contactSubtitle) contactSubtitle.textContent = t.contactSubtitle;
    
    const contactDescription = document.querySelector('.contact-info p');
    if (contactDescription) contactDescription.textContent = t.contactDescription;
    
    // Form fields
    const nameInput = document.getElementById('name');
    if (nameInput) nameInput.placeholder = t.name;
    
    const emailInput = document.getElementById('email');
    if (emailInput) emailInput.placeholder = t.email;
    
    const phoneInput = document.getElementById('phone');
    if (phoneInput) phoneInput.placeholder = t.phone;
    
    const serviceSelect = document.getElementById('serviceType');
    if (serviceSelect) {
        serviceSelect.options[0].text = t.serviceType;
        serviceSelect.options[1].text = t.cvService;
        serviceSelect.options[2].text = t.linkedinService;
        serviceSelect.options[3].text = t.coachingService;
        serviceSelect.options[4].text = t.packageService;
    }
    
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) messageTextarea.placeholder = t.message;
    
    const sendButton = document.querySelector('.contact-form .btn-primary');
    if (sendButton) sendButton.textContent = t.sendMessage;
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    let lang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
    if (!texts[lang]) lang = 'de';
    applyLanguage(lang);
    
    // Set active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.textContent.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.querySelector('#contactForm .btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.disabled = true;
            
            try {
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    service: document.getElementById('serviceType').value, // Changed from serviceType to service
                    message: document.getElementById('message').value
                };
                
                // Send email using EmailJS
                const response = await emailjs.send(
                    'YOUR_SERVICE_ID', // Email Service ID
                    'YOUR_TEMPLATE_ID', // Email Template ID
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        service: formData.service,
                        message: formData.message
                    }
                );
                
                // Show success message
                showNotification('Nachricht erfolgreich gesendet! Wir melden uns schnellstmöglich bei Ihnen.', 'success');
                document.getElementById('contactForm').reset();
                
            } catch (error) {
                console.error('Error sending email:', error);
                showNotification('Fehler beim Senden der Nachricht. Bitte versuchen Sie es später erneut.', 'error');
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-success, .form-error');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'form-success' : 'form-error';
    messageDiv.textContent = message;
    
    // Insert before form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Form field validation
document.addEventListener('DOMContentLoaded', () => {
    const formFields = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });
        
        field.addEventListener('input', () => {
            // Remove error styling on input
            field.style.borderColor = '#e9ecef';
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        field.style.borderColor = '#dc3545';
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.style.borderColor = '#dc3545';
            return false;
        }
    }
    
    field.style.borderColor = '#28a745';
    return true;
}


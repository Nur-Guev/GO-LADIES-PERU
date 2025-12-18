// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');
    
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', function() {
            navMobile.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMobile.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = navMobile.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMobile.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMobile.contains(event.target)) {
                navMobile.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
});

// Newsletter Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showMessage('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulación de POST a una API pública (JSONPlaceholder) para cumplir el requisito
            
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    email: email, // la variable email que ya capturaste
                    type: 'subscription'
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

            .then((response) => response.json())
            .then((json) => {
                // Éxito
                showMessage('¡Gracias por suscribirte!', 'success');
                emailInput.value = '';
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            })

            .catch((err) => {
                // Error
                showMessage('Error de conexión. Inténtalo de nuevo.', 'error');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 15px;
        margin: 20px 0;
        border-radius: 5px;
        text-align: center;
        font-weight: 500;
        animation: fadeInUp 0.3s ease-out;
        ${type === 'success' ? 
            'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
            'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Insert message after the form
    const form = document.getElementById('newsletterForm');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease-in-out';
                
                // Load image
                const tempImg = new Image();
                tempImg.onload = function() {
                    img.style.opacity = '1';
                };
                tempImg.src = img.src;
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add scroll effect to header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Add animation on scroll for sections
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about-content, .benefit-content, .app-download');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        animationObserver.observe(element);
    });
});

// Handle external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    
    externalLinks.forEach(link => {
        // Add target="_blank" if not already present
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        
        // Add rel="noopener noreferrer" for security
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // Add visual indicator for external links
        if (!link.querySelector('.external-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'external-indicator';
            indicator.innerHTML = ' ↗';
            indicator.style.fontSize = '0.8em';
            indicator.style.opacity = '0.7';
            link.appendChild(indicator);
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .form-message {
        animation: fadeInUp 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder if image fails to load
            this.style.background = '#f8f9fa';
            this.style.border = '2px dashed #dee2e6';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.minHeight = '200px';
            this.alt = 'Imagen no disponible';
        });
    });
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for mobile menu
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Add focus management for mobile menu
    const navMobile = document.getElementById('navMobile');
    if (navMobile) {
        navMobile.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navMobile.classList.remove('active');
                navToggle.focus();
            }
        });
    }
    
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById('content');
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
});

// Set initial volume for background audio
window.addEventListener('load', function() {
    var audio = document.getElementById('AudioFondo');
    if (audio) {
        audio.volume = 0.4; // 0.0 a 1.0
    }
});


// ============================================
// IMPLEMENTACIÓN DE JQUERY
// 6 EVENTOS/EFECTOS + BANNER ANIMADO
// ============================================

$(document).ready(function() {
    
    // ============================================
    // EVENTO 1: FADE IN/OUT EN HERO AL HACER SCROLL
    // ============================================
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        var heroHeight = $('.hero').outerHeight();
        
        if (scroll < heroHeight) {
            var opacity = 1 - (scroll / heroHeight);
            $('.hero-content').css('opacity', opacity);
        }
    });
    
    
    // ============================================
    // EVENTO 2: EFECTO SLIDE DOWN/UP EN SECCIONES ABOUT
    // ============================================
    $('.about-text h2').css('cursor', 'pointer').click(function() {
        $(this).next('p').slideToggle('slow');
    });
    
    
    // ============================================
    // EVENTO 3: EFECTO HOVER CON SCALE EN IMÁGENES DE BENEFICIOS
    // ============================================
    $('.benefit-image img').hover(
        function() {
            $(this).stop().animate({
                'transform': 'scale(1.05)'
            }, 300).css({
                'transform': 'scale(1.05)',
                'transition': 'transform 0.3s ease'
            });
        },
        function() {
            $(this).stop().css({
                'transform': 'scale(1)',
                'transition': 'transform 0.3s ease'
            });
        }
    );
    
    
    // ============================================
    // EVENTO 4: ANIMACIÓN TOGGLE EN FOOTER LINKS (MOBILE)
    // ============================================
    if ($(window).width() < 768) {
        $('.footer-links ul').hide();
        
        $('<h4>Enlaces Útiles</h4>')
            .css({
                'color': '#fff',
                'cursor': 'pointer',
                'margin-bottom': '10px'
            })
            .prependTo('.footer-links')
            .click(function() {
                $('.footer-links ul').slideToggle('fast');
            });
    }
    
    
    // ============================================
    // EVENTO 5: EFECTO BOUNCE EN BOTONES DE DESCARGA
    // ============================================
    $('.download-btn').hover(
        function() {
            $(this).find('i').addClass('bounce-effect');
        },
        function() {
            $(this).find('i').removeClass('bounce-effect');
        }
    );
    
    // Agregar CSS para el efecto bounce
    $('<style>')
        .text(`
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .bounce-effect {
                animation: bounce 0.5s ease infinite;
            }
        `)
        .appendTo('head');
    
    
    // ============================================
    // EVENTO 6: EFECTO FADE IN PROGRESIVO EN BENEFIT ITEMS AL HACER SCROLL
    // ============================================
    $(window).scroll(function() {
        $('.benefit-item').each(function() {
            var elementTop = $(this).offset().top;
            var viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < viewportBottom - 100) {
                $(this).fadeIn(1000);
            }
        });
    });
    
    // Inicialmente ocultar los benefit items
    $('.benefit-item').hide();
    
    
// ============================================
    // BANNER ANIMADO CON JQUERY
    // ============================================
    
    // Crear el HTML del banner
    // CAMBIO REALIZADO: width: 60% (antes era 100%)
    var bannerHTML = `
        <div id="jquery-banner" style="position: relative; width: 60%; max-width: 1000px; margin: 40px auto; overflow: hidden; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
            <div class="banner-slides" style="display: flex; width: 400%; transition: transform 0.6s ease-in-out;">
                <div class="banner-slide" style="width: 25%; flex-shrink: 0;">
                    <img src="Unete-slash1.jpg" alt="Banner 1" style="width: 100%; height: auto; display: block;">
                </div>
                <div class="banner-slide" style="width: 25%; flex-shrink: 0;">
                    <img src="hijos-slash2.jpg" alt="Banner 2" style="width: 100%; height: auto; display: block;">
                </div>
                <div class="banner-slide" style="width: 25%; flex-shrink: 0;">
                    <img src="viajatranquilo-slash3.jpg" alt="Banner 3" style="width: 100%; height: auto; display: block;">
                </div>
                <div class="banner-slide" style="width: 25%; flex-shrink: 0;">
                    <img src="trabaja-slash4.jpg" alt="Banner 4" style="width: 100%; height: auto; display: block;">
                </div>
            </div>
            
            <button class="banner-btn banner-prev" style="position: absolute; left: 20px; top: 50%; transform: translateY(-50%); background: rgba(233, 30, 99, 0.8); color: white; border: none; padding: 15px 20px; cursor: pointer; border-radius: 50%; font-size: 18px; z-index: 10;">❮</button>
            <button class="banner-btn banner-next" style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); background: rgba(233, 30, 99, 0.8); color: white; border: none; padding: 15px 20px; cursor: pointer; border-radius: 50%; font-size: 18px; z-index: 10;">❯</button>
            
            <div class="banner-indicators" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px; z-index: 10;">
                <span class="indicator active" data-slide="0" style="width: 12px; height: 12px; border-radius: 50%; background: #e91e63; cursor: pointer; transition: all 0.3s;"></span>
                <span class="indicator" data-slide="1" style="width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s;"></span>
                <span class="indicator" data-slide="2" style="width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s;"></span>
                <span class="indicator" data-slide="3" style="width: 12px; height: 12px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.3s;"></span>
            </div>
        </div>
    `;
    
    // Insertar el banner después de la sección de beneficios
    $('.benefits').after(bannerHTML);
    
    // Variables del banner
    var currentSlide = 0;
    var totalSlides = 4;
    var autoplayInterval;
    
    // Función para actualizar el banner
    function updateBanner() {
        var offset = -(currentSlide * 25);
        $('.banner-slides').css('transform', 'translateX(' + offset + '%)');
        
        // Actualizar indicadores
        $('.indicator').css('background', 'rgba(255,255,255,0.5)');
        $('.indicator[data-slide="' + currentSlide + '"]').css('background', '#e91e63');
    }
    
    // Función para ir al siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateBanner();
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateBanner();
    }
    
    // Eventos de los botones
    $('.banner-next').click(function() {
        nextSlide();
        resetAutoplay();
    });
    
    $('.banner-prev').click(function() {
        prevSlide();
        resetAutoplay();
    });
    
    // Eventos de los indicadores
    $('.indicator').click(function() {
        currentSlide = parseInt($(this).data('slide'));
        updateBanner();
        resetAutoplay();
    });
    
    // Efecto hover en botones
    $('.banner-btn').hover(
        function() {
            $(this).css('background', 'rgba(233, 30, 99, 1)');
        },
        function() {
            $(this).css('background', 'rgba(233, 30, 99, 0.8)');
        }
    );
    
    // Autoplay del banner
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Pausar autoplay cuando el mouse está sobre el banner
    $('#jquery-banner').hover(
        function() {
            clearInterval(autoplayInterval);
        },
        function() {
            startAutoplay();
        }
    );
    
    // Iniciar autoplay
    startAutoplay();
    
    // Hacer responsive el banner
    $(window).resize(function() {
        updateBanner();
    });
    
    console.log('jQuery: 6 eventos/efectos + banner animado implementados correctamente');
});

// ============================================
// IMPLEMENTACIÓN TÉCNICA UNIDAD 4: JSON Y AJAX
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. PETICIÓN GET (Consumir archivo JSON local) [Requisito: 33, 34]
    const contenedor = document.getElementById('testimonios-container');
    
    if(contenedor) {
        fetch('datos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo JSON');
                }
                return response.json();
            })
            .then(data => {
                // Limpiar mensaje de carga
                contenedor.innerHTML = '';
                
                // Renderizado Dinámico del DOM [Requisito: 35]
                data.testimonios.forEach(item => {
                    const card = document.createElement('div');
                    card.style.cssText = 'background: #f9f9f9; padding: 20px; border-radius: 10px; width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
                    
                    card.innerHTML = `
                        <h3 style="color: #e91e63;">${item.nombre}</h3>
                        <p style="font-style: italic; margin: 10px 0;">"${item.mensaje}"</p>
                        <div style="color: #FFD700;">${'★'.repeat(item.calificacion)}</div>
                    `;
                    
                    contenedor.appendChild(card);
                });
            })
            .catch(error => {
                // Manejo de errores [Requisito: 36]
                console.error('Error:', error);
                contenedor.innerHTML = '<p style="color:red">Hubo un problema cargando los testimonios.</p>';
            });
    }
});

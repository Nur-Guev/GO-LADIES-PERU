// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value.trim();
            }
            
            // Validate form
            if (!validateContactForm(data)) {
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-btn');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showContactMessage('¡Gracias por contactarnos! Hemos recibido tu mensaje y te responderemos pronto.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
});

// Contact form validation
function validateContactForm(data) {
    const errors = [];
    
    // Required fields validation
    if (!data.firstName) errors.push('El nombre es requerido');
    if (!data.lastName) errors.push('El apellido es requerido');
    if (!data.email) errors.push('El correo electrónico es requerido');
    if (!data.subject) errors.push('El asunto es requerido');
    if (!data.message) errors.push('El mensaje es requerido');
    if (!data.privacy) errors.push('Debes aceptar la política de privacidad');
    
    // Email validation
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Por favor, ingresa un correo electrónico válido');
    }
    
    // Phone validation (if provided)
    if (data.phone && !isValidPhone(data.phone)) {
        errors.push('Por favor, ingresa un número de teléfono válido');
    }
    
    // Message length validation
    if (data.message && data.message.length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    if (errors.length > 0) {
        showContactMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Phone validation function
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone);
}

// Show contact message function
function showContactMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.contact-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `contact-message ${type}`;
    messageElement.innerHTML = message;
    
    // Style the message
    messageElement.style.cssText = `
        padding: 20px;
        margin: 20px 0;
        border-radius: 8px;
        font-weight: 500;
        animation: slideInDown 0.3s ease-out;
        ${type === 'success' ? 
            'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
            'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
        }
    `;
    
    // Insert message at the top of the form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(messageElement, form);
    
    // Scroll to message
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove message after 8 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideOutUp 0.3s ease-out';
            setTimeout(() => {
                messageElement.remove();
            }, 300);
        }
    }, 8000);
}

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const faqIcon = this.querySelector('.faq-icon');
            
            // Toggle active state
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherQuestion.querySelector('.faq-icon');
                
                if (otherItem !== faqItem) {
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = null;
                    otherIcon.textContent = '+';
                }
            });
            
            // Toggle current FAQ item
            if (!isActive) {
                faqItem.classList.add('active');
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
                faqIcon.textContent = '−';
            } else {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
                faqIcon.textContent = '+';
            }
        });
    });
});

// Form field animations and validation feedback
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formInputs.forEach(input => {
        // Add focus and blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
            
            // Real-time validation
            validateField(this);
        });
        
        // Real-time validation for email and phone
        if (input.type === 'email' || input.type === 'tel') {
            input.addEventListener('input', function() {
                clearTimeout(this.validationTimeout);
                this.validationTimeout = setTimeout(() => {
                    validateField(this);
                }, 500);
            });
        }
    });
});

// Individual field validation
function validateField(field) {
    const fieldContainer = field.parentElement;
    const existingError = fieldContainer.querySelector('.field-error');
    
    // Remove existing error
    if (existingError) {
        existingError.remove();
    }
    
    let errorMessage = '';
    
    // Validate based on field type and requirements
    if (field.hasAttribute('required') && !field.value.trim()) {
        errorMessage = 'Este campo es requerido';
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        errorMessage = 'Ingresa un correo electrónico válido';
    } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        errorMessage = 'Ingresa un número de teléfono válido';
    } else if (field.name === 'message' && field.value && field.value.length < 10) {
        errorMessage = 'El mensaje debe tener al menos 10 caracteres';
    }
    
    // Show error if exists
    if (errorMessage) {
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = errorMessage;
        errorElement.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 5px;
            display: block;
            animation: fadeInUp 0.2s ease-out;
        `;
        fieldContainer.appendChild(errorElement);
        fieldContainer.classList.add('has-error');
    } else {
        fieldContainer.classList.remove('has-error');
    }
}

// Character counter for message field
document.addEventListener('DOMContentLoaded', function() {
    const messageField = document.getElementById('message');
    
    if (messageField) {
        const maxLength = 1000;
        
        // Create character counter
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: #666;
            margin-top: 5px;
        `;
        
        messageField.parentElement.appendChild(counter);
        
        // Update counter
        function updateCounter() {
            const remaining = maxLength - messageField.value.length;
            counter.textContent = `${messageField.value.length}/${maxLength} caracteres`;
            
            if (remaining < 50) {
                counter.style.color = '#dc3545';
            } else if (remaining < 100) {
                counter.style.color = '#ffc107';
            } else {
                counter.style.color = '#666';
            }
        }
        
        messageField.addEventListener('input', updateCounter);
        updateCounter(); // Initial update
        
        // Prevent exceeding max length
        messageField.addEventListener('keydown', function(e) {
            if (this.value.length >= maxLength && 
                !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
                e.preventDefault();
            }
        });
    }
});

// Add custom animations
const contactStyle = document.createElement('style');
contactStyle.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .form-group.focused label {
        color: #e91e63;
        transform: translateY(-5px);
    }
    
    .form-group.has-error input,
    .form-group.has-error select,
    .form-group.has-error textarea {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    .contact-form input:focus,
    .contact-form select:focus,
    .contact-form textarea:focus {
        border-color: #e91e63;
        box-shadow: 0 0 0 0.2rem rgba(233, 30, 99, 0.25);
    }
`;
document.head.appendChild(contactStyle);

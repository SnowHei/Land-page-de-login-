document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = document.querySelector('.login-btn');
    const messageDiv = document.getElementById('message');
    const socialBtns = document.querySelectorAll('.social-btn');

    // Credenciais válidas para demonstração
    const validCredentials = {
        'admin@example.com': 'admin123',
        'user@example.com': 'user123',
        'demo@example.com': 'demo123'
    };

    // Inicialização
    init();

    function init() {
        setupEventListeners();
        setupInputAnimations();
        setupFormValidation();
        createParticleEffect();
    }

    // Event Listeners
    function setupEventListeners() {
        // Toggle password visibility
        togglePasswordBtn.addEventListener('click', togglePasswordVisibility);

        // Form submission
        loginForm.addEventListener('submit', handleFormSubmit);

        // Social login buttons
        socialBtns.forEach(btn => {
            btn.addEventListener('click', handleSocialLogin);
        });

        // Input focus effects
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
            input.addEventListener('input', handleInputChange);
        });

        // Forgot password link
        const forgotPasswordLink = document.querySelector('.forgot-password');
        forgotPasswordLink.addEventListener('click', handleForgotPassword);

        // Create account link
        const createAccountLink = document.querySelector('.signup-link a');
        createAccountLink.addEventListener('click', handleCreateAccount);
    }

    // Password visibility toggle
    function togglePasswordVisibility() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = togglePasswordBtn.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
        
        // Add animation
        togglePasswordBtn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            togglePasswordBtn.style.transform = 'scale(1)';
        }, 150);
    }

    // Form submission handler
    async function handleFormSubmit(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Validate inputs
        if (!validateEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('A senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }

        // Show loading state
        setLoadingState(true);

        // Simulate API call
        try {
            await simulateLogin(email, password);
            
            if (validCredentials[email] && validCredentials[email] === password) {
                showMessage('Login realizado com sucesso! Redirecionando...', 'success');
                
                // Simulate redirect after success
                setTimeout(() => {
                    // In a real app, this would redirect to dashboard
                    showMessage('Bem-vindo! Você seria redirecionado para o dashboard.', 'success');
                }, 2000);
            } else {
                showMessage('E-mail ou senha incorretos. Tente: demo@example.com / demo123', 'error');
                addShakeAnimation();
            }
        } catch (error) {
            showMessage('Erro no servidor. Tente novamente.', 'error');
        } finally {
            setLoadingState(false);
        }
    }

    // Social login handler
    function handleSocialLogin(e) {
        e.preventDefault();
        const provider = e.currentTarget.classList.contains('google') ? 'Google' : 'GitHub';
        
        // Add click animation
        e.currentTarget.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.currentTarget.style.transform = 'scale(1)';
        }, 150);

        showMessage(`Login com ${provider} em desenvolvimento...`, 'error');
    }

    // Input animations and effects
    function setupInputAnimations() {
        const inputWrappers = document.querySelectorAll('.input-wrapper');
        
        inputWrappers.forEach(wrapper => {
            const input = wrapper.querySelector('input');
            const icon = wrapper.querySelector('i');
            
            input.addEventListener('focus', () => {
                wrapper.style.transform = 'translateY(-2px)';
                wrapper.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
                icon.style.color = 'var(--primary-color)';
            });
            
            input.addEventListener('blur', () => {
                wrapper.style.transform = 'translateY(0)';
                wrapper.style.boxShadow = 'none';
                icon.style.color = 'var(--text-light)';
            });
        });
    }

    // Form validation
    function setupFormValidation() {
        emailInput.addEventListener('blur', () => {
            if (emailInput.value && !validateEmail(emailInput.value)) {
                emailInput.style.borderColor = '#e53e3e';
                emailInput.parentElement.style.boxShadow = '0 0 0 3px rgba(229, 62, 62, 0.1)';
            } else {
                emailInput.style.borderColor = 'var(--border-color)';
                emailInput.parentElement.style.boxShadow = 'none';
            }
        });

        passwordInput.addEventListener('input', () => {
            const strength = getPasswordStrength(passwordInput.value);
            updatePasswordStrength(strength);
        });
    }

    // Input handlers
    function handleInputFocus(e) {
        e.target.parentElement.classList.add('focused');
    }

    function handleInputBlur(e) {
        e.target.parentElement.classList.remove('focused');
    }

    function handleInputChange(e) {
        if (e.target.value) {
            e.target.parentElement.classList.add('has-value');
        } else {
            e.target.parentElement.classList.remove('has-value');
        }
    }

    // Forgot password handler
    function handleForgotPassword(e) {
        e.preventDefault();
        showMessage('Link de recuperação seria enviado para seu e-mail.', 'success');
    }

    // Create account handler
    function handleCreateAccount(e) {
        e.preventDefault();
        showMessage('Redirecionamento para página de cadastro...', 'success');
    }

    // Utility functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function getPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    }

    function updatePasswordStrength(strength) {
        // This could be used to show password strength indicator
        // For now, just change border color based on strength
        const colors = ['#e53e3e', '#dd6b20', '#d69e2e', '#38a169', '#00b894'];
        if (passwordInput.value.length > 0) {
            passwordInput.style.borderColor = colors[Math.min(strength, 4)];
        }
    }

    function simulateLogin(email, password) {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500); // Simulate network delay
        });
    }

    function setLoadingState(loading) {
        if (loading) {
            loginBtn.classList.add('loading');
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type} show`;
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }

    function addShakeAnimation() {
        loginForm.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
    }

    // Particle effect for background
    function createParticleEffect() {
        const particleContainer = document.querySelector('.floating-shapes');
        
        // Add more dynamic particles
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key to submit form
        if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape key to clear form
        if (e.key === 'Escape') {
            emailInput.value = '';
            passwordInput.value = '';
            messageDiv.classList.remove('show');
        }
    });

    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.welcome-content, .login-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Add CSS for additional animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }

    .input-wrapper.focused {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    }

    .input-wrapper.has-value i {
        color: var(--primary-color);
    }

    .particle {
        pointer-events: none;
    }

    /* Smooth transitions for all interactive elements */
    button, input, .social-btn, .checkbox-container {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Hover effects for better interactivity */
    .feature:hover {
        transform: translateX(5px);
        transition: transform 0.3s ease;
    }

    .logo:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }

    /* Focus styles for accessibility */
    button:focus-visible,
    input:focus-visible,
    a:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;

document.head.appendChild(additionalStyles);


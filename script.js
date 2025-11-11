// Modern JavaScript for Quick Click Reviews Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Handle early access form in nav
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
        navCta.addEventListener('click', () => {
            document.querySelector('.final-cta').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    }

    // Handle demo button (placeholder for now)
    const demoBtn = document.querySelector('.btn-secondary');
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            alert('Demo video coming soon! For now, please scroll down to see how it works.');
        });
    }

    // Handle early access form submission
    const earlyAccessForm = document.getElementById('early-access-form');
    if (earlyAccessForm) {
        earlyAccessForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value;

            // Basic validation
            if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Update button state
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Requesting...';
            submitButton.disabled = true;

            try {
                // Send to Formspree
                const response = await fetch('https://formspree.io/f/xzzybrea', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        form: 'early-access',
                        timestamp: new Date().toISOString()
                    })
                });

                if (!response.ok) {
                    throw new Error('Submission failed');
                }

                // Show success
                showNotification("You're on the list! We'll reach out when we launch.", 'success');
                emailInput.value = '';

            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Something went wrong. Please try again or email hello@quickclickreviews.us', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            animation: slide-in 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slide-out 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slide-in {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slide-out {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('.how, .problem, .solution, .final-cta');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Parallax effect for floating cards on mouse move
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        let mouseX = 0, mouseY = 0;
        let currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        });

        function animateCards() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;

            const cards = heroVisual.querySelectorAll('.floating-card');
            cards.forEach((card, index) => {
                const multiplier = 1 + (index * 0.5);
                card.style.transform = `translateX(${currentX * multiplier}px) translateY(${currentY * multiplier}px)`;
            });

            requestAnimationFrame(animateCards);
        }

        // Only run on desktop
        if (window.innerWidth > 1024) {
            animateCards();
        }
    }

    // Add some interactive hover effects for process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateX(20px)';
        });
        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateX(0)';
        });
    });

    // Typing effect for hero headline (optional - uncomment if you want it)
    /*
    const headline = document.querySelector('.line-2');
    if (headline) {
        const text = headline.textContent;
        headline.textContent = '';
        let index = 0;

        function typeText() {
            if (index < text.length) {
                headline.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            }
        }

        // Start typing after a delay
        setTimeout(typeText, 1000);
    }
    */
});
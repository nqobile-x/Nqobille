// Initialize Three.js background
const initThreeBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create animated particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: '#89CFF0',
        transparent: true,
        opacity: 0.5
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = document.querySelector('nav').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
        progress.style.transform = `scaleX(${scrollPercentage / 100})`;
    });
};

// Custom cursor effect
const createCustomCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    // Hide default cursor
    document.body.style.cursor = 'none';
    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
        el.style.cursor = 'none';
    });

    let cursorVisible = true;
    let cursorX = -100;
    let cursorY = -100;
    let dotX = -100;
    let dotY = -100;

    // Show cursor when it enters the window
    document.addEventListener('mouseenter', () => {
        cursorVisible = true;
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
    });

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        cursor.style.opacity = '0';
        dot.style.opacity = '0';
    });

    document.addEventListener('mousemove', (e) => {
        if (cursorVisible) {
            cursorX = e.clientX;
            cursorY = e.clientY;
        }
    });

    // Handle cursor scaling on clickable elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.classList.contains('nav-item') ||
            e.target.classList.contains('content-card')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || 
            e.target.tagName.toLowerCase() === 'button' ||
            e.target.classList.contains('nav-item') ||
            e.target.classList.contains('content-card')) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });

    // Smooth animation
    function updateCursor() {
        if (cursorVisible) {
            dotX += (cursorX - dotX) * 0.2;
            dotY += (cursorY - dotY) * 0.2;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            dot.style.left = dotX + 'px';
            dot.style.top = dotY + 'px';
        }
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
};

// Elegant Loading Animation
const createLoadingAnimation = () => {
    const loading = document.createElement('div');
    loading.className = 'loading-animation';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    loading.appendChild(spinner);
    
    document.body.appendChild(loading);

    // Create welcome message after loading
    const welcomeMessage = () => {
        const welcome = document.createElement('div');
        welcome.style.position = 'fixed';
        welcome.style.inset = '0';
        welcome.style.background = 'white';
        welcome.style.display = 'flex';
        welcome.style.justifyContent = 'center';
        welcome.style.alignItems = 'center';
        welcome.style.opacity = '0';
        welcome.style.transition = 'opacity 0.5s ease';
        welcome.style.zIndex = '9998';

        const text = document.createElement('h1');
        text.textContent = 'Welcome';
        text.style.fontSize = '2.5rem';
        text.style.color = '#89CFF0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        text.style.opacity = '0';
        
        welcome.appendChild(text);
        document.body.appendChild(welcome);

        // Animate welcome message
        setTimeout(() => {
            welcome.style.opacity = '1';
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                text.style.opacity = '0';
                text.style.transform = 'translateY(-20px)';
                welcome.style.opacity = '0';
                setTimeout(() => welcome.remove(), 500);
            }, 1500);
        }, 100);
    };

    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.remove();
                welcomeMessage();
            }, 500);
        }, 1000);
    });
};

// Initialize GSAP animations
const initGSAPAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate content cards on scroll
    gsap.utils.toArray('.content-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Animate skill cards
    gsap.utils.toArray('.skill-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });
    });

    // Animate section headings
    gsap.utils.toArray('section h2').forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
};

// Enhanced navigation effects with advanced animations
const initNavigationEffects = () => {
    const nav = document.querySelector('nav');
    const navItems = document.querySelectorAll('.nav-item');
    let lastScroll = 0;
    let isNavAnimating = false;

    // Create highlight effect
    const highlight = document.createElement('div');
    highlight.className = 'nav-highlight';
    nav.appendChild(highlight);

    // Smooth scroll handling with animation
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Enhanced scroll animation
        if (currentScroll > 50) {
            if (!isNavAnimating) {
                isNavAnimating = true;
                nav.style.transform = 'translateY(-100%)';
                
                requestAnimationFrame(() => {
                    nav.classList.add('scrolled');
                    nav.style.transform = 'translateY(0)';
                    setTimeout(() => {
                        isNavAnimating = false;
                    }, 300);
                });
            }
        } else {
            nav.classList.remove('scrolled');
        }

        // Parallax effect for nav items
        navItems.forEach((item, index) => {
            const speed = 1 + (index * 0.1);
            const yOffset = currentScroll * speed * 0.02;
            item.style.transform = `translateY(${yOffset}px)`;
        });

        lastScroll = currentScroll;
    });

    // Advanced hover effects for nav items
    navItems.forEach((item, index) => {
        item.addEventListener('mouseenter', (e) => {
            // Reset any existing animations
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            
            // Add hover animation
            item.style.animation = 'navItemHover 0.3s forwards';
            
            // Move highlight to current item
            const rect = item.getBoundingClientRect();
            const navRect = nav.getBoundingClientRect();
            
            highlight.style.transform = `
                translateX(${rect.left - navRect.left}px)
                scaleX(${rect.width / 100})
            `;
            highlight.style.opacity = '1';

            // Ripple effect for siblings
            navItems.forEach((sibling, siblingIndex) => {
                if (sibling !== item) {
                    const distance = Math.abs(index - siblingIndex);
                    setTimeout(() => {
                        sibling.style.transform = 'translateY(-2px)';
                        setTimeout(() => {
                            sibling.style.transform = 'translateY(0)';
                        }, 100);
                    }, distance * 50);
                }
            });
        });

        // Magnetic effect on hover
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const maxDistance = 5; // Maximum pixels to move
            const moveX = (x - centerX) / centerX * maxDistance;
            const moveY = (y - centerY) / centerY * maxDistance;

            item.style.transform = `
                perspective(1000px)
                translate3d(${moveX}px, ${moveY}px, 20px)
                rotateX(${moveY * 0.5}deg)
                rotateY(${-moveX * 0.5}deg)
            `;
            
            // Add glow effect
            const intensity = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2)) / maxDistance;
            item.style.textShadow = `
                0 0 ${10 + intensity * 10}px var(--primary-blue),
                0 0 ${20 + intensity * 15}px var(--primary-light)
            `;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0)';
            item.style.textShadow = 'none';
            highlight.style.opacity = '0';
        });
    });
};

// Enhanced card interactions
const initEnhancedCards = () => {
    const cards = document.querySelectorAll('.content-card');
    
    cards.forEach(card => {
        // Add card content wrapper
        const content = document.createElement('div');
        content.className = 'card-content';
        while (card.firstChild) {
            content.appendChild(card.firstChild);
        }
        card.appendChild(content);

        // Add magnetic effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            const rotateX = percentY * 8;
            const rotateY = -percentX * 8;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(10px)
                scale3d(1.02, 1.02, 1.02)
            `;
            
            // Move card content in opposite direction for parallax effect
            content.style.transform = `
                translateX(${-percentX * 10}px)
                translateY(${-percentY * 10}px)
                translateZ(30px)
            `;
        });

        // Reset card position
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
            content.style.transform = 'translateX(0) translateY(0) translateZ(0)';
        });

        // Add click effect
        card.addEventListener('click', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(-50px) scale3d(0.98, 0.98, 0.98)';
            setTimeout(() => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
            }, 150);
        });
    });
};

// Intersection Observer for fade-in sections
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll('.fade-in-section').forEach(section => {
    observer.observe(section);
});

// Theme management
const initThemeToggle = () => {
    // Create enhanced theme toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle theme');
    
    // Create inner elements for animation
    toggleBtn.innerHTML = `
        <div class="toggle-circle">
            <svg class="sun-icon" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5"></circle>
                ${Array.from({length: 8}).map((_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const x1 = 12 + Math.cos(angle) * 7;
                    const y1 = 12 + Math.sin(angle) * 7;
                    const x2 = 12 + Math.cos(angle) * 9;
                    const y2 = 12 + Math.sin(angle) * 9;
                    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
                }).join('')}
            </svg>
            <svg class="moon-icon" viewBox="0 0 24 24">
                <path d="M12.5 3.5c0-1.5-0.5-3-1.5-4 4.5 1 8 5 8 9.5 0 5.5-4.5 10-10 10S0 14.5 0 9 4.5 0 10 0c.5 0 1 0 1.5.1 1 1 1.5 2.5 1.5 4 0 3-2.5 5.5-5.5 5.5S2 10.5 2 7.5 4.5 2 7.5 2c1.5 0 3 .5 4 1.5-1 1-1.5 2.5-1.5 4z"></path>
            </svg>
        </div>
        <div class="toggle-rays"></div>
    `;
    
    document.body.appendChild(toggleBtn);

    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Handle theme toggle
    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Animate transition
        document.documentElement.style.setProperty('--theme-transition', 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon with animation
        updateThemeIcon(newTheme);
        
        // Remove transition after animation
        setTimeout(() => {
            document.documentElement.style.setProperty('--theme-transition', '');
        }, 500);
    });

    // Update particles color based on theme
    const updateParticlesColor = (theme) => {
        if (window.scene && window.scene.children[0]) {
            const particles = window.scene.children[0];
            particles.material.color.set(theme === 'dark' ? '#4DB5FF' : '#89CFF0');
        }
    };

    // Theme icon update
    function updateThemeIcon(theme) {
        const icon = toggleBtn.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        updateParticlesColor(theme);
    }

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeBackground();
    createScrollProgress();
    createLoadingAnimation();
    initGSAPAnimations();
    initNavigationEffects();
    initEnhancedCards();
    initThemeToggle();
});

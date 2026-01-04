/**
 * Anna PK Floral Design
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Hero Carousel
    // ===================================
    const carousel = {
        container: document.querySelector('.carousel-container'),
        slides: document.querySelectorAll('.carousel-slide'),
        indicators: document.querySelectorAll('.indicator'),
        currentIndex: 0,
        intervalTime: 5000, // 5 seconds
        interval: null,
        
        init() {
            if (!this.slides.length) return;
            
            // Start auto-rotation
            this.startAutoRotate();
            
            // Add indicator click handlers
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.goToSlide(index);
                    this.resetAutoRotate();
                });
            });
            
            // Pause on hover (optional - enhances UX)
            if (this.container) {
                this.container.addEventListener('mouseenter', () => this.pauseAutoRotate());
                this.container.addEventListener('mouseleave', () => this.startAutoRotate());
            }
        },
        
        goToSlide(index) {
            // Remove active class from current slide and indicator
            this.slides[this.currentIndex].classList.remove('active');
            this.indicators[this.currentIndex].classList.remove('active');
            
            // Update index
            this.currentIndex = index;
            
            // Handle wrap-around
            if (this.currentIndex >= this.slides.length) {
                this.currentIndex = 0;
            }
            if (this.currentIndex < 0) {
                this.currentIndex = this.slides.length - 1;
            }
            
            // Add active class to new slide and indicator
            this.slides[this.currentIndex].classList.add('active');
            this.indicators[this.currentIndex].classList.add('active');
        },
        
        nextSlide() {
            this.goToSlide(this.currentIndex + 1);
        },
        
        prevSlide() {
            this.goToSlide(this.currentIndex - 1);
        },
        
        startAutoRotate() {
            if (this.interval) return;
            this.interval = setInterval(() => this.nextSlide(), this.intervalTime);
        },
        
        pauseAutoRotate() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        },
        
        resetAutoRotate() {
            this.pauseAutoRotate();
            this.startAutoRotate();
        }
    };
    
    carousel.init();
    
    
    // ===================================
    // Portfolio Thumbnail Carousel
    // ===================================
    const portfolioThumbCarousel = {
        track: document.querySelector('.thumb-carousel-track'),
        intervalTime: 2000, // 2 seconds
        interval: null,
        currentThumbs: [],
        
        // All portfolio images from the portfolio page
        portfolioImages: [
            { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80', title: 'Garden Romance', category: 'Wedding' },
            { src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80', title: 'Elegant Gala', category: 'Corporate Event' },
            { src: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80', title: 'Floating Garden', category: 'Installation' },
            { src: 'https://images.unsplash.com/photo-1522057384400-681b421cfebc?w=600&q=80', title: 'Intimate Vows', category: 'Wedding' },
            { src: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600&q=80', title: 'Tablescape Dreams', category: 'Private Dinner' },
            { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80', title: 'Opulent Affair', category: 'Wedding' },
            { src: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&q=80', title: 'Blooming Arch', category: 'Installation' },
            { src: 'https://images.unsplash.com/photo-1464699908537-0954e50791ee?w=600&q=80', title: 'Spring Launch', category: 'Brand Event' },
            { src: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=600&q=80', title: 'Bridal Elegance', category: 'Wedding' },
            { src: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&q=80', title: 'Living Canvas', category: 'Installation' },
            { src: 'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600&q=80', title: 'Golden Hour', category: 'Private Celebration' },
            { src: 'https://images.unsplash.com/photo-1469259943454-aa100abba749?w=600&q=80', title: 'Ceremony Blooms', category: 'Wedding' }
        ],
        
        init() {
            if (!this.track) return;
            
            // Display initial random thumbnails
            this.displayRandomThumbs();
            
            // Start auto-rotation
            this.startAutoRotate();
            
            // Pause on hover
            this.track.addEventListener('mouseenter', () => this.pauseAutoRotate());
            this.track.addEventListener('mouseleave', () => this.startAutoRotate());
        },
        
        getRandomThumbs(count = 3) {
            // Shuffle array and pick first 'count' items
            const shuffled = [...this.portfolioImages].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, count);
        },
        
        createThumbElement(imageData) {
            const thumb = document.createElement('a');
            thumb.href = 'workshops.html';
            thumb.className = 'thumb-item fade-in';
            thumb.innerHTML = `
                <img src="${imageData.src}" alt="${imageData.title}">
                <div class="thumb-overlay">
                    <h3>${imageData.title}</h3>
                    <p>${imageData.category}</p>
                </div>
            `;
            return thumb;
        },
        
        displayRandomThumbs() {
            const randomThumbs = this.getRandomThumbs(3);
            this.track.innerHTML = '';
            
            randomThumbs.forEach(imageData => {
                const thumb = this.createThumbElement(imageData);
                this.track.appendChild(thumb);
            });
            
            this.currentThumbs = randomThumbs;
        },
        
        swapThumbs() {
            const currentItems = this.track.querySelectorAll('.thumb-item');
            
            // Fade out current thumbnails
            currentItems.forEach(item => {
                item.classList.remove('fade-in');
                item.classList.add('fade-out');
            });
            
            // After fade out, replace with new random thumbnails
            setTimeout(() => {
                this.displayRandomThumbs();
            }, 500);
        },
        
        startAutoRotate() {
            if (this.interval) return;
            this.interval = setInterval(() => this.swapThumbs(), this.intervalTime);
        },
        
        pauseAutoRotate() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }
    };
    
    portfolioThumbCarousel.init();
    
    
    // ===================================
    // Mobile Navigation
    // ===================================
    const mobileNav = {
        btn: document.querySelector('.mobile-menu-btn'),
        menu: document.querySelector('.nav-links'),
        
        init() {
            if (!this.btn || !this.menu) return;
            
            this.btn.addEventListener('click', () => this.toggle());
            
            // Close menu when clicking a link
            this.menu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => this.close());
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.btn.contains(e.target) && !this.menu.contains(e.target)) {
                    this.close();
                }
            });
        },
        
        toggle() {
            this.btn.classList.toggle('active');
            this.menu.classList.toggle('active');
        },
        
        close() {
            this.btn.classList.remove('active');
            this.menu.classList.remove('active');
        }
    };
    
    mobileNav.init();
    
    
    // ===================================
    // Portfolio Filter
    // ===================================
    const portfolioFilter = {
        buttons: document.querySelectorAll('.filter-btn'),
        items: document.querySelectorAll('.portfolio-item'),
        
        init() {
            if (!this.buttons.length || !this.items.length) return;
            
            this.buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.dataset.filter;
                    this.filterItems(filter);
                    this.updateActiveButton(btn);
                });
            });
        },
        
        filterItems(filter) {
            this.items.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        },
        
        updateActiveButton(activeBtn) {
            this.buttons.forEach(btn => btn.classList.remove('active'));
            activeBtn.classList.add('active');
        }
    };
    
    portfolioFilter.init();
    
    
    // ===================================
    // Contact Form - Web3Forms handles submission natively
    // Form submits directly via POST to Web3Forms API
    // ===================================
    
    
    // ===================================
    // Header Scroll Effect
    // ===================================
    const header = {
        element: document.querySelector('.header'),
        lastScrollY: 0,
        
        init() {
            if (!this.element) return;
            
            window.addEventListener('scroll', () => this.onScroll());
        },
        
        onScroll() {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class for styling
            if (currentScrollY > 100) {
                this.element.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
            } else {
                this.element.style.boxShadow = 'none';
            }
            
            this.lastScrollY = currentScrollY;
        }
    };
    
    header.init();
    
    
    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    
    // ===================================
    // Fade-in Animation on Scroll
    // ===================================
    const observeElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe sections
        document.querySelectorAll('section:not(.hero-carousel)').forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    };
    
    // Uncomment the line below to enable scroll animations
    // observeElements();
    
});


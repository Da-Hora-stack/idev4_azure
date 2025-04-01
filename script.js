document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Search Button Functionality
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    
    searchBtn.addEventListener('click', function() {
        searchOverlay.classList.add('active');
    });
    
    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    // Auto slide change
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);

    // Model Filter Dependency
    const brandSelect = document.getElementById('marca');
    const modelSelect = document.getElementById('modelo');
    
    const modelsByBrand = {
        audi: ['A3', 'A4', 'A5', 'Q3', 'Q5', 'Q7'],
        bmw: ['Série 3', 'Série 5', 'X1', 'X3', 'X5'],
        mercedes: ['Classe A', 'Classe C', 'GLA', 'GLC', 'GLE'],
        porsche: ['911', 'Cayenne', 'Macan', 'Panamera'],
        landrover: ['Defender', 'Discovery', 'Range Rover Evoque', 'Range Rover Sport']
    };
    
    brandSelect.addEventListener('change', function() {
        const selectedBrand = this.value;
        modelSelect.innerHTML = '<option value="">Todos os Modelos</option>';
        
        if (selectedBrand && modelsByBrand[selectedBrand]) {
            modelsByBrand[selectedBrand].forEach(model => {
                const option = document.createElement('option');
                option.value = model.toLowerCase().replace(/\s/g, '-');
                option.textContent = model;
                modelSelect.appendChild(option);
            });
        }
    });

    // Vehicle Search Form
    const searchForm = document.getElementById('vehicle-search-form');
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would filter vehicles
        window.location.href = 'catalog.html';
    });

    // Featured Vehicles (would be from API in real app)
    const featuredCars = [
        {
            id: 1,
            brand: 'Porsche',
            model: '911 Carrera',
            year: '2022/2023',
            mileage: '5.000 km',
            price: 899900,
            image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            features: ['Automático', '3.0 Turbo', 'Gasolina', 'Coupe'],
            badge: 'Novo'
        },
        {
            id: 2,
            brand: 'Land Rover',
            model: 'Range Rover Velar',
            year: '2021/2021',
            mileage: '18.000 km',
            price: 459900,
            image: 'https://images.unsplash.com/photo-1550348075-2b1a3b9a6c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            features: ['Automático', '2.0 Turbo', 'Diesel', '4x4'],
            badge: 'Seminovo'
        },
        {
            id: 3,
            brand: 'BMW',
            model: 'M4 Competition',
            year: '2023/2023',
            mileage: '2.500 km',
            price: 789900,
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            features: ['Automático', '3.0 Turbo', 'Gasolina', 'Coupe'],
            badge: 'Novo'
        }
    ];

    const carsGrid = document.querySelector('.cars-grid');
    
    function renderFeaturedCars() {
        carsGrid.innerHTML = '';
        
        featuredCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            carCard.innerHTML = `
                <div class="car-img">
                    <img src="${car.image}" alt="${car.brand} ${car.model}">
                    ${car.badge ? `<span class="car-badge">${car.badge}</span>` : ''}
                </div>
                <div class="car-info">
                    <h3>${car.brand} ${car.model}</h3>
                    <div class="car-details">
                        <span>${car.year}</span>
                        <span>${car.mileage}</span>
                    </div>
                    <div class="car-price">R$ ${car.price.toLocaleString('pt-BR')}</div>
                    <div class="car-features">
                        ${car.features.map(feature => `<span>${feature}</span>`).join('')}
                    </div>
                    <div class="car-actions">
                        <a href="vehicle-details.html?id=${car.id}" class="btn">Detalhes</a>
                        <button class="btn btn-primary add-to-cart" data-id="${car.id}">Comprar</button>
                    </div>
                </div>
            `;
            carsGrid.appendChild(carCard);
        });
        
        // Add event listeners to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const carId = parseInt(this.getAttribute('data-id'));
                const car = featuredCars.find(c => c.id === carId);
                addToCart(car);
                showToast(`${car.brand} ${car.model} adicionado ao carrinho`);
            });
        });
    }
    
    renderFeaturedCars();

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const dotsContainer = document.querySelector('.slider-dots');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            scrollToTestimonial(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    function scrollToTestimonial(index) {
        const card = testimonialCards[index];
        testimonialSlider.scrollTo({
            left: card.offsetLeft - testimonialSlider.offsetLeft,
            behavior: 'smooth'
        });
        updateDots(index);
    }
    
    function updateDots(activeIndex) {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Auto scroll testimonials
    let testimonialIndex = 0;
    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
        scrollToTestimonial(testimonialIndex);
    }, 5000);

    // Financing Calculator
    const financingForm = document.getElementById('financing-form');
    const calculatorResults = document.getElementById('calculator-results');
    const financedAmount = document.getElementById('financed-amount');
    const installmentValue = document.getElementById('installment-value');
    const totalAmount = document.getElementById('total-amount');
    
    financingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const vehiclePrice = parseFloat(document.getElementById('vehicle-price').value);
        const downPayment = parseFloat(document.getElementById('down-payment').value);
        const installments = parseInt(document.getElementById('installments').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
        
        if (downPayment >= vehiclePrice) {
            showToast('A entrada não pode ser maior ou igual ao valor do veículo', 'error');
            return;
        }
        
        const financed = vehiclePrice - downPayment;
        const monthlyRate = Math.pow(1 + interestRate, 1/12) - 1;
        const installment = financed * monthlyRate * Math.pow(1 + monthlyRate, installments) / (Math.pow(1 + monthlyRate, installments) - 1);
        const total = installment * installments;
        
        financedAmount.textContent = `R$ ${financed.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        installmentValue.textContent = `R$ ${installment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        totalAmount.textContent = `R$ ${total.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        calculatorResults.style.display = 'block';
    });
    
    // Save simulation
    document.getElementById('save-simulation').addEventListener('click', function() {
        showToast('Simulação salva com sucesso!');
    });
    
    // Apply now
    document.getElementById('apply-now').addEventListener('click', function() {
        window.location.href = 'contact.html';
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        // In a real app, this would send to a server
        showToast('Obrigado por se inscrever!', 'success');
        this.reset();
    });

    // Login/Register Modals
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    loginBtn.addEventListener('click', function() {
        openModal(loginModal);
    });
    
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Login Form
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // In a real app, this would validate with server
        showToast('Login realizado com sucesso!', 'success');
        closeModal(loginModal);
    });
    
    // Register Form
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        
        if (password !== confirmPassword) {
            showToast('As senhas não coincidem', 'error');
            return;
        }
        
        // In a real app, this would send to server
        showToast('Conta criada com sucesso!', 'success');
        closeModal(registerModal);
        openModal(loginModal);
    });

    // Cart Functionality
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartCount = document.querySelector('.cart-count');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
    
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                    <a href="catalog.html" class="btn">Ver Catálogo</a>
                </div>
            `;
            cartTotal.textContent = 'R$ 0,00';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            const car = featuredCars.find(c => c.id === item.id);
            total += car.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${car.image}" alt="${car.brand} ${car.model}">
                </div>
                <div class="cart-item-info">
                    <h4>${car.brand} ${car.model}</h4>
                    <span class="cart-item-price">R$ ${car.price.toLocaleString('pt-BR')}</span>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="decrease-quantity" data-index="${index}">-</button>
                           
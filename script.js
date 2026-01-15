async function registerUser(name, email, password, phone, address) {
    try {
        const res = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, phone, address })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || data.message);
            return;
        }

        localStorage.setItem("token", data.token);
        userManager.setUser(data.user);

        alert("Registered successfully 🎉");
    } catch (err) {
        console.error(err);
        alert("Server error");
    }
}





// Book data - More books added with images for the three specific books
const books = [
    {
        id: 1,
        title: "The Ethiopian Orthodox Church",
        author: "Sergew Hable Selassie",
        description: "A comprehensive history of the Ethiopian Orthodox Tewahedo Church.",
        price: 450,
        category: "Ge'ez Manuscripts",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        title: "አልጋዝያን (Algazyan)",
        author: "Haddis Alemayehu",
        description: "Classic Amharic novel about Ethiopian society in the early 20th century.",
        price: 320,
        category: "Ethiopian Literature",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
        id: 3,
        title: "Ancient Africa",
        author: "Cheikh Anta Diop",
        description: "Groundbreaking work on African civilization and its contributions to world history.",
        price: 580,
        category: "African Studies",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        title: "Learn Amharic: Beginner's Guide",
        author: "Mulugeta Seyoum",
        description: "Complete guide to learning Amharic language with exercises and audio.",
        price: 275,
        category: "Amharic Language",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        title: "The Emperor's Journal",
        author: "Haile Selassie I",
        description: "Personal writings of Emperor Haile Selassie I, translated from Amharic.",
        price: 620,
        category: "Ethiopian Literature",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        title: "Ge'ez Grammar and Syntax",
        author: "Thomas P. Kane",
        description: "Detailed study of the Ge'ez language structure and grammar rules.",
        price: 890,
        category: "Ge'ez Manuscripts",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        title: "A History of Modern Ethiopia",
        author: "Bahru Zewde",
        description: "Detailed account of Ethiopia's history from 1855 to 1991.",
        price: 520,
        category: "Ethiopian History",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 8,
        title: "Ethiopian Cuisine: Traditional Recipes",
        author: "Mulumebet Zenebe",
        description: "Authentic Ethiopian recipes with step-by-step instructions.",
        price: 380,
        category: "Ethiopian Cuisine",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 9,
        title: "The Oromo and the Christian Kingdom",
        author: "Mohammed Hassen",
        description: "Historical analysis of Oromo-Christian relations in Ethiopia.",
        price: 410,
        category: "Ethiopian History",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 10,
        title: "Amharic-English Dictionary",
        author: "Amsalu Aklilu",
        description: "Comprehensive dictionary with over 20,000 entries.",
        price: 650,
        category: "Amharic Language",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 11,
        title: "African Philosophy: An Anthology",
        author: "Kwasi Wiredu",
        description: "Collection of key texts in African philosophical thought.",
        price: 490,
        category: "African Studies",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 12,
        title: "The Kebra Nagast",
        author: "Translated by E.A. Wallis Budge",
        description: "English translation of the ancient Ethiopian text 'Glory of Kings'.",
        price: 720,
        category: "Ge'ez Manuscripts",
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
];

// User Management
class UserManager {
    constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
        
    }

    
    
    initializeAdmin() {
        // Check if admin exists
        const adminExists = this.users.some(user => user.email === 'admin@lalibela.com');
        if (!adminExists) {
            const adminUser = {
                id: 'admin001',
                name: 'Administrator',
                email: 'admin@lalibela.com',
                password: 'admin123',
                phone: '+251911000000',
                address: 'Lalibela Books, Dire Dawa',
                role: 'admin',
                createdAt: new Date().toISOString()
            };
            this.users.push(adminUser);
            localStorage.setItem('users', JSON.stringify(this.users));
        }
    }
    
    register(name, email, password, phone, address) {
        // Check if user already exists
        if (this.users.some(user => user.email === email)) {
            return { success: false, message: 'Email already registered' };
        }
        
        const newUser = {
            id: 'user' + Date.now(),
            name,
            email,
            password, // In real app, hash this password
            phone,
            address,
            role: 'customer',
            createdAt: new Date().toISOString()
        };
        
        this.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        return { success: true, user: newUser };
    }
    
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            return { success: true, user: this.currentUser };
        }
        
        return { success: false, message: 'Invalid email or password' };
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
    
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    createOrder(cart, paymentMethod, deliveryNotes = '') {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Please login to place an order' };
        }
        
        if (cart.length === 0) {
            return { success: false, message: 'Cart is empty' };
        }
        
        // Random status for demo purposes
        const statuses = ['pending', 'processing', 'delivered'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        
        const order = {
            id: 'ORD' + Date.now(),
            userId: this.currentUser.id,
            userName: this.currentUser.name,
            userEmail: this.currentUser.email,
            items: cart.map(item => ({
                id: item.id,
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image
            })),
            total: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
            paymentMethod,
            deliveryNotes,
            status: randomStatus,
            createdAt: new Date().toISOString(),
            orderNumber: Math.floor(100000 + Math.random() * 900000)
        };
        
        this.orders.push(order);
        localStorage.setItem('orders', JSON.stringify(this.orders));
        
        return { success: true, order };
    }
    
    getUserOrders(userId) {
        return this.orders
            .filter(order => order.userId === userId)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    getOrderStatusClass(status) {
        const statusClasses = {
            'pending': 'status-pending',
            'processing': 'status-processing',
            'delivered': 'status-delivered',
            'cancelled': 'status-cancelled'
        };
        return statusClasses[status] || 'status-pending';
    }
    
    getPaymentMethodName(method) {
        const paymentNames = {
            'cbe': 'Commercial Bank of Ethiopia',
            'telebirr': 'Telebirr',
            'cash': 'Cash on Delivery',
            'other': 'Bank Transfer'
        };
        return paymentNames[method] || method;
    }
}

// Initialize User Manager
const userManager = new UserManager();

// Cart state - stored per user
let cart = JSON.parse(localStorage.getItem(`cart_${userManager.currentUser?.id || 'guest'}`)) || [];

// Current category for filtering
let currentCategory = 'all';

// DOM elements
const booksGrid = document.getElementById('books-grid');
const cartToggle = document.getElementById('cart-toggle');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const emptyCart = document.getElementById('empty-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const contactForm = document.getElementById('contact-form');

// User elements
const userToggle = document.getElementById('user-toggle');
const userDropdown = document.getElementById('user-dropdown');
const userName = document.getElementById('user-name');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const ordersLink = document.getElementById('orders-link');
const logoutLink = document.getElementById('logout-link');

// Payment elements
const paymentModal = document.getElementById('payment-modal');
const closePayment = document.getElementById('close-payment');
const paymentForm = document.getElementById('payment-form');
const confirmPayment = document.getElementById('confirm-payment');
const orderSummary = document.getElementById('order-summary');

// Orders elements
const ordersModal = document.getElementById('orders-modal');
const closeOrders = document.getElementById('close-orders');
const ordersContainer = document.getElementById('orders-container');
const emptyOrders = document.getElementById('empty-orders');

// Category elements
const categoryCards = document.querySelectorAll('.category-card');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderBooks();
    updateCartUI();
    updateUserUI();
    
    // Set up event listeners
    setupEventListeners();
    setupCategoryInteractions();
    
    // Show all sections by default
    document.querySelectorAll('section').forEach(sec => {
        sec.style.display = 'block';
    });
    
    // Set initial active category
    document.querySelector('.category-card[data-category="all"]').classList.add('active');
});

// Setup category interactions
function setupCategoryInteractions() {
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all category cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked category card
            this.classList.add('active');
            
            // Filter books by category
            const category = this.getAttribute('data-category');
            currentCategory = category;
            filterBooksByCategory(category);
        });
    });
}

// Filter books by category
function filterBooksByCategory(category) {
    let filteredBooks;
    
    if (category === 'all') {
        filteredBooks = books;
    } else {
        filteredBooks = books.filter(book => book.category === category);
    }
    
    renderBooksGrid(filteredBooks);
}

// Update user UI
function updateUserUI() {
    if (userManager.isLoggedIn()) {
        userName.textContent = userManager.currentUser.name.split(' ')[0]; // First name only
        loginLink.style.display = 'none';
        registerLink.style.display = 'none';
        ordersLink.style.display = 'block';
        logoutLink.style.display = 'block';
    } else {
        userName.textContent = 'Account';
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        ordersLink.style.display = 'none';
        logoutLink.style.display = 'none';
    }
}

// Render books to the grid
function renderBooksGrid(booksToShow) {
    booksGrid.innerHTML = '';
    
    booksToShow.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-image">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-price">${book.price} Birr</div>
                <div class="book-actions">
                    <button class="btn-add-to-cart" data-id="${book.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn-view-details" data-id="${book.id}">
                        <i class="fas fa-info-circle"></i> Details
                    </button>
                </div>
            </div>
        `;
        booksGrid.appendChild(bookCard);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            addToCart(bookId);
        });
    });
    
    document.querySelectorAll('.btn-view-details').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            viewBookDetails(bookId);
        });
    });
}

// Render books to the page
function renderBooks() {
    renderBooksGrid(books);
}

// Set up event listeners
function setupEventListeners() {
    // Cart toggle
    cartToggle.addEventListener('click', function(e) {
        e.preventDefault();
        cartOverlay.classList.add('active');
    });
    
    // Close cart
    closeCart.addEventListener('click', function() {
        cartOverlay.classList.remove('active');
    });
    
    // Close cart when clicking outside
    cartOverlay.addEventListener('click', function(e) {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!', 'error');
            return;
        }
        
        if (!userManager.isLoggedIn()) {
            showNotification('Please login to checkout', 'error');
            showLoginPage();
            cartOverlay.classList.remove('active');
            return;
        }
        
        // Show payment modal
        showPaymentModal();
    });
    
    // Hamburger menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // User dropdown
    userToggle.addEventListener('click', function(e) {
        e.preventDefault();
        userDropdown.style.display = userDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userToggle.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.style.display = 'none';
        }
    });
    
    // Login link
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginPage(false);
    });
    
    // Register link
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        showLoginPage(true);
    });
    
    // Logout
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        userManager.logout();
        updateUserUI();
        showNotification('Logged out successfully', 'info');
        userDropdown.style.display = 'none';
        
        // Switch to guest cart
        loadUserCart();
    });
    
    // Orders link
    ordersLink.addEventListener('click', function(e) {
        e.preventDefault();
        showOrderHistory();
        userDropdown.style.display = 'none';
    });
    
    // Orders modal
    closeOrders.addEventListener('click', function() {
        ordersModal.classList.remove('active');
    });
    
    ordersModal.addEventListener('click', function(e) {
        if (e.target === ordersModal) {
            ordersModal.classList.remove('active');
        }
    });
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            this.reset();
        });
    }
    
    // Payment modal
    closePayment.addEventListener('click', function() {
        paymentModal.classList.remove('active');
    });
    
    paymentModal.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('active');
        }
    });
    
    // Payment method selection
    document.querySelectorAll('input[name="payment"]').forEach(option => {
        option.addEventListener('change', function() {
            const paymentDetails = document.getElementById('payment-details');
            if (this.value === 'cash') {
                paymentDetails.style.display = 'none';
            } else {
                paymentDetails.style.display = 'block';
            }
        });
    });
    
    // Payment form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
}

// Show/Hide sections - FIXED VERSION
function showSection(section) {
    // Scroll to the section instead of hiding others
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
    
    // Update active nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    event.target.classList.add('active');
    
    // Close mobile menu
    navMenu.classList.remove('active');
}

// Show login page
function showLoginPage(isRegister = false) {
    const mainContent = document.getElementById('main-content');
    const loginPage = document.getElementById('login-page');
    
    mainContent.style.display = 'none';
    loginPage.style.display = 'block';
    
    if (isRegister) {
        // Show register form
        document.getElementById('login-form-main').style.display = 'none';
        document.getElementById('register-form-main').style.display = 'block';
        document.getElementById('form-title').textContent = 'Create Account';
        document.getElementById('form-subtitle').textContent = 'Join Lalibela Books today';
        document.getElementById('switch-text').innerHTML = 'Already have an account? <a href="#" id="switch-to-login-main">Sign in here</a>';
    } else {
        // Show login form
        document.getElementById('login-form-main').style.display = 'block';
        document.getElementById('register-form-main').style.display = 'none';
        document.getElementById('form-title').textContent = 'Welcome Back';
        document.getElementById('form-subtitle').textContent = 'Sign in to your account to continue';
        document.getElementById('switch-text').innerHTML = 'Don\'t have an account? <a href="#" id="switch-to-register-main">Create one here</a>';
    }
    
    // Close dropdown if open
    userDropdown.style.display = 'none';
}

// Show main content (hide login page)
function showMainContent() {
    const mainContent = document.getElementById('main-content');
    const loginPage = document.getElementById('login-page');
    
    loginPage.style.display = 'none';
    mainContent.style.display = 'block';
    updateUserUI();
}

// Show payment modal
function showPaymentModal() {
    // Update order summary
    const total = calculateCartTotal();
    const itemsCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    orderSummary.innerHTML = `
        <h4>Order Summary</h4>
        <div class="order-summary-item">
            <span>Items (${itemsCount})</span>
            <span>${total} Birr</span>
        </div>
        <div class="order-summary-item">
            <span>Shipping</span>
            <span>50 Birr</span>
        </div>
        <div class="order-summary-item">
            <span>Total</span>
            <span>${total + 50} Birr</span>
        </div>
    `;
    
    paymentModal.classList.add('active');
    cartOverlay.classList.remove('active');
}

// Show order history
function showOrderHistory() {
    if (!userManager.isLoggedIn()) {
        showNotification('Please login to view your orders', 'error');
        showLoginPage();
        return;
    }
    
    const userOrders = userManager.getUserOrders(userManager.currentUser.id);
    
    if (userOrders.length === 0) {
        ordersContainer.innerHTML = '';
        ordersContainer.appendChild(emptyOrders);
        emptyOrders.style.display = 'block';
    } else {
        renderOrderHistory(userOrders);
    }
    
    ordersModal.classList.add('active');
}

// Render order history
function renderOrderHistory(orders) {
    ordersContainer.innerHTML = '';
    
    orders.forEach(order => {
        const orderDate = new Date(order.createdAt);
        const formattedDate = orderDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const statusClass = userManager.getOrderStatusClass(order.status);
        const paymentMethod = userManager.getPaymentMethodName(order.paymentMethod);
        
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        orderCard.innerHTML = `
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.orderNumber}</div>
                    <div class="order-date">${formattedDate}</div>
                </div>
                <div class="order-status ${statusClass}">${order.status.toUpperCase()}</div>
            </div>
            <div class="order-body">
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <div class="order-item-img">
                                <img src="${item.image}" alt="${item.title}">
                            </div>
                            <div class="order-item-details">
                                <div class="order-item-title">${item.title}</div>
                                <div class="order-item-price">${item.quantity} × ${item.price} Birr = ${item.quantity * item.price} Birr</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-summary-details">
                    <div class="order-summary-row">
                        <span>Subtotal:</span>
                        <span>${order.total} Birr</span>
                    </div>
                    <div class="order-summary-row">
                        <span>Shipping:</span>
                        <span>50 Birr</span>
                    </div>
                    <div class="order-summary-row">
                        <span>Payment Method:</span>
                        <span>${paymentMethod}</span>
                    </div>
                    ${order.deliveryNotes ? `
                    <div class="order-summary-row">
                        <span>Delivery Notes:</span>
                        <span>${order.deliveryNotes}</span>
                    </div>
                    ` : ''}
                    <div class="order-summary-row total">
                        <span>Total:</span>
                        <span>${order.total + 50} Birr</span>
                    </div>
                </div>
            </div>
        `;
        ordersContainer.appendChild(orderCard);
    });
}

// Process payment
function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const deliveryNotes = document.getElementById('delivery-notes').value;
    
    // Create order
    const result = userManager.createOrder(cart, paymentMethod, deliveryNotes);
    
    if (result.success) {
        showNotification(`Order placed successfully! Order #${result.order.orderNumber}`, 'success');
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
        
        // Close modals
        paymentModal.classList.remove('active');
        cartOverlay.classList.remove('active');
        
        // Reset form
        paymentForm.reset();
        document.getElementById('payment-details').style.display = 'none';
        
        // Update order history if modal is open
        if (ordersModal.classList.contains('active')) {
            showOrderHistory();
        }
    } else {
        showNotification(result.message, 'error');
    }
}

// Add item to cart
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    // Check if book is already in cart
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: book.price,
            image: book.image,
            quantity: 1
        });
    }
    
    // Save cart
    saveCart();
    
    // Update UI
    updateCartUI();
    
    // Show notification
    showNotification(`"${book.title}" added to cart!`, 'success');
    
    // Open cart on mobile
    if (window.innerWidth < 768) {
        cartOverlay.classList.add('active');
    }
}

// Load user's cart
function loadUserCart() {
    const userId = userManager.currentUser?.id || 'guest';
    cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
    updateCartUI();
}

// Save cart
function saveCart() {
    const userId = userManager.currentUser?.id || 'guest';
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
}

// View book details
function viewBookDetails(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    showNotification(`"${book.title}" by ${book.author}. Price: ${book.price} Birr`, 'info');
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    renderCartItems();
    
    // Update cart total
    const total = calculateCartTotal();
    cartTotal.textContent = `${total} Birr`;
    
    // Show/hide empty cart message
    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        checkoutBtn.disabled = true;
    } else {
        emptyCart.style.display = 'none';
        checkoutBtn.disabled = false;
    }
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.appendChild(emptyCart);
        emptyCart.style.display = 'flex';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">${item.price} Birr</p>
                <div class="cart-item-actions">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(bookId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(bookId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.getAttribute('data-id'));
            removeFromCart(bookId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(bookId, change) {
    const item = cart.find(item => item.id === bookId);
    if (!item) return;
    
    item.quantity += change;
    
    // Remove item if quantity is 0 or less
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== bookId);
        showNotification('Item removed from cart', 'info');
    }
    
    // Save cart
    saveCart();
    
    // Update UI
    updateCartUI();
}

// Remove item from cart
function removeFromCart(bookId) {
    const item = cart.find(item => item.id === bookId);
    if (!item) return;
    
    cart = cart.filter(item => item.id !== bookId);
    
    // Save cart
    saveCart();
    
    // Update UI
    updateCartUI();
    
    // Show notification
    showNotification('Item removed from cart', 'info');
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Show notification
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide and remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
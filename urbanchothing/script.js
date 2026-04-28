// Product Data
const products = [
    // Men's Collection
    { id: 1, name: "Premium Cotton Tee", price: "$29.99", category: "men", tags: ["casual wear men", "stylish outfits"], image: "assets/p1.png", alt: "Man wearing premium white cotton t-shirt" },
    { id: 2, name: "Slim Fit Chinos", price: "$49.99", category: "men", tags: ["casual wear men", "stylish outfits"], image: "https://images.unsplash.com/photo-1473966968600-fa804b8696bc?auto=format&fit=crop&q=80&w=800", alt: "Man in stylish slim fit khaki chinos" },
    { id: 3, name: "Urban Denim Jacket", price: "$79.99", category: "men", tags: ["casual wear men", "stylish outfits"], image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=800", alt: "Man in urban denim jacket" },
    
    // Women's Collection
    { id: 101, name: "Floral Summer Dress", price: "$59.99", category: "women", tags: ["dresses", "fashion outfits"], image: "assets/p2.png", alt: "Woman in floral summer dress" },
    { id: 102, name: "Elegant Evening Gown", price: "$129.99", category: "women", tags: ["dresses", "fashion outfits"], image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800", alt: "Woman in elegant evening gown" },
    { id: 103, name: "Casual Knit Top", price: "$34.99", category: "women", tags: ["fashion outfits"], image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=800", alt: "Woman wearing casual knit top" },
    
    // Streetwear Collection
    { id: 201, name: "Midnight Black Hoodie", price: "$64.99", category: "streetwear", tags: ["hoodies"], image: "assets/p3.png", alt: "black oversized hoodie streetwear lifestyle shot" },
    { id: 202, name: "Graffiti Graphics Tee", price: "$39.99", category: "streetwear", tags: ["oversized t-shirts"], image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800", alt: "white oversized t-shirt with graffiti streetwear graphic" },
    { id: 203, name: "Urban Cargo Joggers", price: "$54.99", category: "streetwear", tags: ["hoodies"], image: "https://images.unsplash.com/photo-1620352226835-1db2e7eddf7d?auto=format&fit=crop&q=80&w=800", alt: "streetwear cargo joggers with aesthetic fit" }
];

document.addEventListener('DOMContentLoaded', () => {
    addFloatingInstagramIcon();

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Dynamic Product Rendering
    const productGrid = document.getElementById('dynamic-product-grid');
    if (productGrid) {
        const category = productGrid.dataset.category;
        renderProducts(category);
    }
});

function addFloatingInstagramIcon() {
    if (document.querySelector('.floating-instagram')) {
        return;
    }

    const instagramLink = document.createElement('a');
    instagramLink.className = 'floating-instagram';
    instagramLink.href = 'https://www.instagram.com/';
    instagramLink.target = '_blank';
    instagramLink.rel = 'noopener noreferrer';
    instagramLink.setAttribute('aria-label', 'Visit our Instagram');
    instagramLink.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="6" ry="6"></rect>
            <path d="M16 11.37a4 4 0 1 1-1.34-2.7A4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
        </svg>
    `;

    document.body.appendChild(instagramLink);
}

function renderProducts(category) {
    const grid = document.getElementById('dynamic-product-grid');
    grid.innerHTML = ''; // Clear grid

    const filteredProducts = products.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        const item = document.createElement('div');
        item.className = 'product-card reveal';
        item.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.alt}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <button class="btn btn-primary" style="width: 100%; margin-top: 1rem; padding: 0.5rem;">Add to Cart</button>
            </div>
        `;
        grid.appendChild(item);
    });

    // Re-observe the new elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formResult = document.getElementById('form-result');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        formResult.innerHTML = "Please wait...";
        formResult.style.color = "var(--primary)";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                formResult.innerHTML = "Success! Your message has been sent.";
                formResult.style.color = "green";
                contactForm.reset();
            } else {
                console.log(response);
                formResult.innerHTML = json.message || "Something went wrong!";
                formResult.style.color = "red";
            }
        })
        .catch(error => {
            console.log(error);
            formResult.innerHTML = "Oops! Network error.";
            formResult.style.color = "red";
        })
        .then(function() {
            setTimeout(() => {
                if (formResult) formResult.innerHTML = "";
            }, 5000);
        });
    });
}

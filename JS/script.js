console.log("script.js loaded");



// MENU DATA

const menuData = [
    { id: 1, name: "Classic Burger", price: 8, image: "images/burger.jpg", category: "Burgers" },
    { id: 2, name: "Cheese Burger", price: 10, image: "images/cheese-burger.jpg", category: "Burgers" },
    { id: 3, name: "BBQ Burger", price: 12, image: "images/bbq-burger.jpg", category: "Burgers" },
    { id: 4, name: "Margherita Pizza", price: 14, image: "images/pizza.jpg", category: "Pizza" },
    { id: 5, name: "Chocolate Cake", price: 7, image: "images/cake.jpg", category: "Desserts" },
    { id: 6, name: "Cola", price: 3, image: "images/cola.jpg", category: "Drinks" }
];



// CART STATE

let cart = [];


// DOM READY

document.addEventListener("DOMContentLoaded", () => {

    const menuContainer = document.getElementById("menuItems");
    const categoryButtons = document.querySelectorAll(".category-nav button");
    const logoutBtn = document.querySelector(".logout-btn");
    const checkoutBtn = document.querySelector(".checkout-btn");

    // Default menu load
    const defaultCategory = "Burgers";
    renderMenu(menuData.filter(item => item.category === defaultCategory));

    // Category filters
    categoryButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent === defaultCategory) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const category = btn.textContent;
            renderMenu(menuData.filter(item => item.category === category));
        });
    });

    // Logout handling
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "login.html";
        });
    }

    // Checkout handling
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            if (cart.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            alert("Order placed successfully!");
            cart = [];
            renderCart();
        });
    }
});


// RENDER MENU

function renderMenu(items) {
    const menuContainer = document.getElementById("menuItems");
    menuContainer.innerHTML = "";

    if (items.length === 0) {
        menuContainer.innerHTML = "<p>No items available.</p>";
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "menu-card";

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;

        menuContainer.appendChild(card);
    });
}

// ADD TO CART

function addToCart(itemId) {
    const item = menuData.find(i => i.id === itemId);
    if (!item) return;

    const existing = cart.find(i => i.id === itemId);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    renderCart();
}

// RENDER CART

function renderCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    const emptyMsg = document.getElementById("emptyCartMsg");
    const totalSpan = document.getElementById("cartTotal");

    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        emptyMsg.style.display = "block";
        totalSpan.textContent = "0.00";
        return;
    }

    emptyMsg.style.display = "none";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <p>
                ${item.name} x ${item.qty}
                <span>$${(item.price * item.qty).toFixed(2)}</span>
            </p>
        `;

        cartItemsDiv.appendChild(div);
    });

    totalSpan.textContent = total.toFixed(2);
}

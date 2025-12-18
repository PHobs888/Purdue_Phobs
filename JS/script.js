// ===========================
// MENU DATA
// ===========================

const menuData = [
  { id: 1, name: "Classic Burger", price: 8, image: "images/ClassicBurger.jpg", category: "Burgers" },
  { id: 2, name: "Cheese Burger", price: 10, image: "images/CheeseBurger.jpg", category: "Burgers" },
  { id: 3, name: "BBQ Burger", price: 12, image: "images/BBQBurger.jpg", category: "Burgers" },
  { id: 4, name: "Mushroom Burger", price: 11, image: "images/MushroomBurger.jpg", category: "Burgers" },
  { id: 5, name: "Margherita Pizza", price: 14, image: "images/MargaritaPizza.jpg", category: "Pizza" },
  { id: 6, name: "Pepperoni Pizza", price: 16, image: "images/PepperoniPizza.jpg", category: "Pizza" },
  { id: 7, name: "Sausage Pizza", price: 16, image: "images/SausagePizza.jpg", category: "Pizza" },
  { id: 8, name: "Meatlovers Pizza", price: 18, image: "images/MeatloversPizza.jpg", category: "Pizza" },
  { id: 9, name: "Mushroom Pizza", price: 15, image: "images/MushroomPizza.jpg", category: "Pizza" },
  { id: 10, name: "Veggie Pizza", price: 15, image: "images/VeggiePizza.jpg", category: "Pizza" },
  { id: 11, name: "Chocolate Cake", price: 7, image: "images/ChocolateCake.jpg", category: "Desserts" },
  { id: 12, name: "Peanutbutter Pie", price: 8, image: "images/PeanutButterPie.jpg", category: "Desserts" },
  { id: 13, name: "Tiramisu", price: 8, image: "images/Taramisu.jpg", category: "Desserts" },
  { id: 14, name: "Vanilla Milkshake", price: 5, image: "images/VanillaMilkShake.jpg", category: "Drinks" },
  { id: 15, name: "Chocolate Milkshake", price: 5, image: "images/ChocolateMilkShake.jpg", category: "Drinks" },
  { id: 16, name: "Cookies & Cream Milkshake", price: 6, image: "images/CookiesandCream.jpg", category: "Drinks" },
];

// ===========================
// CART STATE
// ===========================

let cart = [];

// ===========================
// DOM READY
// ===========================

document.addEventListener("DOMContentLoaded", () => {

  // -----------------------
  // CLEAR CART BUTTON
  // -----------------------
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart = [];
      renderCart();
      updateCartCount();
    });
  }

// -----------------------
// LOGOUT
// -----------------------
const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // Optional: clear login flag if you used one
    localStorage.removeItem("isLoggedIn");

    // Redirect to login page
    window.location.href = "login.html";
  });
}

  // -----------------------
  // CATEGORY FILTERING
  // -----------------------
  const categoryButtons = document.querySelectorAll(".category-nav button");
  const defaultCategory = "Burgers";

  // Initial render
  renderMenu(menuData.filter(item => item.category === defaultCategory));

  categoryButtons.forEach(btn => {
    if (btn.textContent.trim() === defaultCategory) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.textContent.trim();
      const filteredItems = menuData.filter(
        item => item.category === category
      );

      renderMenu(filteredItems);
    });
  });

  // -----------------------
  // INITIAL CART COUNT
  // -----------------------
  updateCartCount();

});

// -----------------------
// CHECKOUT
// -----------------------
const checkoutBtn = document.querySelector(".checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Order placed successfully!");
    cart = [];
    renderCart();
    updateCartCount();
  });
}


// ===========================
// RENDER MENU
// ===========================

function renderMenu(items) {
  const menuContainer = document.getElementById("menuItems");
  menuContainer.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");

    card.classList.add(
      "bg-white",
      "rounded-lg",
      "shadow",
      "p-4",
      "flex",
      "flex-col",
      "justify-between",
      "text-center",
      "transition",
      "duration-200",
      "hover:shadow-lg",
      "hover:-translate-y-1"
    );

    card.innerHTML = `
    <img 
        src="${item.image}" 
        alt="${item.name}" 
        class="w-full h-60 object-cover rounded mb-3"
    />
      <h3 class="text-lg font-semibold">${item.name}</h3>
      <p class="text-gray-600">$${item.price.toFixed(2)}</p>
      <button class="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800"
        onclick="addToCart(${item.id})">
        Add to Cart
      </button>
    `;

    menuContainer.appendChild(card);
  });
}

// ===========================
// CART FUNCTIONS
// ===========================

function addToCart(id) {
  const item = menuData.find(i => i.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  renderCart();

  updateCartCount();
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const emptyMsg = document.getElementById("emptyCartMsg");
  const totalSpan = document.getElementById("cartTotal");

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    totalSpan.textContent = "0.00";
    return;
  }

  emptyMsg.style.display = "none";

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <p>${item.name} x ${item.qty} — $${(item.price * item.qty).toFixed(2)}</p>
    `;
  });

  totalSpan.textContent = total.toFixed(2);
}
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (!cartCount) return;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  if (totalItems === 0) {
    cartCount.classList.add("hidden");
  } else {
    cartCount.textContent = totalItems;
    cartCount.classList.remove("hidden");
  }
}


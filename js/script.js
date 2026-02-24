// ===============================
// 1. LOAD CART FROM LOCAL STORAGE
// ===============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// 2. QUANTITY CONTROLS
// ===============================

function increase(id) {
    const element = document.getElementById(id);
    let value = parseInt(element.innerText);
    element.innerText = value + 1;
}

function decrease(id) {
    const element = document.getElementById(id);
    let value = parseInt(element.innerText);

    if (value > 0) {
        element.innerText = value - 1;
    }
}


// ===============================
// 3. ADD ITEM TO CART
// ===============================

function addToCart(name, price, qtyId) {

    const quantity = parseInt(document.getElementById(qtyId).innerText);

    if (quantity === 0) {
        alert("Please select quantity first!");
        return;
    }

    // Check if product already exists
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Reset quantity display
    document.getElementById(qtyId).innerText = 0;

    updateCartCount();

    alert("Item added successfully!");
}


// ===============================
// 4. UPDATE CART BADGE
// ===============================

function updateCartCount() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    const badgeDesktop = document.getElementById("cartCount");
    const badgeMobile = document.getElementById("cartCount2");

    if (badgeDesktop) badgeDesktop.innerText = totalItems;
    if (badgeMobile) badgeMobile.innerText = totalItems;
}


// ===============================
// 5. PAGE NAVIGATION
// ===============================

function goToCart() {
    window.location.href = "cart.html";
}

function goToInvoice() {
    window.location.href = "invoice.html";
}

function goBack() {
    window.location.href = "index.html";
}


// ===============================
// 6. LOAD INVOICE PAGE
// ===============================

function loadInvoice() {

    const invoiceBody = document.getElementById("invoiceBody");
    if (!invoiceBody) return;

    invoiceBody.innerHTML = "";

    const order = JSON.parse(localStorage.getItem("lastOrder")) || [];

    let subtotal = 0;

    order.forEach(item => {

        let total = item.price * item.quantity;
        subtotal += total;

        let row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)} x ${item.quantity}</td>
                <td>₹${total.toFixed(2)}</td>
            </tr>
        `;

        invoiceBody.innerHTML += row;
    });

    let tax = subtotal * 0.05;
    let finalTotal = subtotal + tax;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("finalTotal").innerText = finalTotal.toFixed(2);

    let paymentMethod = localStorage.getItem("paymentMethod") || "Cash on Delivery";

    const paymentText = document.createElement("p");
    paymentText.innerHTML = `<strong>Payment Method:</strong> ${paymentMethod}`;

    document.querySelector(".bill-details").appendChild(paymentText);
}


// ===============================
// 7. THANK YOU PAGE
// ===============================

function loadThankYou() {

    const order = JSON.parse(localStorage.getItem("lastOrder")) || [];
    if (order.length === 0) return;

    document.getElementById("orderId").innerText =
        localStorage.getItem("orderId");

    document.getElementById("orderPayment").innerText =
        localStorage.getItem("paymentMethod");

    document.getElementById("orderDate").innerText =
        new Date().toLocaleString();
}


// ===============================
// 8. ACTIVE MENU HIGHLIGHT
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const links = document.querySelectorAll(".menu li a");

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    updateCartCount();
});


// ===============================
// 9. MOBILE MENU TOGGLE
// ===============================

function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("show");
}



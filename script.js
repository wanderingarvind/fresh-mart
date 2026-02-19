// ======================================
// GLOBAL CART
// ======================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ======================================
// QUANTITY CONTROLS (INDEX PAGE)
// ======================================

function increase(id) {
    let qty = document.getElementById(id);
    let value = parseInt(qty.innerText);
    qty.innerText = value + 1;
}

function decrease(id) {
    let qty = document.getElementById(id);
    let value = parseInt(qty.innerText);

    if (value > 0) {
        qty.innerText = value - 1;
    }
}


// ======================================
// ADD TO CART
// ======================================

function addToCart(name, price, qtyId) {

    let quantity = parseInt(document.getElementById(qtyId).innerText);

    if (quantity === 0) {
        alert("Please select quantity first!");
        return;
    }

    let found = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].quantity += quantity;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({
            name: name,
            price: price,
            quantity: quantity
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    document.getElementById(qtyId).innerText = 0;

    updateCartCount();

    alert("Item added successfully!");
}


// ======================================
// UPDATE CART BADGE
// ======================================

function updateCartCount() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    for (let i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }

    let badge = document.getElementById("cartCount");

    if (badge) {
        badge.innerText = totalItems;
    }
}


// ======================================
// NAVIGATION
// ======================================

function goToCart() {
    window.location.href = "cart.html";
}

function goToInvoice() {
    window.location.href = "invoice.html";
}

function goBack() {
    window.location.href = "index.html";
}


// ======================================
// LOAD INVOICE PAGE
// ======================================

function loadInvoice() {

    let invoiceBody = document.getElementById("invoiceBody");
    if (!invoiceBody) return;

    invoiceBody.innerHTML = "";

    let order = JSON.parse(localStorage.getItem("lastOrder")) || [];

    let subtotal = 0;

    for (let i = 0; i < order.length; i++) {

        let item = order[i];
        let total = item.price * item.quantity;

        subtotal += total;

        invoiceBody.innerHTML +=
            "<tr>" +
            "<td>" + item.name + "</td>" +
            "<td>" + item.quantity + "</td>" +
            "<td>₹" + item.price.toFixed(2) + "</td>" +
            "<td>₹" + total.toFixed(2) + "</td>" +
            "</tr>";
    }

    let tax = subtotal * 0.05;
    let finalTotal = subtotal + tax;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("tax").innerText = tax.toFixed(2);
    document.getElementById("finalTotal").innerText = finalTotal.toFixed(2);

    let paymentMethod = localStorage.getItem("paymentMethod") || "Cash on Delivery";

    let paymentText = document.createElement("p");
    paymentText.innerHTML = "<strong>Payment Method:</strong> " + paymentMethod;

    document.querySelector(".bill-details").appendChild(paymentText);
}

function loadThankYou() {

    let order = JSON.parse(localStorage.getItem("lastOrder")) || [];

    if (order.length === 0) return;

    let orderId = localStorage.getItem("orderId");
    let payment = localStorage.getItem("paymentMethod");

    document.getElementById("orderId").innerText = orderId;
    document.getElementById("orderPayment").innerText = payment;
    document.getElementById("orderDate").innerText = new Date().toLocaleString();
}

document.addEventListener("DOMContentLoaded", function () {

    const currentPage = window.location.pathname.split("/").pop();
    const menuLinks = document.querySelectorAll(".menu li a");

    menuLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage ||
           (currentPage === "" && linkPage === "index.html")) {
            link.classList.add("active");
        }
    });

});

// ======================================
// RUN ON PAGE LOAD
// ======================================

updateCartCount();



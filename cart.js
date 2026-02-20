// ======================================
// LOAD CART
// ======================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartBody = document.getElementById("cart-body");
let grandTotal = 0;


// ======================================
// DISPLAY CART
// ======================================

function loadCart() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartBody.innerHTML = "";
    grandTotal = 0;

    for (let i = 0; i < cart.length; i++) {

        let item = cart[i];
        let total = item.price * item.quantity;

        grandTotal += total;

        cartBody.innerHTML +=
            "<tr>" +
            "<td>" + item.name + "</td>" +
            "<td>₹" + item.price.toFixed(2) + " x " + item.quantity +"</td>" +
            // "<td>" + item.quantity + "</td>" +
            "<td>₹" + total.toFixed(2) + "</td>" +
            "<td>" +
            "<button class='add-btn remove-btn' onclick='removeItem(" + i + ")'>Remove</button>" +
            "</td>" +
            "</tr>";
    }

    document.getElementById("grand-total").innerText =
        "₹"+grandTotal.toFixed(2);
}


// ======================================
// REMOVE ITEM
// ======================================

function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}


// ======================================
// FINISH ORDER
// ======================================

function finishOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orderId = "ORD" + Date.now();
localStorage.setItem("orderId", orderId);

    // Save order for invoice
    localStorage.setItem("lastOrder", JSON.stringify(cart));

    // Save payment method
    let payment = document.querySelector('input[name="payment"]:checked').value;
    localStorage.setItem("paymentMethod", payment);

    // Clear active cart
    localStorage.removeItem("cart");

    // Redirect
    window.location.href = "thankyou.html";
}


// ======================================
// BACK TO STORE
// ======================================

function goBack() {
    window.location.href = "index.html";
}


// ======================================
// LOAD ON START
// ======================================

loadCart();






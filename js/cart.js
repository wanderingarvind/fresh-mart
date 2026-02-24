// ======================================
// STEP 1: GET CART FROM LOCAL STORAGE
// ======================================

// If cart exists in localStorage, convert it to array
// Otherwise create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get table body where cart items will be displayed
let cartBody = document.getElementById("cart-body");

// Variable to store total price
let grandTotal = 0;


// ======================================
// STEP 2: DISPLAY CART ITEMS
// ======================================

function loadCart() {

    // Reload cart from storage (important after removing item)
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Clear previous table content
    cartBody.innerHTML = "";

    // Reset total
    grandTotal = 0;

    // Loop through each item in cart
    for (let i = 0; i < cart.length; i++) {

        let item = cart[i];

        // Calculate total price of this item
        let itemTotal = item.price * item.quantity;

        // Add to grand total
        grandTotal += itemTotal;

        // Create table row using template literals (easier to read)
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)} x ${item.quantity}</td>
                <td>₹${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="add-btn remove-btn"
                        onclick="removeItem(${i})">
                        Remove
                    </button>
                </td>
            </tr>
        `;

        // Add row to table
        cartBody.innerHTML += row;
    }

    // Show final grand total
    document.getElementById("grand-total").innerText =
        "₹" + grandTotal.toFixed(2);
}


// ======================================
// STEP 3: REMOVE ITEM FROM CART
// ======================================

function removeItem(index) {

    // Remove item from array
    cart.splice(index, 1);

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Reload cart display
    loadCart();
}


// ======================================
// STEP 4: COMPLETE ORDER
// ======================================

function finishOrder() {

    // If cart is empty, stop here
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Create unique order ID using current time
    let orderId = "ORD" + Date.now();
    localStorage.setItem("orderId", orderId);

    // Save cart for invoice page
    localStorage.setItem("lastOrder", JSON.stringify(cart));

    // Get selected payment method safely
    let selectedPayment = document.querySelector('input[name="payment"]:checked');

    if (!selectedPayment) {
        alert("Please select a payment method!");
        return;
    }

    localStorage.setItem("paymentMethod", selectedPayment.value);

    // Clear current cart
    localStorage.removeItem("cart");

    // Redirect to thank you page
    window.location.href = "thankyou.html";
}


// ======================================
// STEP 5: GO BACK TO STORE
// ======================================

function goBack() {
    window.location.href = "index.html";
}


// ======================================
// STEP 6: LOAD CART WHEN PAGE OPENS
// ======================================

loadCart();
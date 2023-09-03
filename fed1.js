let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// To open the cart
cartIcon.addEventListener('click', () => {
    cart.classList.add("active");
});

// To close the cart
closeCart.addEventListener('click', () => {
    cart.classList.remove("active");
});

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.querySelectorAll('.cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    var quantityInputs = document.querySelectorAll('.cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addCartButtons = document.querySelectorAll('.add-cart');
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener("click", addCartClicked);
    }

    document.querySelector('.btn-buy').addEventListener('click', buyButtonClicked);
}

function buyButtonClicked() {
    alert('Your order is placed');
    var cartContent = document.querySelector('.cart-content');
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove(); // Adjusted to remove the entire product box
    updatetotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement.parentElement;
    var title = shopProduct.querySelector('.product-title').innerText;
    var price = shopProduct.querySelector('.price').innerText;
    var productImg = shopProduct.querySelector('.product-img').src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg) {
    var cartContent = document.querySelector('.cart-content');
    var cartItemsNames = cartContent.querySelectorAll('.cart-product-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove' ></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartContent.appendChild(cartShopBox);

    cartShopBox.querySelector(".cart-remove").addEventListener('click', removeCartItem);
    cartShopBox.querySelector(".cart-quantity").addEventListener('change', quantityChanged);
}

function updatetotal() {
    var cartBoxes = document.querySelectorAll(".cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    document.querySelector('.total-price').innerText = "$" + total.toFixed(2); // Display total with two decimal places
}

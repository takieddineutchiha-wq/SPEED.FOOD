// ===============================
// SPEED FOOD CART
// ===============================

let cart = JSON.parse(localStorage.getItem("technoCart")) || [];

// إضافة منتج إلى السلة
function addItemToCart(id, name, price) {

    let product = cart.find(item => item.id == id);

    if (product) {
        product.qty++;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            qty: 1
        });
    }

    saveCart();
    showCart();

alert("✅ تم إضافة " + name + " إلى السلة");

    let side = document.getElementById("sideCart");

    if (side) {
        side.classList.add("open");
    }

}

// حفظ السلة
function saveCart() {

    localStorage.setItem("technoCart", JSON.stringify(cart));

}

// عرض السلة
function showCart() {

    let box = document.getElementById("cartItems");

    if (!box) return;

    box.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.qty;
        count += item.qty;

        box.innerHTML += `

        <div class="cart-product">

            <h3>${item.name}</h3>

            <p>${item.price} دج</p>

            <div class="qty">

                <button onclick="decreaseItem(${item.id})">-</button>

                <span>${item.qty}</span>

                <button onclick="increaseItem(${item.id})">+</button>

            </div>

            <button class="delete"
            onclick="removeItem(${item.id})">
            🗑 حذف
            </button>

        </div>

        `;

    });

    document.getElementById("cart-count").innerHTML = count;

    document.getElementById("cart-total-price").innerHTML =
        total.toLocaleString() + " دج";

}

// زيادة الكمية
function increaseItem(id) {

    let product = cart.find(item => item.id == id);

    if (product) {

        product.qty++;

        saveCart();

        showCart();

    }

}

// إنقاص الكمية
function decreaseItem(id) {

    let product = cart.find(item => item.id == id);

    if (!product) return;

    product.qty--;

    if (product.qty <= 0) {

        cart = cart.filter(item => item.id != id);

    }

    saveCart();

    showCart();

}

// حذف المنتج
function removeItem(id) {

    cart = cart.filter(item => item.id != id);

    saveCart();

    showCart();

}

// فتح وإغلاق السلة
function toggleCart() {

    let side = document.getElementById("sideCart");

    if (side) {

        side.classList.toggle("open");

    }

}

// زر اطلب الآن
function orderNow() {

    window.location.href = "order.html";

}

// عرض الطلبات في صفحة الطلب
function showCheckout() {

    let box = document.getElementById("checkout-order-items");

    if (!box) return;

    box.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.qty;

        box.innerHTML += `

        <div class="checkout-item">

            <span>${item.name}</span>

            <span>${item.qty}</span>

        </div>

        `;

    });

    let checkoutTotal = document.getElementById("checkout-total");

    if (checkoutTotal) {

        checkoutTotal.innerHTML = total.toLocaleString() + " دج";

    }

}

// تأكيد الطلب
let form = document.getElementById("orderForm");

if (form) {

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        alert("تم إرسال الطلب بنجاح");

        localStorage.removeItem("technoCart");

        cart = [];

        saveCart();

        window.location.href = "menu.html";

    });

}

showCart();
showCheckout();
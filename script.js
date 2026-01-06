let cart = JSON.parse(localStorage.getItem("cart")) || {};

const products = [
  {
    title: "Glacier 10 Card NBA Mystery Pack, Hand Packed & Sealed. (No Guaranteed Rare Cards)",
    price: 9.99,
    cards: 10,
    image: "images/icy_nba10.png"
  },
  {
    title: "Glacier 16 Card NBA Mystery Pack, Hand Packed & Sealed. (No Guaranteed Rare Cards)",
    price: 15.99,
    cards: 15,
    image: "images/icy_nba15.png"
  },
  {
    title: "Glacier 25 Card NBA Mystery Pack, Hand Packed & Sealed. (No Guaranteed Rare Cards)",
    price: 19.99,
    cards: 25,
    image: "images/icy_nba25.png"
  }
];


const productsContainer = document.getElementById("products");

let currentProduct = null;

products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.onclick = () => openProduct(product);

  div.innerHTML = `
    <img src="${product.image}" class="product-img">
    <h2>${product.title}</h2>
    <p class="price">$${product.price}</p>
    <p>${product.cards} cards per pack</p>
    <div class="product-buttons">
      <button class="buy-btn">Buy Now</button>
      <button class="add-btn">Add To Cart</button>
    </div>
  `;

  div.querySelector(".add-btn").onclick = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  div.querySelector(".buy-btn").onclick = (e) => {
    e.stopPropagation();
    buyNow(product);
  };

  productsContainer.appendChild(div);
});




function orderPack(title) {
  alert(
    `Order Requested:\n\n${title}\n\nBuyer will be contacted for payment and shipping details.`
  );
}

function openProduct(product) {
  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalTitle").innerText = product.title;
  document.getElementById("modalPrice").innerText = `$${product.price}`;

  document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

function buyNow(product) {
  addToCart(product);
  toggleCart();
}

function addToCart(product) {
  if (cart[product.title]) {
    cart[product.title].qty++;
  } else {
    cart[product.title] = {
      ...product,
      qty: 1
    };
  }
  updateCartUI();
}


function updateCartUI() {
  const cartItemsDiv = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  cartItemsDiv.innerHTML = "";

  let total = 0;
  let count = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.qty;
    count += item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <strong>${item.title}</strong><br>
      $${item.price.toFixed(2)} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}
      <div style="margin-top:6px;">
        <button onclick="changeQty('${item.title}', -1)">−</button>
        <button onclick="changeQty('${item.title}', 1)">+</button>
        <button onclick="removeItem('${item.title}')">Remove</button>
      </div>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartCount.innerText = count;
  cartTotal.innerText = total.toFixed(2);

  // 🔥 SAVE CART
  localStorage.setItem("cart", JSON.stringify(cart));
}


function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function toggleCart() {
  document.getElementById("cartPanel").classList.toggle("open");
}

function checkout() {
  window.location.href = "order.html";
}

function changeQty(title, delta) {
  if (!cart[title]) return;

  cart[title].qty += delta;

  if (cart[title].qty <= 0) {
    delete cart[title];
  }

  updateCartUI();
}

function removeItem(title) {
  delete cart[title];
  updateCartUI();
}

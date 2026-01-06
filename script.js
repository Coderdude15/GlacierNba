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

products.forEach(product => {
  const div = document.createElement("div");
  div.className = "product";
  div.onclick = () => openProduct(product);

  div.innerHTML = `
    <img src="${product.image}" class="product-img">
    <h2>${product.title}</h2>
    <p class="price">$${product.price}</p>
    <p>${product.cards} cards per pack</p>
  `;

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

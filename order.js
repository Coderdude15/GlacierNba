const cart = JSON.parse(localStorage.getItem("cart")) || {};
const orderItemsDiv = document.getElementById("orderItems");
const orderTotalSpan = document.getElementById("orderTotal");

let total = 0;
let summaryText = "";

Object.values(cart).forEach(item => {
  const lineTotal = item.price * item.qty;
  total += lineTotal;

  const div = document.createElement("div");
  div.innerHTML = `
    <strong>${item.title}</strong><br>
    ${item.qty} x $${item.price} = $${lineTotal.toFixed(2)}<br><br>
  `;
  orderItemsDiv.appendChild(div);

  summaryText += `${item.title} x ${item.qty} = $${lineTotal.toFixed(2)}\n`;
});

orderTotalSpan.innerText = total.toFixed(2);

function placeOrder() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  if (!name || !email || !address) {
    alert("Please fill all fields");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (Object.keys(cart).length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = `NEW ORDER\n\n`;
  message += `Name: ${name}\n`;
  message += `Email: ${email}\n`;
  message += `Address:\n${address}\n\n`;
  message += `Items:\n`;

  let total = 0;

  Object.values(cart).forEach(item => {
    const line = `${item.title} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}\n`;
    message += line;
    total += item.price * item.qty;
  });

  message += `\nTotal: $${total.toFixed(2)}`;

  const subject = encodeURIComponent("New NBA Mystery Pack Order");
  const body = encodeURIComponent(message);

  // 🔥 YOUR EMAIL HERE
  const yourEmail = "twhitson240@gmail.com";

  // Open email app
  window.location.href = `mailto:${yourEmail}?subject=${subject}&body=${body}`;

  // Clear cart
  localStorage.removeItem("cart");

  // Show success popup on main page
  localStorage.setItem("orderSuccess", "true");

  // Redirect back to main page
  setTimeout(() => {
    window.location.href = "index.html";
  }, 500);
}



function goBack() {
  window.location.href = "index.html";
}

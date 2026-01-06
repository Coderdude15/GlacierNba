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

  const body = `
New Order!

Name: ${name}
Email: ${email}
Address: ${address}

Items:
${summaryText}

Total: $${total.toFixed(2)}
`;

  // 🔥 Fallback email method
  window.location.href = `mailto:${email}?subject=Order Confirmation&body=${encodeURIComponent(body)}`;

  // Clear cart
  localStorage.removeItem("cart");

  alert("Order placed! Confirmation email opened.");
}

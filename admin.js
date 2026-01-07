let orders = JSON.parse(localStorage.getItem("orders")) || [];

function renderOrders() {
  const div = document.getElementById("orders");
  div.innerHTML = "";

  if (orders.length === 0) {
    div.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.forEach((order, index) => {
    const box = document.createElement("div");
    box.style.border = "1px solid #444";
    box.style.padding = "10px";
    box.style.marginBottom = "10px";

    box.innerHTML = `
      <h3>Order #${index + 1}</h3>
      <b>Name:</b> ${order.name}<br>
      <b>Address:</b><pre>${order.address}</pre>
      <b>Date:</b> ${order.date}<br>
      <b>Items:</b><br>
      ${order.items.map(i => `
        <img src="${i.image}" width="80"><br>
        ${i.title} (${i.rarity})<br><br>
      `).join("")}
      <button onclick="printLabel(${index})">🖨️ Print Label</button>
      <button onclick="markShipped(${index})">✅ Mark Shipped</button>
      <hr>
    `;

    div.appendChild(box);
  });
}

function markShipped(i) {
  orders.splice(i, 1);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

function resetInventory() {
  if (!confirm("Reset ALL inventory?")) return;
  localStorage.removeItem("cardInventory");
  localStorage.removeItem("cardInventoryVersion");
  alert("Inventory reset. Reload store pages.");
}

function printLabel(i) {
  localStorage.setItem("printOrder", JSON.stringify(orders[i]));
  window.open("label.html", "_blank");
}


renderOrders();

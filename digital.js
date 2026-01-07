// inventory comes from inventory.js
let pulledCards = [];
let packSize = 0;
let currentIndex = 0;

// START PACK
function startPack(count, price) {
  console.log("Starting pack", count);

  const available = inventory.filter(c => c.available);

  if (available.length < count) {
    alert("Not enough cards left in inventory.");
    return;
  }

  packSize = count;
  pulledCards = [];
  currentIndex = 0;

  document.getElementById("packSelect").classList.add("hidden");
  document.getElementById("packAnimation").classList.remove("hidden");

  const pack = document.getElementById("packImage");
  pack.classList.add("pack-anim");
  pack.onclick = openPack;
}

// OPEN PACK
function openPack() {
  console.log("Pack opened");

  const pack = document.getElementById("packImage");
  pack.classList.remove("pack-anim");

  setTimeout(() => {
    document.getElementById("packAnimation").classList.add("hidden");
    pullCards();
  }, 500);
}

// RARITY LOGIC
function getRandomCardByRarity() {
  const roll = Math.random() * 100;

  let rarity;
  if (roll < 1) rarity = "oneofone";
  else if (roll < 10) rarity = "holo";
  else if (roll < 30) rarity = "rare";
  else rarity = "common";

  let available = inventory.filter(c => c.available && c.rarity === rarity);

  if (available.length === 0) {
    available = inventory.filter(c => c.available);
  }

  const rand = Math.floor(Math.random() * available.length);
  return available[rand];
}

// PULL CARDS
function pullCards() {
  for (let i = 0; i < packSize; i++) {
    const card = getRandomCardByRarity();
    card.available = false;
    pulledCards.push(card);
  }

  localStorage.setItem("cardInventory", JSON.stringify(inventory));

  document.getElementById("openArea").classList.remove("hidden");
  showCard();
}

// SHOW CARD
function showCard() {
  document.getElementById("counter").innerText =
    `Card ${currentIndex + 1} of ${pulledCards.length}`;

  const img = document.getElementById("cardImage");
  img.src = pulledCards[currentIndex].image;

  img.style.transform = "scale(0.2)";
  setTimeout(() => img.style.transform = "scale(1)", 50);
}

// NEXT CARD
function nextCard() {
  currentIndex++;
  if (currentIndex >= pulledCards.length) {
    showSummary();
  } else {
    showCard();
  }
}

// SUMMARY
function showSummary() {
  document.getElementById("openArea").classList.add("hidden");
  document.getElementById("summaryArea").classList.remove("hidden");

  const div = document.getElementById("summaryCards");
  div.innerHTML = "";

  pulledCards.forEach(card => {
    const img = document.createElement("img");
    img.src = card.image;
    div.appendChild(img);
  });
}

// SAVE ORDER
function finishOrder() {
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;

  if (!name || !address) {
    alert("Fill name and address");
    return;
  }

  const order = {
    name,
    address,
    items: pulledCards.map(c => ({
      title: c.name,
      image: c.image,
      rarity: c.rarity
    })),
    date: new Date().toLocaleString(),
    type: "DIGITAL"
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));


  alert("Order saved and ready to ship.");

  window.location.href = "index.html";
}

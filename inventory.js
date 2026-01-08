const INVENTORY_VERSION = 9; // bump this to force reset

const defaultInventory = [
  { id: 1, name: "Luka Doncic Dominance", image: "Luka_Don_DOM.png", rarity: "common", available: true },
  { id: 2, name: "Malaki Branham Insert", image: "Malaki_Branham.png", rarity: "rare", available: true },
  { id: 3, name: "Anfernee Hardaway Green Prizm", image: "Anfernee_Hardaway.png", rarity: "common", available: true },
  { id: 4, name: "Cole Anthony Insert", image: "cole_Anthony_instant.png", rarity: "common", available: true },
  { id: 5, name: "Darius Garland Insert", image: "Darius_Garland.png", rarity: "common", available: true },
  { id: 6, name: "Xavier Tillman Silver RC", image: "20260107_025328542_iOS.png", rarity: "common", available: true },
  { id: 7, name: "Immanuel Quickley Emergent RC", image: "20260107_024819671_iOS.png", rarity: "common", available: true },
  { id: 8, name: "Tyrese Maxey Emergent RC", image: "20260107_024803764_iOS.png", rarity: "common", available: true },
  { id: 9, name: "Steph Curry Base", image: "20260107_024744357_iOS.png", rarity: "common", available: true },
  { id: 10, name: "Duncan Robinson Green Prizm", image: "20260107_024728709_iOS.png", rarity: "common", available: true },
  { id: 11, name: "Donovan Mitchell Dominance", image: "20260107_024651402_iOS.png", rarity: "common", available: true },
  { id: 12, name: "Scottie Lewis Jersy Patch", image: "Scottie_Lewis_Patch.png", rarity: "holo", available: true },
  { id: 13, name: "Tyler Herro Cracked Silver", image: "20260107_024607622_iOS.png", rarity: "rare", available: true },
  { id: 14, name: "Shaq Cracked Pink LEGENDS", image: "20260107_024227658_iOS.png", rarity: "rare", available: true },
  { id: 15, name: "Anthony Davis Silver", image: "20260107_024209297_iOS.png", rarity: "common", available: true },
  { id: 16, name: "Jonathan Kuminga Season Ticket", image: "20260107_024152427_iOS.png", rarity: "common", available: true },
  { id: 17, name: "Cade Cunningham Cracked Silver", image: "20260107_024054338_iOS.png", rarity: "rare", available: true },
  { id: 18, name: "Kyrie Irving Dominance", image: "20260107_024036734_iOS.png", rarity: "common", available: true },
  { id: 19, name: "Trae Young Cracked Silver", image: "20260107_024018126_iOS.png", rarity: "rare", available: true },
  { id: 20, name: "Lamelo Ball Emergent RC", image: "20260107_024001824_iOS.png", rarity: "rare", available: true },
  { id: 21, name: "Anthony Edwards RC", image: "20260107_023942502_iOS.png", rarity: "rare", available: true },
  { id: 22, name: "Marcus Sasser Orange Prizm 158/199", image: "20260107_023929514_iOS.png", rarity: "common", available: true },
  { id: 23, name: "Tyrese Maxey Red Prizm RC", image: "20260107_023908237_iOS.png", rarity: "holo", available: true },
  { id: 24, name: "Patrick Ewing Game Worn Patch", image: "20260107_023843412_iOS.png", rarity: "holo", available: true },
];

// LOAD OR RESET
let saved = JSON.parse(localStorage.getItem("cardInventory"));
let savedVersion = Number(localStorage.getItem("cardInventoryVersion"));

if (!saved || savedVersion !== INVENTORY_VERSION || !Array.isArray(saved) || saved.length < defaultInventory.length) {
  console.log("Resetting inventory...");
  inventory = JSON.parse(JSON.stringify(defaultInventory));
  localStorage.setItem("cardInventory", JSON.stringify(inventory));
  localStorage.setItem("cardInventoryVersion", INVENTORY_VERSION);
} else {
  inventory = saved;
}

console.log("Inventory loaded:", inventory.length, "cards");

const productEmojis = ["👟", "🎧", "👜", "⌚", "📱", "💻", "🕶️", "👕", "🧢", "🎒"];

export const categories = [
  "Giày",
  "Phụ kiện",
  "Túi xách",
  "Đồng hồ",
  "Điện thoại",
  "Laptop",
  "Mắt kính",
  "Áo",
  "Mũ",
  "Balo",
];

export const products = Array.from({ length: 18 }).map((_, i) => ({
  id: `P${1000 + i}`,
  name: `${categories[i % categories.length]} ${
    ["Aero", "Pulse", "Lumen", "Nova", "Echo", "Drift"][i % 6]
  } ${i + 1}`,
  sku: `SKU-${2000 + i}`,
  category: categories[i % categories.length],
  price: 290000 + ((i * 137) % 9) * 150000,
  stock: [120, 0, 45, 8, 230, 17, 64, 3, 88][i % 9],
  status: i % 7 === 0 ? "INACTIVE" : i % 5 === 0 ? "LOW_STOCK" : "ACTIVE",
  image: productEmojis[i % productEmojis.length],
}));

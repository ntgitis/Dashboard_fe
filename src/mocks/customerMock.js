export const customerNames = [
  "Nguyễn An",
  "Trần Bảo",
  "Lê Châu",
  "Phạm Dũng",
  "Hoàng Em",
  "Đỗ Phúc",
  "Vũ Giang",
  "Bùi Hà",
  "Đinh Khánh",
  "Lý Mai",
];

export const customers = customerNames.map((name, i) => ({
  id: `C${500 + i}`,
  name,
  email: `${name.toLowerCase().replace(/\s/g, ".")}@mail.com`,
  phone: `09${String(10000000 + i * 234567).slice(0, 8)}`,
  joined: new Date(Date.now() - i * 86400000 * 30).toISOString().slice(0, 10),
  orders: 2 + ((i * 3) % 14),
  spent: 1200000 + ((i * 487) % 20) * 350000,
  tier: ["bronze", "silver", "gold", "platinum"][i % 4],
  status: i % 7 === 0 ? "BLOCKED" : "ACTIVE",
}));

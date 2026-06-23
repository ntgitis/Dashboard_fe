import { categories } from "./productMock";

export const revenueData = [
  { month: "T1", revenue: 42, orders: 120 },
  { month: "T2", revenue: 51, orders: 145 },
  { month: "T3", revenue: 48, orders: 138 },
  { month: "T4", revenue: 67, orders: 178 },
  { month: "T5", revenue: 73, orders: 195 },
  { month: "T6", revenue: 89, orders: 234 },
  { month: "T7", revenue: 95, orders: 256 },
  { month: "T8", revenue: 112, orders: 289 },
  { month: "T9", revenue: 108, orders: 274 },
  { month: "T10", revenue: 134, orders: 321 },
  { month: "T11", revenue: 152, orders: 367 },
  { month: "T12", revenue: 178, orders: 412 },
];

export const categoryData = categories.slice(0, 6).map((category, i) => ({
  name: category,
  value: 15 + ((i * 17) % 30),
}));

// import { customerNames } from "./customerMock";

// const orderStatuses = [
//   "PENDING",
//   "PROCESSING",
//   "SHIPPED",
//   "DELIVERED",
//   "CANCELLED",
// ];

// export const orders = Array.from({ length: 24 }).map((_, i) => ({
//   id: `#NV-${10240 + i}`,
//   customer: customerNames[i % customerNames.length],
//   email: `${customerNames[i % customerNames.length]
//     .toLowerCase()
//     .replace(/\s/g, ".")}@mail.com`,
//   date: new Date(Date.now() - i * 86400000 * 0.7).toISOString().slice(0, 10),
//   total: 450000 + ((i * 213) % 12) * 220000,
//   status: orderStatuses[i % orderStatuses.length],
//   items: 1 + (i % 5),
// }));

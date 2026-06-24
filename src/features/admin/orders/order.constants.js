export const ORDER_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export const ORDER_STATUS_OPTIONS = [
  {
    value: ORDER_STATUS.PENDING,
    label: "Chờ xử lý",
  },
  {
    value: ORDER_STATUS.PROCESSING,
    label: "Đang xử lý",
  },
  {
    value: ORDER_STATUS.SHIPPED,
    label: "Đang giao",
  },
  {
    value: ORDER_STATUS.DELIVERED,
    label: "Hoàn tất",
  },
  {
    value: ORDER_STATUS.CANCELLED,
    label: "Đã huỷ",
  },
];

export const ORDER_STATUS_FLOW = {
  [ORDER_STATUS.PENDING]: [ORDER_STATUS.PROCESSING, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.PROCESSING]: [ORDER_STATUS.SHIPPED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.SHIPPED]: [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED],
  [ORDER_STATUS.DELIVERED]: [],
  [ORDER_STATUS.CANCELLED]: [],
};

export function getOrderStatusLabel(status) {
  return (
    ORDER_STATUS_OPTIONS.find((option) => option.value === status)?.label ||
    status
  );
}

export function getNextOrderStatuses(status) {
  return ORDER_STATUS_FLOW[status] || [];
}

export function isFinalOrderStatus(status) {
  return status === ORDER_STATUS.DELIVERED || status === ORDER_STATUS.CANCELLED;
}

export const USER_ORDER_STATUS_OPTIONS = [
  {
    value: "PENDING",
    label: "Chờ xử lý",
  },
  {
    value: "PROCESSING",
    label: "Đang xử lý",
  },
  {
    value: "SHIPPED",
    label: "Đang giao",
  },
  {
    value: "DELIVERED",
    label: "Hoàn tất",
  },
  {
    value: "CANCELLED",
    label: "Đã huỷ",
  },
];

export const CANCELABLE_ORDER_STATUSES = ["PENDING", "PROCESSING"];

export function canCancelOrder(status) {
  return CANCELABLE_ORDER_STATUSES.includes(status);
}

export function getUserOrderStatusLabel(status) {
  return (
    USER_ORDER_STATUS_OPTIONS.find((option) => option.value === status)
      ?.label || status
  );
}

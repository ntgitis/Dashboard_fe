export const CUSTOMER_STATUS = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
};

export const CUSTOMER_STATUS_OPTIONS = [
  {
    value: CUSTOMER_STATUS.ACTIVE,
    label: "Hoạt động",
    color: "success",
  },
  {
    value: CUSTOMER_STATUS.BLOCKED,
    label: "Đã khoá",
    color: "error",
  },
];

export const CUSTOMER_TIER_OPTIONS = [
  {
    value: "bronze",
    label: "Bronze",
    color: "default",
  },
  {
    value: "silver",
    label: "Silver",
    color: "info",
  },
  {
    value: "gold",
    label: "Gold",
    color: "warning",
  },
  {
    value: "platinum",
    label: "Platinum",
    color: "success",
  },
];

export function getCustomerStatusMeta(status) {
  return (
    CUSTOMER_STATUS_OPTIONS.find((option) => option.value === status) || {
      value: status,
      label: status,
      color: "default",
    }
  );
}

export function getCustomerTierMeta(tier) {
  return (
    CUSTOMER_TIER_OPTIONS.find((option) => option.value === tier) || {
      value: tier,
      label: tier,
      color: "default",
    }
  );
}

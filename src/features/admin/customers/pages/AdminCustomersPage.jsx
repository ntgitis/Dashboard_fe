import { useMemo, useState } from "react";
import { Stack } from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { customers as customerMocks } from "@/mocks";
import CustomerFilter from "../components/CustomerFilter";
import CustomerTable from "../components/CustomerTable";
import CustomerDetailDialog from "../components/CustomerDetailDialog";
import { CUSTOMER_STATUS } from "../customer.constants";

const DEFAULT_PAGE = 0;
const DEFAULT_ROWS_PER_PAGE = 10;

export default function AdminCustomersPage() {
  const [items, setItems] = useState(customerMocks);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [tier, setTier] = useState("all");

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    const lowerKeyword = keyword.trim().toLowerCase();

    return items.filter((customer) => {
      const matchKeyword =
        !lowerKeyword ||
        customer.id.toLowerCase().includes(lowerKeyword) ||
        customer.name.toLowerCase().includes(lowerKeyword) ||
        customer.email.toLowerCase().includes(lowerKeyword) ||
        customer.phone.includes(lowerKeyword);

      const matchStatus = status === "all" || customer.status === status;
      const matchTier = tier === "all" || customer.tier === tier;

      return matchKeyword && matchStatus && matchTier;
    });
  }, [items, keyword, status, tier]);

  const maxPage = Math.max(
    0,
    Math.ceil(filteredCustomers.length / rowsPerPage) - 1,
  );

  const currentPage = Math.min(page, maxPage);

  const handleKeywordChange = (value) => {
    setKeyword(value);
    setPage(DEFAULT_PAGE);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(DEFAULT_PAGE);
  };

  const handleTierChange = (value) => {
    setTier(value);
    setPage(DEFAULT_PAGE);
  };

  const handleResetFilter = () => {
    setKeyword("");
    setStatus("all");
    setTier("all");
    setPage(DEFAULT_PAGE);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(DEFAULT_PAGE);
  };

  const handleCloseDetail = () => {
    setSelectedCustomer(null);
  };

  const handleToggleCustomerStatus = (customer) => {
    const nextStatus =
      customer.status === CUSTOMER_STATUS.BLOCKED
        ? CUSTOMER_STATUS.ACTIVE
        : CUSTOMER_STATUS.BLOCKED;

    setItems((prev) =>
      prev.map((item) =>
        item.id === customer.id
          ? {
              ...item,
              status: nextStatus,
            }
          : item,
      ),
    );

    setSelectedCustomer((prev) =>
      prev && prev.id === customer.id
        ? {
            ...prev,
            status: nextStatus,
          }
        : prev,
    );
  };

  return (
    <>
      <PageHeader
        title="Quản lý khách hàng"
        description="Theo dõi hồ sơ, hạng thành viên, trạng thái và tổng giá trị mua hàng."
      />

      <Stack spacing={3}>
        <CustomerFilter
          keyword={keyword}
          status={status}
          tier={tier}
          onKeywordChange={handleKeywordChange}
          onStatusChange={handleStatusChange}
          onTierChange={handleTierChange}
          onReset={handleResetFilter}
        />

        <CustomerTable
          customers={filteredCustomers}
          page={currentPage}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewDetail={setSelectedCustomer}
        />
      </Stack>

      <CustomerDetailDialog
        open={Boolean(selectedCustomer)}
        customer={selectedCustomer}
        onClose={handleCloseDetail}
        onToggleStatus={handleToggleCustomerStatus}
      />
    </>
  );
}

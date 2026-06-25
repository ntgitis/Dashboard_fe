import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "@/components/layout/DashboardLayout";
import LoginPage from "@/features/auth/LoginPage";

import AdminOverviewPage from "@/features/admin/dashboard/AdminOverviewPage";
import AdminProductsPage from "@/features/admin/products/AdminProductsPage";
import AdminOrdersPage from "@/features/admin/orders/AdminOrdersPage";
import AdminCustomersPage from "@/features/admin/customers/AdminCustomersPage";

import UserOverviewPage from "@/features/user/dashboard/UserOverviewPage";
import UserOrdersPage from "@/features/user/orders/UserOrdersPage";
import UserWishlistPage from "@/features/user/wishlist/UserWishlistPage";
import UserAddressesPage from "@/features/user/addresses/UserAddressesPage";
import UserProfilePage from "@/features/user/profile/UserProfilePage";

import ProtectedRoute, { GuestRoute } from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<GuestRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<AdminOverviewPage />} />
          <Route path="analytics" element={<Navigate to="/admin" replace />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
        <Route path="/user" element={<DashboardLayout role="user" />}>
          <Route index element={<UserOverviewPage />} />
          <Route path="orders" element={<UserOrdersPage />} />
          <Route path="wishlist" element={<UserWishlistPage />} />
          <Route path="addresses" element={<UserAddressesPage />} />
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

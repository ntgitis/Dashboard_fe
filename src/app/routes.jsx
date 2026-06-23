import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

import LoginPage from "@/features/auth/pages/LoginPage";

import AdminOverviewPage from "@/features/admin/dashboard/AdminOverviewPage";
import AdminAnalyticsPage from "@/features/admin/analytics/AdminAnalyticsPage";
import AdminProductsPage from "@/features/admin/products/pages/AdminProductsPage";
import AdminOrdersPage from "@/features/admin/orders/AdminOrdersPage";
import AdminCustomersPage from "@/features/admin/customers/AdminCustomersPage";

import UserOverviewPage from "@/features/user/dashboard/UserOverviewPage";
import UserOrdersPage from "@/features/user/orders/UserOrdersPage";
import UserWishlistPage from "@/features/user/wishlist/UserWishlistPage";
import UserAddressesPage from "@/features/user/addresses/UserAddressesPage";
import UserProfilePage from "@/features/user/profile/UserProfilePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/admin" element={<DashboardLayout role="admin" />}>
        <Route index element={<AdminOverviewPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
      </Route>

      <Route path="/user" element={<DashboardLayout role="user" />}>
        <Route index element={<UserOverviewPage />} />
        <Route path="orders" element={<UserOrdersPage />} />
        <Route path="wishlist" element={<UserWishlistPage />} />
        <Route path="addresses" element={<UserAddressesPage />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

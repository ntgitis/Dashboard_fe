# Dashboard FE - React + MUI

Frontend dashboard sử dụng React, Vite, React Router và Material UI.

## Phạm vi bản này

Bản này tập trung sắp xếp lại cấu trúc source code sau khi refactor UI sang MUI:

- Giữ cả khu vực Admin Dashboard và User Dashboard.
- Tách `App`, `routes`, `providers` vào `src/app`.
- Chuyển các trang nghiệp vụ vào `src/features`.
- Chuyển component dùng chung vào `src/components/common`.
- Chuyển layout dùng chung vào `src/components/layout`.
- Tách mock data vào `src/mocks`.
- Tách formatter và status helper vào `src/utils`.
- Dữ liệu vẫn đang dùng mock data.
- CRUD/API thật chưa được triển khai ở bản này.

## Cấu trúc thư mục chính

```txt
src/
├── app/
│   ├── App.jsx
│   ├── providers.jsx
│   └── routes.jsx
│
├── components/
│   ├── common/
│   │   ├── PageHeader.jsx
│   │   ├── StatCard.jsx
│   │   └── StatusChip.jsx
│   └── layout/
│       ├── DashboardLayout.jsx
│       ├── Header.jsx
│       └── Sidebar.jsx
│
├── features/
│   ├── auth/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── analytics/
│   │   ├── products/
│   │   ├── orders/
│   │   └── customers/
│   └── user/
│       ├── dashboard/
│       ├── orders/
│       ├── wishlist/
│       ├── addresses/
│       └── profile/
│
├── mocks/
├── theme/
├── utils/
├── main.jsx
└── index.css
```

## Cài đặt

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Route chính

```txt
/login
/admin
/admin/analytics
/admin/products
/admin/orders
/admin/customers
/user
/user/orders
/user/wishlist
/user/addresses
/user/profile
```

## Công việc tiếp theo

- Tạo API layer bằng Axios.
- Ghép API Spring Boot.
- Hoàn thiện CRUD sản phẩm.
- Hoàn thiện cập nhật trạng thái đơn hàng.
- Thêm login thật, token và ProtectedRoute.

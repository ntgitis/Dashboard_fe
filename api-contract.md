--Auth
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
POST /api/auth/login

--User
-Admin
GET /api/admin/users
GET /api/admin/users/{id}
PUT /api/admin/users/{id}/role

--Products
-Admin
DELETE /api/admin/products/{id}
GET /api/admin/products/{id}
GET /api/admin/products
POST /api/admin/products
PUT /api/admin/products/{id}

--Orders
DELETE
/api/products/{id}
Xoá sản phẩm (soft delete, Admin)

GET
/api/products/{id}
Lấy sản phẩm theo ID

GET
/api/products
Lấy danh sách sản phẩm — hỗ trợ filter category, search, phân trang

POST
/api/products
Tạo sản phẩm mới (Admin)

PUT
/api/products/{id}
-Admin
GET /api/admin/orders
GET /api/admin/orders/{id}
PUT /api/admin/orders/{id}/status

--Customers
GET
/api/users/profile
Lấy thông tin profile của tôi

POST
/api/users/me/avatar
Upload ảnh đại diện

PUT
/api/users/profile
Cập nhật thông tin profile của tôi
--User Orders
-- Wishlist
DELETE
/api/wishlist
Xóa toàn bộ wishlist

DELETE
/api/wishlist/items/{productId}
Xóa sản phẩm khỏi wishlist

GET
/api/wishlist
Xem wishlist của tôi

POST
/api/wishlist/items
Thêm sản phẩm vào wishlist

--Addresses
DELETE /api/users/me/addresses/{id}
GET /api/users/me/addresses
PATCH /api/users/me/addresses/{id}/default
POST /api/users/me/addresses
PUT /api/users/me/addresses/{id}

--Analytics

--Categories
DELETE/api/categories/{id}
GET /api/categories/{id}
GET /api/categories
POST /api/categories
PUT /api/categories/{id}

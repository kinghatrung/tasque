# Tasque -- Ứng dụng quản lý công việc

Tasque là một ứng dụng quản lý công việc giúp người dùng tạo, theo dõi
và sắp xếp các nhiệm vụ một cách trực quan và hiệu quả.

## 🚀 Tính năng chính

### ✔ Quản lý công việc

-   Tạo, sửa, xóa công việc
-   Tìm kiếm theo từ khóa
-   Lọc theo trạng thái và mức độ ưu tiên
-   Hiển thị đầy đủ thông tin: mô tả, hạn, ưu tiên, người tạo

### ✔ Dashboard

-   Hiển thị tổng quan công việc
-   Giao diện trực quan, dễ sử dụng
-   Badge trạng thái -- ưu tiên rõ ràng

### ✔ Thống kê

-   Thống kê công việc theo trạng thái
-   Thống kê theo mức độ ưu tiên

### ✔ Người dùng, bạn bè, nhóm

-   Đăng nhập, đăng ký
-   Avatar người dùng
-   Quản lý bạn bè
-   Tạo và quản lý nhóm

### ✔ Bảo mật

-   JWT (access & refresh token)
-   Cookie httpOnly

## 🛠 Công nghệ sử dụng

### Frontend

-   React + TypeScript
-   Redux Toolkit
-   React Query
-   React Router DOM
-   Axios
-   TailwindCSS + Shadcn UI
-   Lucide-react

### Backend

-   Node.js + Express
-   MongoDB / MySQL
-   JWT Authentication
-   Mô hình MVC + Services

## 📁 Cấu trúc thư mục

    root/
    │── backend/
    │   ├── controllers/
    │   ├── services/
    │   ├── models/
    │   ├── middlewares/
    │   ├── routes/
    │   └── server.js
    │
    └── frontend/
        ├── src/
        │   ├── pages/
        │   ├── components/
        │   ├── layouts/
        │   ├── redux/
        │   ├── hooks/
        │   └── App.tsx

## 🚀 Chạy dự án

### Backend

``` bash
cd backend
npm install
npm run dev
```

### Frontend

``` bash
cd frontend
npm install
npm run dev
```

## © Tác giả

Minh Huyên -- Dự án học tập và phát triển kỹ năng lập trình web.

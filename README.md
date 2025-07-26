# Portal Artikel - Next.js App Router dengan NextAuth.js

Aplikasi Portal Artikel yang dibangun menggunakan Next.js 15 dengan App Router, NextAuth.js untuk autentikasi, dan Prisma sebagai ORM.

## Fitur Utama

### ✅ Sistem Autentikasi
- **NextAuth.js** sebagai solusi otentikasi utama
- Login dengan Email & Password
- Registrasi user baru
- Session management
- Middleware protection untuk halaman tertentu

### ✅ Halaman Aplikasi

#### Halaman A: Landing Page (Publik)
- **URL**: `/`
- **Akses**: Terbuka untuk umum (tidak perlu login)
- **Fitur**: 
  - Menampilkan daftar artikel yang dipublikasikan
  - Welcome message
  - Link untuk register/login

#### Halaman B: Dashboard Penulis (Protected)
- **URL**: `/dashboard`
- **Akses**: Hanya user yang sudah login (dilindungi middleware)
- **Fitur**:
  - Menampilkan informasi user (nama/email)
  - Form untuk menulis artikel baru
  - Daftar artikel milik user
  - Toggle publish/unpublish artikel
  - Sign out functionality

### ✅ Fitur Tambahan
- **Navbar dinamis** dengan state login/logout
- **Responsive design** menggunakan Tailwind CSS
- **Database** dengan SQLite (mudah untuk development)
- **Sample data** dengan seeder

## Struktur Project

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts          # NextAuth.js API routes
│   │   ├── register/
│   │   │   └── route.ts          # API registrasi user
│   │   └── articles/
│   │       ├── route.ts          # API CRUD artikel
│   │       └── [id]/route.ts     # API update artikel specific
│   ├── dashboard/
│   │   └── page.tsx              # Halaman dashboard (protected)
│   ├── login/
│   │   └── page.tsx              # Halaman login
│   ├── register/
│   │   └── page.tsx              # Halaman registrasi
│   ├── layout.tsx                # Root layout dengan Navbar
│   └── page.tsx                  # Landing page (public)
├── components/
│   ├── Navbar.tsx                # Navigation bar
│   └── Providers.tsx             # NextAuth SessionProvider
├── lib/
│   ├── auth.ts                   # Konfigurasi NextAuth.js
│   └── prisma.ts                 # Prisma client instance
└── types/
    └── next-auth.d.ts            # TypeScript types untuk NextAuth
```

## Teknologi yang Digunakan

- **Framework**: Next.js 15 dengan App Router
- **Authentication**: NextAuth.js v4
- **Database**: SQLite dengan Prisma ORM
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Password Hashing**: bcryptjs

## Instalasi & Setup

1. **Clone dan Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Seed Database dengan Sample Data**
   ```bash
   npm run db:seed
   ```

4. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

5. **Akses Aplikasi**
   - Buka browser ke `http://localhost:3000`

## Testing & Demo

### Account Testing
- **Email**: `test@example.com`
- **Password**: `password123`

### Flow Testing
1. **Halaman Public** (`/`):
   - Menampilkan 2 artikel yang sudah dipublikasikan
   - Dapat diakses tanpa login

2. **Register** (`/register`):
   - Daftar akun baru
   - Validasi password dan konfirmasi password

3. **Login** (`/login`):
   - Login dengan email dan password
   - Redirect ke dashboard setelah berhasil

4. **Dashboard** (`/dashboard`):
   - Hanya bisa diakses jika sudah login (protected by middleware)
   - Menampilkan informasi user
   - Form untuk membuat artikel baru
   - Daftar artikel dengan opsi publish/unpublish

5. **Middleware Protection**:
   - Coba akses `/dashboard` tanpa login → redirect ke `/login`

## Fitur Keamanan

- ✅ Password hashing dengan bcryptjs
- ✅ JWT session dengan NextAuth.js
- ✅ Middleware protection untuk routes
- ✅ Server-side session validation
- ✅ CSRF protection (built-in NextAuth.js)

## Database Schema

### Users Table
- `id`: Primary key
- `email`: Unique email address
- `name`: User's full name
- `password`: Hashed password
- `createdAt`, `updatedAt`: Timestamps

### Articles Table
- `id`: Primary key
- `title`: Article title
- `content`: Article content
- `excerpt`: Optional short description
- `published`: Boolean status
- `authorId`: Foreign key to Users
- `createdAt`, `updatedAt`: Timestamps

## API Endpoints

### Authentication
- `POST /api/auth/signin` - Login
- `POST /api/auth/signout` - Logout
- `POST /api/register` - User registration

### Articles
- `GET /api/articles` - Get user's articles (protected)
- `POST /api/articles` - Create new article (protected)
- `PATCH /api/articles/[id]` - Update article status (protected)

## Kontribusi Requirements ✅

1. ✅ **NextAuth.js** sebagai solusi otentikasi utama
2. ✅ **Middleware** untuk membatasi akses halaman tertentu
3. ✅ **Halaman login** dengan Email & Password
4. ✅ **Halaman register** untuk pendaftaran user
5. ✅ **Halaman A** (Landing) - terbuka untuk umum
6. ✅ **Halaman B** (Dashboard) - hanya untuk user login
7. ✅ **Informasi user** ditampilkan di halaman protected
8. ✅ **Sign in & sign out** menggunakan NextAuth.js

## Tips Development

- Gunakan `npm run dev` untuk development
- Database SQLite file tersimpan di `prisma/dev.db`
- Logs dapat dilihat di terminal dan browser console
- Environment variables ada di `.env`

---

**Selamat! Aplikasi Portal Artikel sudah siap digunakan!** 🎉

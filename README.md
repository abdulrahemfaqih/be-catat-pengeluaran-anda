# Catat Pengeluaran Anda - Backend

Rest API untuk Aplikasi pengelolaan keuangan pribadi yang memungkinkan pengguna untuk melacak pengeluaran, mengatur anggaran, mencatat pemasukan, dan mencapai tujuan finansial dengan lebih baik.

## Fitur Utama

- **Autentikasi Pengguna**: Login dan registrasi dengan email/password atau Google OAuth
- **Manajemen Transaksi**: Mencatat dan melacak pengeluaran harian
- **Pengelolaan Anggaran**: Menetapkan dan melacak anggaran bulanan
- **Pencatatan Pemasukan**: Mencatat sumber dan jumlah pendapatan
- **Riwayat Keuangan**: Melihat riwayat transaksi dengan filter dan pencarian
- **Wishlist**: Menentukan barang yang ingin dibeli di masa depan


## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB dengan Mongoose
- **Autentikasi**: Passport.js, JWT, dan OAuth Google
- **Session Management**: MongoDB Session Store
- **Keamanan**: HTTP Security Headers, CORS, Cookie Security

## Instalasi dan Penggunaan

### Prasyarat

- Node.js (v14 atau lebih baru)
- NPM atau Yarn
- MongoDB (lokal atau cloud)
- Google Developer Account (untuk OAuth)

### Langkah Instalasi

1. Clone repositori
2. Install dependensi
3. Buat file `.env`
4. Salin file `.env.example` menjadi `.env` dan isi dengan konfigurasi Anda:
5. jalanlan `npm install` untuk menginstall semua depedencies

### Konfigurasi Google OAuth

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih yang sudah ada
3. Aktifkan Google OAuth API
4. Buat Credentials > OAuth client ID
5. Tambahkan URL berikut di Authorized redirect URIs:
6. Salin Client ID dan Client Secret ke file `.env`

### Jalankan aplikasi

```bash
npm run dev
```

### Verifikasi instalasi

Buka browser dan akses http://localhost:3000/api/health-check. Jika muncul respons `{"status":"OK"}`, berarti aplikasi berhasil berjalan.

## API Endpoints

### Autentikasi

- **POST** `/api/auth/register` - Registrasi pengguna baru
- **POST** `/api/auth/login` - Login pengguna
- **GET** `/api/auth/logout` - Logout pengguna
- **GET** `/api/auth/google` - Login dengan Google
- **GET** `/api/auth/google/callback` - Callback untuk Google OAuth

### Transaksi

- **GET** `/api/transactions` - Mendapatkan semua transaksi
- **POST** `/api/transactions` - Membuat transaksi baru
- **GET** `/api/transactions/:id` - Mendapatkan transaksi berdasarkan ID
- **PUT** `/api/transactions/:id` - Update transaksi
- **DELETE** `/api/transactions/:id` - Hapus transaksi

### Anggaran

- **GET** `/api/budgets` - Mendapatkan semua anggaran
- **POST** `/api/budgets` - Membuat anggaran baru
- **GET** `/api/budgets/:id` - Mendapatkan anggaran berdasarkan ID
- **PUT** `/api/budgets/:id` - Update anggaran
- **DELETE** `/api/budgets/:id` - Hapus anggaran

### Pemasukan

- **GET** `/api/pemasukan` - Mendapatkan semua pemasukan
- **POST** `/api/pemasukan` - Membuat catatan pemasukan baru
- **GET** `/api/pemasukan/:id` - Mendapatkan pemasukan berdasarkan ID
- **PUT** `/api/pemasukan/:id` - Update pemasukan
- **DELETE** `/api/pemasukan/:id` - Hapus pemasukan

### Wishlist

- **GET** `/api/wishlist` - Mendapatkan semua wishlist
- **POST** `/api/wishlist` - Menambah item wishlist baru
- **GET** `/api/wishlist/:id` - Mendapatkan item wishlist berdasarkan ID
- **PUT** `/api/wishlist/:id` - Update item wishlist
- **DELETE** `/api/wishlist/:id` - Hapus item wishlist

## Deployment

### Persiapan Deployment

1. Update `.env`

### Konfigurasi Google OAuth untuk Production

- Tambahkan domain produksi ke Authorized JavaScript Origins dan Redirect URIs

### Deployment ke Heroku

1. Buat aplikasi Heroku
2. Tambahkan Config Vars di Heroku
3. Deploy ke Heroku

## Kontribusi

Kami menyambut kontribusi dari semua orang! Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b feature/amazing-feature`)
3. Commit perubahan Anda (`git commit -m 'Add some amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

Pastikan untuk mengikuti pedoman kontribusi dan kode etik proyek ini.

## Troubleshooting

### Masalah MongoDB Connection
- Periksa apakah string koneksi MongoDB Anda benar
- Pastikan IP Anda telah diizinkan di MongoDB Atlas Network Access

### OAuth Issues
- Periksa apakah redirect URI terdaftar dengan benar di Google Cloud Console
- Pastikan CLIENT_ID dan CLIENT_SECRET sudah benar

### Session Issues
- Jika mengalami peringatan MemoryStore, pastikan MongoStore dikonfigurasi dengan benar

## Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](LICENSE) - lihat file LICENSE untuk detail lebih lanjut.

## Kontak

Jika Anda memiliki pertanyaan atau masalah, silakan buka issue di GitHub atau hubungi maintainer proyek di faqih3935@gmail.com
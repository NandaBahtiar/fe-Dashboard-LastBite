Buatkan komponen React dengan Tailwind CSS untuk halaman manajemen pengguna dengan fitur-fitur berikut:

**Layout & Struktur:**

*   Container utama dengan background putih, padding, rounded corners, dan shadow.
*   Header section dengan search bar dan action buttons.
*   Tabel responsif untuk menampilkan data pengguna.
*   Pagination di bagian bawah.

**Header Section:**

*   Search input dengan icon search di sebelah kiri, placeholder "Cari pengguna...".
*   Dropdown filter peran dengan opsi: "Filter Peran", "Admin", "Users".
*   Button "Tambah Pengguna" dengan icon plus, warna biru (primary).

**Tabel Pengguna:**

*   Kolom: Nama Pengguna, Email, Peran, Tanggal Terdaftar, Status, Aksi.
*   Data sample:
    *   Ahmad (ahmad@example.com, Peran: Admin, 20 Juni 2025, Status: Aktif)
    *   Budi (budi@example.com, Peran: Users, 22 Juni 2025, Status: Tidak Aktif)

**Styling Details:**

*   Setiap row pengguna menampilkan avatar placeholder, nama, dan email.
*   Status badge dengan warna berbeda: hijau (Aktif), abu-abu (Tidak Aktif).
*   Action buttons dengan icon: view (eye), edit (pencil), delete (trash).
*   Hover effects pada rows dan buttons.

**Pagination:**

*   Informasi "Menampilkan 1 sampai 10 dari 50 Entri".
*   Button Previous/Next dengan styling biru.

**Responsivitas:**

*   Tabel horizontal scroll di mobile.
*   Search dan filter stack vertikal di mobile.
*   Semua elemen dapat digunakan dengan baik di berbagai ukuran layar.

Gunakan Tailwind CSS untuk semua styling, Font Awesome icons (atau Lucide React), dan buat komponen yang fully functional dengan state management untuk search, filter, dan interaksi lainnya.
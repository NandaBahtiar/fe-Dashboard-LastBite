Prompt:
Buatkan komponen React dengan Tailwind CSS untuk halaman manajemen mitra/partner dengan fitur-fitur berikut:
Layout & Struktur:

Container utama dengan background putih, padding, rounded corners, dan shadow
Header section dengan search bar dan action buttons
Tabel responsif untuk menampilkan data mitra
Pagination di bagian bawah

Header Section:

Search input dengan icon search di sebelah kiri, placeholder "Cari mitra..."
Dropdown filter status dengan opsi: "Filter Status", "Aktif", "Menunggu Verifikasi", "Ditangguhkan"
Button "Tambah Mitra" dengan icon plus, warna hijau (primary)
Layout responsif: column di mobile, row di desktop

Tabel Mitra:

Kolom: Nama Mitra, Lokasi, Rating, Tanggal Bergabung, Status, Aksi
Data sample:

Kopi Bahagia (Surabaya, Rating 4.8, 24 Juni 2025, Status: Aktif)
Roti Buana (Jakarta, Rating: -, 28 Juni 2025, Status: Menunggu Verifikasi)
Sate Ceria (Bandung, Rating 4.2, 15 Mei 2025, Status: Ditangguhkan)



Styling Details:

Setiap row mitra menampilkan logo placeholder, nama, dan email
Status badge dengan warna berbeda: hijau (Aktif), kuning (Menunggu Verifikasi), merah (Ditangguhkan)
Action buttons dengan icon: view (eye), edit (pencil), suspend/activate
Hover effects pada rows dan buttons
Rating dengan icon bintang kuning

Pagination:

Informasi "Menampilkan 1 sampai 10 dari 75 Entri"
Button Previous/Next dengan styling hijau

Responsivitas:

Tabel horizontal scroll di mobile
Search dan filter stack vertikal di mobile
Semua elemen dapat digunakan dengan baik di berbagai ukuran layar

Gunakan Tailwind CSS untuk semua styling, Font Awesome icons (atau Lucide React), dan buat komponen yang fully functional dengan state management untuk search, filter, dan interaksi lainnya.
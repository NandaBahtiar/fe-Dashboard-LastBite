Prompt:
Buatkan komponen React.js dengan Tailwind CSS untuk halaman detail mitra/partner dengan fitur-fitur berikut:
Layout:

Grid layout dengan 2 kolom: kolom kiri (1/3 lebar) untuk profil mitra, kolom kanan (2/3 lebar) untuk aktivitas
Responsive design yang stack menjadi 1 kolom di mobile

Kolom Kiri - Profil SellerDetail:

Card putih dengan shadow yang berisi:

Avatar/logo mitra (placeholder dengan inisial "RB")
Nama mitra: "Roti Buana"
Email: "info@rotibuana.id"
Status badge kuning "Menunggu Verifikasi" dan badge ungu "Toko Roti"
Informasi detail dengan ikon FontAwesome:

Alamat: "Jl. Merdeka No. 5, Jakarta"
Telepon: "0811-1234-5678"
Tanggal bergabung: "28 Juni 2025"
Dokumen verifikasi: 2 link PDF (Surat Izin Usaha.pdf, KTP Pemilik.pdf)


2 tombol aksi: "Tolak" (merah) dan "Verifikasi Toko" (hijau)



Kolom Kanan - Aktivitas SellerDetail:

3 card statistik dalam grid 3 kolom yang menampilkan:

Total Transaksi: 0 (dengan ikon receipt, warna primary)
Total Pendapatan: Rp 0 (dengan ikon money, warna secondary)
Rating Rata-rata: - (dengan ikon star, warna kuning)
Semua dalam state tidak aktif/opacity 50%


Card daftar menu dengan:

Header "Daftar Menu (Belum Aktif)" dan tombol "Tambah Menu" yang disabled
Empty state dengan ikon box dan teks "Belum ada menu yang ditambahkan oleh mitra ini"



Styling:

Gunakan Tailwind CSS utility classes
Warna primary dan secondary sebagai CSS custom properties
Card dengan background putih, rounded corners, dan shadow
Responsive typography dan spacing
Hover effects pada tombol dan link

Buat komponen dengan state management yang sesuai dan gunakan React hooks seperti useState jika diperlukan untuk interaktivitas.
# Admin Setting Page

This page allows administrators to manage application settings.

# Admin Users Page

This page displays a list of all administrative users and allows for their management.

# Create Admin Page

This page provides a form for creating new administrator accounts.

# Dashboard Page

This is the main dashboard providing an overview of key metrics and recent activities, including sales summaries and partner verification queues.

# Login Page

This page is used for user authentication to access the application.

# Maintenance Page

This page is displayed when the application is under maintenance.

# Seller Page

This page lists all sellers/partners registered in the system.

# Seller Detail Page

This page displays detailed information about a specific seller, including their profile, statistics, and menu items.

# User Detail Page

This page shows detailed information about a specific user.

# Users Page

This page displays a list of all general users of the application.

# Withdraw Page

This page allows for managing withdrawal requests.

# Withdraw Detail Page

This page provides detailed information about a specific withdrawal request.

# Detail Prompt

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

# JSON Data Example

```json
{
"statusCode": 200,
"message": "Berhasil mengambil data",
"data": [
{
"orderId": "3f862264-cac9-4e51-9521-defeddb8d180",
"customerId": "4e7905f5-858e-430a-aa7f-b1e68d68b959",
"sellerId": "1282fa78-6455-42f5-9843-ef2211a8a94b",
"status": "PENDING_PAYMENT",
"totalAmount": 25000,
"verificationCode": "955782",
"notes": null,
"createdAt": "2025-07-07T08:39:51.619135",
"updatedAt": "2025-07-07T08:39:51.619135",
"orderItems": [
{
"menuItemName": "Nasi Goreng",
"quantity": 1,
"pricePerItem": 25000
}
],
"payment": null
},
{
"orderId": "db100056-0973-412c-81bf-459f41fb9f8b",
"customerId": "4e7905f5-858e-430a-aa7f-b1e68d68b959",
"sellerId": "1282fa78-6455-42f5-9843-ef2211a8a94b",
"status": "PENDING_PAYMENT",
"totalAmount": 25000,
"verificationCode": "308532",
"notes": null,
"createdAt": "2025-07-06T16:28:05.939122",
"updatedAt": "2025-07-06T16:28:05.939122",
"orderItems": [
{
"menuItemName": "Nasi Goreng",
"quantity": 1,
"pricePerItem": 25000
}
],
"payment": null
},
{
"orderId": "e8c269bd-6a3d-4e73-a1db-1810104563ee",
"customerId": "4e7905f5-858e-430a-aa7f-b1e68d68b959",
"sellerId": "1282fa78-6455-42f5-9843-ef2211a8a94b",
"status": "READY_FOR_PICKUP",
"totalAmount": 25000,
"verificationCode": "231288",
"notes": null,
"createdAt": "2025-07-06T16:11:32.640728",
"updatedAt": "2025-07-06T16:12:13.989862",
"orderItems": [
{
"menuItemName": "Nasi Goreng",
"quantity": 1,
"pricePerItem": 25000
}
],
"payment": null
},
{
"orderId": "706690da-bab2-4dd8-a0af-07a985c2e207",
"customerId": "4e7905f5-858e-430a-aa7f-b1e68d68b959",
"sellerId": "1282fa78-6455-42f5-9843-ef2211a8a94b",
"status": "PREPARING",
"totalAmount": 25000,
"verificationCode": "539585",
"notes": null,
"createdAt": "2025-07-06T16:10:40.797623",
"updatedAt": "2025-07-06T16:11:10.307385",
"orderItems": [
{
"menuItemName": "Nasi Goreng",
"quantity": 1,
"pricePerItem": 25000
}
],
"payment": null
},
{
"orderId": "239e4ac1-c0cc-4017-b9e6-d92042192549",
"customerId": "4e7905f5-858e-430a-aa7f-b1e68d68b959",
"sellerId": "1282fa78-6455-42f5-9843-ef2211a8a94b",
"status": "PAID",
"totalAmount": 25000,
"verificationCode": "327293",
"notes": null,
"createdAt": "2025-07-06T16:10:04.931542",
"updatedAt": "2025-07-06T16:10:24.316935",
"orderItems": [
{
"menuItemName": "Nasi Goreng",
"quantity": 1,
"pricePerItem": 25000
}
],
"payment": null
}
],
"paging": {
"currentPage": 1,
"totalPage": 5,
"size": 5,
"totalElements": 21,
"hasNext": true,
"hasPrevious": false,
"nextPage": "?sortField=createdAt&sortDir=desc&size=5&page=1",
"previousPage": null
},
"timestamp": "2025-07-07T13:14:05.5864414"
}
```
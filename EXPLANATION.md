## Navigation Bar
Pada navigation bar, ditambahkan dua opsi yaitu 'Home' dan 'Tambah Data' untuk memudahkan user melakukan navigasi antara dua halaman utama dari aplikasi. 

Tampilan dari navigation bar akan berubah menjadi hamburger menu pada mobile agar lebih nyaman digunakan.

## Halaman Home
### Search bar
Pada fitur search, terdapat search bar utama yang dapat digunakan untuk mencari komoditas. Data akan terupdate secara live tanpa harus melakukan enter atau loading ulang halaman.

### Filter
Terdapat beberapa filter yang dapat dipilih antara lain komoditas, provinsi, kota, dan ukuran. Seperti pada fitur search, data akan terupdate secara live. Pencarian pada filter dan search bar dapat dikombinasikan. Pilihan dari filter seluruhnya diperoleh dari API yang disediakan.

### Tabel
Terdapat tabel yang akan menampilkan seluruh data yang diperoleh dari API endpoint 'list'. Untuk mempermudah user, dibentuk pagination sesuai dengan banyaknya data. Paginasi akan berubah menyesuakan data yang terfilter.

Header dari kolom pada tabel dapat diklik untuk mengaktivasi sort data. User dapat melakukan sort menaik dan menurun, baik secara alfabetik dan numerik. Sort ini diimplementasikan pada kolom agar user tidak perlu mengeklik terlalu banyak tombol dan pencarian data dapat dilakukan dengan lebih cepat.

### Pagination
Terdapat pagination yang dapat diklik untuk melihat data tabel keseluruhan. Pagination diimplementasikan agar user tidak terlalu banyak melakukan scroll dan data tersedia dengan lebih rapih.

## Halaman Tambah Data
Tampilan fitur menambahkan data dibentuk dengan form sederhana. Pada field kota, opsi hanya akan muncul setelah user memilih provinsi. Sehingga, user tidak bisa memilih pasangan kota dan provinsi yang tidak sesuai. Opsi kota akan berubah apabila user memilih provinsi lain. Pada field size, pilihan ukuran diperoleh dari API yang diberikan sehingga berupa select.

Apabila user melakukan submit data baru, akan muncul alert yang menandakan data berhasil tersimpan. Fitur ini sudah tersambung dengan API secara live sehingga data langsung terekam ke dalam API.

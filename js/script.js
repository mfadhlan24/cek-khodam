async function start() {
    const khodam = ['Gajah', 'Kuda', 'Kambing', 'Kucing', 'Harimau', 'Sapi'];

    const { value: name } = await Swal.fire({
        input: "text",
        inputLabel: "Nama",
        inputPlaceholder: "Masukkan nama Anda",
        showCancelButton: false, // Tidak perlu tombol cancel
        confirmButtonText: "Mulai",
        inputValidator: (value) => {
            if (!value) {
                return 'Nama wajib diisi!'
            }
        }
    });

    if (!name) return; // Keluar jika pengguna membatalkan atau tidak memasukkan nama

    Swal.fire({
        icon: 'success',
        title: `Selamat datang, ${name}!`,
        showConfirmButton: false,
        timer: 1500 // Menampilkan pesan selamat datang selama 1.5 detik
    });

    // Menyiapkan teks untuk ditampilkan
    const noteText = `Anda Bermain Dengan Nama ${name}. Berikut Khodam Anda:`;

    Swal.fire({
        title: noteText,
        text: 'Mengacak khodam...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: async () => {
            for (let i = 0; i < 20; i++) {
                await delay(500);
                const randomIndex = Math.floor(Math.random() * khodam.length);
                Swal.update({
                    text: `Mengacak Khodam ${khodam[randomIndex]}`
                });
            }
            const randomIndex = Math.floor(Math.random() * khodam.length);
            Swal.update({
                icon: 'success',
                text: `Khodam Anda: ${khodam[randomIndex]}`,
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    }).then((result) => {
        // Tampilkan SweetAlert konfirmasi untuk mengulangi
        Swal.fire({
            title: 'Selesai',
            text: 'Apakah Anda ingin mengulangi proses?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Ulangi',
            cancelButtonText: 'Tidak',
        }).then((result) => {
            if (result.isConfirmed) {
                start(); // Memulai kembali proses jika dikonfirmasi
            }
        });
    });

    // Sembunyikan tombol setelah selesai
    const button = document.querySelector('.btn-main');
    button.style.display = 'none';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

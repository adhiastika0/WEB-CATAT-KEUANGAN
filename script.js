document.addEventListener("DOMContentLoaded", function () {
    getTransaksi()
    const dropdowns = document.querySelectorAll('.main-dropdown');

    // Check if any dropdown elements exist
    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const options = dropdown.querySelector('.options');
        const caret = dropdown.querySelector('.caret');
        const selected = dropdown.querySelector('.selected');

        // Check if the select and options elements exist
        if (select && options) {
            // Add a click event listener to the select element
            select.addEventListener('click', function () {
                // Toggle the 'options-open' class to show/hide the options
                options.classList.toggle('options-open');
                caret.classList.toggle('caret-rotate');
            });

            // Add a click event listener to each option
            options.querySelectorAll('.options-content').forEach(pilihan => {
                pilihan.addEventListener('click', (event) => {
                    // Use event.target.innerText to get the text of the clicked option
                    selected.innerText = event.target.innerText;
                    // getTransaksi(selected.innerText)
                    options.classList.remove('options-open');
                    caret.classList.remove('caret-rotate');
                });
            });
        } else {
            console.error("Select or options element not found inside a dropdown.");
        }
    });

    const showFilter = document.querySelector('.filter-button')
    const filter = document.querySelector('.filter-transaksi')

    showFilter.addEventListener('click', () => {
        filter.classList.toggle('filter-open');

    })

});

function validateForm() {
    let catatJenisTransaksi = document.getElementById('selected-jenis-catat').innerText;
    let catatKategori = document.getElementById('selected-kategori-catat').innerText;
    let catatTanggal = document.getElementById('input-tanggal-catat').value;
    let catatNominal = document.querySelector('.inputan-nominal').value;
    let catatKeterangan = document.querySelector('.inputan-keterangan').value;


    if (catatJenisTransaksi == "Jenis Transaksi") {
        alert("Pilih jenis terlebih dahulu")
        return false;
    }

    if (catatKategori == "") {
        alert("Pilih Kategori terlebih dahulu")
        return false;

    }

    if (catatTanggal == "") {
        alert("Isi tanggal terlebih dahulu")
        return false;

    }

    if (catatNominal == "") {
        alert("Isi Nominal terlebih dahulu")
        return false;
    }

    if (catatKeterangan == "") {
        alert("Isi keterangan terlebih dahulu")
        return false;
    }

    console.log(catatJenisTransaksi)
    console.log(catatKategori)
    console.log(catatTanggal)
    console.log(catatNominal)
    console.log(catatKeterangan)

    return true;
}

function AddData() {
    if (validateForm() == true) {
        let catatJenisTransaksi = document.getElementById('selected-jenis-catat').innerText;
        let catatKategori = document.getElementById('selected-kategori-catat').innerText;
        let catatTanggal = document.getElementById('input-tanggal-catat').value;
        let catatNominal = document.querySelector('.inputan-nominal').value;
        let catatKeterangan = document.querySelector('.inputan-keterangan').value;

        let transaksiList;
        if (localStorage.getItem("transaksiList") == null) {
            transaksiList = [];
        } else {
            transaksiList = JSON.parse(localStorage.getItem("transaksiList"));
        }

        transaksiList.push({
            jenis: catatJenisTransaksi,
            tanggal: catatTanggal,
            nominal: catatNominal,
            kategori: catatKategori,
            keterangan: catatKeterangan
        });


        localStorage.setItem("transaksiList", JSON.stringify(transaksiList));
        getTransaksi()
    }

}

function getTransaksi(jenis = "") {
    let datas = JSON.parse(localStorage.getItem("transaksiList"))
    let listRiwayat = document.querySelector('.list-riwayat')

    listRiwayat.innerHTML = ""

    // if(datas != null){
    // let filterDatas = datas.filter(data => data.jenis.includes(jenis == "Semua"? "" : jenis))

    datas.forEach(data => {
        // Create the main container div
        let boxRiwayat = document.createElement('div');
        boxRiwayat.classList.add('box-riwayat');

        // Create the kategori-riwayat div
        let kategoriRiwayat = document.createElement('div');
        kategoriRiwayat.classList.add('kategori-riwayat');

        // Create the jenis-riwayat div
        let jenisRiwayat = document.createElement('div');
        jenisRiwayat.classList.add('jenis-riwayat');

        let imgJenis = document.createElement('img');
        if (data.jenis == 'Pemasukan') {
            imgJenis.src = 'assets/icons8-request-money-48.png';
            imgJenis.alt = '';
        } else {
            imgJenis.src = 'assets/icons8-initiate-money-transfer-48.png';
            imgJenis.alt = '';
        }

        jenisRiwayat.appendChild(imgJenis);

        let jenisText = document.createElement('div');
        jenisText.textContent = data.jenis;
        jenisRiwayat.appendChild(jenisText);

        kategoriRiwayat.appendChild(jenisRiwayat);

        let tanggalRiwayat = document.createElement('div');
        tanggalRiwayat.textContent = data.tanggal;
        kategoriRiwayat.appendChild(tanggalRiwayat);

        boxRiwayat.appendChild(kategoriRiwayat);

        // Create the informasi-riwayat div
        let informasiRiwayat = document.createElement('div');
        informasiRiwayat.classList.add('informasi-riwayat');

        let imgInformasi = document.createElement('img');
        if (data.kategori == 'Konsumsi') {
            imgInformasi.src = 'assets/icons8-rice-bowl-48.png';
            imgInformasi.alt = '';
        } else {
            imgInformasi.src = 'assets/icons8-bus-48.png';
            imgInformasi.alt = '';
        }
        informasiRiwayat.appendChild(imgInformasi);

        let informasiText = document.createElement('div');
        let informasiJudul = document.createElement('div');
        informasiJudul.textContent = data.keterangan;
        informasiText.appendChild(informasiJudul);

        let informasiNominal = document.createElement('div');
        informasiNominal.classList.add('informasi-nominal');
        informasiNominal.textContent = `Rp. ${data.nominal}`;
        informasiText.appendChild(informasiNominal);

        informasiRiwayat.appendChild(informasiText);

        boxRiwayat.appendChild(informasiRiwayat);

        // Append the created structure to the listRiwayat
        listRiwayat.appendChild(boxRiwayat);
    });
}
// }
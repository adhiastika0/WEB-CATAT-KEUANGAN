document.addEventListener("DOMContentLoaded", function () {
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
    var catatJenisTransaksi = document.getElementById('selected-jenis-catat').innerText;
    var catatKategori = document.getElementById('selected-kategori-catat').innerText;
    var catatTanggal = document.getElementById('input-tanggal-catat').value;
    var catatNominal = document.querySelector('.inputan-nominal').value;

    if (catatJenisTransaksi == "Jenis Transaksi") {
        alert("isi dlu mas")
    }

    if (catatKategori == "") {
        alert("Pilih Kategori terlebih dahulu")
    }

    if (catatTanggal == "") {
        alert("Isi tanggal terlebih dahulu")
    }

    if (catatNominal == "")
        alert("Isi Nominal terlebih dahulu")
}

function AddData() {
    validateForm();
}


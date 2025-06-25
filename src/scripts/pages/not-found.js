// src/scripts/pages/not-found.js

const NotFoundPage = {
  async render() {
    return `
      <section class="not-found">
        <h2>404 - Halaman Tidak Ditemukan</h2>
        <p>Maaf, alamat yang Anda tuju tidak tersedia.</p>
        <a href="#/home">Kembali ke Beranda</a>
      </section>
    `;
  },
  async afterRender() {
    // Optional: Tambah logic jika perlu
  },
};

export default NotFoundPage;

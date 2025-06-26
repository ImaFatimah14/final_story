const Sidebar = () => {
  return `
    <aside class="sidebar">
      <button class="sidebar-close" aria-label="Tutup sidebar">&times;</button>
      <ul class="sidebar-menu">
        <li><a href="#/home" class="sidebar-link">Beranda</a></li>
        <li><a href="#/tambah" class="sidebar-link">Tambah Cerita</a></li>
        <li><a href="#/saved" class="sidebar-link">Tersimpan</a></li>
        <li><a href="#/about" class="sidebar-link">Tentang</a></li>
        <li><a href="#" id="logout-link" class="sidebar-link">Logout</a></li>
        <li><button id="subscribe-button" class="sidebar-link subscribe-btn">Subscribe</button></li>
      </ul>
    </aside>
  `;
};

function attachSidebarEvents() {
  // Close sidebar
  const closeBtn = document.querySelector('.sidebar-close');
  const sidebar = document.querySelector('.sidebar');
  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

  // Logout event
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      // Panggil fungsi logout sesuai implementasi Auth
      if (window.Auth && typeof window.Auth.logout === 'function') {
        window.Auth.logout();
      }
    });
  }

  // Subscribe event
  const subscribeBtn = document.getElementById('subscribe-button');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      // Panggil fungsi subscribe notifikasi jika ada
      if (window.subscribeNotification) {
        window.subscribeNotification();
      }
    });
  }
}

export { Sidebar, attachSidebarEvents };

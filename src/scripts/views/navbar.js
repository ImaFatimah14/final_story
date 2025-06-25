import Auth from '../utils/auth';

const Navbar = () => {
  const isLoggedIn = Auth.isAuthenticated();
  return `
    <nav class="navbar">
      <div class="logo">
        <i class="fas fa-book-open"></i> StoryApp
      </div>
      <input type="checkbox" id="menu-toggle" class="menu-toggle" />
      <label for="menu-toggle" class="menu-icon" aria-label="Toggle navigation menu" title="Buka/Tutup menu navigasi" role="button">
        <i class="fas fa-bars"></i>
      </label>
      <ul class="nav-links">
        ${isLoggedIn ? `
          <li><a href="#/home"><i class="fas fa-home"></i> Beranda</a></li>
          <li><a href="#/tambah"><i class="fas fa-plus"></i> Tambah Cerita</a></li>
          <li><a href="#/saved"><i class="fas fa-bookmark"></i> Tersimpan</a></li>
          <li><a href="#/about"><i class="fas fa-info-circle"></i> Tentang</a></li>
          <li id="logout-li">
            <a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> Logout</a>
          </li>
          <li>
            <button id="subscribe-button" class="subscribe-btn" title="Langganan notifikasi">
              <i class="fas fa-bell"></i> Subscribe
            </button>
          </li>
        ` : `
          <li><a href="#/login"><i class="fas fa-sign-in-alt"></i> Login</a></li>
          <li><a href="#/register"><i class="fas fa-user-plus"></i> Register</a></li>
        `}
      </ul>
    </nav>
  `;
};

// Render ulang navbar saat hash berubah (untuk update menu setelah login/logout)
window.addEventListener('hashchange', () => {
  const navbarContainer = document.querySelector('#navbar');
  if (navbarContainer) {
    navbarContainer.innerHTML = Navbar();
    attachNavbarEvents();
  }
});

function attachNavbarEvents() {
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      Auth.logout();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const navbarContainer = document.querySelector('#navbar');
  if (navbarContainer) {
    navbarContainer.innerHTML = Navbar();
    attachNavbarEvents();
  }
});

export default Navbar;

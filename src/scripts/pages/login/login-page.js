import { login } from '../../data/api';
import Auth from '../../utils/auth';

const LoginPage = {
  async render() {
    return `
      <section class="login-container">
        <h2>Login</h2>
        <form id="loginForm" class="login-form">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="Masukkan alamat email" required />

          <label for="password">Password:</label>
          <div class="password-field">
            <input type="password" id="password" placeholder="Masukkan password" required />
            <button type="button" id="togglePassword" aria-label="Tampilkan Password">👁️</button>
          </div>

          <button type="submit" class="login-button"><i class="fa fa-sign-in-alt"></i> Login</button>
        </form>
        <p class="register-link">Belum punya akun? <a href="#/register">Daftar di sini</a></p>
        <div id="loginMessage" class="login-message"></div>
      </section>
    `;
  },

  async afterRender() {
    const form = document.getElementById('loginForm');
    const message = document.getElementById('loginMessage');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!email || !password) {
        message.textContent = 'Email dan password wajib diisi.';
        message.style.color = 'red';
        return;
      }

      const result = await login(email, password);
      console.log('Login result:', result);

      if (result.error || !result.loginResult) {
        message.textContent = result.message || 'Login gagal. Periksa kembali email dan password Anda.';
        message.style.color = 'red';
        return;
      }
      // Simpan token dan redirect ke home
      Auth.saveToken(result.loginResult.token);
      window.location.hash = '/home';
      setTimeout(() => {
        window.dispatchEvent(new HashChangeEvent('hashchange'));
      }, 10);
      // Trigger update sidebar/menu jika ada
      if (typeof updateSidebarMenu === 'function') updateSidebarMenu();
    });

    // Toggle show/hide password
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
      });
    }
  },
};

export default LoginPage;

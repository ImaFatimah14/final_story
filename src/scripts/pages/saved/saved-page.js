import { StoryIDB } from '../../data/database'; // tambahkan import
import createStoryItemTemplate from '../../views/templates/story-item';

const SavedStoriesPage = {
  async render() {
    return `
      <section class="saved-page">
        <h2 class="title">Cerita Tersimpan</h2>
        <div id="savedStoryList" class="story-grid"></div>
      </section>
    `;
  },

  async afterRender() {
    const container = document.getElementById('savedStoryList');
    const savedStories = await StoryIDB.getAll(); // ambil dari IndexedDB

    if (savedStories.length === 0) {
      container.innerHTML = `<p>Tidak ada cerita yang disimpan.</p>`;
      return;
    }

    savedStories.forEach((story) => {
      const storyItem = document.createElement('div');
      storyItem.classList.add('story-item');
      storyItem.innerHTML = `
        ${createStoryItemTemplate(story)}
        <button class="delete-btn" data-id="${story.id}">Hapus</button>
      `;
      container.appendChild(storyItem);
    });

    // Event handler untuk hapus cerita
    container.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        const konfirmasi = confirm('Apakah Anda yakin ingin menghapus cerita ini dari daftar tersimpan?');
        if (konfirmasi) {
          await StoryIDB.delete(id);
          location.reload(); // Refresh halaman agar daftar diperbarui
        }
      }
    });
  },
};

export default SavedStoriesPage;
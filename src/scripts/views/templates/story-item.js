const createStoryItemTemplate = (story) => `
  <article class="story-item">
    <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" loading="lazy" />
    <h3>${story.name}</h3>
    <p>${story.description}</p>
    <p><small>${new Date(story.createdAt).toLocaleString()}</small></p>
    ${story.lat && story.lon ? `<p class="story-location">Lokasi: (${story.lat.toFixed(3)}, ${story.lon.toFixed(3)})</p>` : ''}
  </article>
`;

export default createStoryItemTemplate;

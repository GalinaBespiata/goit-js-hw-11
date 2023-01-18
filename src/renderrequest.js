export function renderEl(arr) {
  console.log(arr);
  return arr
    .map(el => {
      return `<div class="photo-card"><a class="gallery-item" href="${el.largeImageURL}">
        <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes${el.likes}</b>
          </p>
          <p class="info-item">
            <b>Views${el.vievs}</b>
          </p>
          <p class="info-item">
            <b>Comments${el.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads${el.downloads}</b>
          </p>
        </div>
      </div>`;
    })
    .join('');
}

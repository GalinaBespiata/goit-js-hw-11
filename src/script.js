

import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { PixabeyApi } from './getRequest';
import { renderEl } from './renderrequest';


const formEl = document.querySelector('.search-form');
const galleryDiv = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
const pixabey = new PixabeyApi();
const simpleLightbox = new SimpleLightbox('.gallery-item', { captionDelay: 150, captionsData: 'alt' });
const endDiv = document.querySelector(".end-list");

btnLoadMore.classList.add('is-hidden');

formEl.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

const observer = new IntersectionObserver((entries)=>{
  const options={
    root: null,
      rootMargin: '200px',
      threshold: 1.0
  }
  console.log(entries)
  if(!entries[0].isIntersecting){
    return;
  }
})



function onFormSubmit(event) {
  event.preventDefault();

  galleryDiv.innerHTML = '';
  pixabey.keyWord = event.target.searchQuery.value.trim();
  pixabey.page = 1;
  console.log(pixabey.page);
  event.currentTarget.reset();
  pixabey.getrequest().then(({ hits, total, totalHits }) => {
    if (!hits.length) {
      btnLoadMore.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      
      galleryDiv.innerHTML = renderEl(hits);
      observer.observe(endDiv);
      simpleLightbox.refresh();
      // new SimpleLightbox('.gallery-item', { captionDelay: 250, captionsData: 'alt' });
      btnLoadMore.classList.remove('is-hidden');
    }
  });
}

function onBtnLoadMoreClick(event) {
  pixabey.page += 1;

  pixabey.getrequest().then(({ hits, total, totalHits }) => {
    galleryDiv.insertAdjacentHTML('beforeend', renderEl(hits));
    
    btnLoadMore.classList.remove('is-hidden');
    simpleLightbox.refresh()
    if (pixabey.page*40 >= totalHits) {
      btnLoadMore.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      btnLoadMore.classList.add('is-hidden');
    }
  });
}

// function renderEl(arr) {
//   console.log(arr);
//   markup = arr
//     .map(el => {
//       return `<div class="photo-card">
//         <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item">
//             <b>Likes${el.likes}</b>
//           </p>
//           <p class="info-item">
//             <b>Views${el.vievs}</b>
//           </p>
//           <p class="info-item">
//             <b>Comments${el.comments}</b>
//           </p>
//           <p class="info-item">
//             <b>Downloads${el.downloads}</b>
//           </p>
//         </div>
//       </div>`;
//     })
//     .join('');
// }

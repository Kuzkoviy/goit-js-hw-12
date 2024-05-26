
import { fetchPhotosByQuery, PER_PAGE } from "./js/pixabay-api";
import { createMarkupItem } from "./js/render-functions";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const searchFormSubmitBtnEl = document.querySelector('.s-submit-btn');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl= document.querySelector('.js-load-more-btn');

let query = '';
let photosCurrentPage = 1;
let totalPages = 0; 

const lightbox = new SimpleLightbox('ul.list a', {
  captionsData: 'alt', 
  captionDelay: 250 ,
  overlayOpacity: 0.8,
})

const onSearchFormSubmit = async event => {
    event.preventDefault();
    galleryEl.innerHTML = '';
    photosCurrentPage = 1;

    loadMoreBtnEl.classList.add('is-hidden'); 

    const form = event.currentTarget; 
    query = form.elements.searchKeyword.value.trim();
    
    if (query === '') {
      iziToast.error({
        message: 'Input field can not be empty',
        position: 'topRight',
        timeout: 2000,
        color: 'red',
      });
      form.reset();
      return;
    }

    try {
      searchFormSubmitBtnEl.classList.remove('is-disabled');
      loaderEl.classList.remove('is-hidden');

      const { hits, totalHits } = await fetchPhotosByQuery(query, photosCurrentPage)
      if (totalHits === 0) {
        searchFormSubmitBtnEl.classList.add('is-disabled')

        iziToast.error({
          message: 'Sorry, there are no images for this query',
          position: 'topRight',
          timeout: 2000,
          color: 'red',
        });
        form.reset();
        loaderEl.classList.add('is-hidden');
        return;
      }

      galleryEl.insertAdjacentHTML('beforeend', createMarkupItem(hits));
      lightbox.refresh();
      loaderEl.classList.add('is-hidden');
      searchFormSubmitBtnEl.classList.add('is-disabled');

      totalPages = Math.ceil(totalHits / PER_PAGE);
      if (totalPages > 1) {
        // Show load more btn
        loadMoreBtnEl.classList.remove('is-hidden');
      }

      if (totalPages < 15) {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results",
          position: 'topRight',
          timeout: 2000,
        });
      }
    } catch (error) {
      searchFormSubmitBtnEl.classList.add('is-disabled');
      loaderEl.classList.add('is-hidden');
      iziToast.error({
        message: 'Search params is not valid!',
        position: 'topRight',
      });
      form.reset();
      console.log("🚀 ~ onSearchFormSubmit ~ error:", error);
      return;
    };
  
    form.reset();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);

const smoothScrollOnLoadMore = () => {
  const lastPhoto = document.querySelector('.gallery__item:last-child');
  const photosHeight = lastPhoto.getBoundingClientRect().height;
  const twoPhotosHeight = photosHeight * 2;
  window.scrollBy({
    top: twoPhotosHeight,
    left: 0,
    behavior: 'smooth',
  });
};

const onLoadMorePress = async event => {
  try {
    loadMoreBtnEl.classList.add('is-hidden');
    loaderEl.classList.remove('is-hidden');

    photosCurrentPage += 1;

    const { hits, totalHits } = await fetchPhotosByQuery(query, photosCurrentPage);

    galleryEl.insertAdjacentHTML('beforeend', createMarkupItem(hits));
    lightbox.refresh();
    smoothScrollOnLoadMore();

    loaderEl.classList.add('is-hidden');

    totalPages = Math.ceil(totalHits / PER_PAGE);
    if (photosCurrentPage < totalPages) {
      loadMoreBtnEl.classList.remove('is-hidden');
    } else {
      loadMoreBtnEl.removeEventListener('click', onLoadMorePress);
      // iziToast.info({
      //   message: "We're sorry, but you've reached the end of search results.",
      //   position: 'topRight',
      // });
      return;
    }
  } catch (error) {
    searchFormSubmitBtnEl.classList.remove('is-disabled');
    loaderEl.classList.add('is-hidden');
    iziToast.error({
      message: 'Search params is not valid!',
      position: 'topRight',
    });
    return;
  }
}

loadMoreBtnEl.addEventListener('click', onLoadMorePress);

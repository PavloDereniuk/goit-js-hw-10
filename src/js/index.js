import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Report, Loading } from 'notiflix';
import SlimSelect from 'slim-select'
import "slim-select/dist/slimselect.css";

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

function showLoading() {
  Loading.standard('Loading data, please wait...');
}

function hideLoading() {
  Loading.remove();
}

function showError() {
  catInfo.innerHTML = '';
  Report.failure('Oops!', 'Something went wrong! Try reloading the page!');
}


fetchBreeds()
  .then(data => {
    const option = data.map(
      ({ id, name }) => `<option value="${id}">${name}</option>`
    );
    breedSelect.innerHTML = option;
    breedSelect.classList.remove('non-active');
    
    new SlimSelect({
        select: '.breed-select',
      })
  })
  .catch(() => {
    showError();
  });


breedSelect.addEventListener('change', e => {
  e.preventDefault();
  showLoading();

  const breedSelectId = breedSelect.value;
  fetchCatByBreed(breedSelectId)
    .then(cat => {
      const info = `
        <div class='thumb-pic'><img src="${cat.url}" alt="${cat.id}" width=400></div>
        <div class='thumb'>
          <h2>${cat.breeds[0].name}</h2>
          <p class='description'>${cat.breeds[0].description}</p>
          <p><span class='temperament'>Temperament:</span> ${cat.breeds[0].temperament}</p>
        </div>`;
      catInfo.innerHTML = info;
      catInfo.classList.remove('non-active');
      hideLoading();
    })
    .catch(() => {
      hideLoading();
      showError();
    });
});

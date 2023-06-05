import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';


const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

function toggleVisibility(element) {
  element.classList.toggle('invisible');
}

function handleFetchError(error) {
  Notiflix.Notify.failure(
    `Oops! Something went wrong! Try reloading the page!`
  );
}

fetchBreeds()
  .then(breeds => {
    toggleVisibility(loader);
    toggleVisibility(catInfo);
    populateBreedSelect(breeds);
  })
  .catch(handleFetchError)
  .finally(() => {
    setTimeout(() => {
      toggleVisibility(loader);
      toggleVisibility(catInfo);
    }, 800);
  });

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  toggleVisibility(loader);
  toggleVisibility(catInfo);

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      renderCatInfo(cat);
    })
    .catch(handleFetchError)
    .finally(() => {
      setTimeout(() => {
        toggleVisibility(loader);
        toggleVisibility(catInfo);
      }, 800);
    });
}

function renderCatInfo(cat) {
  catInfo.innerHTML = `
    <img width="400" src="${cat.image}" alt="${cat.name}">
    <h2>${cat.name}</h2>
    <p>${cat.description}</p>
    <p><b>Temperament: </b>${cat.temperament}</p>
  `;
}

breedSelect.addEventListener('change', handleBreedSelectChange);




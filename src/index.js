import debounce from 'lodash.debounce';
import { fetchBreeds, fetchCatByBreed } from './fetchCats';
import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';

const elements = {
  select: document.querySelector('.breed-select'),
  info: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  // error: document.querySelector('.error'),
};

elements.select.classList.add('is-hidden');
elements.info.classList.add('is-hidden');
// elements.error.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    setTimeout(() => {
      data.forEach(({ id, name }) => {
        elements.select.insertAdjacentHTML(
          'beforeend',
          `
          <option value="${id}">${name}</option>`
        );
      });
      new SlimSelect({
        select: elements.select,
      });
      elements.select.classList.remove('is-hidden');
      elements.loader.classList.add('is-hidden');
    }, 1000);
  })
  .catch(err => {
    Report.failure('Oops! ', `Something went wrong! Try reloading the page!`);

    // elements.error.classList.remove('is-hidden');
    elements.select.classList.add('is-hidden');
    elements.info.classList.add('is-hidden');
    elements.loader.classList.add('is-hidden');
  });

elements.select.addEventListener('change', debounce(handlerClick, 300));

function handlerClick(e) {
  elements.info.innerHTML = '';
  fetchCatByBreed(e.target.value)
    .then(data => {
      elements.loader.classList.remove('is-hidden');
      elements.info.classList.add('is-hidden');

      setTimeout(() => {
        const [
          {
            breeds: [
              {
                name = 'Default cat',
                temperament = 'Default temperament',
                description = 'Default description',
              },
            ] = [],
            url = 'https://cdn2.thecatapi.com/images/OOD3VXAQn.jpg',
          },
        ] = data;
        elements.info.innerHTML = `
        
        <div class='about-cat'> 
        <img class="img-container" src="${url}" alt="${name}" width="300">
        <h1>${name}</h1>
             <p>${description}</p>
             <p><b>Temperament:</b> ${temperament}</p>
          </img>
        </div>`;
        elements.info.classList.remove('is-hidden');
        elements.loader.classList.add('is-hidden');
      }, 1000);
    })
    .catch(err => {
      Report.failure('Oops! ', `Something went wrong! Try reloading the page!`);
      // elements.error.classList.remove('is-hidden');
      elements.info.classList.add('is-hidden');
      elements.loader.classList.add('is-hidden');
    });
}
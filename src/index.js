import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from"../src/js/fetchCountries" 
const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector("#search-box")
// console.log(inputRef)
const listRef = document.querySelector(".country-list")
// console.log(listRef)
const infoRef = document.querySelector(".country-info")
// console.log(infoRef)

function searchCountry(e) {
     e.preventDefault();
    const value = e.target.value.trim();
     if (!value) {
    clearPage();
    return;
  }
    fetchCountries(value)
        .then(response  => {
      const amountOfCountries = response.length;
      clearPage();
      if (amountOfCountries === 1) {
        createMarkup(response );
        return;
      }
      if (amountOfCountries <= 10) {
        createMarkupList(response );
      } else {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
      return;
      }
    })
    .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function clearPage() {
  infoRef.innerHTML = '';
  listRef.innerHTML = '';
}


function createMarkup(country) {
    const markup = country
    .map(({name,capital,population,flags, languages }) => {
     return `  <div class="countries">
   <img class="country-pic" src ="${flags.svg}" alt="${name.official} flag" width ="50px">
   <h2> ${name.official}</h2>
   <ul class ="country-list">
<li class="country-list__item">
 <span> Capital: ${capital} </span>
 </li>
  <li class="country-list__item">
 <span> Population:  ${population}</span>
 </li>
  <li class="country-list__item">
 <span> Languages:</span>${Object.values(languages).join(', ')}
 </li>
 </ul>
 </div>
  `;
    })
        .join('');
     infoRef.insertAdjacentHTML('afterbegin', markup);
}

function createMarkupList(country) {
  const markup = country
    .map(({ name, flags }) => {
      return `<li class="item">
                    <img src="${flags.svg}" alt="${name.common}" width ="50px>
                <h2 class="item-name">${name.official}</h2>
               </li>`;
    })
    .join('');
  listRef.insertAdjacentHTML('afterbegin', markup);
}

inputRef.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
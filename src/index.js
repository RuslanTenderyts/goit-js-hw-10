import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchCountries} from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const refs= {
    input : document.querySelector('input#search-box'),
    countries : document.querySelector('.country-list'),
    countryInfo : document.querySelector('.country-info')
}

refs.countries.style.listStyle = 'none';
refs.countries.style.list

refs.input.addEventListener('input', debounce(onSeacrh, DEBOUNCE_DELAY));

function onSeacrh(evt) {
    clearCountries()
    const value = evt.target.value.trim();
    // const value = refs.input.value.trim();  

    if (!value) {
        return;
    }
    
    fetchCountries(value)
    .then(countries => markapOfCountry(countries))
    .catch(err => Notify.failure('Oops, there is no country with that name'));
   
}

function clearCountries() {
    refs.countryInfo.innerHTML = ''
    refs.countries.innerHTML = ''
}

function createMarkapOfCountry(country) {
    const markup = country.map(({
        name,
        flag,
        capital,
        population,
        languages}) => `<div>
        
        <h1> <img src="${flag}" alt="flag.svc" width='40'> ${name}</h1>
        <p><b>Capital:</b> ${capital}</p>
        <p><b>Population:</b> ${population}</p>
        <p><b>Languages:</b> ${languages.map(languag => languag.name)}</p>
        </div>`)

    return markup;
}
function createMarkapOfCountries(countries) {
    const markup = countries.map(({name, flag}) => `<li><img src="${flag}" alt="flag.svc" width='30'> ${name}</li>`).join('');

    return markup
}

function markapOfCountry(countries) {
    if(countries.length == 1) {
            refs.countryInfo.innerHTML = createMarkapOfCountry(countries);
            // console.log('information of country прапор, назва, столиця, населення і мови.')
        }else if(countries.length > 1 && countries.length < 10) {
            refs.countries.innerHTML = createMarkapOfCountries(countries);
            // console.log('coutrys list')
        }else {       
            Notify.info('Too many matches found. Please enter a more specific name.')}
};

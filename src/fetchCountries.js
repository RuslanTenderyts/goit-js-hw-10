export function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v2/name/'
      
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flag,languages`)
    .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
}
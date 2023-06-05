const BASE_URL = 'https://api.thecatapi.com';
const API_KEY =
  'live_7m9gFmHIGmiWz2HhJxojAMafNqNFBsc3r4fGfCGHFjFbPowkGZVtiLS93Kuyekrr';

export const fetchBreeds = () => {
  return fetch(`${BASE_URL}/v1/breeds`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data);
};

export const fetchCatByBreed = breedId => {
  return fetch(`${BASE_URL}/v1/images/search?limit=1&breed_id=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const cat = data[0];
      return {
        name: cat.breeds[0].name,
        description: cat.breeds[0].description,
        temperament: cat.breeds[0].temperament,
        image: cat.url,
      };
    });
};

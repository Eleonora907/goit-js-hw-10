// const BASE_URL = 'https://api.thecatapi.com';
// const API_KEY = 'live_7m9gFmHIGmiWz2HhJxojAMafNqNFBsc3r4fGfCGHFjFbPowkGZVtiLS93Kuyekrr';

// export const fetchBreeds= () => {
//     return fetch(`${BASE_URL}/v1/breeds`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       });
//   }

//   export const fetchCatByBreed = breedId => {
//     const searchParams = new URLSearchParams({
//         limit: 1,
//         breed_id: breedId,
//         api_key: API_KEY,
//       });

//       return fetch = (`${BASE_URL}/v1/images/search?${searchParams}`).then((response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       })
//   }


  // cat-api.js

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_7m9gFmHIGmiWz2HhJxojAMafNqNFBsc3r4fGfCGHFjFbPowkGZVtiLS93Kuyekrr';

export const fetchBreeds = () => {
  return fetch(`${BASE_URL}/breeds`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => data);
};

export const fetchCatByBreed = (breedId) => {
  return fetch(`${BASE_URL}/images/search?limit=1&breed_id=${breedId}`, {
    headers: {
      'x-api-key': API_KEY,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        const cat = data[0];
        return {
          name: cat.breeds[0].name,
          description: cat.breeds[0].description,
          temperament: cat.breeds[0].temperament,
          image: cat.url,
        };
      }
      throw new Error('Cat not found');
    });
};
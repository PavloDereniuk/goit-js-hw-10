import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Dq44YXXBnPhjGJSYGzdEvz1lu0LsZVcgpHtUwh0Yvi0uDrpSRyf5nA810k9996tR';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1/';

export function fetchBreeds() {
  return axios
    .get(`breeds/`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .catch(() => {
      throw new Error('Oops! Something went wrong while fetching breeds.');
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data[0];
    })

    .catch(() => {
      throw new Error('Oops! Something went wrong while fetching breeds.');
    });
}

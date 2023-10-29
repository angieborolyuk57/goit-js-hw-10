const BASE_URL = 'https://api.thecatapi.com/v1';
function fetchBreeds() {
  const END_POINT = '/breeds';
  const API_KEY =
    'live_JaGwEH6MjDQQotHROv3JeSJQWvKIVcj00lv8loXjOFIWkAySD9X5ySt69HlOu8M4';
  const params = new URLSearchParams({
    api_key: API_KEY,
  });

  return fetch(`${BASE_URL}${END_POINT}?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText || 'Error');
    }
    return resp.json();
  });
}

function fetchCatByBreed(id) {
  const END_POINT = '/images/search';
  const API_KEY =
  "live_NOjXjjUCdSqZDcL5KzXJVXAGhv0r0dhC5vthm96sfGIGfmq4humw0TCeynPcFmag";
  const params = new URLSearchParams({
    api_key: API_KEY,
    breed_ids: id,
  });

  return fetch(`${BASE_URL}${END_POINT}?${params}`).then(resp => {
    if (!resp.ok) {
      elements.select.classList.add('is-hidden');
      throw new Error(resp.statusText || 'Error');
    }
    return resp.json();
  });
}

export { fetchBreeds, fetchCatByBreed };
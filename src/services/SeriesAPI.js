const apiKey = 'api_key=11f7f74a9c3f21eccd198b02d389c5e6';
const baseUrl = 'https://api.themoviedb.org/3';
const url = `${baseUrl}/discover/tv?sort_by=popularity.desc&${apiKey}`;
// eslint-disable-next-line max-len

export const fetchSeries = async () => {
  const response = await fetch(url).then((result) => result.json());
  return response.results;
};

export const fetchSearchSeries = async (input) => {
  const searchUrl = `${baseUrl}/search/tv?${apiKey}&query=${input}`;
  const response = await fetch(searchUrl).then((result) => result.json());
  return response.results;
};

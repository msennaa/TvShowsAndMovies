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

export const fetchTvShowByGenre = async (id) => {
  const listUrl = `${url}&with_genres=${id}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response.results;
};

export const fetchTvShowReview = async (id) => {
  const listUrl = `${baseUrl}/tv/${id}/reviews?${apiKey}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response.results;
};

export const genreTvShowList = async () => {
  const listUrl = `${baseUrl}/genre/tv/list?${apiKey}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response.genres;
};

export const fetchTvShowDetails = async (id) => {
  const listUrl = `${baseUrl}/tv/${id}?${apiKey}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response;
};

export const fetchTvVideo = async (id) => {
  const listUrl = `${baseUrl}/tv/${id}/videos?${apiKey}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response.results;
};

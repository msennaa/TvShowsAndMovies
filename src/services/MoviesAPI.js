const apiKey = 'api_key=11f7f74a9c3f21eccd198b02d389c5e6';
const baseUrl = 'https://api.themoviedb.org/3';
const url = `${baseUrl}/discover/movie?sort_by=popularity.desc&${apiKey}`;
// eslint-disable-next-line max-len

export const fetchMovie = async () => {
  const response = await fetch(url).then((result) => result.json());
  return response.results;
};

export const fetchSearchMovie = async (input) => {
  const searchUrl = `${baseUrl}/search/movie?${apiKey}&query=${input}`;
  const response = await fetch(searchUrl).then((result) => result.json());
  return response.results;
};

export const genreList = async () => {
  const listUrl = `${baseUrl}/genre/movie/list?${apiKey}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response.genres;
};

export const fetchMovieByGenre = async (id) => {
  const listUrl = `${url}&with_genres=${id}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response.results;
};

export const fetchMovieReview = async (id) => {
  const listUrl = `${baseUrl}/movie/${id}/reviews?${apiKey}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response.results;
};

export const fetchMovieDetails = async (id) => {
  const listUrl = `${baseUrl}/movie/${id}?${apiKey}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response;
};

export const fetchMovieVideo = async (id) => {
  const listUrl = `${baseUrl}/movie/${id}/videos?${apiKey}`;
  const response = await fetch(listUrl).then((result) => result.json());
  return response.results;
};

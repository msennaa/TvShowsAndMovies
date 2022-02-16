const apiKey = 'api_key=11f7f74a9c3f21eccd198b02d389c5e6';
const baseUrl = 'https://api.themoviedb.org/3';
const url = `${baseUrl}/discover/tv?sort_by=popularity.desc&${apiKey}`;

const fetchMovie = async () => {
  const response = await fetch(url).then((result) => result.json());
  console.log(response);
  return response;
};

export default fetchMovie;

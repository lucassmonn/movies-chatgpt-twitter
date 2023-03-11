import axios from 'axios';
import { getRandomNumber } from './utils.js';

export const getMovie = async () => {
    try {
        const movieId = getRandomNumber();
        const response = await axios.get(`
    https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.THE_MOVIE_API_KEY}&language=pt-BR
    `);
        return response.data;
    } catch (e) {
        return e
    }
}

export const getMovieData = async () => {
    let movie

    while (!movie) {
        try {
            const movieData = await getMovie();
            if (movieData.title && movieData.overview && movieData.poster_path) {
                movie = movieData;
            }
        } catch (e) {
            return e
        }
    }

    return {
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        original_title: movie.original_title,
        genres: movie.genres.map((genre) => genre.name),
    }
}

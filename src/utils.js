import axios from 'axios';
import * as fs from 'fs';

export const getRandomNumber = () => {
    return Math.floor(Math.random() * process.env.LAST_MOVIE_ID) + 1;;
}

export const getBase64 = async (url) => {
    return await axios
        .get(url, {
            responseType: 'arraybuffer'
        })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

export const createMedia = async (url) => {
    const base64 = await getBase64(url);
    const buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync("image.jpg", buffer);
}

const dateToBr = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}

export const makeReply = (movie) => {
    let string = `📽️ Título: ${movie.title}\n\n🎞 Título original: ${movie.original_title}\n\n`

    if (movie.release_date) {
        string += `📅 Data de lançamento: ${dateToBr(movie.release_date)}\n\n`
    }

    if (movie.genres.length > 0) {
        string += `🎬 Gênero${movie.genres.length > 1 ? 's' : ''}: ${movie.genres.join(', ')}\n\n`
    }

    if (movie.vote_average > 0) {
        string += `⭐ Nota média: ${movie.vote_average}\n\n`
    }

    return string
}
import dotenv from "dotenv";
import { getSummary } from './openai.js';
import { getMovieData } from './themoviesdb.js';
import { postTweet, replyTweet } from './twitter.js';
import { createMedia, makeReply } from './utils.js';

dotenv.config();

(async () => {
    try {
        console.log('Starting...')
        const movie = await getMovieData();
        await createMedia(`${process.env.THE_MOVIE_CDN}/${movie.poster_path}`)
        const summary = await getSummary(movie.overview);
        const tweet = await postTweet(summary);
        await replyTweet(makeReply(movie), tweet.data.id)
        console.log('Done!')
    } catch (e) {
        console.log(e)
    }
})();
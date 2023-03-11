import dotenv from "dotenv";
import * as cron from 'node-cron';
import { getSummary } from './openai.js';
import { getMovieData } from './themoviesdb.js';
import { postTweet, replyTweet } from './twitter.js';
import { createMedia, makeReply } from './utils.js';

dotenv.config();

console.log('Starting...')
cron.schedule(process.env.CRON, (async () => {
    try {
        const movie = await getMovieData();
        await createMedia(`${process.env.THE_MOVIE_CDN}/${movie.poster_path}`)
        const summary = await getSummary(movie.overview);
        const tweet = await postTweet(summary);
        await replyTweet(makeReply(movie), tweet.data.id)
        console.log(`Tweeted successfully - ${movie.title}`)
    } catch (e) {
        console.log(e)
    }
}))
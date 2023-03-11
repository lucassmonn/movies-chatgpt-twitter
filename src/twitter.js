import dotenv from "dotenv";
import { TwitterApi } from 'twitter-api-v2';
dotenv.config();

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const postTweet = async (tweet) => {
    try {
        return await twitterClient.v2.tweet(tweet, {
            media: {
                media_ids: [await uploadMedia('./image.jpg')],
            }
        })
    } catch (e) {
        return e
    }
}

export const replyTweet = async (tweet, id) => {
    try {
        await twitterClient.v2.tweet(tweet, {
            reply: {
                in_reply_to_tweet_id: id
            }
        })
    } catch (e) {
        return e
    }
}

export const uploadMedia = async (media) => {
    try {
        const response = await twitterClient.v1.uploadMedia(media)
        return response
    } catch (e) {
        return e
    }
}
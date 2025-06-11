// cache.js
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisClient = new Redis(process.env.REDIS_URL); // e.g., redis://localhost:6379

redisClient.on('connect', () => {
    console.log('✅ ioredis connected');
});

redisClient.on('error', (err) => {
    console.error('❌ ioredis error:', err);
});

export const getOrSetCache = async (key, fetchFunction, expiry = 10) => {
    try {
        const cachedData = await redisClient.get(key);

        if (cachedData) {
            console.log('✅ Returning cached data');
            return JSON.parse(cachedData);
        }

        const freshData = await fetchFunction();

        await redisClient.set(key, JSON.stringify(freshData), 'EX', expiry);

        console.log('✅ Caching new data');
        return freshData;
    } catch (err) {
        console.error('Cache error:', err);
        return fetchFunction(); // fallback to DB
    }
};

export default redisClient;



// // cache.js
// import { createClient } from 'redis';
// import dotenv from 'dotenv';

// dotenv.config();

// const redisClient = createClient({
//     url: process.env.REDIS_URL
// });

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

// // Connect only once
// (async () => {
//     try {
//         if (!redisClient.isOpen) {
//             await redisClient.connect();
//             console.log('Redis connected');
//         }
//     } catch (error) {
//         console.error('Redis connection error:', error);
//     }
// })();

// export const getOrSetCache = async (key, fetchFunction, expiry = 10) => {
//     try {
//         const cachedData = await redisClient.get(key);
//         if (cachedData) {
//             console.log('✅ Returning cached data');
//             return JSON.parse(cachedData);
//         }

//         const freshData = await fetchFunction();

//         await redisClient.set(key, JSON.stringify(freshData), {
//             EX: expiry,
//         });

//         console.log('✅ Caching new data');
//         return freshData;
//     } catch (err) {
//         console.error('Cache error:', err);
//         return fetchFunction(); // fallback to DB if Redis fails
//     }
// };

// export default redisClient;

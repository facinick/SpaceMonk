import Queue from 'bull';
import { randomImageResolver } from 'src/services/unsplashes/unsplashes';

const redisOptions = {
  redis: {
    host: process.env.UPSTASH_REDIS_REST_URL,
    password: process.env.UPSTASH_REDIS_REST_TOKEN
  }
};

const randomImageQueue = new Queue('randomImageQueue', redisOptions);

randomImageQueue.process(async (job, done) => {
  const result = await randomImageResolver(job.data); // Call the randomImage resolver
  done(null,result);
});

export default randomImageQueue;
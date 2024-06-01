import Queue from 'bull';
import { randomImageResolver } from 'src/services/unsplashes/unsplashes';

const REDIS_URL = process.env.REDIS_URL
const randomImageQueue = new Queue('randomImageQueue', REDIS_URL);

randomImageQueue.process(async (job, done) => {
  const result = await randomImageResolver(job.data); // Call the randomImage resolver
  done(null,result);
});

export default randomImageQueue;
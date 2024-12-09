const redis = require('redis');

class RedisClient {
  constructor() {
    /* creates a new redis client */
    this.client = redis.createClient();
    /* Set up an error handler for the Redis client */
    this.client.on('error', (err) => {
      console.error('Redis connection error: ', err);
    });
  }

  /* check if redis connection is alive(connected and without error */
  isAlive() {
    return this.client.status === 'ready';
  }

  

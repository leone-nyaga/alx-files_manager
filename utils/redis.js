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

  /* check if redis connection is alive (connected and without error) */
  isAlive() {
    return this.client.status === 'ready';
  }

  /* asynchronous function get that takes a string key as argument and returns the Redis value stored for this key */
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  /* asynchronous function set that takes a string key, 
   * a value, and a duration in seconds as arguments to store it in Redis 
   * (with an expiration set by the duration argument)
   */
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result); // Resolving with result (e.g., 'OK')
        }
      });
    });
  }

  /* asynchronous function del that takes a string key as argument and removes the value in Redis for this key */
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result); // Resolving with the result (number of keys deleted)
        }
      });
    });
  }
}

// Create and export the RedisClient instance
const redisClient = new RedisClient();
module.exports = redisClient;


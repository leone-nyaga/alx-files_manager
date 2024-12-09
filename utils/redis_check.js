// test to see if the redis will connect

const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Handle errors
client.on('error', (err) => {
  console.error('Redis connection error:', err);
  process.exit(1); // Exit if Redis fails to connect
});

// Check if Redis is connected
client.on('connect', () => {
  console.log('Connected to Redis!');
});

// Test Redis operations: set, get, and del
async function testRedis() {
  try {
    // Set a key with an expiration of 10 seconds
    client.set('testKey', 'Hello Redis!', 'EX', 10, (err, reply) => {
      if (err) {
        console.error('Error setting key:', err);
        return;
      }
      console.log('Set key result:', reply);  // Expected output: "OK"

      // Get the key
      client.get('testKey', (err, value) => {
        if (err) {
          console.error('Error getting key:', err);
          return;
        }
        console.log('Got key value:', value);  // Expected output: "Hello Redis!"

        // Delete the key
        client.del('testKey', (err, reply) => {
          if (err) {
            console.error('Error deleting key:', err);
            return;
          }
          console.log('Deleted key result:', reply);  // Expected output: 1 (deleted)

          // Close the connection
          client.quit();
        });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    client.quit();
  }
}

// Run the test
testRedis();


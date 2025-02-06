require('dotenv').config();
const axios = require('axios');
const mqtt = require('mqtt');

// Configuration constants
const HTTP_URL = `${process.env.API_URL}/api/data`;
const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL;
const USER_ID = 'demoUser';
const DEVICE_ID = 'demoDevice';
const SENSOR_TYPES = ['temperature', 'humidity', 'pressure'];

// Generate random sensor data
function generateRandomData() {
  const sensorType = SENSOR_TYPES[Math.floor(Math.random() * SENSOR_TYPES.length)];
  const value = (Math.random() * 100).toFixed(2);
  return { 
    userId: USER_ID, 
    deviceId: DEVICE_ID, 
    sensorType, 
    value 
  };
}

// Send data via HTTP POST
async function sendHttpData() {
  const data = generateRandomData();
  try {
    const response = await axios.post(HTTP_URL, data);
    console.log('HTTP Data sent:', data, 'Response:', response.status);
  } catch (error) {
    console.error('Error sending HTTP data:', error.message);
    // Add more detailed error logging
    if (error.response) {
      console.error('Response error:', error.response.data);
    } else if (error.request) {
      console.error('Request error:', error.request);
    }
  }
}

// Send data via MQTT
function sendMqttData(client) {
  const data = generateRandomData();
  const topic = `users/${data.userId}/devices/${data.deviceId}/sensor/${data.sensorType}`;
  
  client.publish(topic, JSON.stringify(data), { qos: 1 }, (error) => {
    if (error) {
      console.error('Error sending MQTT data:', error.message);
    } else {
      console.log('MQTT Data sent:', data);
    }
  });
}

// Main function to run periodic data sending
function main() {
  console.log('Starting IoT data simulation...');
  console.log('HTTP URL:', HTTP_URL);
  console.log('MQTT Broker:', MQTT_BROKER_URL);

  // Start HTTP data sending
  const httpInterval = setInterval(sendHttpData, 5000);

  // Setup MQTT connection
  const client = mqtt.connect(MQTT_BROKER_URL, {
    reconnectPeriod: 1000,
    connectTimeout: 30000
  });

  // MQTT event handlers
  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    const mqttInterval = setInterval(() => sendMqttData(client), 5000);

    // Handle process termination
    process.on('SIGINT', () => {
      clearInterval(httpInterval);
      clearInterval(mqttInterval);
      client.end();
      process.exit();
    });
  });

  client.on('error', (error) => {
    console.error('MQTT connection error:', error.message);
  });

  client.on('close', () => {
    console.log('MQTT connection closed');
  });
}

// Start the simulation
main();
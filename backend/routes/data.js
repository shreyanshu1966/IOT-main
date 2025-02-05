const express = require('express');
const { InfluxDB, Point, flux } = require('@influxdata/influxdb-client');
const mqtt = require('mqtt');
const router = express.Router();

const influxDB = new InfluxDB({ 
  url: process.env.INFLUXDB_URL, 
  token: process.env.INFLUXDB_TOKEN 
});

// Use the correct organization and bucket names
const queryApi = influxDB.getQueryApi(process.env.INFLUXDB_ORG);
const writeApi = influxDB.getWriteApi(process.env.INFLUXDB_ORG, process.env.INFLUXDB_BUCKET);

// Update the query to match your InfluxDB setup
router.get('/data', async (req, res) => {
  const query = `
    from(bucket: "${process.env.INFLUXDB_BUCKET}")
      |> range(start: -1h)
      |> filter(fn: (r) => r._measurement == "iot_data")
      |> filter(fn: (r) => r._field == "value")
      |> sort(columns: ["_time"], desc: true)
      |> limit(n: 10)
  `;

  try {
    const data = [];
    await queryApi.collectRows(query, (row) => {
      data.push(row);
    });
    res.json(data);
  } catch (error) {
    console.error('Error querying InfluxDB', error);
    res.status(500).send('Error querying InfluxDB');
  }
});

// Add this POST endpoint to handle incoming data
router.post('/data', (req, res) => {
  const { userId, deviceId, sensorType, value } = req.body;
  console.log('Received data via HTTP:', req.body);

  const point = new Point('iot_data')
    .tag('user_id', userId)
    .tag('device_id', deviceId)
    .tag('sensor_type', sensorType)
    .tag('source', 'http') // Add source tag for HTTP data
    .floatField('value', parseFloat(value)); // Adjust according to your data structure

  writeApi.writePoint(point);
  writeApi.flush().then(() => {
    res.status(200).send('Data received and written to InfluxDB');
  }).catch((error) => {
    console.error('Error writing to InfluxDB', error);
    res.status(500).send('Error writing to InfluxDB');
  });
});

// MQTT setup and message handling
const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('users/+/devices/+/sensor/+');
});

client.on('message', (topic, message) => {
  const [_, userId, __, deviceId, ___, sensorType] = topic.split('/');
  const data = JSON.parse(message.toString());
  console.log('Received data via MQTT:', data);

  const point = new Point('iot_data')
    .tag('user_id', userId)
    .tag('device_id', deviceId)
    .tag('sensor_type', sensorType)
    .tag('source', 'mqtt') // Add source tag for MQTT data
    .floatField('value', parseFloat(data.value)); // Adjust according to your data structure

  writeApi.writePoint(point);
  writeApi.flush().catch((error) => {
    console.error('Error writing to InfluxDB', error);
  });
});

module.exports = router;
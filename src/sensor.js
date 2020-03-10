let device = require('./sample-data').valid;
let sensor = require('./sample-data').valid.sensors[0];
const baseUrl = require('../config/env').apiUrl;
const adminCredentials = require('../config/creds').user.admin;
const rootAdminCredentials = require('../config/creds').user.root_admin;
const normalCredentials = require('../config/creds').user.normal;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

async function getNormalAuth() {
  const res = await chai.request(baseUrl).post('/auth/token').send(normalCredentials)
  return { 'authorization': `Bearer ${res.text}` }
}

const pushSensorValue = (id, val) => chai.request(baseUrl).post(`/devices/${device.id}/sensors/${id}/value`).set('content-type', 'application/json').send(val)

const createDevice = (s) => chai.request(baseUrl).post(`/devices`).send(s)

async function sendData() {
  console.log('Sending...');

  withCreds = await getNormalAuth()
  await createDevice(device).set(withCreds)
  let res = await pushSensorValue(sensor.id, { "value": "25.6", "timestamp": toISOString() })
  
  console.log(JSON.stringify(res));
};

sendData();

module.exports =
{
  apiUrl: process.env.API_URL || "https://api.waziup.io/api/v2",
  mqttUrl: process.env.MQTT_URL || "tcp://api.waziup.io:1883",
  domain: "waziup"
}

# SimpleHomeAutomationUsingArduino
To get up and running:
- Clone the repository
- Run npm install
- Run node server.js
- Server will be live at http://localhost:8080/api

Note: You have to install node js into your machine first.

# Devices needed to start controlling
- Arduino Uno
- LM35 Temperature Sensor
- Relay
- Some jumper cables

# How to: 
- Connect Arduino to your pc
- Connect Relay to your arduino uno using jumper cables
- Connect data output of LM35 to A0 pin your Arduino
- Go to server at http://localhost:8080/api and there you will get everything you need to turn on/off your relay
- You will also get the raw temperature of your home if you attached LM35 temperature sensor

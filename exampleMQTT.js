const publishViaMQTT = require('mi5-module').Mi5mqttPublisher;
const Mi5Module = require('mi5-module').Mi5Module;
const endpointUrl = 'mqtt://127.0.0.1:1883';
let modules = [];

let module1 = new Mi5Module('Robot',undefined, {port: 4842});
modules.push(module1);
let module2 = new Mi5Module('Car',undefined, {port: 4842});
modules.push(module2);
let skill1 = module1.addSkill('skill1');
let skill2 = module1.addSkill('skill2');
let param1 = skill1.addInputParameter("distance", "Double", 2);
let param2 = skill1.addInputParameter("height", "Double", 2);
let param3 = skill1.addOutputParameter("weight", "Double", 2);
let variab = module1.addStateVariable("weight", "Double", 2);

let client = publishViaMQTT(modules, endpointUrl);



client.on('message', function (topic, message) {
  console.log('topic: '+topic+' message: '+message.toString());
});
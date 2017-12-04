const Mi5Module = require('mi5-module').Mi5Module;
let module1 = new Mi5Module('module1',undefined, {port: 4842});
let skill1 = module1.addSkill('skill1');
let skill2 = module1.addSkill('skill2');
let param1 = skill1.addInputParameter("distance", "Double", 2);
let param2 = skill1.addInputParameter("height", "Double", 2);
let param3 = skill1.addOutputParameter("weight", "Double", 2);
let variab = module1.addStateVariable("weight", "Double", 2);



module1.on("Idle", function(){
  console.log('You are now in idle mode');
});
module1.on("Resetting", function(){
  module1.done();
});

module1.onAny(function(event, value) {
  console.log('module1 event: '+event, ' value: '+value);
});

skill1.onAny(function(event, value) {
  console.log('skill1 event: '+event, ' value: '+value);
  let number = param1.getValue();
  console.log('Parameter 1:' + number);
  param1.setValue(number+1);
});
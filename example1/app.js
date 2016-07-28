/**
 * Created by Dominik on 28.07.2016.
 */

var config = require('./config');
var Mi5Module = require('mi5-module').Mi5Module;

/**
 * CREATE THE MODULE
 * YourModule = new Mi5Module('name', settings);
 */
var ExampleModule = new Mi5Module('example module', config.moduleSettings);

/**
 * CREATE SKILLS
 * var skill = Mi5Module.createSkill(index, name, id, skillSettings}
 *
 * attention: the index must lie within [0,15]. make sure that no two skills have the same index
 *
 * skillSettings are optional and can have:
 * var skillSettings = {
 *  simulateBehaviour: true/false,
 *  behaviour: {
 *     finishTask: 2000,
 *     setDone: 3000
 *  },
 *  listenToMqttTopic: '/topic', (only if mi5Module has an mqtt broker)
 *  parameters: ArrayOfParameters
 * };
 *
 * Each parameter has a Name and settings. The settings can be
 * var parameterSettings = {
 *    ID: someId,
 *    Default: someDefaultValue,
 *    MaxValue: someMaxValue,
 *    MinValue: someMinValue,
 *    Required: True/False,
 *    Unit: someString
 * }
 *
 */

var SimulatedSkill = ExampleModule.createSkill(0, 'Simulated Skill', 2230, {simulateBehaviour: true});
var OrangeJuice = ExampleModule.createSkill(1, 'Orange Juice', 2233, {parameters: [{Name: "Amount", settings:{ID: 3456}},
  {Name: ""}]});
var AppleJuice = ExampleModule.createSkill(2, 'Apple Juice', 2234);

// note: you can either create the skill's parameters in the 'createSkill' step or afterwards:
var Parameter1 = OrangeJuice.addParameter(2, "TestParameter2", {ID: 3333});

// if you want to access a parameter that has been created from beginning, do it like this:
var Amount = OrangeJuice.parameter.Amount;
// note: the last keyword 'Amount' corresponds to the 'Name' attribute of the parameter


/**
 * WORKING WITH EVENTS I
 *
 * INITIALIZATION:
 * Note: As node.js is asynchronous, the module/skills/parameters will not be initialized completely from the beginning.
 * Any OPC UA variable will not be initialzed from the beginning. So, AppleJuice.ready will be 'undefined' in the
 * beginning. That is why AppleJuice.ready.value will cause an error in the beginning. So if a certain operation makes
 * it necessary to make sure the completeness of the module/skills/parameters, just use the following events.
 */

ExampleModule.once('connect', function(){
  console.log('example module initialized.');
  console.log('server listening on opc.tcp://127.0.0.1:'+ExampleModule.opcuaSettings.server.serverInfo.port);
  // do some operation that needs ExampleModule to be initialized
});

OrangeJuice.once('init', function(){
  console.log('orange juice initialized');
  // do some operation that needs OrangeJuice to be initialized
});

Parameter1.once('init', function(){
  console.log('Parameter 1 init');
  // do some operation that needs Parameter1 to be initialized
});

/**
 * SKILLS
 *
 * WORKING WITH EVENTS II
 * Each skill has an 'execute', 'executeTrue', 'executeFalse', 'ready', 'busy', 'done', 'activate', 'deactivate'
 * and an 'error' event. Only 'execute' returns you a value. The other events are triggered by the methods of the skill.
 * Note: all events can only be triggered if the initialization was successful. Therefore this does NOT need to be
 * packed into the ExampleModule.once('init', function(){...}).
 *
 * METHODS
 * Each skill has the following methods:
 * -> skill.setBusy() - this sets [done->false, busy->true, ready->false]
 * -> skill.finishTask() - this sets [busy->false]
 * -> skill.setDone() - this sets [done->true]
 * -> skill.setReadyWhenExecuteIsReset() - this sets [done->false, busy->false, ready->true]
 * -> skill.setReady()  - this sets [done->false, busy->false, ready->true]
 * -> skill.setError(value, message) - this sets [error->value, possibly (ready->false)]
 * -> skill.activate(value) - this sets [activated->value]
 * -> skill.addParameter(index, name, parameterSettings)
 *
 * OPC UA Variables
 * Each skill has the following opc ua variables:
 * -> execute
 * -> activated
 * -> busy
 * -> ready
 * -> done
 * -> error
 * Each parameter has the following opc ua variables:
 * -> Value
 * -> StringValue
 * Each opc ua variable has a value (variable.value) and you can use the following methods
 * -> variable.onChangce(function(value){})
 * -> variable.oneChange(function(value){})
 * -> variable.write(value)
 * -> variable.read(function(value){})
 * -> variable.on('change', function(value){})
 * ...
 */
OrangeJuice.on('execute', function(value){
  console.log('execute was set to '+ value);
});

OrangeJuice.on('executeTrue', function(){
  if(OrangeJuice.ready.value){
    OrangeJuice.setBusy();
    // do something with parameter value
    console.log(OrangeJuice.parameter.Amount.Value.value);
    console.log(OrangeJuice.parameter.Amount.StringValue.value);
    // the timeout stands for the machine doing something
    setTimeout(function(){
      OrangeJuice.finishTask()},2000);
    setTimeout(function(){
      OrangeJuice.setDone();
      OrangeJuice.setReadyWhenExecuteIsReset();
    },3000);
  } else {
    console.log('skill is not ready. try again.');
  }
});



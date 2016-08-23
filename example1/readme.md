# Your own Mi5 Module written in node.js

With [mi5-module-js](https://github.com/ProjectMi5/mi5-module-js) you can easily write your own mi5 module. Here is a boilerplate.

## What does it do?

This app starts an OPC UA server with the standard Mi5 structure. You can choose your own module name and id, as well as the port on which the server will be running. Finally, you can add your own skills and parameters and do the programming of the backend logic.

## Installation

1. Install [Node.js](https://nodejs.org/).
2. Copy the files of this example in an empty folder.
3. In this folder run `npm install`
4. Now you can run this application with `node app.js`
5. If you want to browse your server, you might use the [UaExpert OPC UA Client](https://www.unified-automation.com/downloads/opc-ua-clients.html). It is for free but you are required to register first. Have a look at the console output to see at which port the server is listening. If you do not change the settings, it will be `opc.tcp://127.0.0.1:4842`

## Customization

Run `npm init`. This guides you through the steps within the `package.json` file. Customize it as you wish. Also feel free to edit the `config.js` file. You can change the `ModuleId`, `outputName`, `port`, `buildDate`, `buldName`, the module's `position`, `positionOffset` and the `storage`. Despite not being recommended for Mi5, you can also change the `baseNodeId`.

## Your own backend

Now, you are ready to do your own programming. Therefore, make familiar with the `app.js` and rewrite it.

## Debug

As the mi5-module-js uses the npm package [debug](https://www.npmjs.com/package/debug), you can change the debug environment variable and activate additional console output.

Therefore run

```sh
$ DEBUG=* node app.js
```

in Linux or Mac. For Windows use

```sh
$ set DEBUG=*
$ node app.js
```

If you are using an IDE like Jetbrains Webstorm, you can set the environment variables there, too.

For more information read the debug [description on npm](https://www.npmjs.com/package/debug).

## The API

### Your own module

#### Create

* Require the module and create a new instance.

```javascript
var Mi5Module = require('mi5-module').Mi5Module;
var ExampleModule = new Mi5Module(moduleName, moduleSettings);
```

* moduleName is a String. moduleSettings can look like this:

```javascript
var moduleSettings = {
	opcua: {
		server: ServerStructure
	},
	position: 2000, // optional
	positionOffset: 50, // optional, positionOffset will be added to position input
	storage: './data' // optional, stores data at the path specified here
	// data in the storage overwrites the 'position' value, so delete the './data' folder to completely reset the module
};
```

* where ServerStructure looks like the following:

```javascript
var ServerStructure = {
	moduleName: 'Module'+ModuleID,
	outputName: 'Check Module',
	outputId: ModuleID,
	serverInfo: {
		port: 4842, // the port of the listening socket of the server
		resourcePath: "", // this path will be added to the endpoint resource name
		buildInfo : {
			productName: 'Module'+ModuleID, //module name
			buildNumber: "7658",
			buildDate: new Date(2016,3,25)
		}
	},
	rootFolder: "RootFolder",
	baseNodeId: "ns=4;s=MI5.",
	content: "default"
};
```

#### Methods

* Mi5Module.createSkill(index, name, id, skillSettings) -> for more information see Skills
* Mi5Module.resetSkills()

#### Events
 
* Each module has a 'connect' event. It will be triggered if the server and the opcua variables are existent.
* The module's 'reset' event will be triggered, if the opcua variable 'reset' is set true.


### Skills

#### Create

```javascript
var skill = Mi5Module.createSkill(index, name, id, skillSettings}
```

* attention: the index must lie within [0,15]. make sure that no two skills have the same index
* skillSettings are optional and can have:

```javascript
var skillSettings = {
   simulateBehaviour: true/false,
   behaviour: {
      finishTask: 2000,
      setDone: 3000
   },
   listenToMqttTopic: '/topic', (only if mi5Module has an mqtt broker)
   parameters: ArrayOfParameters // optional. There is also a Mi5Skill.addParameter(index, name, parameterSettings) Method
};
```

### Parameters

There are two ways to add parameters to a skill. 
1. Either you have an ArrayOfParameters in the skillSettings. Note that the order of the parameters is important. The position will determine its index.
2. Or you use the `Mi5Skill.addParameter(index, Name, parameterSettings)` method.

```javascript
var ArrayOfParameters = [
{
  Name: parameterName
  settings: parameterSettings
}
];

var parameterSettings = {
    ID: someId,
    Default: someDefaultValue,
    MaxValue: someMaxValue,
    MinValue: someMinValue,
    Required: True/False,
    Unit: someString
}
```

Each parameter can be accessed via `skill.parameter[parameterName]`. Alternatively the method `skill.addParameter` also returns the parameter.

#### Events

Each skill has the following events.
 
* 'init'
* 'execute'
* 'executeTrue'
* 'executeFalse'
* 'ready'
* 'busy'
* 'finish'
* 'done'
* 'activate'
* 'deactivate'
* 'error'
 
Only 'execute' returns you a value. The other events are triggered by the methods of the skill.
  
#### Methods

Each skill has the following methods:

* skill.setBusy() - this sets [done->false, busy->true, ready->false]
* skill.finishTask() - this sets [busy->false]
* skill.setDone() - this sets [done->true]
* skill.setReadyWhenExecuteIsReset() - this sets [done->false, busy->false, ready->true]
* skill.setReady()  - this sets [done->false, busy->false, ready->true]
* skill.setError(value, message) - this sets [error->value, possibly (ready->false)]
* skill.activate(value) - this sets [activated->value]
* skill.addParameter(index, name, parameterSettings)
 

  
### OPC UA Variables

Each opc ua variable has a value (variable.value) and you can use the following methods

* variable.onChange(function(value){})
* variable.oneChange(function(value){})
* variable.write(value)
* variable.read(function(value){})
* variable.on('change', function(value){})

Each module has the following opc ua variables:

* module.reset

Each skill has the following OPC UA Variables

* skill.execute
* skill.activated
* skill.busy
* skill.ready
* skill.done
* skill.error

Each parameter has the following OPC UA Variables

* parameter.Value
* parameter.StringValue

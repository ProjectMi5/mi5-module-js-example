# Your own Mi5 Module written in node.js

With node-module-js you can easily write your own mi5 module. Here is a boilerplate.

## What does it do?

This app starts an OPC UA server with the standard Mi5 structure. You can choose your own module name and id, as well as the port on which the server will be running. Finally, you can add your own skills and parameters and do the programming of the backend logic.

## Installation

1. Install [Node.js](https://nodejs.org/).
2. Copy the files of this example in an empty folder.
3. In this folder run `npm install`
4. Now you can run this application with `node app.js`
5. If you want to browse your server, you might use the [UaExpert OPC UA Client](https://www.unified-automation.com/downloads/opc-ua-clients.html). It is for free but you are required to register first. Have a look at the console output to see at which port the server is listening. If you do not change the settings, it will be `opc.tcp://127.0.0.1:4842`

## Customization

Run `npm init`. This guides you through the steps within the `package.json` file. Customize it as you wish. Also feel free to edit the `config.js` file. You can change the `ModuleId`, the `outputName` and the `port`.

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
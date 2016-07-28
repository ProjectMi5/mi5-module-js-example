var ModuleID = '1202';

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

var moduleSettings = {
	opcua: {
		server: ServerStructure
	}
};

exports.moduleSettings = moduleSettings;
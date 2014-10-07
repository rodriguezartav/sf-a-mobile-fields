var _3Model = require("3vot-model")

var fields = ["Label","Name","Type", "objectName","objectId"]; 

var SfObjectField = _3Model.setup("SfObjectField", fields);

SfObjectField.fetch = function(objectName, objectId){

	Visualforce.remoting.Manager.invokeAction(
	    'threevot_apps.sfafields.listFields',
	    objectName,
	    handleResult,
	    { buffer: false, escape: false, timeout: 30000 }
	);

	 function handleResult(result, event){
		var parsedResults = JSON.parse(result).fields
	 	for (var i = parsedResults.length - 1; i >= 0; i--) {
	 		var result = parsedResults[i]
	 		result.objectName = objectName;
	 		result.objectId = objectId;
	 	};
	 	SfObjectField.refresh(parsedResults);
	 } 
}

module.exports = SfObjectField


var _3Model = require("3vot-model")

var fields = ["Label","Name","Prefix","Setting","Custom"]; 

var SfObject = _3Model.setup("SfObject", fields);

SfObject.fetch = function(){

	Visualforce.remoting.Manager.invokeAction(
	    'threevot_apps.sfafields.ListObjects',
	    handleResult,
	    { buffer: false, escape: false, timeout: 30000 }
	);

	 function handleResult(result, event){
	 	var parsedResults = JSON.parse(result).objects;
	 	var acceptedResults = []
	 	for (var i = parsedResults.length - 1; i >= 0; i--) {
	 		var result = parsedResults[i];
	 		if(result.Prefix && !result.Setting) acceptedResults.push( result )
	 		//result.objectName = objectName;
	 		//result.objectId = objectId;
	 	};

	 	acceptedResults.sort(function(a,b){
	 		return b.Name.localeCompare(a.Name);
	 	});
	 	

	 	SfObject.refresh(acceptedResults);
	 } 

}



module.exports = SfObject


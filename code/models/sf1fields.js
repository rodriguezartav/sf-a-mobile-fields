var _3Model = require("3vot-model")

Sf1Fields = _3Model.Model.setup("threevot_apps__Sf1Fields__c", ["id","Name","threevot_apps__data__c","threevot_apps__profileid__c"]);

Sf1Fields.fetch = function(){
	Sf1Fields.query("select id, name, profileid__c, data__c from threevot_apps__Sf1Fields__c", { fail: function(err){ console.log(err) } });
}

Sf1Fields.prototype.getData = function(){
	return JSON.parse(this.threevot_apps__data__c);
}

Sf1Fields.prototype.setData= function(data){
	this.threevot_apps__data__c = JSON.stringify(data);
}

Sf1Fields.prototype.addField= function(fieldItem){
	var data = this.getData()
	var dataForObject = data[fieldItem.objectName] || [];

	var found = false;
	for (var i = dataForObject.length - 1; i >= 0; i--) {
		var thisItem = dataForObject[i];
		if(thisItem.Name == fieldItem.Name) return false;
	};

	dataForObject.push(fieldItem);
	data[fieldItem.objectName]= dataForObject;	
	this.setData(data);	
}


Sf1Fields.prototype.removeField= function(objectName, fieldName){
	var data = this.getData()
	var dataForObject = data[objectName];

	var index = false;
	for (var i = dataForObject.length - 1; i >= 0; i--) {
		var thisItem = dataForObject[i];
		if(thisItem.Name == fieldName && thisItem.objectName == objectName) index = i;
	};

	dataForObject.splice(index, 1);
	if(dataForObject.length==0) delete data[objectName]
	else data[objectName]= dataForObject;	
	this.setData(data);
}



module.exports= Sf1Fields

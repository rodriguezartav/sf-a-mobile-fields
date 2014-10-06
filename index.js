var SfObject = require("./code/models/sfobject");
var SfObjectField = require("./code/models/sfobjectfield");
var Profile = require("./code/models/profile");
var Sf1Fields = require("./code/models/sf1fields");


var container = document.getElementById("_3vot_sfafields");
container.innerHTML = require("./code/layout")();

var ListController = require("./code/controllers/list")
var Sf1FieldsList = require("./code/controllers/sf1fieldsList")

var profilesList            = new ListController("#profile-list-controller", Sf1Fields, onProfileItemClick);
var profilesController      = new ListController("#profile-controller", Profile);
var sobjectFieldsController = new ListController("#fields-controller", SfObjectField);
var sobjectController       = new ListController("#objects-controller", SfObject);
var sf1FieldsList           = new Sf1FieldsList("#sf1fields-controller", Sf1Fields);

Profile.fetch();
SfObject.fetch();
Sf1Fields.fetch();
Profile.current = {Name: "ORGANIZATION"}

profilesController.element.style.display = "none";

document.querySelector(".btn-add-profile").onclick = function(){
	profilesController.element.style.display = "block";
	profilesList.element.style.display = "none";
}

Sf1Fields.bind("refresh",function(){
	console.log(Sf1Fields.all())
	sf1FieldsList.showForProfile();
})

Profile.bind("SELECTED",function(profile){
	Profile.current = profile;
	sf1FieldsList.showForProfile();
	profilesController.element.style.display = "none";
	profilesList.element.style.display = "block";

});

SfObject.bind("SELECTED",function(item){
	SfObjectField.destroyAll();
	SfObjectField.fetch( item.Name, item.id );
	sobjectFieldsController.loading();

});

SfObjectField.bind("SELECTED",function(item){
	Sf1Fields.currentFields.addField(item);
	Sf1Fields.currentFields.save();
	sf1FieldsList.showForProfile();
	
});

Sf1Fields.bind("SELECTED",function(item){
	Sf1Fields.removeItem()
});




function onProfileItemClick(e){
	profilesList.clearActive();
	e.target.classList.add("active");
	var target = e.target;
	var id = target.dataset.threevot_apps__profileid__c;
	var ObjFields = document.querySelectorAll(".third-module .list-group-item");
	if (ObjFields.length > 0) {
		for (i=0; i<= ObjFields.length -1; i++){
			ObjFields[i].classList.remove("active")
		}
	};
	if(!id) Profile.current = {Name: "ORGANIZATION"}
	else Profile.current = Profile.find(id);
	
	sf1FieldsList.showForProfile();
}

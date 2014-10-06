var Layout = require("./view")
var Item = require("./item")

var Sf1Fields = require("../../models/sf1fields");
var Profile = require("../../models/profile");


module.exports = List;

function List(target, objectType, label){
	var that = this;

	this.objectType = objectType;

	this.element = document.querySelector(target);
	this.element.innerHTML = Layout({label: label});

	this.listItem = this.element.querySelector("ul");
	this.listItem.onclick = function(e){
		that.onclick(e);
	};

	// this.listItem.style.height = getScreenSize() - 100 + "px";
}

List.prototype.showForProfile = function(){
	var item;
	var items = Sf1Fields.select(function(item){
		if(item.Name == Profile.current.Name) return true;
		return false;
	})

	if(items.length == 0) item = Sf1Fields.create( { Name: Profile.current.Name, threevot_apps__data__c: "{}", threevot_apps__profileid__c: Profile.current.id || ""  } );
	else item = items[0];

	Sf1Fields.currentFields = item;
	if(!item.threevot_apps__data__c || item.threevot_apps__data__c == "'{}'") item.threevot_apps__data__c = "{}";
	var data = JSON.parse(item.threevot_apps__data__c);

	var keys = Object.keys(data)

	var currentScrollPosition = this.listItem.scrollTop;
	this.listItem.innerHTML = Item({ keys: keys, data: data, label: Profile.current.Name });
	this.listItem.scrollTop = currentScrollPosition;
}

List.prototype.onclick = function(e){
	var target = e.target;
	if(target.classList.contains("field-item")) return this.removeField(e);
}

List.prototype.removeField = function(e){
	var name = e.target.dataset.name;
	var key = e.target.dataset.key;
	Sf1Fields.currentFields.removeField(key, name);
	Sf1Fields.currentFields.save();
	if( Sf1Fields.currentFields.threevot_apps__data__c.length < 4 ) this.listItem.innerHTML = Sf1Fields.currentFields.destroy();
	else this.showForProfile();
}

// function getScreenSize(){
// 	var w = window,
//     d = document,
//     e = d.documentElement,
//     g = d.getElementsByTagName('body')[0],
//     x = w.innerWidth || e.clientWidth || g.clientWidth,
//     y = w.innerHeight|| e.clientHeight|| g.clientHeight;
//     return y;
// }
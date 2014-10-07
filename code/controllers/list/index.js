var Layout = require("./view")
var Item = require("./item")

module.exports = List;

function List(target, objectType, onclick){
	var that = this;
	this.onItemClick = onclick;
	this.objectType = objectType;

	this.element = document.querySelector(target);
	this.element.innerHTML = Layout();

	this.listItem = this.element.querySelector("ul");
	this.listItem.onclick = function(e){
		if(that.onItemClick) return that.onItemClick(e);
		that.onclick(e);
	};

	// this.listItem.style.height = getScreenSize() - 100 + "px";

	this.objectType.bind("refresh destroy", function(){
		that.render();
	});
}

List.prototype.loading = function(){
	this.listItem.innerHTML = "<li class='list-group-item'>Loading, please wait...</li>";
}

List.prototype.render = function(){
	var items = this.objectType.all()

 	items.sort(function(a,b){
 		if(a.Name == "ORGANIZATION") return 1;
 		if(b.Name == "ORGANIZATION") return -1;
 		return b.Name.localeCompare(a.Name);
 	});

	var itemsHtml = "";
	for (var i = items.length - 1; i >= 0; i--) {
		var item = items[i];
		itemsHtml += Item(item);
	};
	this.listItem.innerHTML = itemsHtml;

	this.activeFirst();
}

List.prototype.activeFirst = function(){
	if (this.element.id === "profile-list-controller"){
		var firstProfile = this.element.querySelectorAll(".list-group-item")[0];
		if(!firstProfile) return false;
		firstProfile.classList.add("active");
	}
}

List.prototype.addedFieldNotification = function(){
		console.log("mmhmm");
		var alertContainer = document.createElement("div"),
			sf1FieldsContainer = document.getElementById("sf1fields-controller");
		alertContainer.classList.add("success-alert");
		alertContainer.innerHTML = "Field Added!";
		alertContainer.classList.add("show");
		sf1FieldsContainer.appendChild(alertContainer)
		// setTimeout(function() {
		// 	alertContainer.remove();
		// }, 2000);
}

List.prototype.clearActive = function(){
	var items = this.element.querySelectorAll("li");
	for (var i = items.length - 1; i >= 0; i--) {
		var item = items[i];
		item.classList.remove("active");
	};
}

List.prototype.onclick = function(e){
	this.clearActive();
	if (this.element.id === "fields-controller"){
		this.addedFieldNotification();
	}
	
	e.target.classList.add("active");
	var id = e.target.dataset.id;
	var item = this.objectType.find(id);

	this.objectType.trigger("SELECTED", item);
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
var _3Model = require("3vot-model")
var Ajax = require("3vot-model/lib/3vot-model-vfr");

Profile = _3Model.setup("Profile", ["id","Name"]);
Profile.ajax = Ajax;
Profile.ajax.namespace = "threevot_apps."

Profile.fetch = function(){
	Profile.query("select id,name from Profile");
}

module.exports= Profile

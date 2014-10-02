var _3Model = require("3vot-model")

Profile = _3Model.Model.setup("Profile", ["id","Name"]);
Profile.autoAjax = false;

Profile.fetch = function(){
	Profile.query("select id,name from Profile");
}

module.exports= Profile

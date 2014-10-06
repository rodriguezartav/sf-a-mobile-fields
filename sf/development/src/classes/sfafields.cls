global class sfafields {

	@RemoteAction
	global static string ListObjects(){
		Map<string, Schema.sObjectType> result= Schema.getGlobalDescribe();
		string json = '{"objects":[';
		List<string> parts = new List<String>();
		for(string key :  result.keySet() ){
   			DescribeSObjectResult r = result.get(key).getDescribe();
   			string part = '{"Prefix":"'+r.getKeyPrefix() +'","Setting":'+r.isCustomSetting() +',"Custom": '+r.isCustom() +',"Name": "'+r.getName()+'","Label": "'+ r.getLabel() +'"}';
    		parts.add(part);
		}
		json += String.join(parts,',');
		json += ']}';
		return json;

	}
	
	@RemoteAction
	public static string listFields(string objtype){
		Schema.SObjectType targetType = Schema.getGlobalDescribe().get(objtype);
        
        Map<String, Schema.sObjectField> targetFields = targetType.getDescribe().fields.getMap();
        
        string json = '{"fields":[';
        		List<string> parts = new List<String>();
        
        for (String key : targetFields.keySet()) {
        	//system.debug(targetFields.get(key).getDescribe().getName());
        	DescribeFieldResult r  = targetFields.get(key).getDescribe();
        	string part = '{"Type": "'+r.getType() + '","Name": "'+r.getName()+'","Label": "'+ r.getLabel() +'"}';
    		parts.add(part);
        }
        
       	json += String.join(parts,',');
		json += ']}';
        
		return json;
	}

}
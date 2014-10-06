@isTest
private class sfafields_test {

    static testMethod void setOrgFields() {
    	string testString = '{"account": ["id","Name"] }';
        string users = sfafields.ListObjects();
    }

    static testMethod void getFields() {
        string users = sfafields.listFields('account');
    }

}
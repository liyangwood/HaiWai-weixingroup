
if(WeixinGroup.find().count() < 1){
    //WeixinGroup.addTestData();
}
Meteor.publish('WeixinGroup', function() {
    return WeixinGroup.find();
});
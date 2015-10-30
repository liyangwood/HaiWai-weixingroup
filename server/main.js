
if(WeixinGroup.find().count() === 0){
    WeixinGroup.insert({name: "testGroup"});
}
Meteor.publish('WeixinGroup', function() {
    return WeixinGroup.find();
});


Template.wgItem.helpers({
    data : function(){
        var gid = Session.get('routeParams')[0];

        return WeixinGroup.findOne({'_id':gid});
    }
});
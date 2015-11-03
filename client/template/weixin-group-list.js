

Template.weixinGroupList.helpers({
    list : function(){
        return WeixinGroup.find({}, {
            sort : {'createTime': -1}
        });
    }
});

Template.weixinGroupList.events({
    'click .js_box' : function(e){
        var elem = $(e.target).closest('.js_link');
        if(elem.length>0){
            var gid = elem.attr('param');

            Router.go('wgItem', {gid : gid});
        }

    }
});
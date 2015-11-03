

Template.weixinGroupList.helpers({
    list : function(){
        return WeixinGroup.find({}, {
            sort : {'createTime': -1}
        });
    }
});
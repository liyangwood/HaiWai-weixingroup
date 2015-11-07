
Meteor.subscribe('DB.Feed');
Meteor.subscribe('WeixinGroup');


Template.wxSpaceList.helpers({
    list : function(){
        var sort = {
            createTime : -1
        };

        var sid = Session.get('routeParams')[0];

        var query = {
            wxSpaceId : sid
        };


        return DB.Feed.find(query, {
            sort : sort
        });
    },


    spaceId : function(){
        return Session.get('routeParams')[0];
    },
    space : function(){
        var sid = Session.get('routeParams')[0];

        return WeixinGroup.findOne({wxSpaceId:sid});
    }
});

Template.wxSpaceListImageView.list = function(){
    var list = this.images;
    if(list.length > 3){
        list = list.slice(0, 3);
    }

    return list;
};
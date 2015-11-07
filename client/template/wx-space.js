
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
    }
});


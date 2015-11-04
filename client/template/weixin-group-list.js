

Template.weixinGroupList.helpers({
    list : function(){
        var sort = {
            createTime : -1
        };

        var query = {};

        var catId = Session.get('page_cat_id');

        if('-1' !== catId){
            query.catId = catId;
        }

        return WeixinGroup.find(query, {
            sort : sort
        });
    }
});

Template.weixinGroupList.onCreated(function(){
    Session.set('page_cat_id', '-1');

    util.message.register('ChangeListFilter', function(e, param){
        var catId = param.catId;
        Session.set('page_cat_id', catId);
    });
});

//Template.weixinGroupList.events({
//    'click .js_box' : function(e){
//        var elem = $(e.target).closest('.js_link');
//        if(elem.length>0){
//            var gid = elem.attr('param');
//
//            Router.go('wgItem', {gid : gid});
//        }
//
//    }
//});
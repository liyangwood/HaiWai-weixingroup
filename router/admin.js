

Router.route('/admin/group/list', {
    name : 'AdminGroupList',
    waitOn : function(){
        return Meteor.subscribe('WeixinGroup');
    }
});

Router.route('/admin/group/edit/:groupId', {
    name : 'AdminGroupEdit',
    waitOn : function(){
        return Meteor.subscribe('WeixinGroup');
    }
});
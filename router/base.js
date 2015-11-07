/*
* use Router
*
* */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate : 'loading',
    waitOn : function(){
        return Meteor.subscribe('WeixinGroup');
    }
});
Router.route('/', {
    name: 'weixin-group-list'

});

Router.route('/add-weixin-group', {
    name : 'addWeixinGroup',
    data : {}
});

Router.route('/group-item/:gid', {
    name : 'wgItem',
    data : function(){
        var gid = this.params.gid;
        Session.set({
            routeParams : [gid]
        });
    }
});


Router.route('/space/list/:sid', {
    name : 'wxSpaceList',
    data : function(){
        var sid = this.params.sid;
        Session.set({
            routeParams : [sid]
        });
    }
});

Router.route('/:sid/feed/add', {
    name : 'addFeed',
    data : function(){
        var sid = this.params.sid;
        Session.set({
            routeParams : [sid]
        });
    }
});

Router.route('/space/feed/:feedId', {
    name : 'wxSpaceItemDetail'
});

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
Router.route('/', {name: 'weixin-group-list'});

Router.route('/add-weixin-group', {
    name : 'addWeixinGroup',
    data : {}
});

Router.route('/group-item/:gid', {
    name : 'weixinGroupItem'
});
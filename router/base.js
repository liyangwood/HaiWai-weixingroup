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


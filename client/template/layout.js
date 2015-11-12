Meteor.subscribe('DB.User');

Template.layout.events({
    'click .js_weixinLogin' : function(e){

        var appid = Const.WEIXINAPPID;
            red = encodeURIComponent('http://qun.haiwai.com');


        var box = util.showModal({});
        box.attr('id', 'js_weixin_qr');

        var obj = new WxLogin({
            id : 'js_weixin_qr',
            appid: appid,
            scope: "snsapi_login",
            redirect_uri: red,
            state: Const.VERIFYSTATE,
            style: "black",   //white
            href: ""
        });


    }
});

Template.layout.helpers({
    user : function(){
        return Session.get('user');
    }
});

Template.layout.onCreated(function(){
    var query = Router.current().params.query;

    if(query.code && query.state){
        //微信回调
        util.ajax({
            url : '/weixinlogin',
            data : {
                code : query.code,
                state : query.state
            },
            success : function(rs){
                console.log(rs.data);
                if(rs.status < 0){
                    alert(rs.data);
                    return;
                }

                var json = rs.data;

                Cookie.set('token', json.access_token);
                Cookie.set('refreshtoken', json.refresh_token);
                Cookie.set('uid', json.uid);


                Router.go('/');
            }
        });
    }
});
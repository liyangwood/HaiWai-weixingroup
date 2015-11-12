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
        var user = Session.get('user');
        if(user && user.nickname){
            user.isLogin = true;
        }

        return user;
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

                Cookie.set('uid', json.uid);


                location.href = '/';
            }
        });
    }
});
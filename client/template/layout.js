

Template.layout.events({
    'click .js_weixinLogin' : function(e){

        var appid = 'wx8fa92ef0af489460',
            red = encodeURIComponent('http://qun.haiwai.com');

        var url = 'https://open.weixin.qq.com/connect/qrconnect?appid='+appid+'&redirect_uri='+red+'&response_type=code&scope=snsapi_login&state=haiwai#wechat_redirect'

        window.open(url);

        //var obj = new WxLogin({
        //    id:"login_container",
        //    appid: "",
        //    scope: "",
        //    redirect_uri: "",
        //    state: "",
        //    style: "",
        //    href: ""
        //});
    }
});
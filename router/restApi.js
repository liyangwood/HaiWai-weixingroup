if(Meteor.isServer){


var request = Meteor.npmRequire('request');

var F = {
    sendJson : function(status, data, statusText){
        var rs = {
            data : data
        };

        if(status > 0){
            rs.status = status;
            rs.statusText = statusText || 'ok';
        }
        else if(status < 0){
            rs.status = status;
            rs.statusText = statusText || 'error';
        }
        else{
            throw 'status is can not be 0';
        }


        return JSON.stringify(rs);
    },
    getParams : function(type){
        var rs;

        if(type === 'get'){
            rs = this.params.query;
        }
        else if(type === 'post'){

        }

        return rs;
    },


    loginInWeixin : function(code, callback){


        var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+Const.WEIXINAPPID+'&secret='+Const.WEIXINAPPSECRET+'&code='+code+'&grant_type=authorization_code';

        request({
            url : url
        }, function(err, res, body){
            //callback(err, JSON.parse(body));

            var json = JSON.parse(body);
            console.log(json);

            if(json.errmsg){
                callback(json.errmsg, null);
            }
            else{

                F.getWeixinUserInfo(json, callback);
            }

        });

    },
    getWeixinUserInfo : function(json, callback){
        url = 'https://api.weixin.qq.com/sns/userinfo?access_token='+json.access_token+'&openid='+json.unionid||json.openid;
        request({url : url}, function(err, res, body){
            var rs = JSON.parse(body);
            console.log(rs);

            //set to db
            var data = {
                access_token : json.access_token,
                refresh_token : json.refresh_token,
                nickname : rs.nickname,
                image : rs.headimgurl,
                unionid : rs.unionid,
                openid : rs.openid
            };

            console.log(data);
            callback(err, data);
            //DB.User.insertData(data, function(error, uid){
            //    callback(error, data);
            //});



        });
    }
};

Router.route('/api/wg/add', {
    where : 'server'
}).get(function(){
    var query = F.getParams.call(this, 'get');

    var id = query.id,
        group = query.group;

    var self = this;
    DB.WantToAddGroup.insertData({
        groupId : group,
        wechatId : id
    }, function(err, rs){
        if(err){
            self.response.end(F.sendJson(-1, err));
        }
        else{
            self.response.end(F.sendJson(1, rs));
        }
    })
});

//这个专门用来供微信扫码以后回调使用
Router.route('/weixinlogin', {
    where : 'server'
}).get(function(){
    var query = F.getParams.call(this, 'get');

    var code = query.code,
        state = query.state;
    var self = this;

    if(state === Const.VERIFYSTATE){

        var fn = Meteor.wrapAsync(F.loginInWeixin);

        fn(code, function(err, json){
            if(err){
                //console.log(self.response);
                self.response.end(F.sendJson(-1, err.toString()));
                return;
            }

            DB.User.insertData(json, function(error, uid){

                if(error){
                    self.response.end(F.sendJson(-1, error.toString()));
                    return;
                }

                json.uid = uid;
                self.response.end(F.sendJson(1, json));

            });
        });


    }
    else{
        this.response.end(F.sendJson(-1, '状态验证错误'));
    }
});


}
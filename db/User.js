
//use meteor Users
DB.User = {};

Meteor.users.attachSchema(new SimpleSchema({
    nickname : {
        type : String
    },
    wechatId : {
        type : String,
        optional : true
    },
    image : {
        type : String
    },
    createTime : {
        type : Date
    },
    access_token : {
        type : String,
        optional : true
    },
    refresh_token : {
        type : String,
        optional : true
    },
    openid : {
        type : String,
        optional : true
    },
    unionid : {
        type : String,
        optional : true
    }
}));

DB.User.insertData = function(data, callback){
    data.createTime = Date.now();

    var uid;

    try{
        uid = Meteor.users.insert(data);
        callback(null, uid);
    }catch(e){
        callback(e, null);
    }


};
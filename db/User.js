
//use meteor Users
DB.User = new Mongo.Collection('User');

DB.User.attachSchema(new SimpleSchema({
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

DB.User.allow({
    insert : function(uid){
        return true;
    }
});

DB.User.insertData = function(data, callback){
    data.createTime = Date.now();

    DB.User.insert(data, function(err, uid){
        callback(err, uid);
    });


};

// run on server
if(Meteor.isServer){
    Meteor.publish('DB.User', function(){
        return DB.User.find();
    });
}
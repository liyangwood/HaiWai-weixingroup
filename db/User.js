
//use meteor Users
//DB.User = new Mongo.Collection('User');

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

Meteor.users.allow({
    insert : function(uid){
        return true;
    }
});

DB.User = {};
_.extend(DB.User, {
    insertData : function(data, callback){
        data.createTime = Date.now();

        Meteor.wrapAsync(function(){
            Meteor.users.insert(data, function(err, uid){
                callback(err, uid);
            });
        }).call();

    }
});




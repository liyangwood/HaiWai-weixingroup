
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

        var query = {
            unionid : data.unionid
        };

        var tmp = Meteor.users.findOne(query);
        if(tmp){
            console.log(tmp);
            Meteor.users.update(query, data, function(err, uid){
                callback(err, uid);
            });

            return;
        }


        Meteor.users.insert(data, function(err, uid){
            callback(err, uid);
        });

    }
});

if(Meteor.isServer){
    Meteor.publish('DB.User', function(){
        return Meteor.users.find();
    });
}


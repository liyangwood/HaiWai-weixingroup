/*
 * Feed表，用户发来的所有feed，每个feed可以有一个对应的群空间id
 *
 * */

DB.WantToAddGroup = new Mongo.Collection('WantToAddGroup');
DB.WantToAddGroup.Schema = new SimpleSchema({

    createTime : {
        type : Date
    },

    groupId : {
        type : String
    },
    wechatId : {
        type : String
    }
});

DB.WantToAddGroup.attachSchema(DB.WantToAddGroup.Schema);

DB.WantToAddGroup.allow({
    insert : function(uid){
        //console.log(arguments);
        return true;
    }
});

_.extend(DB.WantToAddGroup, {
    insertData : function(data, callback){

        //判断是否已经用该数据
        //TODO 以后需要放到DB allow或deny 中去处理
        var tmp = DB.WantToAddGroup.findOne(data);
        if(tmp){
            callback('该账号已经申请过该微信群', null);
            return;
        }

        data.createTime = Date.now();
        DB.WantToAddGroup.insert(data, function(err, uuid){

            callback(err, uuid);
        });
    }
});



// run on server
if(Meteor.isServer){
    Meteor.publish('DB.WantToAddGroup', function(){
        return DB.WantToAddGroup.find({});
    });
}
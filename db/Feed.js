/*
* Feed表，用户发来的所有feed，每个feed可以有一个对应的群空间id
*
* */

DB.Feed = new Mongo.Collection('Feed');
DB.Feed.Schema = new SimpleSchema({

    createTime : {
        type : Date
    },
    updateTime : {
        type : Date
    },

    wxSpaceId : {
        type : String
    },
    authorId : {
        type : String,
        optional : true
    },
    title : {
        type : String,
        label : '标题'
    },
    subTitle : {
        type : String,
        optional : true
    },

    images : {
        type : Array,
        optional : true
    },
    'images.$' : {
        type : String
    },

    content : {
        type : String,
        label : '正文'
    }
});

DB.Feed.attachSchema(DB.Feed.Schema);

DB.Feed.allow({
    insert : function(uid){
        return true;
    }
});

_.extend(DB.Feed, {
    insertData : function(data, callback){

        data.createTime = Date.now();
        data.updateTime = data.createTime;

        var content = decodeURIComponent(data.content);

        data.images = data.images || [];
        var m,
            rex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

        while (m = rex.exec(content)){
            data.images.push(m[1]);
        }


        DB.Feed.insert(data, function(err, uuid){

            callback(err, uuid);
        });
    }
});



// run on server
if(Meteor.isServer){
    Meteor.publish('DB.Feed', function(){
        return DB.Feed.find({});
    });
}



//global
WeixinGroup = new Mongo.Collection('WeixinGroup');


WeixinGroup.attachSchema(new SimpleSchema({
    name : {
        type : String,
        label : '群名称',
        max : 30
    },
    owner : {
        type : String,
        label : 'Group Owner',
        optional : true
    },
    ownerId : {
        type : String,
        label : '群主微信号',
        optional : true
    },
    category : {
        type : String,
        label : '群主题'
    },
    catId : {
        type : String
    },
    description : {
        type : String,
        label : '群简介',
        optional : false
    },
    location : {
        type : String,
        label : '群所在地区',
        optional : false
    },
    image : {
        type : String,
        label : '群头像'
    },
    qrCode : {
        type : String,
        label : '群二维码',
        optional : true
    },
    tag : {
        type : String,
        label : '群标签',
        optional : true
    },
    createTime : {
        type : Date
    },
    updateTime : {
        type : Date
    },

    postCode : {
        type : String,
        optional : true
    },

    memberCount : {
        type : String,
        optional : true
    },

    wxSpaceId : {
        type : String
    }


}));

WeixinGroup.allow({
    insert : function(){
        return true;
    },
    update : function(){
        return true;
    }
});

WeixinGroup.addTestData = function(){
    var data = {
        name : 'JackyTestGroup',
        owner : 'Jacky',
        ownerId : 'jacky112233',
        category : '互联网',
        descripttion : '这是一个测试的微信去账号',
        location : 'Fremont',
        image : 'http://www.haiwai.com/images/hw_logo1.png',
        qrCode : '',
        postCode : '99887',

        tag : '互联网，微信，创业群'
    };

    //TODO test

    //WeixinGroup.insertData(data, function(){
    //    console.log('add test data');
    //});
};

_.extend(WeixinGroup, {
    insertData : function(data, callback){
        var catId = data.catId,
            category = _.find(WeixinGroupCategory, function(item){
                return catId === item.id;
            });
        if(!category){
            callback('请选择群主题', null);
            return;
        }
        data.category = category.name;


        data.createTime = Date.now();
        data.updateTime = data.createTime;
        data.wxSpaceId = Meteor.uuid();
        WeixinGroup.insert(data, function(err, uuid){

            callback(err, uuid);
        });

    },
    updateData : function(id, data, callback){
        var catId = data.catId,
            category = _.find(WeixinGroupCategory, function(item){
                return catId === item.id;
            });
        if(!category){
            callback('请选择群主题', null);
            return;
        }
        data.category = category.name;
        data.updateTime = Date.now();

        WeixinGroup.update({_id: id}, {$set:data}, function(err, uuid){
            callback(err, uuid);
        });
    }
});


if(Meteor.isServer){
    if(WeixinGroup.find().count() < 1){
        //WeixinGroup.addTestData();
    }
    Meteor.publish('WeixinGroup', function() {
        return WeixinGroup.find();
    });
}


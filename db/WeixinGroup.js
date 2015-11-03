


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
        optional : false
    },
    ownerId : {
        type : String,
        optional : true
    },
    category : {
        type : String,
        label : '分类',
        optional : true
    },
    description : {
        type : String,
        label : '简介',
        optional : true
    },
    location : {
        type : String,
        label : '区域',
        optional : true
    },
    image : {
        type : String
    },
    qrCode : {
        type : String,
        label : '二维码',
        optional : true
    },
    tag : {
        type : String,
        optional : true
    },
    createTime : {
        type : Date
    },
    updateTime : {
        type : Date
    }


}));

WeixinGroup.allow({
    insert : function(){
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
        tag : '互联网，微信，创业群'
    };

    WeixinGroup.insertData(data, function(){
        console.log('add test data');
    });
};

_.extend(WeixinGroup, {
    insertData : function(data, callback){
        data.createTime = Date.now();
        data.updateTime = data.createTime;
        WeixinGroup.insert(data, function(err, uuid){

            callback(err, uuid);
        });

    },
    updateData : function(){}
});





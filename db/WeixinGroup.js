


//global

WeixinGroup = new Mongo.Collection('WeixinGroup');


WeixinGroup.attachSchema(new SimpleSchema({
    name : {
        type : String,
        label : 'Name',
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
        type : String,
        optional : true
    },
    qrCode : {
        type : String,
        label : '二维码',
        optional : true
    },
    tag : {
        type : String,
        optional : true
    }


}));

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

    WeixinGroup.insert(data);
};







Const = {
    WEIXINAPPID : 'wx8fa92ef0af489460',
    VERIFYSTATE : 'qunhaiwai'
};

Const.CKEditor = {
    config : {
        toolbar : [
            []
        ],
        uiColor : '#ccc',

        fontSize_sizes : '16/16px;24/24px;48/48px;',
        skin : 'moono'
    }
};


if(Meteor.isServer){
    // only in server
    Const.WEIXINAPPSECRET = '25d1d993736b5e0807a88b4fc2b445a6';
}
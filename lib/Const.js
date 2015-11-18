

Const = {
    WEIXINAPPID : 'wx8fa92ef0af489460',
    VERIFYSTATE : 'qunhaiwai'
};

Const.CKEditor = {
    config : {
        toolbar : [
            {
                name : 'basicstyles',
                items : ['Bold', 'Italic', 'Strike']
            },
            {
                name : 'paragraph',
                items : ['NumberedList', 'BulletedList']
            },
            {
                name : 'insert',
                items : ['Image']
            }
        ],
        toolbarLocation : 'bottom',
        uiColor : '#cccccc',

        //removePlugins : 'image',

        fontSize_sizes : '16/16px;24/24px;48/48px;',
        skin : 'moono'
    },

    style : [

    ]

};


if(Meteor.isServer){
    // only in server
    Const.WEIXINAPPSECRET = '25d1d993736b5e0807a88b4fc2b445a6';
}
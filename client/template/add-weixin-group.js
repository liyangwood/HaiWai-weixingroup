
Template.addWeixinGroup.helpers({
    categoryList : function(){
        return WeixinGroupCategory;
    }
});

var F = {
    submit : function(callback){
        var elem = $('.js_form');

        var data = {
            name : util.findRole(elem, 'name').val(),
            catId : util.findRole(elem, 'catId').val(),
            tag : util.findRole(elem, 'tag').val(),
            location : util.findRole(elem, 'location').val(),
            description : util.findRole(elem, 'description').val(),

            owner : '',
            ownerId : util.findRole(elem, 'ownerId').val(),
            image : util.findRole(elem, 'image').val(),
            qrCode : util.findRole(elem, 'qrCode').val(),
            postCode : util.findRole(elem, 'postCode').val(),
            memberCount : util.findRole(elem, 'memberCount').val()
        };


        console.log(data);

        WeixinGroup.insertData(data, function(err, rs){
            if(rs){
                alert('添加成功');

                callback(true)
            }
            else{
                //console.log(err);
                alert(err);
                callback(false);
            }
        });
    }
};

Template.addWeixinGroup.events({
    //'submit form': function(e){
    //    e.preventDefault();
    //
    //    var elem = $(e.target);
    //
    //
    //},

    'click .js_btn1' : function(e){
        var o = $(e.target);
        o.button('loading');

        F.submit(function(f){
            o.button('reset');

            if(f){
                Router.go('weixin-group-list');
            }
        });
    },
    'click .js_btn2' : function(e){

        var o = $(e.target);
        o.button('loading');

        F.submit(function(f){
            o.button('reset');

            if(f){
                window.location.reload();
            }
        });
    },

    'change [role="upload_image"]' : function(e){
        var files = e.target.files;
        if(files){
            var elem = $(e.target).closest('.js_box');

            var btn = elem.find('.js_uploadbtn'),
                img = elem.find('.js_img');

            btn.button('loading');
            util.uploadImage(files[0], function(flag, url){
                console.log(flag, url);
                if(flag){
                    elem.find('input[type="hidden"]').val(url);
                    img.attr('src', url).show();
                    btn.button('reset');
                }
            });
        }
    }
});
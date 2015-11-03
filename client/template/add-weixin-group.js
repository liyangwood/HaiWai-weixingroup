
Template.addWeixinGroup.events({
    'submit form': function(e){
        e.preventDefault();

        var elem = $(e.target);

        var data = {
            name : util.findRole(elem, 'name').val(),
            category : util.findRole(elem, 'category').val(),
            tag : util.findRole(elem, 'tag').val(),
            location : util.findRole(elem, 'location').val(),
            description : util.findRole(elem, 'description').val(),

            owner : 'Jacky',
            ownerId : 'jacky112233',
            image : util.findRole(elem, 'image').val(),
            qrCode : ''
        };



        WeixinGroup.insertData(data, function(err, rs){
            if(rs){
                alert('添加成功');

                Router.go('/');
            }
            else{
                console.log(err);
                alert(err);
            }
        });
    },
    'change [role="upload_image"]' : function(e){
        var files = e.target.files;
        if(files){
            var btn = $('.js_uploadbtn'),
                img = $('.js_img');

            btn.button('loading');
            util.uploadImage(files[0], function(flag, url){
                console.log(flag, url);
                if(flag){
                    util.findRole($(document), 'image').val(url);
                    img.attr('src', url).show();
                    btn.button('reset');
                }
            });
        }
    }
});
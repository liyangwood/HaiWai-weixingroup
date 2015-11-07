Template.addFeed.events({
    'change [role="upload_image"]' : function(e){
        var files = e.target.files;
        if(files){
            var elem = $(e.target).closest('.js_box');

            var btn = elem.find('.js_uploadbtn');

            btn.button('loading');
            util.uploadImage(files[0], function(flag, url){
                console.log(flag, url);
                if(flag){
                    btn.button('reset');
                    var img_str = '<img src="'+url+'" style="width: 50px; height: 50px;" class="js_img" />';
                    $('.js_image_box').append(img_str);
                }
            });
        }
    },

    'click .js_btn1' : function(e){
        var elem = $('.js_form');

        var title = util.findRole(elem, 'title').val(),
            content = util.findRole(elem, 'content').val();

        var list = util.map(elem.find('.js_image_box').find('img'), function(o){

            return $(o).attr('src');
        });

        var btn = $(e.target);

        var sid = Router.current().params.sid;

        btn.button('loading');
        DB.Feed.insertData({
            title : title,
            content : content,
            images : list,
            wxSpaceId : Router.current().params.sid
        }, function(err, rs){
            btn.button('reset');
            if(rs){
                Router.go('wxSpaceList', {
                    sid : sid
                });
            }
        });
    }
});

Template.addFeed.helpers(function(){

});
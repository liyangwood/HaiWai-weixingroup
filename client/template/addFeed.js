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
                    var img_str = '<img src="'+url+'" />';

                    var img = CKEDITOR.dom.element.createFromHtml(img_str);
                    F.ck.insertElement(img);
                }
            });
        }
    },

    'click .js_btn1' : function(e){
        //if(!util.user.isLogin()){
        //    util.message.publish('main-login');
        //
        //    return;
        //}


        var elem = $('.js_form');

        var title = util.findRole(elem, 'title').val(),
            content = F.ck.getData();



        var list = util.map(elem.find('.js_image_box').find('img'), function(o){

            return $(o).attr('src');
        });

        var btn = $(e.target);

        var sid = Router.current().params.sid;

        btn.button('loading');
        DB.Feed.insertData({
            title : title,
            content : encodeURIComponent(content),
            images : list,
            wxSpaceId : Router.current().params.sid
        }, function(err, rs){
            btn.button('reset');
            if(err){
                alert(err);
                return;
            }

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

var F = {
    ck : null,

    loadCKEditor : function(){

        if(typeof CKEDITOR !== 'undefined'){

            //覆盖image button
            CKEDITOR.on('instanceReady', function (ev) {
                var editor = ev.editor;
                var overridecmd = new CKEDITOR.command(editor, {
                    exec: function(editor){
                        $('[role="upload_image"]').trigger('click');
                    }
                });

                // Replace the old save's exec function with the new one
                ev.editor.commands.image.exec = overridecmd.exec;
            });

            F.ck = CKEDITOR.appendTo('js_textarea', util.extend(Const.CKEditor.config, {

            }));

        }
        else{
            util.delay(F.loadCKEditor, 200);
        }

    }
};

Template.addFeed.onRendered(function(){
    F.loadCKEditor();


});
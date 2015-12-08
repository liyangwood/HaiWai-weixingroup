Template.AdminGroupList.helpers({
    list : function(){
        var sort = {
            createTime : -1
        };

        var query = {};


        return WeixinGroup.find(query, {
            sort : sort
        });
    }
});

Template.AdminGroupList.events({
    'click .js_del' : function(e){
        var o = $(e.currentTarget),
            id = o.attr('param');

        if(confirm('确认删除这个群？')){
            WeixinGroup.remove({
                _id : id
            });
        }


    }
});

Template.AdminGroupEdit.helpers({
    data : function(){
        var groupId = Router.current().params['groupId'];

        var rs = WeixinGroup.findOne({
            _id : groupId
        });

        Session.set('Admin-group-edit-data', rs);
        return rs;
    },
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

        WeixinGroup.updateData(Router.current().params['groupId'], data, function(err, rs){
            if(rs){
                alert('update success');

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

Template.AdminGroupEdit.events({

    'click .js_btn1' : function(e){
        var o = $(e.target);
        o.button('loading');

        F.submit(function(f){
            o.button('reset');

            if(f){
                Router.go('/admin/group/list');
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

Template.AdminGroupEdit.onRendered(function(){
    var data = Session.get('Admin-group-edit-data');

    var elem = $('.js_form');
    util.findRole(elem, 'catId').find('[value="'+data.catId+'"]').attr('selected', true);
    util.findRole(elem, 'memberCount').find('[value="'+data.memberCount+'"]').attr('selected', true);
});
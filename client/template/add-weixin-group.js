
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
            image : 'http://www.haiwai.com/images/hw_logo1.png',
            qrCode : ''
        };



        WeixinGroup.insert(data, function(err, rs){
            if(rs){
                alert('添加成功');

                Router.go('/');
            }
        });
    }
});


Template.wgItem.helpers({
    data : function(){
        var gid = Session.get('routeParams')[0];

        return WeixinGroup.findOne({'_id':gid});
    }
});

Template.wgItem.events({
    'click .js_addbtn' : function(e){
        var wxid = $('.js_wx').val();
        if(!wxid){
            alert('请填写微信账号');
            return;
        }

        var group = Router.current().params.gid;


        //notice 这里可以直接调用mongo接口插入，用ajax主要是为了以后可能的扩展
        util.ajax({
            url : '/api/wg/add',
            data : {
                id : wxid,
                group : group
            },
            success : function(json){
                if(json.status > 0){
                    alert('添加成功');
                    location.reload();
                }
                else{
                    alert(json.data);
                }
            }

        });
    }
});
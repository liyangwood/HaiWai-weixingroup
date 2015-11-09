
var F = {
    sendJson : function(status, data, statusText){
        var rs = {
            data : data
        };

        if(status > 0){
            rs.status = status;
            rs.statusText = statusText || 'ok';
        }
        else if(status < 0){
            rs.status = status;
            rs.statusText = statusText || 'error';
        }
        else{
            throw 'status is can not be 0';
        }


        return JSON.stringify(rs);
    },
    getParams : function(type){
        var rs;

        if(type === 'get'){
            rs = this.params.query;
        }
        else if(type === 'post'){

        }

        return rs;
    }
};

Router.route('/api/wg/add', {
    where : 'server'
}).get(function(){
    var query = F.getParams.call(this, 'get');

    var id = query.id,
        group = query.group;

    var self = this;
    DB.WantToAddGroup.insertData({
        groupId : group,
        wechatId : id
    }, function(err, rs){
        if(err){
            self.response.end(F.sendJson(-1, err));
        }
        else{
            self.response.end(F.sendJson(1, rs));
        }
    })
});


var util = {};

_.extend(util, _);

util.ajax = function(opts){
    util.extend({
        url : '',
        type : 'get',
        dataType : 'json',
        data : {},
        success : function(){},
        error : function(){}
    }, opts||{});

    $.ajax(opts);
};

util.extend(util, {
    findRole : function(elem, name){
        return elem.find('[role="'+name+'"]');
    },


    uploadImage : function(file, callback){
        var root = 'http://beta.haiwai.com';
console.log(file);
        if(!file) return;

        var fr = new FileReader();
        fr.onload = function(e){
            var binary = e.target.result;

            util.ajax({
                url : root + '/service/api/?func=article&act=upload',
                type : 'post',
                dataType : 'json',
                data : {
                    type : 'image',
                    'uploadfield[]' : binary
                },
                success : function(rs){
                    if(rs.status>0){
                        callback(true, root+rs.return.files[0]);
                    }
                }
            });
        };

        fr.readAsDataURL(file);
    }
});








(function(){
    this.util = util;
})();

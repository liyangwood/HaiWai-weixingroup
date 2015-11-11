

var util = {};

_.extend(util, _);

util.ajax = function(opts){
    opts = util.extend({
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
    },

    formatDate : function(date, format){
        var d = new Date(date);
        var year = d.getFullYear(),
            month = addZero(d.getMonth() + 1),
            day = addZero(d.getDate()),
            hour = addZero(d.getHours()),
            min = addZero(d.getMinutes()),
            sec = addZero(d.getSeconds());

        function addZero(x){
            if(x<10) return '0'+x;
            return x;
        }

        return format.replace('yy', year).replace('mm', month).replace('dd', day).replace('h', hour).replace('m', min).replace('s', sec);
    }
});

util.message = {
    register : function(name, callback){
        $('body').bind(name, callback);
    },
    publish : function(name, data){
        $('body').trigger(name, data);
    }
};

util.showModal = function(opts, elem){
    elem = elem?$(elem):$('#js_modal');

    opts = util.extend({
        backdrop : 'static'
    }, opts||{});

    //use bootstrap modal
    $(elem).modal(opts);
    return $(elem).find('.js_content');
};







(function(){
    this.util = util;
})();

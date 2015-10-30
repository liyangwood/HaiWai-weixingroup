

var util = {};

_.extend(util, _);

util.extend(util, {
    findRole : function(elem, name){
        return elem.find('[role="'+name+'"]');
    }
});







(function(){
    this.util = util;
})();

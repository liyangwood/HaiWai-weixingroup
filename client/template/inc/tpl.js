
Template.listFilterBox.helpers({
   categoryList : function(){
       return WeixinGroupCategory;
   }
});

Template.listFilterBox.events({
    'change .js_cat' : function(e){
        var o = $(e.target),
            val = o.val();


        util.message.publish('ChangeListFilter', {
            catId : val
        });
    }
});
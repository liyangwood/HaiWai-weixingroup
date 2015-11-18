Template.registerHelper('formatDate', function(date) {


    return util.formatDate(date, 'yy-mm-dd h:m:s');
});

Template.registerHelper('decode', function(html){
    return decodeURIComponent(html);
});

Template.registerHelper('removeAllTag', function(html){
    html = decodeURIComponent(html);

    var reg = /(<([^>]+)>)/ig;
    return html.replace(reg, '');
});
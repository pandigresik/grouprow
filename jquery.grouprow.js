(function( $ ) {
var mergeRow = function(elm,arrayClass){
    for(var i in arrayClass){
        var rowspan = $(elm).find('td[data-group='+arrayClass[i]+']').size();
        if(rowspan > 1){
            $(elm).find('td[data-group='+arrayClass[i]+']').eq(0).attr('rowspan',rowspan);
            $(elm).find('td[data-group='+arrayClass[i]+']:gt(0)').remove();
        }
    }
}    

$.fn.grouprow = function(options){
    // default value
    var defaults = {
        'maxNumberChar' : 20,
        'columnGroup'  : [0],
        'parentGroup'  : {} 
        // null berarti tanpa parent, {'1':'0'} berarti batas maximalnya adalah baris terakhir dari rowspan kolom 0
    },
    settings = $.extend({},defaults,options);
    var $elm = this;
    var classContainer = []; // simpan nama class yang akan digrouping
    $elm.find('tbody tr').each(function(){
        // tambahkan class kepada td yang akan digroup
        var groupColumn = settings.columnGroup;
        var parentGroup = settings.parentGroup;
        for(var i in groupColumn){
            var curTd = $(this).find('td').eq(groupColumn[i]);
            var tdClass = '_'+groupColumn[i]+curTd.text().replace(/\s/g, ''); // remove space character
            var curParent = parentGroup[groupColumn[i].toString()];
             if(typeof curParent !== 'undefined'){
                var parentClass = curTd.parent('tr').find('td').eq(curParent).text().replace(/\s/g, '');
                tdClass +=parentClass;   
            }
            curTd.attr('data-group',tdClass);   
            if(classContainer.indexOf(tdClass) == -1){
                classContainer.push(tdClass);
            }
            
        } 
    })
    
    mergeRow(this,classContainer);
   
    return this;
};
})( jQuery );

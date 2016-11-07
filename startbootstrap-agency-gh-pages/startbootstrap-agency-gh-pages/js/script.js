/**
 * Created by User on 2016-11-02.
 */

function searchText(){
    var url = "#services"
    if(event.keyCode == 13){
        var searchText = $('#searchText').val();
        $(location).attr('href', url);
        $('#table_header').text("Book Title : " + searchText);

        $('#nav_input').attr('type', 'text');
        $('#nav_input').val("  " + searchText);
        $('#table_result_details').text(($("#table > tbody > tr:first > td").length) + " results");
    }
}

function searchClick(){
    var url = "#services"
    var searchText = $('#searchText').val();
    $(location).attr('href', url);
    $('#table_header').text("Book Title : " + searchText);

    $('#nav_input').attr('type', 'text');
    $('#nav_input').val("  " + searchText);
    $('#table_result_details').text(($("#table > tbody > tr:first > td").length) + " results");
}

function searchNavText(){
    var url = "#services"
    if(event.keyCode == 13){
        var searchText = $('#nav_input').val();
        $(location).attr('href', url);
        $('#table_header').text("Book Title : " + searchText);

        var cols = $("table").find("tr:first td");
        var count = 0;
        for(var i = 0; i < cols.length; i++)
        {
            var colspan = cols.eq(i).attr("colspan");
            if( colspan && colspan > 1)
            {
                count += colspan;
            }else{
                count++;
            }
        }
        $('#nav_input').attr('type', 'text');
        $('#nav_input').val("  " + searchText);
        $('#table_result_details').text(($("table > tbody > tr:first > td").length-1) + " results");
    }
}

function table_sort(){
    alert("table sort button clicked");
}

function addBookClick(){
    var title = $('#add_title').val();
    var author = $('#add_author').val();
    var price = $('#add_price').val();

    alert("title : " + title + " / author : " + author + " / price : " + price)
}

function table_update(){

}

function table_delete(){

}

function showlist(){

}

$("#fileUpload").on('change', function () {

    if (typeof (FileReader) != "undefined") {

        var image_holder = $("#image-holder");
        image_holder.empty();

        var reader = new FileReader();
        reader.onload = function (e) {
            $("<img />", {
                "src": e.target.result,
                "class": "thumb-image"
            }).appendTo(image_holder);

        }
        image_holder.show();
        reader.readAsDataURL($(this)[0].files[0]);
    } else {
        alert("This browser does not support FileReader.");
    }
});
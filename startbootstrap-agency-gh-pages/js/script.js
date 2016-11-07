/**
 * Created by User on 2016-11-02.
 */

var resultArr = [];
var clickcount = 0;
var resultCount = 0;

// end
window.onload = function() {
    $('#searchText').focus();
    $(window).scroll(function(){
        //console.log($(window).scrollTop());
        if($(window).scrollTop() < 1000){
            $('#nav_input').attr('type', 'hidden');
        }else{
            $('#nav_input').attr('type', 'text');
        }
    })
}

// end
function searchText(){
    if(event.keyCode == 13){
        var url = "#services"
        var searchText = $('#searchText').val();
        $(location).attr('href', url);
        $('#table_header').text("Book Title : " + searchText);
        $('#tbody').empty();

        $.ajax({
            url : "http://localhost:7070/book/bookList",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",
            data : {
                keyword : $('#searchText').val()
            },
            success : function(result){

                resultCount = result.length;
                resultArr = result;
                showlist(result);
                $('#table_result_details').text(result.length + " results");

            },
            error : function(){
                alert("error")
            }
        });

        $('#nav_input').attr('type', 'text');
        $('#nav_input').val("  " + searchText);
    }
}

// end
function searchClick(){
    var url = "#services"
    var searchText = $('#searchText').val();
    $(location).attr('href', url);
    $('#table_header').text("Book Title : " + searchText);
    $('#tbody').empty();

    $.ajax({
        url : "http://localhost:7070/book/bookList",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            keyword : $('#searchText').val()
        },
        success : function(result){
            resultCount = result.length;
            resultArr = result;
            showlist(result);
            $('#table_result_details').text(result.length + " results");

        },
        error : function(){
            alert("error")
        }
    });

    $('#nav_input').attr('type', 'text');
    $('#nav_input').val("  " + searchText);
}

// end
function searchNavText(){
    if(event.keyCode == 13){
        var url = "#team"
        var searchText = $('#nav_input').val();
        $(location).attr('href', url);
        $('#tbody_2 > tr').remove();

        $.ajax({
            url : "http://localhost:7070/book/bookSearchComment",
            type : "GET",
            dataType : "jsonp",
            jsonp : "callback",
            data : {
                comment : searchText
            },
            success : function(result){
                showComment(result);
            },
            error : function(){
                alert("Error Code : select")
            }
        });
    }
}

// end
function table_sort(){
    clickcount++;
    if(clickcount % 2 == 0){
        resultArr.sort(function(a, b){return a.price - b.price});
        $('tbody tr').remove();
        showlist(resultArr);
    } else {
        resultArr.sort(function(a, b){return b.price - a.price});
        $('tbody tr').remove();
        showlist(resultArr);
    }
}

// end
function showlist(result){
    for(var i = 0; i < result.length; i++) {
        var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);

        var img = $("<img />").attr("src", result[i].imgbase64);
        var imgTd = $("<td></td>").append(img);
        var titleTd = $("<td></td>").text(result[i].title);
        var authorTd = $("<td></td>").text(result[i].author);
        var priceTd = $("<td></td>").text(result[i].price);

        var updateTd = $("<input/>").attr("type", "button").attr("value", "Update").on("click", table_update).attr('id', 'updatebtn');
        var updatebtntd = $("<td></td>").append(updateTd);

        var deleteTd = $("<input/>").attr("type", "button").attr("value", "Delete").on("click", table_delete).attr('id', 'deletebtn');
        var deletebtntd = $("<td></td>").append(deleteTd);

        var detailTd = $("<input/>").attr("type", "button").attr("value", "Details").on("click", table_details).attr('id', 'detailbtn');
        var detailbtntd = $("<td></td>").append(detailTd);

        var showcommentTd = $("<input/>").attr("type", "button").attr("value", "Show").on("click", table_showComment).attr('id', 'showComment');
        var showcommentbtTd = $("<td></td>").append(showcommentTd);

        if(result[i].member_id == null) {
            var reserveTd = $("<input/>").attr("type", "button").attr("value", "Reserve").on("click", table_reserve).attr('id', 'reserve');
        }else{
            var reserveTd = $("<input/>").attr("type", "button").attr("value", "Return").on("click", table_reserve).attr('id', 'reserve');
        }
        var reservebtTd = $("<td></td>").append(reserveTd);
        var member_id = $("<td></td>").text(result[i].member_id).attr('id', 'reserve_member_id');

        tr.append(imgTd);
        tr.append(titleTd);
        tr.append(authorTd);
        tr.append(priceTd);
        tr.append(updatebtntd);
        tr.append(deletebtntd);
        tr.append(detailbtntd);
        tr.append(showcommentbtTd);
        tr.append(reservebtTd);
        tr.append(member_id);
        $("#tbody").append(tr);
    }
}

//
function table_update(){
    var title = $(this).parent().parent().find("td:nth-child(2)").text();
    var author = $(this).parent().parent().find("td:nth-child(3)").text();
    var price = $(this).parent().parent().find("td:nth-child(4)").text();

    var titlebox = $("<input />").attr("type", "text").val(title);
    var authorbox = $("<input />").attr("type", "text").val(author);
    var pricebox = $("<input />").attr("type", "text").val(price);
    var commitbtn = $("<input />").attr("type", "button").attr("value","Update").attr("id", "commitbtn");

    $(this).parent().parent().find("td:nth-child(2)").text("");
    $(this).parent().parent().find("td:nth-child(2)").append(titlebox);
    $(this).parent().parent().find("td:nth-child(3)").text("");
    $(this).parent().parent().find("td:nth-child(3)").append(authorbox);
    $(this).parent().parent().find("td:nth-child(4)").text("");
    $(this).parent().parent().find("td:nth-child(4)").append(pricebox);
    $(this).parent().parent().find("td:nth-child(5) > input:first").hide();
    $(this).parent().parent().find("td:nth-child(5)").append(commitbtn);

    commitbtn.on("click", function () {
        var isbn = $(this).parent().parent().attr("data-isbn");
        var title = $(this).parent().parent().find("td:nth-child(2) > input").val();
        var author = $(this).parent().parent().find("td:nth-child(3) > input").val();
        var price = $(this).parent().parent().find("td:nth-child(4) > input").val();

        var tr = $(this).parent().parent();

        $.ajax({
            url: "http://localhost:7070/book/bookUpdate",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                isbn: isbn,
                title: title,
                author: author,
                price: price
            },
            success: function () {
                tr.find("td:nth-child(2)").empty();
                tr.find("td:nth-child(2)").text(title);
                tr.find("td:nth-child(3)").empty();
                tr.find("td:nth-child(3)").text(author);
                tr.find("td:nth-child(4)").empty();
                tr.find("td:nth-child(4)").text(price);
            },
            error: function () {
                alert("Updated, Error!");
            }
        });
        $(this).parent().parent().find("td:nth-child(5) > input:first").show();
        $(this).parent().parent().find("td:nth-child(5) > input:nth-child(2)").remove();
    });
}

//
function table_delete(){
    $(this).parent().parent().remove();
    console.log(resultCount);
    resultCount--;
    $('#table_result_details').text(resultCount + " results");
}

var isbn = null;
var comment_title = null;
var comment_author = null;

function table_details(){
    isbn = $(this).parent().parent().attr("data-isbn");
    comment_title = $(this).parent().parent().find("td:nth-child(2)").text();
    comment_author = $(this).parent().parent().find("td:nth-child(3)").text();

    var url = "#portfolio"
    $(location).attr('href', url);

    $.ajax({
        url : "http://localhost:7070/book/bookDetail",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            keyword : isbn
        },
        success : function(result){
            $('#detail_image').attr('src', result[0].imgbase64);
            $('#detail_title').text(result[0].title);
            $('#detail_author').text(result[0].author);
            $('#detail_price').text(result[0].price);
            $('#detail_date').text(result[0].date);
            $('#detail_isbn').text(result[0].isbn);
            $('#detail_page').text(result[0].page);
            $('#detail_translator').text(result[0].translator);
            $('#detail_supplement').text(result[0].supplement);
            $('#detail_publisher').text(result[0].publisher);
        },
        error : function(){
            alert("Error Code : select")
        }
    });
}

function addBookClick(){
    var imgbase64 = $('#add_image').attr("src");
    var isbn = $('#add_isbn').val();
    var title = $('#add_title').val();
    var author = $('#add_author').val();
    var price = $('#add_price').val();

    var date = $('#add_date').val();
    var page = $('#add_page').val();
    var translator = $('#add_translator').val();
    var publisher = $('#add_publisher').val();

    $.ajax({
        url : "http://localhost:7070/book/bookAdd",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            isbn : isbn,
            title : title,
            author : author,
            price : price,
            date : date,
            page : page,
            translator : translator,
            publisher : publisher,
            imgbase64 : imgbase64
        },
        success : function(){
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
        },
        error : function(){
            alert("error")
        }
    });
}

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function openModal(){
    var login_text = $('#nav_login').text();

    $('#login_input_id').focus();

    if(login_text === "Login"){
        document.getElementById('id01').style.display='block';
    }else {
        var xx = "t";
        $.ajax({
            url:"http://localhost:7070/book/sessionCheck",
            type: "GET",
            dataType : "jsonp",
            jsonp : "callback",
            data:{
                quit : xx
            },
            success : function(result){
                $('#nav_login').text("Login");
                $('#nav_signin').show();
                // logout logic
                var x = document.getElementById("snackbar_logout_admin");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 2000);
            },
            error : function(){
                alert("Server Error");
            }
        });
    }
}

function button_login() {
    logincheck();

}

function password_login(){
    if(event.keyCode == 13){
        logincheck();
    }
}

function logincheck(){
    var id = $('#login_input_id').val();
    var password = $('#login_input_password').val();

    $.ajax({
        url: "http://localhost:7070/book/booklogin",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",

        data: {
            id: id,
            password: password
        },
        success: function (result) {
            if (result == true) {
                // $(location).attr('href', "index.html");
                var modal = document.getElementById('id01');
                modal.style.display = "none";
                $('#nav_login').text("logout");

                var x = document.getElementById("snackbar_login_success_admin");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 2000);
                $('#nav_signin').hide();
                $.modal.close();
            }
            else {
                $('#login_input_id').val("");
                $('#login_input_password').val("");
                var x = document.getElementById("snackbar_login_fail");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 2000);
            }
        },
        error: function () {
            alert("Server Error");
        }
    });
}

function openModal_signin(){

    document.getElementById('id02').style.display='block';

}

function button_signin(){
    var id = $('#signin_input_id').val();
    var password = $('#signin_input_password').val();
    var email = $('#signin_input_email').val();

    if(id == "" || password == "" || email == ""){
        var x = document.getElementById("snackbar_login_fail");
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 2000);
    }else {
        $.ajax({
            url: "http://localhost:7070/book/insertMember",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                id: id,
                password: password,
                email: email
            },
            success: function () {
                var modal = document.getElementById('id02');
                modal.style.display = "none";

                var x = document.getElementById("snackbar_signin_success");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 2000);

                $.modal.close();
            },
            error: function () {
                alert("Server Error");
            }
        });
    }
}

var id = 0;

function addBookCommentClick() {
    var comment_text = $('#comment_text').val();
    var d = new Date();
    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();

    if(comment_text ==  null){
        var x = document.getElementById("snackbar_login_fail");
        x.className = "show";
        setTimeout(function () {
            x.className = x.className.replace("show", "");
        }, 2000);
    }else {
        $.ajax({
            url: "http://localhost:7070/book/addComment",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                id: id,
                isbn: isbn,
                title: comment_title,
                author: comment_author,
                date: strDate,
                comment: comment_text
            },
            success: function () {
                var x = document.getElementById("snackbar_addcomment_success");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 2000);
                id++;
            },
            error: function () {
                alert("Server Error");
            }
        });
    }
}


function table_showComment(){
    isbn = $(this).parent().parent().attr("data-isbn");
    var url = "#team";
    $(location).attr('href', url);

    $('#tbody_2 > tr').remove();

    $.ajax({
        url : "http://localhost:7070/book/bookShowComment",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            isbn : isbn
        },
        success : function(result){

            showComment(result);
        },
        error : function(){
            alert("Server Error")
        }
    });
}

function showComment(result) {
        for(var i = 0; i < result.length; i++) {
            var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);
            var id = $("<td></td>").attr('id', 'comment_id').text(result[i].id);
            var isbn = $("<td></td>").text(result[i].isbn);
            var title = $("<td></td>").text(result[i].title);
            var author = $("<td></td>").text(result[i].author);
            var date = $("<td></td>").text(result[i].date);
            var comment_text = $("<td></td>").text(result[i].comment);
            var member_id = $("<td></td>").text(result[i].member_id);
            var updateTd = $("<input/>").attr("type", "button").attr("value", "Update").on("click", comment_update).attr('id', 'comment_update');
            var updatebtntd = $("<td></td>").append(updateTd);

            var deleteTd = $("<input/>").attr("type", "button").attr("value", "Delete").on("click", comment_delete).attr('id', 'comment_delete');
            var deletebtntd = $("<td></td>").append(deleteTd);

            tr.append(id);
            tr.append(isbn);
            tr.append(title);
            tr.append(author);
            tr.append(date);
            tr.append(comment_text);
            tr.append(member_id);
            tr.append(updatebtntd);
            tr.append(deletebtntd);
            $("#tbody_2").append(tr);
    }
}

function comment_update(){
    var number = $(this).parent().parent().find("td:first-child").text();
    var comment = $(this).parent().parent().find("td:nth-child(6)").text();

    var commentbox = $("<input />").attr("type", "text").val(comment);
    var commitbtn = $("<input />").attr("type", "button").attr("value","Update").attr("id", "commitbtn");

    $(this).parent().parent().find("td:nth-child(6)").text("");
    $(this).parent().parent().find("td:nth-child(6)").append(commentbox);
    $(this).parent().parent().find("td:nth-child(8) > input:first").hide();
    $(this).parent().parent().find("td:nth-child(8)").append(commitbtn);

    commitbtn.on("click", function () {
        var comment= $(this).parent().parent().find("td:nth-child(6) > input").val();

        var tr = $(this).parent().parent();

        $.ajax({
            url: "http://localhost:7070/book/bookUpdateComment",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data: {
                number: number,
                comment : comment
            },
            success: function() {
                tr.find("td:nth-child(6)").empty();
                tr.find("td:nth-child(6)").text(comment);
            },
            error: function() {
                alert("Updated, Error!");
            }
        });
        $(this).parent().parent().find("td:nth-child(8) > input:first").show();
        $(this).parent().parent().find("td:nth-child(8) > input:nth-child(2)").remove();
    });
}

function comment_delete(){
    var number = $(this).parent().parent().find("td:first-child").text();

    $.ajax({
        url : "http://localhost:7070/book/bookDeleteComment",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            number : number
        },
        success : function(result){
            if(result == true)
                $(this).parent().parent().remove();
            var x = document.getElementById("snackbar_deletecomment_fail");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 2000);
        },
        error : function(){
            alert("Server Error")
        }
    });
}


function table_reserve(){
    var isbn  = $(this).parent().parent().attr("data-isbn");
    if($('#reserve').val() === "Reserve"){
        reserve_book(isbn);
    }else{
        return_book(isbn);
    }
}

function reserve_book(isbn){
    $.ajax({
        url : "http://localhost:7070/book/bookReserve",
        type : "GET",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            isbn : isbn
        },
        success : function(){
            var x = document.getElementById("snackbar_reserve_complete");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 2000);
        },
        error : function(){
            alert("Server Error")
        }
    });
}

function return_book(isbn){
    $.ajax({
        url: "http://localhost:7070/book/bookReturn",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data: {
            member_id : "null",
            isbn: isbn
        },
        success: function () {
            var x = document.getElementById("snackbar_return_complete");
            x.className = "show";
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 2000);
            $(this).parent().parent().find("td:nth-last-child(10)").text("null");
        },
        error: function () {
            alert("Server Error")
        }
    });
}


function table_reserve_(){
    var isbn  = $(this).parent().parent().attr("data-isbn");
    $('#reserve_member_id').text("null");


    // $.ajax({
    //     url : "http://localhost:7070/book/bookReserve",
    //     type : "GET",
    //     dataType : "jsonp",
    //     jsonp : "callback",
    //     data : {
    //         isbn : isbn
    //     },
    //     success : function(){
    //         var x = document.getElementById("snackbar_reserve_complete");
    //         x.className = "show";
    //         setTimeout(function () {
    //             x.className = x.className.replace("show", "");
    //         }, 2000);
    //         $(this).parent().parent().find("td:nth-child(9)").hide();
    //
    //     },
    //     error : function(){
    //         alert("Server Error")
    //     }
    // });
    //
    // $(this).parent().parent().find("td:nth-child(9)").hide();
    // var commitbtn = $("<input />").attr("type", "button").attr("value","Return").attr("id", "commitbtn");
    // $(this).parent().parent().find("td:nth-child(9)").append(commitbtn);

    // commitbtn.on("click", function () {
    //     $(this).parent().parent().find("td:nth-child(9)").show();
    //     $.ajax({
    //         url: "http://localhost:7070/book/bookReturn",
    //         type: "GET",
    //         dataType: "jsonp",
    //         jsonp: "callback",
    //         data: {
    //             member_id : "null",
    //             isbn: isbn
    //         },
    //         success: function () {
    //             var x = document.getElementById("snackbar_return_complete");
    //             x.className = "show";
    //             setTimeout(function () {
    //                 x.className = x.className.replace("show", "");
    //             }, 2000);
    //         },
    //         error: function () {
    //             alert("Server Error")
    //         }
    //     });
    // });
    // $(this).parent().parent().find("td:nth-child(5)").show();
    // $(this).parent().parent().find("td:nth-child(5) > input:nth-child(5)").remove();
}
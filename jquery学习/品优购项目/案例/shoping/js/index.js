$(function () {
    var toolTop = $(".clock").offset().top;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= toolTop) {
            $(".out-left-menu").fadeIn();
        }
        else {
            $(".out-left-menu").fadeOut();
        }
    });
});
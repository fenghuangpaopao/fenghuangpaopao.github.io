window.onload = function(){
    // preloader
    $('.preloader').addClass('animated fadeOut');
    //window event
    $(window).resize(function(e){
        var ev = e || window.event;
        $('.backstretch').height($(window).height());
        $('.backstretch').width($(window).width());
        $('.backstretch img').height($(window).height());
        $('.backstretch img').width($(window).width());
    });
    $('.backstretch img').height($(window).height());
    $('.backstretch img').width($(window).width());
    var timer = null;
    // home-section
    $('#btn1').on('click',function(){
        $('.home-section').css('left','100%');
        $('.about-section').css('left','0%');
    });
    $('#btn2').on('click',function(){
        $('.content-section').css('left','0%');
        $('.home-section').css('left','-100%');
    });
    $('#btn3').on('click',function(){
        $('.home-section').css('left','0%');
        $('.about-section').css('left','-100%');
    });
    $('#btn4').on('click',function(){
        $('.content-section').css('left','100%');
        $('.home-section').css('left','0%');
    });
    $('#btn5').on('click',function(){
        $('.content-section').css('left','100%');
        $('.home-section').css('left','0%');
    });

    $('.savemessage').on('click',function(){
        var nameValue = $('.contact-name').val()
        var emailValue = $('.contact-email').val();
        var messageValue = $('.contact-message').val();
        if (nameValue==""&&emailValue==""&&messageValue=="") {
            $('.form-row').css({
                "border-bottom":"2px solid red"
            });
            $('.form-right').css({
                "border-bottom":"2px solid red"
            });
            $('.fa-user').css({
                "color":"red"
            });
            $('.fa-envelope-o').css({
                "color":"red"
            });
            $('.fa-pencil-square-o').css({
                "color":"red"
            });
        }
    });
    $('.dong').focus(function(){
        $(this).css("margin-left","-50px");
        $(this).prev().css({
            "margin-left":"-30px",
            "opacity":"0"
        });
    });
    $('.dong').blur(function(){
        $(this).css("margin-left","0px");
        $(this).prev().css({
            "margin-left":"0px",
            "opacity":"1"
        });
    })


    //mosewheel
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true
    });

}

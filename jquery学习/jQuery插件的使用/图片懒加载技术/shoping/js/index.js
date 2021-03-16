$(function () {
    //显示和隐藏电梯导航
    var toolTop = $(".clock").offset().top;

    //点击电梯导航页面可以滚动到相应的内容区域
    $(".out-left-menu li").click(function () {
        flag = false;
        console.log($(this).index());
        var top = $(".household-appliances").eq($(this).index()).offset().top;
        console.log(top);
        $("body,html").stop().animate({
            scrollTop: top
        }, function () {
            flag = true;
        });
        $(this).addClass("current").siblings(this).removeClass();
    });

    var flag = true;
    $(window).scroll(function () {
        toggleTool();
        //当页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if (flag) {
            $(".household-appliances").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    console.log(i);
                    $(".out-left-menu li").eq(i).addClass("current").siblings().removeClass();
                }
            })
        }
    })

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".out-left-menu").fadeIn();
        }
        else {
            $(".out-left-menu").fadeOut();
        }
    }
});
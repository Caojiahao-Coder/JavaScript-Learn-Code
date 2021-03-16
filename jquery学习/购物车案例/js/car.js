$(function () {
    //1. 全选和全不选
    //就是吧全选按钮（checkAll）的状态赋值给三个小的按钮（j-checkbox）

    //点击全选那个按钮来完成全选操作
    $(".checkall").change(function () {
        //全选和全不选
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            //让所有的商品添加这 check-cart-item
            $(".cart-item").addClass("check-cart-item");
        }
        else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });

    /*
        这里我们可以使用 :checked 来获取选中的小按钮
        还可以通过 .length 的方式来获取选中的数量
        */


    //如果判断当小的按钮全部被选中的时候也完成全选操作
    $(".j-checkbox").change(function () {
        $(".checkall").prop("checked", ($(".j-checkbox:checked").length === $(".j-checkbox").length))

        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").addClass("check-cart-item").removeClass("check-cart-item");
        }
    })

    //点击商品item内的加减号修改商品数量
    $(".increment").click(function () {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        var sum = p * n;
        $(this).parent().parent().siblings(".p-sum").html("¥" + sum.toFixed(2));
        getSumPrice();

    })
    //点击商品item内的加减号修改商品数量
    $(".decrement").click(function () {
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        console.log(n);
        //需要考虑一下减去后的值
        if (n > 1)
            n--;
        $(this).siblings(".itxt").val(n);
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        var sum = p * n;
        $(this).parent().parent().siblings(".p-sum").html("¥" + sum.toFixed(2));

        getSumPrice();
    })

    $(".itxt").change(function () {
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html();

        p = p.substr(1);
        var sum = p * n;
        $(this).parent().parent().siblings(".p-sum").html("¥" + sum.toFixed(2));

        getSumPrice();

    })

    //计算总价
    function getSumPrice() {
        //计算总的键数
        var count = 0;
        var money = 0;

        //拿到当前小元素的值
        $(".itxt").each(function (i, ele) {
            var item = $(ele).parent().parent().siblings(".p-checkbox");
            if ($(item).children("input").prop("checked"))
                count += parseInt($(ele).val());
        });

        $(".amount-sum em").text(count);

        $(".p-sum").each(function (i, ele) {
            var item = $(ele).parent().parent().siblings(".p-checkbox");
            if ($(item).children("input").prop("checked"))
                money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("¥" + money.toFixed(2));
    }

    //删除商品
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSumPrice();
    });

    //删除选中的商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSumPrice();
    });

    //清空购物车
    $(".clear-all").click(function () {
        $(".cart-item").each(function (i, ele) {
            $(ele).remove();
            getSumPrice();
        });
    });

})
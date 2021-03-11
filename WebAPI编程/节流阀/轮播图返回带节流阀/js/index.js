window.onload = function () {
    var focus = document.querySelector('.focus');
    var lsArrows = focus.querySelectorAll('.arrow');
    var arrwo_r = focus.querySelector('.arrow-r');
    var arrwo_l = focus.querySelector('.arrow-l');


    var ol_root = document.querySelector('.circle');
    for (var i = 0; i < ol_root.length; i++) {
        ol_root.removeChild(ol_root.childNodes(i));
    }


    focus.addEventListener('mouseover', function () {
        for (let i = 0; i < lsArrows.length; i++) {
            lsArrows[i].style.display = 'block';
        }
        clearInterval(timer);
        timer = null;
    });

    focus.addEventListener('mouseout', function () {
        for (let i = 0; i < lsArrows.length; i++) {
            lsArrows[i].style.display = 'none';
        }
        timer = setInterval(function () {
            arrwo_r.click();
        }, 2000);
    });


    //动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth + 1;


    //还需要设置一些 li index 项目
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li
        var li = document.createElement('li');
        li.setAttribute('index', i);
        li.innerText = '';
        ol.appendChild(li);

        //我们在添加小圆圈的时候绑定 点击事件 搞一个排他思想
        li.addEventListener('click', function () {
            for (var j = 0; j < ol.children.length; j++) {
                var item = ol.children[j].className = "";
            }
            this.className = 'current';

            console.log(focusWidth);
            var index = this.getAttribute('index');
            num = index;
            // 点击后我们需要即使更新
            circle = index;
            //点击小圆圈开始移动图片 （实则 Ul）
            animate(ul, -index * focusWidth);
        });
    }

    //设置 class name 为 current
    ol.children[0].className = 'current';


    //克隆第一张图片放在ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0;
    var circle = 0;

    //节流阀
    var flag = true;


    //左右两侧点击事件
    arrwo_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 这里我们使用无缝滚动技术 思想返回操作
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () { flag = true });
            circle++;


            if (circle == ul.children.length - 1) {
                circle = 0;
            }

            circleChange();
        }

    });

    arrwo_l.addEventListener('click', function () {
     if(flag)
     {
         flag=false;
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
        }
        num--;
        //如何设施 蛋清 current 降级
        animate(ul, -num * focusWidth,function(){flag = true});

        circle--;

        circle = circle < 0 ? ol.children.length - 1 : circle;

        circleChange();
     }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }

        console.log(circle);
        ol.children[circle].className = 'current';
    }

    // 自动播放轮播图
    var timer = setInterval(function () {
        arrwo_r.click();
    }, 2000);
}
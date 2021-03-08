window.addEventListener('load', function () {
    var preview_img = document.querySelector('.content');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.preview-detail');

    //1) 就是在鼠标进入到主图的时候我们需要显示黄色框框和 big 图
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    });

    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    });

    //2) 就是在鼠标移动的时候，让盒子跟着鼠标移动
    preview_img.addEventListener('mousemove', function (e) {
        //1) 先要计算出 鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;

        //3) 我们mask 移动的距离

        //遮挡层最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;

        var maskX = (x - (mask.offsetWidth / 2));
        var maskY = (y - (mask.offsetHeight / 2));


        if (maskX <= 1) {
            maskX = 1;
        }

        if (maskX >= maskMax) {
            maskX = maskMax;
        }


        if (maskY < 1) {
            maskY = 1;
        }

        if (maskY >= maskMax) {
            maskY = maskMax;
        }

        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        //大图片的移动距离 = 遮挡层 * 大图片最大移动距离 / 遮挡层最大移动距离
        //大图
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;

        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    });
});
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(() => {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer)

            callback && callback();
        }
        var step = (target - obj.offsetLeft) / 20;

        //这里还需要注意的是，就是如果我们是从高数值移动到低数值如果使用向上取整，会出现移动精度偏差，所以我们需要在负数时向下取整数
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 10);
};
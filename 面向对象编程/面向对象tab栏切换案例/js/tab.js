var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        // this.remove = this.main.querySelectorAll('.icon-guanbi');
        //set add div to add addTab Method
        this.add = this.main.querySelector('.tabadd')
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }

    //在每次更新后动态的获取对应的元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        //获取所有的关闭按钮
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        //获取所有的span
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }

    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        // init 初始化操作，让相关的元素绑定事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTag;

            //调用删除tab方法
            this.remove[i].onclick = this.removeTab;
            //使用ondblclick 添加元素双击事件
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    //切换功能
    toggleTag() {
        that.clearClassName();
        this.className = "liactive";
        //因为这里指向的是 li 所以不可以使用this
        that.sections[this.index].className = "conactive";
    }

    /**
     * 清空li 和 section的类名
     */
    clearClassName() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    //添加 tab 标签功能
    addTab() {
        //以前的做法，动态创建元素 createElement 但是元素内容比较多， 需要使用 innerHTML赋值，在appendChild追加父元素
        //第一步， 创建新的选项卡li和内容section
        //通过静态的文件创建 对应的 内容
        var li = '<li class="liactive"><span>新增选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = ' <section class="conactive">测试1</section>';
        //第二步， 把创建的两个元素追加到对应  的父元素中
        //我们创建 添加对应的 ul值进行内容创建和添加
        //insertAdjacentHTML 这个是一个 添加元素内容 这个方法支持 元素字符串
        that.clearClassName();
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML("beforeend", section);
        that.init();
    }

    //删除功能 
    removeTab(e) {
        //因为关闭按钮点击事件，但是父亲li也有点击事件，所以需要阻止冒泡
        e.stopPropagation();
        //获取到当前的索引值
        var index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();

        if (document.querySelector('.liactive')) return;

        //当我们删除了选中状态的li的时候，让它前一个li处于选定状态
        index--;
        that.lis[index] && that.lis[index].click();
    }

    //修改功能
    editTab() {
        var str = this.innerHTML;
        //双击禁止选定文字 添加这行代码就可以思想上级不选中文字的效果
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();
        // alert(11);

        //添加一个input表单
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        //这行代码可以让input中的文字处于选中状态
        input.select();

        //当输入框是失去焦点的时候
        input.onblur = function () {
            //完成对显示span的赋值操作
            this.parentNode.innerHTML = this.value;
        };

        //按下回车，也可以让输入的内容添加到指定的内容中
        input.onkeyup = function(e)
        {
            if(e.keyCode === 13)
            {
                this.blur();
            }
        }
    }
}

new Tab('#tab');
var that;
class Tab {
    constructor(id) {
        that = this;
        //获取元素
        this.main = document.querySelector(id);
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        //set add div to add addTab Method
        this.add = this.main.querySelector('.tabadd')
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }

    //获取所有的小li和section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
    }

    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        // init 初始化操作，让相关的元素绑定事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTag;
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
    removeTab() {

    }

    //修改功能
    editTab() {

    }
}

new Tab('#tab');
$(function () {
    load();
    $("input").on("keyup", function (e) {
        //完成了摁下回车键 判断
        if (e.key == "Enter") {
            var localData = getData();
            var item = {
                title: $("input").val(),
                done: false
            };

            //更新local数组 追加操作
            localData.push(item);
            saveData(JSON.stringify(localData));
            $(this).val("");
            load();
        }
    })


    //获取本地数据
    function getData() {
        var data = localStorage.getItem("todo");
        //如果本地有数据 我们需要返回本地数据
        if (data != null) {
            return JSON.parse(data);
        }
        else {
            //如果本地没有数据，我们需要返回一个空的数组对象
            return [];
        }
    }

    //保存本地数据
    function saveData(myData) {
        localStorage.setItem("todo", myData);
    }

    $("ol").on("click", "a", function () {
        var localData = getData();
        localData.splice($(this).attr('inner_index'), 1);
        saveData(JSON.stringify(localData));
        load();
    });

    $("ul").on("click", "a", function () {
        var localData = getData();
        localData.splice($(this).attr('inner_index'), 1);
        saveData(JSON.stringify(localData));
        load();
    });

    $("ol,ul").on("change", "input", function () {
        var index = $(this).siblings("a").attr("inner_index");
        console.log(index);
        var myData = getData();
        myData[index].done = $(this).prop("checked");
        saveData(JSON.stringify(myData));
        load();
    });

    //渲染加载数据
    function load() {
        var todoCount = 0;
        var doneCount = 0;
        $("ol").children().remove();
        $("ul").children().remove();
        $(getData()).each(function (i, item) {
            console.log(item.title);

            if (item.done) {
                doneCount++;
                $("#donelist").prepend("<li><p>" + item.title + "</p><input type='checkbox' checked=true><a href='javascript:;'  inner_index=" + i + " >Del</a></li>");
            }
            else {
                todoCount++;
                $("#todoList").prepend("<li><p>" + item.title + "</p><input type='checkbox' ><a href='javascript:;'  inner_index=" + i + " >Del</a></li>");
            }
        });

        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
});
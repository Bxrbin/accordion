function Accordion(out, option) {
    //判断传进来的行列是否满足页面手风琴的图片数
    if (option.row && option.cro && option.row * option.cro != out.children.length) {
        throw 'row and cro is error'; //Console（控制台）提示错误;
    };
    var defultOption = {
        row: 4,
        cro: 5,
        maxW: 300,
        maxH: 500,
        minW: 200,
        minH: 80
    };
    //赋值--覆盖
    Object.assign(defultOption, option);
    //设置父元素 即整个框架的宽度
    out.style.width = (defultOption.maxW + defultOption.minW * (defultOption.cro - 1)) + 'px';
    //使页面初始状态为0下标的图片放大
    active(0);


    for (var i = 0; i < out.children.length; i++) {
        (function (i) {
            out.children[i].onmouseenter = function () {
                index_ = i;
                active(index_);
            }
        })(i);
    };
    //判断上一个动画是否执行完毕
    var time = null;
    var oTime = new Date().getTime();

    function active(index_) { //执行效果
        var nTime = new Date().getTime();
        if (time) {
            clearTimeout(time); //如果事件触发时有计时器就先关计时器
        };
        if (nTime - oTime < 300) { //如果事件没执行完 就执行事件
            time = setTimeout(function () {
                active(index_);
            }, 300);
            return;
        };
        oTime = nTime; //执行完事件后 现在的时间就变成了老时间


        // 把下标转换为坐标
        showX = index_ % defultOption.cro;
        showY = parseInt(index_ / defultOption.cro);
        for (var x = 0; x < defultOption.cro; x++) {
            for (var y = 0; y < defultOption.row; y++) {
                var index_1 = defultOption.cro * y + x;
                if (showX == x && showY == y) { //自身
                    out.children[index_1].style.width = defultOption.maxW + 'px';
                    out.children[index_1].style.height = defultOption.maxH + 'px';
                } else if (showX == x) { //同一列
                    out.children[index_1].style.width = defultOption.maxW + 'px';
                    out.children[index_1].style.height = defultOption.minH + 'px';
                } else if (showY == y) { //同一行
                    out.children[index_1].style.width = defultOption.minW + 'px';
                    out.children[index_1].style.height = defultOption.maxH + 'px';
                } else { //其余最小的
                    out.children[index_1].style.width = defultOption.minW + 'px';
                    out.children[index_1].style.height = defultOption.minH + 'px';
                }
            }
        }
    };

};

;
(function() {
    function showTab(selector) {
        // 目标盒子
        let target = document.querySelector(selector);
        // 导航盒子
        let tabBox = target.querySelector('.tab_nav');
        // 获取所有的导航
        let tabObjs = tabBox.children;
        // 面板盒子
        let paneBox = target.querySelector('.tab_content');
        // 获取所有的面板
        let panes = paneBox.children;
        // 获取所有的关闭按钮
        let closeObjs = tabBox.getElementsByClassName('close');
        // 获取添加按钮
        let addObj = tabBox.querySelector('.tab_add');
        // 循环为每个导航按钮主策点击事件添加事件处理函数
        function init() {
            let len = (addObj == null) ? tabObjs.length : tabObjs.length - 1;
            for (let i = 0; i < len; i++) {
                // 添加索引
                tabObjs[i].setAttribute('index', i);
                // 注册点击事件
                tabObjs[i].addEventListener('click', handleTabClick, false);
                // 注册关闭事件
                if (closeObjs.length) {
                    closeObjs[i].addEventListener('click', handleClose, false)
                }
            }
        }
        init();
        // 导航按钮事件处理函数
        function handleTabClick() {
            clearStyle(this)
        }
        // 排他法去除样式
        function clearStyle(that) {
            let len = (addObj == null) ? tabObjs.length : tabObjs.length - 1;
            // 排他法
            for (var i = 0; i < len; i++) {
                //所有的按钮移除active 所有的面板隐藏
                tabObjs[i].classList.remove('active')
                panes[i].style.display = 'none'
            }
            //当前元素添加active类样式
            that.classList.add('active');
            // 获取索引
            let index = Number(that.getAttribute('index'));
            // 当前元素对应的tab选项的面板显示
            panes[index].style.display = 'block';
        }
        // 处理所有的关闭按钮
        function handleClose(e) {
            var parent = this.parentElement
            var index = Number(parent.getAttribute('index'));
            var next = tabObjs[index + 1]
            var prev = parent.previousElementSibling
            if (next.nodeName !== 'A' && prev) {
                prev.classList.add('active');
                // 获取索引
                let i = index - 1;
                // 当前元素对应的tab选项的面板显示
                panes[i].style.display = 'block'
            } else if (parent.classList.contains('active') && tabObjs.length > 2) {
                next.classList.add('active');
                // 获取索引
                let i = index + 1;
                // 当前元素对应的tab选项的面板显示
                panes[i].style.display = 'block'
            }
            // 移除对应的父级元素
            parent.remove();
            // 删除对应面板
            panes[index].remove();
            // 重新获取元素
            reGet();
            // 取消冒泡
            e.stopPropagation();
        }
        // 重新获取tab导航元素关闭元素面板元素
        function reGet() {
            tabObjs = tabBox.children;
            panes = paneBox.children;
            closeObjs = tabBox.getElementsByClassName('close');
            init();
        }
        // 添加一个
        function addItem() {
            if (addObj) {
                addObj.addEventListener('click', function() {
                    // 创建a元素
                    var aObj = document.createElement('a');
                    // 创建关闭按钮
                    var spanObj = document.createElement('span');
                    // 创建面板
                    var divObj = document.createElement('div');

                    // 导航按钮
                    aObj.innerText = '导航'
                    aObj.href = 'javascript:;'

                    // 删除按钮
                    spanObj.classList.add('close')
                    spanObj.innerText = '✘'

                    // 面板
                    divObj.classList.add('tab_pane');
                    divObj.innerText = '导航面板'

                    // 追加
                    aObj.appendChild(spanObj);
                    this.parentElement.insertBefore(aObj, this)
                    paneBox.appendChild(divObj);

                    // 重新获取元素
                    reGet()
                    clearStyle(aObj)
                }, false)
            }
        }
        addItem()
    }

    // 暴露给window
    window.showTab = showTab
})()
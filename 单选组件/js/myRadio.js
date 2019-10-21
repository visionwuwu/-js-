;
(function() {
    /**组件传递的属性
     * value 绑定值
     * name 原生name属性
     * disabled 是否全部禁用
     * size 组件大小 (仅在border为真时有效)
     * border 是否有边框
     * radioNum 单选个数
     * innerText label中的文字
     * forbidden 禁用数组
     */

    /**默认参数
     * disabled false
     */
    const DEFAULTS = {
        disabled: false
    }

    // 定义渲染函数
    var myRadioGroup = function(id, config) {
        // 合并配置数据
        var newObj = Object.assign({}, DEFAULTS, config)

        // 没传forbidden 给false 传了使用forbidden
        newObj.forbidden = newObj.disabled ? false : newObj.forbidden

        // 组件容器对象
        var target = document.getElementById(id)

        // 定义模板
        var tmp = ''

        tmp += '<div class="radiogroup">'

        // 如果forbidden没传或者为空数组
        var j = 0;

        // 循环遍历模板
        for (var i = 0; i < newObj.radioNum; i++) {
            // 每个单选框的值不为字符串和数字跳出本次循环
            var text = newObj.innerText[i]
            if ((typeof text == 'number') || ((text != '') && (typeof text == 'string')));
            else { continue; }

            // 叠加模板
            tmp += `
                <label class="${newObj.disabled ? 'disabled' : ''} ${newObj.forbidden && ((newObj.forbidden[j] == i + 1) ? 'disabled' : '')}">
                    <input type="radio" name="${newObj.name}" data-value="${text}"><span class="radio_input"></span><span class="radio_value">${text}</span>
                </label>
            `

            j = newObj.forbidden && ((newObj.forbidden[j] == i + 1) ? ++j : j)

        }
        tmp += '</div>'

        // 添加模板到页面中
        target.innerHTML = tmp

        // 获取所有的input
        var inputObjs = target.querySelectorAll('input')

        // 注册点击事件
        inputObjs.forEach((item, i) => {
            item.addEventListener('change', function() {
                // 当前点击的父元素包含disabled结束函数
                if (this.parentElement.className.includes('disabled')) return;
                // 所有的radio父元素不包含disabled的元素清除className名
                for (let j = 0; j < inputObjs.length; j++) {
                    if (inputObjs[j].parentElement.className.includes('disabled')) continue;
                    inputObjs[j].parentElement.className = ''
                }
                // 当前元素添加类样式checked
                this.parentElement.className = "checked"

                // 改变绑定的value的值
                newObj.value = this.dataset.value

                // 回调函数
                newObj.callback && newObj.callback(newObj)
            }, false)
        })
    }

    // 暴露给window
    window.myRadio = myRadioGroup

})()
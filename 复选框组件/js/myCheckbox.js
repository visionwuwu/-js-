;
(function() {

    /**默认配置参数
     * name 原生name属性
     * value 绑定的值 []
     * disabled 是否禁用 false
     * forbidden 禁用第几个[]
     */

    const DEFAULTS = {
        value: [],
        innerText: [],
        disabled: false,
        forbidden: []
    }

    // 定义组件函数
    var myCheckbox = function(id, config) {
        // 合并配置的参数
        var newObj = Object.assign({}, DEFAULTS, config)

        var target = document.getElementById(id)

        // 全部禁用disabled为true forbidde为空[]
        newObj.forbidden = newObj.disabled ? DEFAULTS.forbidden : newObj.forbidden

        // 定义模板
        var tmp = '<div class="checkboxGroup">'

        // 禁用数组的索引
        var j = 0

        // 循环拼接模板
        for (var i = 0; i < newObj.innerText.length; i++) {
            tmp += `
            <label class="${newObj.disabled ? 'disabled' : ''} ${(newObj.forbidden.length !==0) ? ((newObj.forbidden[j] == i + 1) ? 'disabled' : '') : ''}"><input type="checkbox" name="${name}" data-value="${newObj.innerText[i]}"><span class="checkbox_input"></span><span class="checkbox_value">${newObj.innerText[i]}</span></label>
            `

            // 当前禁用的项等于当前的checkbox j++ 否则j不变
            j = (newObj.forbidden[j] == i + 1) ? (j + 1) : j
        }

        tmp += '</div>'

        // 插入到指定容器中
        target.innerHTML = tmp

        // 全部禁用disabled: true
        if (newObj.disabled) {
            // 回调函数
            newObj.callback && newObj.callback(newObj.value)
            return;
        }

        // 获取input注册change事件当表单值发生改变时触发
        var checkboxObjs = target.querySelectorAll('input')

        checkboxObjs.forEach((item, i) => {
            item.addEventListener('change', function() {
                // 禁用状态直接退出函数
                if (this.parentElement.className.includes('disabled')) return;

                if (this.parentElement.classList.contains('checked')) {
                    // 有checked类样式移除
                    this.parentElement.classList.remove('checked')

                    // 找到当前点击input的value值对应的索引
                    var index = newObj.value.indexOf(this.dataset.value)

                    // 删除对应项
                    newObj.value.splice(index, 1)
                } else {
                    // 没有添加
                    this.parentElement.classList.add('checked')

                    // 选中项的值添加到value属性中
                    newObj.value.push(this.dataset.value)
                }

                // 回调函数
                newObj.callback && newObj.callback(newObj.value)
            }, false)
        })


    }

    // 暴露给window

    window.myCheckbox = myCheckbox

})()
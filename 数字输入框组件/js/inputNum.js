;
(function() {
    /**配置参数
     * size 输入框的大小
     * value 输入框值
     * max 最大值
     * min 最小值
     * disabled 禁用状态
     * step 步数
     * 不能输入除数字以外的字符串
     * event change在输入框值改变是触发
     */

    /**用户没传默认的参数
     * size medium 中等大小
     * value 输入框默认值1
     * max infinity
     * min 1
     * step 1
     * disabled false
     * change 回调函数最后值改变时触发
     */

    // 定义默认参数
    var DEFAULTS = {
        size: 'medium',
        value: 1,
        max: Infinity,
        min: -Infinity,
        step: 1,
        disabled: false
    }

    // 定义渲染数字输入框的函数

    // 定义模板

    // 填充模板渲染模板

    // 注册按钮点击事件 添加事件处理函数

    // 注册input change事件 添加事件处理函数 验证输入的值

    // 改变输入框值 不能超过最大最小值

    // 是否是禁用状态 disabled

    // 设置点击的步数 step

    var myInputNumber = function(id, config) {
        // 合并配置对象
        var newObj = Object.assign({}, DEFAULTS, config)

        var target = document.getElementById(id)

        // 定义模板
        var tmp = ''

        // 拼接模板 添加配置项
        tmp += `
            <div class="input_number ${newObj.disabled ? 'disabled' : ''} ${newObj.size}">
                <button class="${(newObj.value == newObj.min) ? 'btn_disabled' : ''}">-</button><input type="text" value="${(newObj.value)}" class="myinputNum" ${newObj.disabled ? 'readonly' : ''}><button class="${(newObj.value == newObj.max) ? 'btn_disabled' : ''}">+</button>
            </div>
        `

        // 渲染模板
        target.innerHTML = tmp

        // 所有隐藏
        if (newObj.disabled) return;

        // 为按钮注册点击事件 添加事件处理函数
        var btnObjs = target.querySelectorAll('button')
        var inputObj = target.querySelector('.myinputNum')

        var arr = [newObj.min, newObj.max]

        // 禁用add按钮或sub按钮或不禁用
        function btnIsBisabled(val) {
            switch (val) {
                case arr[0]:
                    btnObjs[0].className = 'btn_disabled';
                    break;
                case arr[1]:
                    btnObjs[1].className = 'btn_disabled';
                    break;
                default:
                    btnObjs[0].className = '';
                    btnObjs[1].className = '';
                    break;
            }
        }

        // 减少按钮
        btnObjs[0].addEventListener('click', function() {
            if (this.classList.contains('btn_disabled')) return;

            // 获取input的值
            var step = newObj.step,
                val = Number(inputObj.value);

            // 当前值减step
            val = ((val - step) <= arr[0]) ? arr[0] : (val - step)

            // 修改input的值
            inputObj.value = val

            // 修改数据的值
            newObj.value = val

            btnIsBisabled(val)

            // 回调函数
            newObj.callback && newObj.callback(newObj)

        }, false)

        // 添加按钮
        btnObjs[1].addEventListener('click', function() {
            if (this.classList.contains('btn_disabled')) return;

            // 获取input的值
            var step = newObj.step,
                val = Number(inputObj.value);

            // 当前值减step
            val = ((val + step) >= arr[1]) ? arr[1] : (val + step)

            // 修改input的值
            inputObj.value = val

            // 修改数据的值
            newObj.value = val

            btnIsBisabled(val)

            // 回调函数
            newObj.callback && newObj.callback(newObj)

        }, false)

        // 为input输入框注册change事件
        inputObj.addEventListener('change', function() {
            // 获取input的值
            var val = parseInt(inputObj.value);
            // 是否越界或者不为数字
            if (isNaN(val) || val < arr[0] || val > arr[1]) {
                inputObj.value = newObj.value
                return;
            }

            // 修改input值
            inputObj.value = val

            // 改变绑定的value值
            newObj.value = val

            btnIsBisabled(val)

            // 回调函数
            newObj.callback && newObj.callback(newObj)

        }, false)

    }

    //暴露给window
    window.inputNumber = myInputNumber
})()
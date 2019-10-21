;
(function() {
    const DEFAULTS = {
        value: 0,
        type: 'decimal',
        callback: null
    }

    function myProgress(selector, config) {
        // 合并默认参数
        let options = Object.assign({}, DEFAULTS, config);

        // 目标盒子
        let target = document.querySelector(selector)

        // 创建盒子
        let box = document.createElement('div')
        box.className = 'progress'

        // 创建进度条
        let bar = document.createElement('div');
        bar.className = 'progress_bar'

        // 创建滑块
        let slide = document.createElement('span')
        slide.classList.add('slide')
        slide.classList.add(options.type)

        // 创建值的盒子
        let valBox = document.createElement('p')
        valBox.className = 'val'
        valBox.innerText = options.value

        //添加到进度条盒子
        bar.append(slide)
        box.append(bar, valBox)

        // 添加到目标盒子中
        target.append(box)

        // 滑块注册mousedown事件
        slide.addEventListener('mousedown', handleMouseDownSlide, false)

        // 获取相应的参数
        var minX = 0
        var maxX = bar.offsetWidth - slide.offsetWidth
        var middle = (slide.offsetWidth / 2) / maxX

        if (options.type == 'decimal' || options.type == 'percentage') {
            setMsg(options.value * maxX, maxX, minX)
        }

        if (options.type == 'num') {
            setMsg(options.value / 255 * maxX, maxX, minX)
        }

        function setMsg(diff, max, min) {
            if (diff < min) diff = 0;
            if (diff > max) diff = max;

            // 计算比列
            var scale = diff / max;
            // 设置值
            var data = setVal(scale);
            // 回调函数
            options.callback && options.callback(data.value);
        }

        // 格式化数据
        function formatData(data) {
            if (options.type == 'decimal') {
                return {
                    value: data.toFixed(1),
                    left: data.toFixed(1) * maxX,
                    col: data.toFixed(1) * 100 + 0.05
                }
            }
            if (options.type == 'num') {
                return {
                    value: parseInt(data * 255),
                    left: (data * maxX).toFixed(2),
                    col: data * 100 > 50 ? parseInt(data * 100) - 3 : parseInt(data * 100) + 3
                }
            }
            if (options.type == 'percentage') {
                return {
                    value: (data * 100).toFixed(2) + '%',
                    left: (data * maxX).toFixed(2),
                    col: data * 100 > 50 ? parseInt(data * 100) - 3 : parseInt(data * 100) + 3
                }
            }
        }

        // 设置值
        function setVal(scale) {
            // 根据百分比格式化数据
            var data = formatData(scale);
            // 设置value值
            valBox.innerText = data.value;
            // 设置slide的left
            slide.style.left = data.left + 'px';
            // 设置bar的背景渐变
            bar.style.background = `linear-gradient(90deg, #008000 0%, #008000 ${data.col}%, #808080 ${data.col}%, #808080 100%)`;

            return data;
        }

        // 处理滑块
        function handleMouseDownSlide(e) {
            e.stopPropagation();
            // 开始的x和y的值
            var startX = e.clientX;
            var left = this.offsetLeft;
            // 为bar注册鼠标鼠标mousemove事件
            document.onmousemove = function(e) {
                var diffX = e.clientX - startX + left;
                // if (diffX > maxX || diffX < 0) return;
                setMsg(diffX, maxX, minX);
            };
            // 鼠标抬起解除mouseup事件
            document.onmouseup = function() {
                document.onmousemove = null
            }

        }

        var barRect = bar.getBoundingClientRect();
        // 为bar注册点击事件
        bar.onmousedown = function(e) {
            var timeId = setTimeout(function() {
                e.stopPropagation()
                var diffX = e.clientX - barRect.left;
                setMsg(diffX, maxX, minX);
                clearTimeout(timeId)
            }, 100)
        }
    }

    // 暴露给window
    window.myProgress = myProgress
})()
;(function($){

	// 设置评分选中的值
	const setValue = function(el, value, unit){
		el.find('li').each(function( index ) {
			index += 1
			let cls = ''
			if(index <= value){
				cls='full-on'
			}else if(index - value < 1){
				cls = 'half-on'
			}else{
				cls = 'off'
			}
			$(this).attr('class', cls)
		})

		el.find('span').text( value + unit)
	}
	

	$.fn.rate = function( options ){
		// 默认参数
		const DEFAULTS = {
			type: 'star',
			color: '#FFB800',
			total: 5,
			size: 30,
			value: 3.5,
			readonly: false,
			unit: '❤'
		}

		// 合并参数
		options = $.extend({}, DEFAULTS, options)

		// 解构参数
		let {type, color, total, size, value, readonly, unit} = options

		// 定义评分模板
		let divTmp = `
		<div class="rate ${type + (readonly ? ' readonly' : '')}">
			<ul>
				${'<li class="off"></li>'.repeat(total)}
			</ul>
			<span></span>
		</div>
		`

		// 循环遍历生成评分结构
		return this.each(function() {
			let $div = $(divTmp) // 将divTmp模板字符串转化为jq对象
			let $lis = $div.find('li')

			// 设置评分默认值
			setValue($div, value, unit)

			// 设置评分样式
			$div.css({
				fontSize: size,
				color: color
			})

			// 将评分插入到目标容器中
			$div.appendTo(this)
			let INDEX = 0 // 全局索引值
			// 添加事件
			!readonly && $lis.hover(function(){
				let index = $(this).index()
				let liRect = this.getBoundingClientRect()

				document.onmousemove = function(e){
					let left = e.clientX
					let num = 0

					// 半分情况
					if(left > (liRect.left + liRect.width / 2)){
						num = 1
					}else{
						num = .5
					}

					INDEX = index + num
					setValue($div, INDEX, unit)
				}
			}, function(){
				// 离开时恢复默认分值
				setValue($div, value, unit)
				document.onmousemove = null
			}).click(function(){
				// 单击设置当前分值
				value = INDEX
				setValue($div, value, unit)
			})
		})
	}


})(jQuery)
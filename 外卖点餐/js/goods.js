;
(function() {

    var DEFAULTS = {
        index: 0
    }

    function goods(id, data, config) {

        var scrolling = true; //可以滚动的

        var pos = [];

        //获取目标对象
        var target = document.querySelector(id);

        //合并后的参数
        var options = Object.assign({}, DEFAULTS, config);

        //封装分类
        var cateUl = document.createElement('ul');
        cateUl.className = 'cate';

        //封装列表
        var listDiv = document.createElement('div');
        listDiv.classList.add('list');
        for (let i = 0; i < data.length; i++) {

            //分类循环部分
            var cateLi = document.createElement('li');
            cateLi.innerText = data[i].name;
            if (options.index == i) {
                cateLi.classList.add('active');
            }
            cateLi.onclick = function() {
                var lis = this.parentNode.children;
                for (var j = 0; j < lis.length; j++) {
                    lis[j].classList.remove('active');
                }
                this.classList.add('active');

                //单击动画滚动到指定的类
                document.getElementById('cate_' + data[i].id).scrollIntoView({
                    behavior: 'smooth'
                });

                scrolling = false;
                setTimeout(function() {
                    scrolling = true;
                }, 300)

            }
            cateUl.append(cateLi);

            //列表循环部分
            var listH4 = document.createElement('h4');
            listH4.id = 'cate_' + data[i].id;
            listH4.innerText = data[i].name;

            var listOl = document.createElement('ol');
            var children = data[i].children;

            //列表商品部分循环
            for (var k = 0; k < children.length; k++) {

                var listLi = document.createElement('li');
                var listImg = document.createElement('img');
                listImg.width = 50;
                listImg.height = 50;
                listImg.src = children[k].src;

                var listP = document.createElement('p');
                listP.innerHTML = `${children[k].title} <br><b>${children[k].price} 元</b>`;

                var listSpan = document.createElement('span');
                listSpan.goods = children[k];

                var mycart = JSON.parse(localStorage.getItem('mycart') || '[]');
                var result = mycart.filter(function(item) {
                    return item.id == children[k].id;
                })

                listSpan.count = result.length ? result[0].num : 0;

                listSpan.className = 'number';

                listLi.append(listImg, listP, listSpan);
                listOl.append(listLi);

            }

            listDiv.append(listH4, listOl);

        }

        //插入到文档中
        target.append(cateUl, listDiv);

        //将所有的h4距顶部的偏移值存入数组
        var h4s = listDiv.querySelectorAll('h4');
        h4s.forEach(function(h4) {
            pos.push(h4.offsetTop);
        })

        //设置滚动侦测
        var cateLis = cateUl.children;
        listDiv.onscroll = function() {

            if (!scrolling) return;
            var top = this.scrollTop;
            var th = this.scrollHeight;
            var ch = this.clientHeight;

            for (var i = 0; i < pos.length; i++) {


                if (top >= pos[i] && top < pos[i + 1]) {
                    //同步左侧类别
                    for (var p = 0; p < cateLis.length; p++) {
                        cateLis[p].className = '';
                        cateLis[i].className = 'active';
                    }
                } else if (top + ch >= th) {
                    //同步左侧类别
                    for (var p = 0; p < cateLis.length; p++) {
                        cateLis[p].className = '';
                        cateLis[pos.length - 1].className = 'active';
                    }
                }

            }


        }


        // console.log( pos );

    }

    window.goods = goods;

}())
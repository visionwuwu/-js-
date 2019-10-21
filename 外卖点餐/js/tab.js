; (function () {

  var DEFAULTS = {
    index: 0,
    event: 'click',
    change: null
  }

  function gTab(id, config) {

    var tabs = document.querySelectorAll(id);
    var options = Object.assign({}, DEFAULTS, config);

    //循环支持多个标签
    tabs.forEach(function (tab) {

      var lis = tab.querySelectorAll('.tab-nav li');
      var panels = tab.querySelectorAll('.tab-panel');

      lis.forEach(function (li, index) {

        //根据索引值选中
        lis[options.index].classList.add('active');
        panels[options.index].classList.add('active');

        li.addEventListener( options.event, function() {

          //清除所有li的class
          lis.forEach(function (LI) {
            LI.className = '';
          })

          //给当前单击的对象class
          this.classList.add('active');

          //清除所有panel的class
          panels.forEach(function (panel) {
            panel.classList.remove('active');
          })

          //给当前单击的对象对应的面板加上class
          panels[index].classList.add('active');

          //回调函数
          options.change && options.change( this, index );
          
        })

        // //代理触发事件 可以不使用
        // var event = new Event( options.event );
        // lis[options.index].dispatchEvent( event );

      })

    })

  }

  window.gTab = gTab;

}())
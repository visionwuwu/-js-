;(function(){

  var DEFAULTS = {
    title: '默认文字',
    space: 12,
    placement: 'top',
    container: 'body',
    dely: 300
  }

  function Tooltip( el, config ){

    var options = Object.assign( {}, DEFAULTS, config );
    if( 'object' !== typeof el ) {
      el = document.querySelector( el );
    }
    
    var tooltipId = 'tooltip_' + Tooltip.id++;
    var title = el.title || options.title;
    var placement = options.placement;
    var container = options.container;
    var space = options.space;
    var dely = options.dely;
    var elRect = el.getBoundingClientRect();

    el.dataset.tooltipId = tooltipId;

    var tooltipEl = null;
    var timer = null;
    
    var span = document.createElement('span');
    span.id = tooltipId;
    span.className = 'tooltip '+placement;
    span.innerText = title;

    el.onmouseenter = function(){

      //判断对象是否在文档之中
      if( !tooltipEl ){
        document.querySelector( container ).append( span );
      }
      tooltipEl = document.getElementById( tooltipId );
      var tooltipW = tooltipEl.offsetWidth;
      var tooltipH = tooltipEl.offsetHeight;
      var top = 0;
      var left = 0;
    
      if( placement == 'top' || placement == 'bottom' ){
        left = ( elRect.width - tooltipW ) / 2 + elRect.left;
      }

      if( placement == 'top' ){
        top = elRect.top - tooltipH - space;
      }

      if( placement == 'bottom' ){
        top =  elRect.bottom + space
      }

      if( placement == 'left' || placement == 'right' ){
        top = ( elRect.height - tooltipH ) / 2 + elRect.top;
      }

      if( placement == 'right' ){
        left = elRect.right + space;
      }

      if( placement == 'left' ){
        left = elRect.left - tooltipW - space;
      }
      
      tooltipEl.style.cssText = `
        top: ${top}px;
        left: ${left}px;
        visibility: visible;
      `;

    }

    el.onmouseleave = function(){
      if( timer ) clearTimeout( timer );
      timer = setTimeout(function(){
        tooltipEl.style.visibility = 'hidden';
      }, dely )
    }

    this.el = el;
    this.tooltipEl = tooltipEl;

  }

  Tooltip.id = 0

  Tooltip.prototype.show = function(){
    this.el.onmouseenter();
  }

  window.Tooltip = Tooltip;

}());
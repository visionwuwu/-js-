;(function(){

  var DEFAULTS = {
    val: 0,
    change: null
  }

  function number( id, config ){

    var options = Object.assign({}, DEFAULTS, config);

    var nums = document.querySelectorAll( id );
    nums.forEach(function( num ){
    
      var count = num.count || options.val;
      var goods = num.goods;

      num.classList.add('number');
  
      if(count==0)num.classList.add('zero');

      var a1  = document.createElement('a');
      a1.innerText = '-';
      a1.onclick = function(){
        var val = parseInt( input.value ) - 1;
        if(val <= 0 ) {
          val = 0;
          num.classList.add('zero');
        }
        input.value = val;

        //回调函数
        options.change && options.change( val, goods );

      }

      var input  = document.createElement('input');
      input.readOnly = true;
      input.value = count;
  
      var a2  = document.createElement('a');
      a2.innerText = '+';

      a2.onclick = function(){
        var val = parseInt( input.value ) + 1;
        if( val >= 1 ){
          num.classList.remove('zero');
        }
        input.value = val;

        //回调函数
        options.change && options.change( val, goods );
      }
  
      num.append( a1, input, a2 );

    })

  }

  window.number = number;

}());
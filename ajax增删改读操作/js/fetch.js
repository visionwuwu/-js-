//封装原生xhr对象
var $ = {
  ajax: function ( url, config ){
    var method = config.method || 'GET';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

      if( xhr.readyState == 4  ){

        if( xhr.status == 200){
          //成功
          config.success && config.success( JSON.parse( xhr.responseText )  );
        }else{
          //失败
          config.error && config.error( xhr );
        }

        //完成
        config.complete && config.complete( xhr );

      }
    }
  
    //GET提交参数合并
    if( method == 'GET' ){
      urlStr = '?';
      for( var key in config.data ){
        urlStr += key+'='+config.data[key]+'&'
      }
      url += urlStr.slice(0,-1)
    }
    
    xhr.open( method, url );

    //POST提交参数合并
    var form = null;
    if( method == 'POST' ){
      form = new FormData(); //模拟表单
      for( var key in config.data ){
        form.append( key, config.data[key] );
      }
    }

    xhr.send( form );

  },
  set: function( type, args ){
    var config = { method: type };
    if( 'object' === typeof args[1] ){
      config.data = args[1];
    }else if( 'function' === typeof args[1] ){
      config.success = args[1];
    }
    if( 'function' === typeof args[2] ){
      config.success = args[2];
    }
    this.ajax( args[0], config );
  },
  get: function(){
    this.set.call( this, 'GET', arguments);
  },
  post: function(){
    this.set.call( this, 'POST', arguments);
  }
};
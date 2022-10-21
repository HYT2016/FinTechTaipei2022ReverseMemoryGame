
//若為IE在 body 加類 ie，IE11之前顯示不支援
if('ActiveXObject' in window){
  var _body = document.getElementsByTagName('body')[0];
  _body.className = _body.className + ' ie';
  if(!/\brv:11\./.test(window.navigator.userAgent)) _body.insertAdjacentHTML("afterBegin",'<div id="top-hints"><i></i>為了資訊安全，我們已不支援 IE 瀏覽器，請使用 <a href="https://www.microsoft.com/zh-tw/edge">Edge</a>、<a href="https://www.google.com/intl/zh-TW/chrome/">Chrome</a>、<a href="https://www.apple.com/tw/safari/">Safari</a> 或 <a href="https://moztw.org/">Firefox</a> 等主流瀏覽器。</div>');

}

//彈出吐司訊息
$.extend({
  toast: (msg)=>{ 
    if($('#toast').length==0) $('body').append('<div id="toast"></div>');
    $('#toast').html(msg).addClass('show').one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd',(ev)=>{
      $(ev.target).removeClass('show');
    });
  }
});

//AJAX 共用錯誤處理
$.ajaxSetup({
  cache: false,
  beforeSend: function(jqXHR, settings) {
    jqXHR.url = settings.url;
  },
  "error":function(jqXHR, textStatus, errorThrown) {
    $.toast('系統忙錄中');
    console.log(errorThrown+' in ' + jqXHR.url);
  }
});


// jquery 表單的 serializeArray 轉 JSON
function form2json(selector) {
  let A = $(selector).serializeArray();
  let O = {};
  for(let o of A) {
    if(!isNaN(o.value)) o.value = Number(o.value);
    if(o.name in O) {
      if(Array.isArray(O[o.name]))
        O[o.name].push(o.value);
      else
        O[o.name] = [O[o.name],o.value];
    }
    else {
      O[o.name] = o.value;
    }
  }
  return O;
}

// HTML編碼 (跳脫HTML標籤字元)
String.prototype.esc = function() {
  var m={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'};
  return this.replace(/[&<>"']/g,function(c){return m[c]});
}
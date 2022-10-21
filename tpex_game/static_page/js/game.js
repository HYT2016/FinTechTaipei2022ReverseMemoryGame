
$(()=>{


  // const assetPath = /^https?:\/\/[^\/]+(.*?)\/css\//.test($('link[href*="/css/main.css"]').prop('href'))?RegExp.$1:null;
  const assetPath = './';


  //載入音效檔 先轉換 ffmpeg -i 輸入名.mp3 -c:a aac -vn 輸出名.m4a
  let sounds = {}; //聲音物件
  for(let fn of 'answer-bingo,answer-wrong,question,resualt'.split(',')) {
    sounds[fn] = document.createElement('audio');
    sounds[fn].src = assetPath+'/sound/'+fn+'.m4a';
  }
  sounds.question.volume = 0.7;



  
  let aCorrect = [0,2,2,2,2,0,1,2];
  let $QAs = $('#game>.view.qa');

  sounds.question.play();
  $QAs.eq(0).addClass('active').delay(100).queueAddClass('actived'); //顯示問題1
  
  
  
  
  //按下答案
  $('#game>.view.qa>.ans li').on('click',(ev)=>{
    
    let $li = $(ev.target); //選中
    
    let selectIdx = $li.addClass('selected').index(); //選中 索引
    let $qaView = $li.closest('.view.qa')
    let qIdx = $QAs.index($qaView); //題號 索引
    
    let isCorrect = aCorrect[qIdx] === selectIdx; //對錯?
    

    if(isCorrect) { //正確回答
       $li.closest('ol').find('li').eq(aCorrect[qIdx]).addClass('correct');//標記正解
    }
    else {
      $li.addClass('wrong'); //標記錯誤
      window.setTimeout(()=>{$li.closest('ol').find('li').eq(aCorrect[qIdx]).addClass('correct');},1500);//延遲標記正解
    }

    $qaView.addClass(isCorrect?'answer-correct':'answer-wrong'); //標記 回答 正確 或 錯誤
    
    sounds[isCorrect?'answer-bingo':'answer-wrong'].play(); //正確錯誤聲


    //3秒後離開題目
    window.setTimeout(()=>{
      
      $qaView.addClass('out').removeClass('actived');

      //一秒後跳下題
      window.setTimeout(()=>{
        $qaView.removeClass('active');  //隱藏 本題
        if(qIdx<aCorrect.length-1) { //在8題內
          window.scrollTo({ top: 0 });
          sounds.question.play();
          
          $QAs.eq(qIdx+1).addClass('active').delay(100).queueAddClass('actived'); //顯示 下題
        }
        else {
          initResualt(); //顯示結果頁
        }
        
        
      },1000);
      
    },isCorrect?1000:3000);


  });
  
  //回首頁
  $('button.home').on('click',()=>{
    location.href = "./";
  });
  
  
  //分享
  $('button.sharer').on('click',()=>{
    window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURI('https://www.tpex.org.tw/sp/antifraud/'), "_blank", "toolbar=0,status=0,width=580,height=325");
  });
  
  //按 填寫資料參加抽獎
  $('button.draw').on('click',()=>{
    // $('#game>.view').removeClass('active');
    // $('.view.term1').addClass('active');
    // window.scrollTo({ top: 0 });
    // 0930跳轉至抽獎入口網站
    location.replace('/lottery/');
  });
  
  //不同意
  $('.view.term1 button.cancel, .view.term2 button.cancel').on('click',()=>{
    $('#game>.view').removeClass('active');
    $('.view.resualt').addClass('active');
    window.scrollTo({ top: 0 });
  });
  //同意
  $('.view.term1 button.agree').on('click',()=>{
    $('#game>.view').removeClass('active');
    $('.view.term2').addClass('active');
    window.scrollTo({ top: 0 });
  });
  //同意
  $('.view.term2 button.agree').on('click',()=>{
    $('#game>.view').removeClass('active');
    $('.view.form').addClass('active');
    window.scrollTo({ top: 0 });
  });
  
  
  //表單處理
  let $input = n => $(`#game > .view.form form input[name="${n}"]`); //回傳 jQuery <input> 物件
  
	//身份證字號
  $input('idno').on('input', ev => {
  	ev.target.setCustomValidity(isID($(ev.target).val())?'':'「身份證字號」格式不符');
  });

  //輸入: 手機
  $input('phone').on('input',ev =>
    ev.target.setCustomValidity(/^09(\d{8})$/.test($(ev.target).val())?'':'請輸入台灣 09 開頭的手機號碼，共10碼。')
  );

  //輸入: 地址
  $input('address').on('input',ev =>
    ev.target.setCustomValidity($(ev.target).val().length>6?'':'請輸入完整地址')
  );

  // sitekey:  6LfAp8QhAAAAAIGhOHSzikS5hJMXCm1WNh1IH7hZ
  $('#game > .view.form form').on('submit',()=>{
    
    console.log(grecaptcha);
    
    if( grecaptcha.getResponse()=='') {
      alert('請勾選「我不是機器人」');
      return false;
    }
    return true;
  });

  $('#game > .view.form form').on('reset',()=>{
     grecaptcha.reset();
     return true;
  });
    







  //假回答
//  $QAs.eq(0).find('>.ans li:eq(2)').trigger('click');
//  $QAs.eq(1).find('>.ans li:eq(1)').trigger('click');
//  $QAs.eq(2).find('>.ans li:eq(0)').trigger('click');
//  $QAs.eq(3).find('>.ans li:eq(2)').trigger('click');
//  $QAs.eq(4).find('>.ans li:eq(1)').trigger('click');
//  $QAs.eq(5).find('>.ans li:eq(0)').trigger('click');
//  $QAs.eq(6).find('>.ans li:eq(2)').trigger('click');
//  $QAs.eq(7).find('>.ans li:eq(1)').trigger('click');
//  $('button.agree').trigger('click');
//  $('#game>.view.resualt').addClass('active');
// $('#game>.view.term1').addClass('active');




  //初始結果頁
  function initResualt() {
    
    window.scrollTo({ top: 0 });
    
    const abc = ['A','B','C'];
    
    
    oBgSound.pause();
    oBgSound.src = assetPath+'/sound/bgm3.m4a';
    sounds.resualt.play();
    window.setTimeout(()=>{ oBgSound.play(); },3000);
    
    
    $('#game>.view.resualt').addClass('active');
    let $chat = $('.chatting>.wp');
    
    let aAns = []; //使用者8題答案
    let score = 0;
    
    $QAs.each((idx,qa)=>{
      let $qa = $(qa);
      
      let $liCor = $qa.find('li.correct'); //正解
      let $liSel = $qa.find('li.selected'); //回答
      
      let abcCor = abc[$liCor.index()];
      let abcSel = abc[$liSel.index()]; 
      
      let txtCor = abcCor+'.'+$liCor.text(); 
      let txtSel = abcSel+'.'+$liSel.text();
      
      
      aAns.push(abcSel);
      
      

      $chat.append(`<p>${$qa.find('.num>b').text()}</p>`);
      $chat.append(`<p>${$qa.find('h2').text()}</p>`);
      $chat.append(`<p class="ans">${txtSel}</p>`);
      
      if(abcCor === abcSel) {
        score++;
        $chat.append(`<p class="o">&#x25EF;答對了！</p>`);
        $chat.append(`<p class="o">正確答案是 ${txtCor}</p>`);
        $chat.append(`<p class="ans">我記得了！</p>`);
      }
      else {
        $chat.append(`<p class="x">&#x2573;答錯了！</p>`);
        $chat.append(`<p class="x">正確答案是 ${txtCor}</p>`);        
        $chat.append(`<p class="ans">我會注意！</p>`);
      }
      if(idx<(8-1)) $chat.append('<hr>');
      
/*      
        <p>Q01</p>
        <p>收到簡訊通知你的證券交易帳戶被盜用下單,需按下連結以取消交易,你會?</p>
        <p class="ans">收到簡訊通知你的證券交易帳戶被盜用下單,需按下連結以取消交易,你會?</p>
        <hr>
*/      
      
      
    });


    /* 0929 jump to memory game */
    // setTimeout(() => {location.href='https://localhost/lottery/'}, 15000); // 3秒後跳轉頁面
    
    /* */
    
    $('.view.form input[name="answer"]').val(aAns.join(',')); //回答的答案
    
    $('#game > .view.resualt h2 > b').text(score);
    
    let $figure = $('#game > .view.resualt figure');
    if(score<4) {
      $figure.addClass('c');
    }
    else if(score>=4 && score<=6) {
      $figure.addClass('b');
    }
    else {
      $figure.addClass('a');
    }
    

  }



  
});




$.fn.queueAddClass = function(className) {
    this.queue('fx', function(next) {
        $(this).addClass(className);
        next();
    });
    return this;
};
$.fn.queueRemoveClass = function(className) {
    this.queue('fx', function(next) {
        $(this).removeClass(className);
        next();
    });
    return this;
};


//身份證字號檢查
function isID(srtID) {
  srtID = srtID.trim().toUpperCase();
  if(!/^[A-Z][12]\d{8}$/.test(srtID)) return false;
  let AB = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
  let W = [1,9,8,7,6,5,4,3,2,1,1];
  srtID = String(AB.indexOf(srtID[0]) + 10) + srtID.slice(1);
  let ck=0;
  for(let i=0; i<srtID.length; i++) ck+=parseInt(srtID[i])*W[i];
  return ck % 10 == 0;
}
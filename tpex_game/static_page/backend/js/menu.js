var menuArray = $('meta[name="menuType"]').attr("content");
var menuJson = JSON.parse(menuArray);
var productLink = $('meta[name="ajaxProduct"]').attr("content");
var pageLink = $('meta[name="ajaxPage"]').attr("content");

$(function(){
   $(".innerUrl, .link, .group").hide();

   var myValidator = $("#form1").validate({event: "keyup"});
   $("#form1").submit(function() {
      if (myValidator.form()) {
         return true;
      } else {
         return false;
      }
   });

   $(".dateTime").datetimepicker({
      lang:'ch',
      format:	'Y-m-d H:i',
      step:10,
      minDate: 0, // today,
      todayHighlight: true
   });

   //-- 檢查網址類型事件
   $("input[name='linkType']").on("click", function(){
      var checkVal = $(this).val();
      $("select[name='innerUrl'] option, select[name='innerSub'] option, select[name='category'] option").prop("selected",false);
      $("input[name='linkUrl']").val("");
      $("input[name='menuType']").val("");
      linkType(checkVal);
   });

   //-- 處理站內網址
   $("select[name='innerUrl']").on("change", function (){
      var optType = $("select[name='innerUrl'] option:selected").data("type");
      var optVal = $("select[name='innerUrl'] option:selected").val();
      if(optType == undefined || optType == ''){
         $("#menuType").val();
      }else{
         $("#menuType").val(optType);
      }

      //-- 統一清空第二層選單
      $("select[name='innerSub']").empty();
      $("select[name='innerSub']").append("<option>請選擇</option>");

      //-- 依據不同的類型再加上其他第二層選項
      innerSubOpt(optType, optVal, null);

   });
});

function linkType(val){
   if("None" == val){
      $(".innerUrl, .link, .group").hide();
   }

   if("InnerUrl" == val){
      $(".innerUrl").show();
      $(".link, .group").hide();
   }

   if("Link" == val){
      $(".link").show();
      $(".innerUrl, .group").hide();
   }

   if("Group" == val){
      $(".group").show();
      $(".innerUrl, .link").hide();
   }
}

//-- 站內網址 動態生成第二階層的option
function innerSubOpt(optType, optVal, selVal){
   //-- 複製新的Enum
   var newArray = menuJson.slice();

   if("General" == optType){
      // newArray = newArray.filter(o=>o.value != "Product" || o.val!="Page");
      //-- 將非General的類型刪除(從第5個開始，刪除兩個)
      newArray.splice(4, 2);

      $.each(newArray, function (i,data){
         if(selVal){
            $("select[name='innerSub']").append("<option value='" + data?.value + "' " + (data?.value == selVal? "selected":"") + ">" + data?.name + "</option>");
         }else{
            $("select[name='innerSub']").append("<option value='" + data?.value + "'>" + data?.name + "</option>");
         }

      });
   }

   if("Product" == optType){
      ajaxData(productLink, optType, optVal, selVal);
   }

   if("Page" == optType){
      ajaxData(pageLink, optType, optVal, selVal);
   }
}

//-- 共用查詢只有呼叫網址不同
function ajaxData(linkUrl, optType, optVal, selVal){
   $.ajax({
      method: "POST",
      url: linkUrl,
      data: { id: optVal },
      cache: false,
      success: function (res){
         $.each(res, function (i, data){
            if(selVal){
               $("select[name='innerSub']").append("<option value='" + data?.id + "' " + (data?.id == selVal? "selected":"") + ">" + data?.title + "</option>");
            }else{
               $("select[name='innerSub']").append("<option value='" + data?.id + "'>" + data?.title + "</option>");
            }
         });
      }
   });
}


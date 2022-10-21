$(function (){
    //-- 將商品id帶入規格的dialog裡面
    $(".btn-contact").on("click", function (){
        var productId = $(this).data("id");
        var productName = $(this).data("name");

        //-- 取得指定商品的已存在的field
        var selContacts = $(this).data("contacts")?.toString();
        $("#contactSetting #productId").val(productId);
        $("#contactSetting .modal-title").html(productName + "<br>聯絡人");

        if(selContacts.indexOf(',') != -1){
            var contactArray = selContacts?.split(",");
            $.each(contactArray, function (idx, val){
                //-- 控制真的checkbox
                $("input[type='checkbox'][name='contact'][value='" + val + "']").prop("checked",true);
                //-- 控制圖片的勾勾顯示
                $("input[type='checkbox'][name='contact'][value='" + val + "']").parent().addClass("checked");
            });
        }else{
            //-- 控制真的checkbox
            $("input[type='checkbox'][name='contact'][value='" + selContacts + "']").prop("checked",true);
            //-- 控制圖片的勾勾顯示
            $("input[type='checkbox'][name='contact'][value='" + selContacts + "']").parent().addClass("checked");
        }

    });

    //-- 規格欄位的dialog被按close時，清空productId和checked
    $(".btn-contact-close").on("click", function (){
        $("#contactSetting #productId").val("");
        $("#contactSetting .modal-title").html("");
        //-- 控制真的checkbox
        $("input[type='checkbox'][name='contact']").prop("checked", false);
        //-- 控制圖片的勾勾取消顯示
        $("#contactSetting .icheckbox_square-green").removeClass("checked");

    });
});
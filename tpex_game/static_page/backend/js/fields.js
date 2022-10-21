$(function (){
    //-- 將商品id帶入規格的dialog裡面
    $(".btn-field").on("click", function (){
        var productId = $(this).data("id");
        var productName = $(this).data("name");

        //-- 取得指定商品的已存在的field
        var selFields = $(this).data("fields")?.toString();
        $("#fieldSetting #productId").val(productId);
        $("#fieldSetting .modal-title").html(productName + "<br>規格欄位");

        if(selFields.indexOf(',') != -1){
            var fieldArray = selFields?.split(",");
            $.each(fieldArray, function (idx, val){
                //-- 控制真的checkbox
                $("input[type='checkbox'][name='field'][value='" + val + "']").prop("checked",true);
                //-- 控制圖片的勾勾顯示
                $("input[type='checkbox'][name='field'][value='" + val + "']").parent().addClass("checked");
            });
        }else{
            //-- 控制真的checkbox
            $("input[type='checkbox'][name='field'][value='" + selFields + "']").prop("checked",true);
            //-- 控制圖片的勾勾顯示
            $("input[type='checkbox'][name='field'][value='" + selFields + "']").parent().addClass("checked");
        }

    });

    //-- 規格欄位的dialog被按close時，清空productId和checked
    $(".btn-field-close").on("click", function (){
        $("#fieldSetting #productId").val("");
        $("#fieldSetting .modal-title").html("");
        //-- 控制真的checkbox
        $("input[type='checkbox'][name='field']").prop("checked", false);
        //-- 控制圖片的勾勾取消顯示
        $("#fieldSetting .icheckbox_square-green").removeClass("checked");

    });
});
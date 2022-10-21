//-- 操控 ArticleBlock 的樣版，要顯示哪些欄位
//-- Category的name為Double開頭的

//-- 共同固定顯示欄位 資料來源、是否上線、排序、上下架時間

//-- Double.DL-檔案下載列表：                              標題(繁英簡)
//-- Double.DLByYear-檔案下載列表 (By 年份)：               標題(繁英簡)
//-- Double.FincaeForm-財務表格：                         標題(繁英簡)
//-- Double.General-一般內文：                            標題(繁英簡)、內容(繁英簡)
//-- Double.MultiDLByYear-多欄式檔案下載列表 (By 年份)：    標題(繁英簡)、欄數(繁英簡，預設為3)
//-- Double.MultiDL-多欄式檔案下載列表：                   標題(繁英簡)、欄數(繁英簡，預設為3)
//-- Double.Calendar-行事曆列表：                         標題(繁英簡)
$(function (){
    //-- 隱藏圖片上傳，雙欄版型不使用 圖片上傳、標題(輸入格式為areaTitle)
    $(".subTitle, .areaTitle").hide();
    $("div[class^='bx-attachment-'],div[class*=' bx-attachment-']").hide();
    $("textArea[name='titleZh'], textArea[name='titleEn'], textArea[name='titleCh']").prop("disabled", true);

    var currOptName = $("select[name='template'] option:selected").data("name");
    $("#tempName").val(currOptName);
    switchCols(currOptName);

    $("select[name='template']").on("change", function (){
        var optVal= $("select[name='template'] option:selected").val();
        var optName = $("select[name='template'] option:selected").data("name");
        $("#tempName").val(optName);
        switchCols(optName);
    });
});

//-- 配合版型切換欄位顯示
function switchCols(optName){
    if(["Double.General"].includes(optName)){
        $(".content").show();
    }else{
        $(".content").hide();
    }

    if(["Double.MultiDLByYear","Double.MultiDL"].includes(optName)){
        $(".colNum").show();
    }else{
        $(".colNum").hide();
    }
}
